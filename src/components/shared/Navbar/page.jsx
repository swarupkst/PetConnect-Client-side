"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../public/asset/logo.png";
import { authClient } from "@/app/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      await refetch();

      setDropdownOpen(false);
      setIsOpen(false);

      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const closeMenus = () => {
    setDropdownOpen(false);
    setIsOpen(false);
  };

  // ✅ ACTIVE LINK STYLE HELPER
  const linkStyle = (path) =>
    pathname === path
      ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
      : "hover:text-orange-500";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 z-10"
            onClick={closeMenus}
          >
            <Image src={Logo} alt="Logo" width={55} height={55} />
            <span className="text-2xl font-bold text-orange-500">
              PetConnect
            </span>
          </Link>

          {/* MENU */}
          <div className="text-black hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            <Link href="/" onClick={closeMenus} className={linkStyle("/")}>
              Home
            </Link>

            <Link
              href="/all-pets"
              onClick={closeMenus}
              className={linkStyle("/all-pets")}
            >
              All Pets
            </Link>

            {user && (
              <>
                <Link
                  href="/dashboard/requests"
                  onClick={closeMenus}
                  className={linkStyle("/dashboard/requests")}
                >
                  My Requests
                </Link>

                <Link
                  href="/dashboard/add-pet"
                  onClick={closeMenus}
                  className={linkStyle("/dashboard/add-pet")}
                >
                  Add Pet
                </Link>
              </>
            )}
          </div>

          {/* USER */}
          <div className="hidden md:flex items-center gap-4 z-10">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  />
                </button>

                {/* DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 text-black bg-white shadow-lg rounded-lg border z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-orange-500 text-white px-5 py-2 rounded-lg"
                onClick={closeMenus}
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-orange-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-3 pb-4 text-black">
            <Link href="/" onClick={closeMenus} className={linkStyle("/")}>
              Home
            </Link>

            <Link
              href="/all-pets"
              onClick={closeMenus}
              className={linkStyle("/all-pets")}
            >
              All Pets
            </Link>

            {user && (
              <>
                <Link
                  href="/dashboard/requests"
                  onClick={closeMenus}
                  className={linkStyle("/dashboard/requests")}
                >
                  My Requests
                </Link>

                <Link
                  href="/dashboard/add-pet"
                  onClick={closeMenus}
                  className={linkStyle("/dashboard/add-pet")}
                >
                  Add Pet
                </Link>

                <Link
                  href="/dashboard"
                  onClick={closeMenus}
                  className={linkStyle("/dashboard")}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link
                href="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={closeMenus}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}