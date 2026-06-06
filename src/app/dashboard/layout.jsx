"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login first");
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Pet", path: "/dashboard/add-pet" },
    { name: "My Listings", path: "/dashboard/listings" },
    { name: "My Requests", path: "/dashboard/requests" },
  ];

  return (
    <div className="min-h-screen bg-orange-50 pt-16">

      {/* MAIN WRAPPER */}
      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR (TOP on mobile/tablet, LEFT on desktop) */}
        <aside className="w-full md:w-72 bg-white border-none md:border-b-0 md:border-r shadow-sm">

          {/* BRAND */}
          <div className="p-4 md:p-6 border-none">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500">
              PetConnect
            </h2>

            <p className="text-xs md:text-sm text-gray-500 mt-1 break-all">
              {session?.user?.email}
            </p>
          </div>

          {/* MENU */}
          <nav className="flex md:flex-col flex-row flex-wrap gap-2 md:gap-0 p-3 md:p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 md:py-3 rounded-lg md:rounded-xl transition text-sm md:text-base whitespace-nowrap ${
                  pathname === item.path
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100 text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <header className="bg-white border-none px-4 sm:px-6 md:px-8 py-5">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Manage your pets and adoption requests
            </p>
          </header>

          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </main>

      </div>
    </div>
  );
}