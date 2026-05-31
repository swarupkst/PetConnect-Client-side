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

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.replace("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Pet", path: "/dashboard/add-pet" },
    { name: "My Listings", path: "/dashboard/listings" },
    { name: "My Requests", path: "/dashboard/requests" },
  ];

  return (
    <div className="min-h-screen bg-orange-50 pt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 lg:min-h-screen bg-white border-b lg:border-b-0 lg:border-r shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-orange-500">
              PetConnect
            </h2>

            <p className="text-sm text-gray-500 mt-2 break-all">
              {session?.user?.email}
            </p>
          </div>

          <nav className="p-4 flex flex-wrap lg:block gap-2 lg:space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex-1 lg:block text-center px-4 py-3 rounded-xl transition min-w-[140px] ${
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

        {/* Main */}
        <main className="flex-1 min-w-0">
          <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Dashboard
              </h1>

              <p className="text-sm text-gray-500">
                Manage your pets and adoption requests
              </p>
            </div>

            {/* Logout Button (Optional) */}
            {/* 
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
            >
              Logout
            </button> 
            */}
          </header>

          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}