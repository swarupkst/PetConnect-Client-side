"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function DashboardHome() {
  const { data: session } = authClient.useSession();

  const cards = [
    {
      title: "Add Pet",
      desc: "List a new pet for adoption",
      link: "/dashboard/add-pet",
      color: "bg-orange-500",
    },
    {
      title: "My Listings",
      desc: "Manage your pets",
      link: "/dashboard/listings",
      color: "bg-green-500",
    },
    {
      title: "My Requests",
      desc: "Check adoption requests",
      link: "/dashboard/requests",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 ">
      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow p-5 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your pets and adoption activity
          </p>
        </div>

        <div className="text-center md:text-right">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700">
            PetConnect Dashboard
          </h2>

          <p className="text-gray-500 text-sm">
            Control center for your pets
          </p>
        </div>
      </div>


      {/* STATS */}
      {/* <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Quick Access</h3>
          <p className="text-2xl font-bold">Dashboard</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Account Status</h3>
          <p className="text-2xl font-bold text-green-500">
            Active
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500">Role</h3>
          <p className="text-2xl font-bold text-orange-500">
            Pet Owner
          </p>
        </div>
      </div> */}

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="bg-white rounded-2xl shadow p-6 hover:scale-[1.03] transition duration-200"
          >
            <div
              className={`w-12 h-12 ${item.color} rounded-xl mb-4`}
            ></div>

            <h2 className="text-xl font-bold text-gray-800">
              {item.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.desc}
            </p>

            <p className="mt-4 text-sm text-orange-500 font-medium">
              Open →
            </p>
          </Link>
        ))}
      </div>

      {/* FOOTER SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Pet Adoption Dashboard
        </h3>

        <p className="text-gray-500 mt-2">
          Manage pets, track requests, and help animals find homes ❤️
        </p>
      </div>
    </div>
  );
}