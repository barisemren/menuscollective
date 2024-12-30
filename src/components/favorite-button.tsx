"use client";

import { toggleFavorite } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useTransition } from "react";

export default function FavoriteButton({
  restaurantId,
  initialFavorited,
}: {
  restaurantId: string;
  initialFavorited: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = React.useState(initialFavorited);
  const router = useRouter();

  const handleToggleFavorite = async () => {
    startTransition(async () => {
      const result = await toggleFavorite(restaurantId);
      if (result.success) {
        setIsFavorited(result.isFavorited);
        router.refresh();
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={isFavorited ? "text-red-500" : "text-muted-foreground"}
    >
      <Heart className={isFavorited ? "fill-current" : ""} />
      <span className="sr-only">
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
