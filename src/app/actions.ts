"use server";

import { createClient } from "@/utils/supabase/server";

export async function addMenuRestaurant(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user found");
    return;
  }

  // First create the restaurant
  const restaurantData = {
    user_id: user.id,
    name: formData.get("restaurant_name") as string,
    google_maps_link: formData.get("location") as string,
    category: formData.get("category") as string,
    cuisine: formData.get("cuisine") as string,
  };

  const { data: createdRestaurant, error: RestaurantError } = await supabase
    .from("restaurantsnew")
    .insert(restaurantData)
    .select()
    .single();

  if (RestaurantError || !createdRestaurant) {
    console.log("RestaurantError", RestaurantError);
    return;
  }

  // Then create the menu with restaurant_id
  const menuData = {
    user_id: user.id,
    link: formData.get("link") as string,
    restaurant_id: createdRestaurant.id,
  };

  const { data: createdMenu, error: MenuError } = await supabase
    .from("menusnew")
    .insert(menuData)
    .select()
    .single();

  if (MenuError || !createdMenu) {
    console.log("MenuError", MenuError);
    return;
  }

  // Update restaurant with menu_id
  const { error: UpdateError } = await supabase
    .from("restaurantsnew")
    .update({ menu_id: createdMenu.id })
    .eq("id", createdRestaurant.id);

  if (UpdateError) {
    console.log("UpdateError", UpdateError);
    return;
  }
}

export async function toggleFavorite(restaurantId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if restaurant is already favorited
  const { data: existingFavorite } = await supabase
    .from("favoritesnew")
    .select()
    .eq("user_id", user.id)
    .eq("restaurant_id", restaurantId)
    .single();

  if (existingFavorite) {
    // Remove from favorites
    const { error } = await supabase
      .from("favoritesnew")
      .delete()
      .eq("user_id", user.id)
      .eq("restaurant_id", restaurantId);

    if (error) {
      return { error: "Failed to remove from favorites" };
    }
    return { success: true, isFavorited: false };
  } else {
    // Add to favorites
    const { error } = await supabase.from("favoritesnew").insert({
      user_id: user.id,
      restaurant_id: restaurantId,
    });

    // const { data: restaurant } = await supabase
    //   .from("restaurantsnew")
    //   .select("fav_count")
    //   .eq("id", parseInt(restaurantId))
    //   .single();

    // if (restaurant) {
    //   const count = Number(restaurant.fav_count) + 1;
    //   const { error: updateError, data: asd } = await supabase
    //     .from("restaurantsnew")
    //     .update({ fav_count: count.toString() })
    //     .eq("id", parseInt(restaurantId));

    //   if (updateError) {
    //     return { error: "Failed to add to favorites" };
    //   }
    // }

    if (error) {
      return { error: error.message };
    }
    return { success: true, isFavorited: true };
  }
}

export async function getFavoriteStatuses(restaurantIds: number[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {};
  }

  const { data: favorites } = await supabase
    .from("favoritesnew")
    .select("restaurant_id")
    .eq("user_id", user.id)
    .in("restaurant_id", restaurantIds);

  const favoriteMap: Record<number, boolean> = {};
  restaurantIds.forEach((id) => {
    favoriteMap[id] = false;
  });

  favorites?.forEach((favorite) => {
    favoriteMap[favorite.restaurant_id] = true;
  });

  return favoriteMap;
}

// Keep this for backward compatibility and single restaurant checks
export async function getFavoriteStatus(restaurantId: string) {
  const statuses = await getFavoriteStatuses([parseInt(restaurantId)]);
  return statuses[parseInt(restaurantId)] || false;
}
