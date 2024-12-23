import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore | MenusCollective",
  description: "Collection of online menus from around the world",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
