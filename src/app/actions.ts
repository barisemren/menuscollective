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
    .from("restaurants")
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
    .from("menus")
    .insert(menuData)
    .select()
    .single();

  if (MenuError || !createdMenu) {
    console.log("MenuError", MenuError);
    return;
  }

  // Update restaurant with menu_id
  const { error: UpdateError } = await supabase
    .from("restaurants")
    .update({ menu_id: createdMenu.id })
    .eq("id", createdRestaurant.id);

  if (UpdateError) {
    console.log("UpdateError", UpdateError);
    return;
  }
}
