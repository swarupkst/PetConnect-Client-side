"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH WISHLIST
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.user) return;

      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/wishlist?email=${session.user.email}`
        );

        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [session?.user?.email]);

  // REMOVE FROM WISHLIST
  const removeFromWishlist = async (petId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/wishlist/${petId}?email=${session.user.email}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setWishlist((prev) => prev.filter((item) => item.petId !== petId));
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          ❤️ My Wishlist
        </h1>
        <p className="text-gray-500 mt-2">
          Pets you saved for later adoption
        </p>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No pets in wishlist
          </h2>
          <p className="text-gray-500 mt-2">
            Start exploring pets and add them to your wishlist ❤️
          </p>

          <Link
            href="/all-pets"
            className="inline-block mt-5 bg-orange-500 text-white px-6 py-3 rounded-xl"
          >
            Browse Pets
          </Link>
        </div>
      ) : (
        // GRID
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.petName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {item.petName}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Saved for adoption
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/pet/${item.petId}`}
                    className="flex-1 bg-orange-500 text-white text-center py-2 rounded-xl"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(item.petId)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}