import Link from "next/link";

export default function PetsGrid({ pets = [], loading }) {
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
        {pets?.map((pet) => (
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
              <h2 className="text-2xl font-bold text-black">{pet.petName}</h2>

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

      {pets.length === 0 && !loading && (
        <div className="min-h-screen flex justify-center items-center text-red-600">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      )}
    </>
  );
}