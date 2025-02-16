"use client";

import { usePathname, useRouter } from "next/navigation";

export default function NavigationBar() {
  const router = useRouter();
  const activeTab = usePathname();
  const tabs = [
    { id: "/", label: "Home" },
    { id: "/explore", label: "Explore" },
    { id: "/favorites", label: "Favorites" },
    { id: "/user", label: "User" },
  ];
  return (
    <div className="group w-min flex flex-row lg:flex-col items-start py-3 px-1 bg-muted rounded-lg fixed max-lg:bottom-5 max-lg:left-1/2  max-lg:-translate-x-1/2 lg:left-5 lg:top-1/2 lg:transform lg:-translate-y-1/2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => router?.push(tab?.id)}
          className={`${
            activeTab === tab.id
              ? "text-mc-primary"
              : "hover:text-mc-primary text-popover"
          } relative px-2.5 py-1 text-sm font-medium text-nowrap inline-flex`}
        >
          <span className="font-bold hidden lg:block">-</span>
          <span className="lg:hidden lg:group-hover:block ml-1">
            {tab?.label}
          </span>
        </button>
      ))}
    </div>
  );
}
