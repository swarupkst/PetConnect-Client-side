
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PetsGrid({ pets = [], loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9;

  // Reset page to 1 whenever pets change (search/filter fix)
  useEffect(() => {
    setCurrentPage(1);
  }, [pets]);

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;

  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Safety: if current page becomes invalid after search/filter
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPets?.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={pet.image}
              alt={pet.petName}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold text-black">
                {pet.petName}
              </h2>

              <p className="text-gray-500 mt-1">{pet.species}</p>
              <p className="text-gray-500">Breed: {pet.breed}</p>
              <p className="text-gray-500">Age: {pet.age}</p>
              <p className="text-gray-500">Location: {pet.location}</p>

              <p className="font-bold text-orange-500 mt-2">
                ${pet.adoptionFee}
              </p>

              <Link
                href={`/pet/${pet._id}`}
                className="mt-4 block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pets.length > 9 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300 cursor-pointer"
          >
            Previous
          </button>

          <span className="font-semibold">
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {pets.length === 0 && !loading && (
        <div className="min-h-screen flex justify-center items-center text-red-600">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
}
