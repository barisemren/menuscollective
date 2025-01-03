import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { logout } from "./actions";

export default async function UserPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch user's menus
  const { data: userMenus } = await supabase
    .from("restaurantsnew")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="menus">Your Menus</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                View and manage your profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
              </div>
              <form action={logout}>
                <Button variant="destructive" className="w-full">
                  Log Out
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                {/* Add notification settings here */}
              </div>
              <div className="space-y-2">
                <Label>Display Preferences</Label>
                {/* Add display settings here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menus">
          <Card>
            <CardHeader>
              <CardTitle>Your Menus</CardTitle>
              <CardDescription>
                Menus you&apos;ve added to MenusCollective.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {userMenus && userMenus.length > 0 ? (
                  userMenus.map((menu) => (
                    <div
                      key={menu.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{menu.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {menu.category}
                        </p>
                      </div>
                      <Link href={`/restaurant/${menu.id}`}>
                        <Button variant="outline">View Menu</Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      You haven&apos;t added any menus yet.
                    </p>
                    <Link href="/new-menu">
                      <Button variant="outline" className="mt-2">
                        Add Your First Menu
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
