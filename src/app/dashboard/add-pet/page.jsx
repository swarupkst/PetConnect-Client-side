"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client"; // Adjust path if needed

export default function AddPet() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
    ownerEmail: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const petData = {
        ...form,
        ownerEmail: session?.user?.email || "",
      };

      const res = await fetch("http://localhost:5000/destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success("Pet added successfully");
        router.push("/dashboard/listings");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Add a Pet for Adoption
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Pet Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Pet Name
              </label>
              <input
                type="text"
                name="petName"
                value={form.petName}
                onChange={handleChange}
                placeholder="Enter pet name"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Species */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Species
              </label>
              <select
                name="species"
                value={form.species}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Breed
              </label>
              <input
                type="text"
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="Enter breed"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Age (Years)
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Pet age"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Health Status */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Health Status
              </label>
              <select
                name="healthStatus"
                value={form.healthStatus}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Status</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Needs Care">Needs Care</option>
              </select>
            </div>

            {/* Vaccination */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vaccination Status
              </label>
              <select
                name="vaccinationStatus"
                value={form.vaccinationStatus}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Status</option>
                <option value="Vaccinated">Vaccinated</option>
                <option value="Partially Vaccinated">
                  Partially Vaccinated
                </option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Pet location"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Adoption Fee */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Adoption Fee
              </label>
              <input
                type="number"
                name="adoptionFee"
                value={form.adoptionFee}
                onChange={handleChange}
                placeholder="Enter fee"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Owner Email */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Owner Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write details about the pet..."
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            {loading ? "Adding Pet..." : "Add Pet"}
          </button>
        </form>
      </div>
    </div>
  );
}