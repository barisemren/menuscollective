import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { logout } from "./actions";

export default async function UserPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
      <form action={logout}>
        <Button variant="destructive">Log Out</Button>
      </form>
    </div>
  );
}
