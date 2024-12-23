import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { SearchInput } from "@/components/search-input";
import ListCard from "@/components/card/list-card";
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

  return (
    <div className="w-2/5">
      <div className="flex flex-col space-y-6 items-center">
        <p>Search for restaurants by name or category.</p>
        <SearchInput />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col space-y-8 mt-10">
          {restaurants?.map((restaurant) => (
            <ListCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
