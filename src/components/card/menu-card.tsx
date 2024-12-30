import FavoriteButton from "@/components/favorite-button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  menu: {
    id: number;
    name: string;
    description: string;
    restaurant_name: string;
    cuisine: string;
  };
  initialFavorited: boolean;
};

export default function MenuCard({ menu, initialFavorited }: Props) {
  return (
    <div className="flex flex-col space-y-2 border p-4 rounded-md">
      <div className="inline-flex w-full justify-between group">
        <div>
          <h3 className="text-2xl font-bold">{menu.name}</h3>
          <p className="text-mc-foreground/80">{menu.restaurant_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton
            restaurantId={menu.id.toString()}
            initialFavorited={initialFavorited}
          />
          <Link href={`/menu/${menu.id}`}>
            <ArrowUpRight className="transition-all group-hover:text-mc-primary group-hover:scale-125" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-gray-500">{menu.cuisine}</p>
        <p className="text-mc-foreground/80">{menu.description}</p>
      </div>
    </div>
  );
}
