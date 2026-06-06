"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EditPet() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  });

  // FETCH EXISTING DATA
  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/destination/${id}`
        );

        const data = await res.json();

        setForm({
          petName: data.petName || "",
          species: data.species || "",
          breed: data.breed || "",
          age: data.age || "",
          gender: data.gender || "",
          image: data.image || "",
          healthStatus: data.healthStatus || "",
          vaccinationStatus: data.vaccinationStatus || "",
          location: data.location || "",
          adoptionFee: data.adoptionFee || "",
          description: data.description || "",
        });
      } catch (error) {
        toast.error("Failed to load pet data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPet();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(
        `http://localhost:5000/destination/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Pet updated successfully");

        setTimeout(() => {
          router.push("/dashboard/listings");
        }, 1000);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // DELETE


  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10 pt-24">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Edit Pet
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Species</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
                <option>Bird</option>
                <option>Other</option>
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Health */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Health Status
              </label>
              <select
                name="healthStatus"
                value={form.healthStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Needs Care</option>
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option>Vaccinated</option>
                <option>Partially Vaccinated</option>
                <option>Not Vaccinated</option>
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Adoption Fee
              </label>
              <input
                type="number"
                name="adoptionFee"
                value={form.adoptionFee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              {saving ? "Updating..." : "Update Pet"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard/listings")}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}