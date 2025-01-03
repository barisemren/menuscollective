import FavoriteButton from "@/components/favorite-button";
import { createClient } from "@/utils/supabase/server";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  restaurant: {
    id: number;
    name: string;
    category: string;
    cuisine: string;
    google_maps_link: string;
    menu_id: number;
  };
  initialFavorited: boolean;
};

type Menu = {
  id: number;
  restaurant_id: number;
  link: string;
};

export default async function ListCard({
  restaurant,
  initialFavorited,
}: Props) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("menusnew")
    .select("*")
    .eq("id", restaurant.menu_id);
  const menu = data as Menu[];

  return (
    <div className="flex flex-col space-y-2 border p-4 rounded-md h-full justify-between">
      <div className="inline-flex w-full justify-between group">
        <h3 className="text-2xl font-bold">{restaurant.name}</h3>
        <div className="flex items-center gap-2">
          <FavoriteButton
            restaurantId={restaurant.id.toString()}
            initialFavorited={initialFavorited}
          />
          <Link href={`/restaurant/${restaurant.id}`}>
            <ArrowUpRight className="transition-all group-hover:text-mc-primary group-hover:scale-125" />
          </Link>
        </div>
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
