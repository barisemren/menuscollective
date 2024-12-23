import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowUpRight } from "lucide-react";
type Props = {
  restaurant: {
    id: string;
    name: string;
    category: string;
    cuisine: string;
    google_maps_link: string;
    menu_id: string;
  };
};

type Menu = {
  id: string;
  restaurant_id: string;
  link: string;
};

export default async function ListCard({ restaurant }: Props) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", restaurant.menu_id);
  const menu = data as Menu[];

  return (
    <div className="flex flex-col space-y-2 border p-4 rounded-md">
      <div className="inline-flex w-full justify-between group">
        <h3 className="text-2xl font-bold">{restaurant.name}</h3>
        <Link href={`/restaurant/${restaurant.id}`}>
          <ArrowUpRight className="transition-all group-hover:text-mc-primary group-hover:scale-125" />
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-secondary">{restaurant.category}</p>
        <p className="text-gray-500">{restaurant.cuisine}</p>
        <div className="inline-flex w-full justify-between">
          <a
            href={restaurant.google_maps_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View on Google Maps
          </a>
          <a
            href={menu?.[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            View Menu
          </a>
        </div>
      </div>
    </div>
  );
}
