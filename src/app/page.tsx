import { getFavoriteStatuses } from "@/app/actions";
import MenuCard from "@/components/card/menu-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight, Lock, Utensils } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-32 bg-muted rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="flex flex-col space-y-2 border p-4 rounded-md bg-mc-muted/50 backdrop-blur">
      <div className="inline-flex w-full justify-between group">
        <div className="h-8 w-48 bg-mc-muted rounded animate-pulse" />
        <Lock className="text-mc-muted" />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="h-4 w-32 bg-mc-muted rounded animate-pulse" />
        <div className="h-4 w-24 bg-mc-muted rounded animate-pulse" />
        <div className="inline-flex w-full justify-between">
          <div className="h-4 w-36 bg-mc-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-mc-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only fetch featured restaurants if user is authenticated
  const { data: featuredRestaurants } = user
    ? await supabase
        .from("menusnew")
        .select(
          `
          id,
          name,
          description,
          restaurant_name,
          cuisine,
          favorites:favorites(count)
        `
        )
        .not("favorites", "is", null)
        .order("favorites.count", { ascending: false })
        .limit(3)
    : { data: null };

  // Get favorite statuses for featured restaurants
  const favoriteStatuses = featuredRestaurants
    ? await getFavoriteStatuses(featuredRestaurants.map((r) => r.id))
    : {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-mc-background">
        <div className="mx-auto max-w-4xl py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mc-primary text-mc-primary-foreground">
                <Utensils className="size-6" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              Discover Restaurant Menus Worldwide
            </h1>
            <p className="text-lg leading-8 text-mc-foreground/80 mb-8">
              MenusCollective is your go-to platform for finding and sharing
              restaurant menus. Save your favorites, explore new cuisines, and
              never wonder &ldquo;what&rsquo;s on the menu?&rdquo; and
              &ldquo;how much?&rdquo; again.
            </p>
            <div className="flex items-center justify-center gap-6">
              {user ? (
                <Link href="/explore">
                  <Button size="lg" className="gap-2">
                    Start Exploring <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button size="lg" className="gap-2">
                    Sign Up Free <ArrowRight className="size-4" />
                  </Button>
                </Link>
              )}
              {!user && (
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-mc-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p className="mt-4 text-mc-foreground/80">
              Simple yet powerful features to enhance your dining experience
            </p>
          </div>
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Explore Menus</CardTitle>
                <CardDescription>
                  Browse through an extensive collection of restaurant menus
                  from various cuisines
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Save Favorites</CardTitle>
                <CardDescription>
                  Keep track of your favorite restaurants and their menus for
                  quick access
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Share Discoveries</CardTitle>
                <CardDescription>
                  Add new restaurants and menus to help others discover great
                  places to eat
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold">Most Popular Menus</h2>
            <p className="mt-4 text-mc-foreground/80">
              {user
                ? "Discover the most loved menus in our community"
                : "Sign up to explore our collection of popular menus"}
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={<LoadingSkeleton />}>
              <div className="flex flex-col space-y-8">
                {user && featuredRestaurants ? (
                  featuredRestaurants.map((menu) => (
                    <MenuCard
                      key={menu.id}
                      menu={menu}
                      initialFavorited={favoriteStatuses[menu.id] || false}
                    />
                  ))
                ) : (
                  <>
                    <PreviewCard />
                    <PreviewCard />
                    <PreviewCard />
                  </>
                )}
              </div>
            </Suspense>
          </div>
          <div className="mt-16 flex justify-center">
            {user ? (
              <Link href="/explore">
                <Button variant="outline" size="lg" className="gap-2">
                  View All Restaurants <ArrowRight className="size-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button variant="outline" size="lg" className="gap-2">
                  Sign Up to View More <ArrowRight className="size-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* <NavigationBar /> */}
    </div>
  );
}
