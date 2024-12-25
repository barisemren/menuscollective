import NavigationBar from "@/components/navigation-bar";
import AuthWrapper from "@/wrappers/auth-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | MenusCollective",
  description: "Collection of online menus from around the world",
};
export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="px-6 py-10">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
        <NavigationBar />
      </div>
    </AuthWrapper>
  );
}
