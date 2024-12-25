import { addMenuRestaurant } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function NewMenuForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Restaurant Name</Label>
          <Input
            id="restaurant_name"
            type="text"
            name="restaurant_name"
            placeholder="Burger King"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="link">Menu Link</Label>
          <Input
            id="link"
            type="text"
            name="link"
            placeholder="https://example.com/menu"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Google Maps Link</Label>
          <Input
            id="location"
            type="text"
            name="location"
            placeholder="https://goo.gl/maps/..."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            name="category"
            placeholder="Fast Food, Cafe, etc."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Input
            id="cuisine"
            type="text"
            name="cuisine"
            placeholder="American, Italian, etc."
          />
        </div>
        <Button formAction={addMenuRestaurant} className="w-full">
          Add
        </Button>
      </div>
    </form>
  );
}
