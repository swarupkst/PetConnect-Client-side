"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

export default function PetDetails({ pet }) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
const [isModalOpen, setIsModalOpen] = useState(false);
  // Loading Spinner
  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-600">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }
const handleAdoptionSubmit = async (e) => {
  e.preventDefault();

  toast.success("Adoption request submitted!");
  setIsModalOpen(false);
};
  const handleAdopt = () => {
  if (!session?.user) {
    router.push("/login");
    return;
  }

  setIsModalOpen(true);
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-20">
      <div className="flex justify-start">
        <Link
          href="/all-pets"
          className="
            inline-flex items-center
            px-2 mb-5
            text-black
            font-medium
            rounded-lg
            transition-all duration-300
            hover:bg-blue-200
            hover:shadow-lg
          "
        >
          ← Back to All Pets
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[400px]">
          <Image
            src={pet.image}
            alt={pet.petName}
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-orange-600">
            {pet.petName}
          </h1>

          <div className="space-y-3 text-gray-700">
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Health Status:</strong> {pet.healthStatus}</p>
            <p><strong>Vaccination Status:</strong> {pet.vaccinationStatus}</p>
            <p><strong>Location:</strong> {pet.location}</p>
            <p><strong>Adoption Fee:</strong> ${pet.adoptionFee}</p>
            <p><strong>Owner Email:</strong> {pet.ownerEmail}</p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Description
            </h3>
            <p className="text-gray-600">
              {pet.description}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleAdopt}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Adopt Now
          </button>
        </div>
      </div>


{isModalOpen && (
  <dialog className="modal modal-open">
    <div className="modal-box max-w-lg">

      <h3 className="font-bold text-2xl mb-6 text-orange-500">
        Adoption Request
      </h3>

      <form
        onSubmit={handleAdoptionSubmit}
        className="space-y-4"
      >
        {/* Pet Name */}
        <div>
          <label className="label">
            <span className="label-text">Pet Name</span>
          </label>

          <input
            type="text"
            value={pet.petName}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-xl text-black"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="label">
            <span className="label-text">User Name</span>
          </label>

          <input
            type="text"
            value={session?.user?.name || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-xl text-black"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="label">
            <span className="label-text">User Email</span>
          </label>

          <input
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-xl text-black"
          />
        </div>

        {/* Pickup Date */}
        <div>
          <label className="label">
            <span className="label-text">Pickup Date</span>
          </label>

          <input
            type="date"
            name="pickupDate"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Message */}
        <div>
          <label className="label">
            <span className="label-text">Message</span>
          </label>

          <textarea
            name="message"
            rows="4"
            required
            className="textarea textarea-bordered w-full"
            placeholder="Why do you want to adopt this pet?"
          />
        </div>

        <button
          type="submit"
          className="btn bg-orange-500 hover:bg-orange-600 text-white w-full"
        >
          Submit Request
        </button>
      </form>

      <div className="modal-action">
        <button
          onClick={() => setIsModalOpen(false)}
          className="btn"
        >
          Close
        </button>
      </div>

    </div>

    <div
      className="modal-backdrop"
      onClick={() => setIsModalOpen(false)}
    />
  </dialog>
)}

    </div>
  );
}