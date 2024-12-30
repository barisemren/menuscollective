import { getFavoriteStatuses } from "@/app/actions";
import ListCard from "@/components/card/list-card";
import { NewMenuSheet } from "@/components/new-menu-sheet";
import { SearchInput } from "@/components/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

function ListCardSkeleton() {
  return (
    <div className="flex flex-col space-y-2 border p-4 rounded-md">
      <div className="inline-flex w-full justify-between group">
        <Skeleton className="h-8 w-48" /> {/* Restaurant name */}
        <Skeleton className="h-6 w-6" /> {/* Arrow icon */}
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Category */}
        <Skeleton className="h-4 w-24" /> {/* Cuisine */}
        <div className="inline-flex w-full justify-between">
          <Skeleton className="h-4 w-32" /> {/* Google Maps link */}
          <Skeleton className="h-4 w-24" /> {/* Menu link */}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-8 mt-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <ListCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ExplorePage(props: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await props.searchParams;
  const supabase = await createClient();
  let query = supabase.from("restaurants").select("*");
  if (search) {
    // if search is matched in the name or category
    query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%`);
  }
  const { data: restaurants } = await query;

  // Get favorite statuses for all restaurants at once
  const favoriteStatuses = restaurants
    ? await getFavoriteStatuses(restaurants.map((r) => r.id))
    : {};

  return (
    <div className="w-full lg:w-2/5">
      <div className="flex flex-col space-y-6 items-center">
        <div className="flex items-center justify-between w-full max-w-sm">
          <p>Search for restaurants by name or category.</p>
          <NewMenuSheet />
        </div>
        <SearchInput />
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="flex flex-col space-y-8 mt-10">
          {restaurants?.map((restaurant) => (
            <ListCard
              key={restaurant.id}
              restaurant={restaurant}
              initialFavorited={favoriteStatuses[restaurant.id] || false}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
