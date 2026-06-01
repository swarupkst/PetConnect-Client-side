"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destination`
        );

        const data = await res.json();
        setPets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex justify-center items-center text-red-400">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

  {pets.slice(0, 3).map((pet) => (
    <div
      key={pet._id}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={pet.image}
          alt={pet.petName}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          {pet.petName}
        </h3>

        <p className="text-gray-500 text-sm">
          {pet.species} • {pet.breed}
        </p>

        <p className="text-gray-400 text-sm">
          📍 {pet.location}
        </p>

        <p className="text-orange-500 font-semibold mt-1">
          Fee: ${pet.adoptionFee}
        </p>

        <Link
          href={`/pet/${pet._id}`}
          className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>

      {pets.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-red-500">
            No pets found 🐾
          </h2>
        </div>

        
      )}
      <div className="flex justify-center pt-10">
        <Link
          href="/all-pets"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full text-lg font-medium transition"
        >
          <span>View All Pets</span>
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  );
}