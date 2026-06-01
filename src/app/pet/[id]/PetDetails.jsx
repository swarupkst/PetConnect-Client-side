"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

export default function PetDetails({ pet }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  // delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState(null);
  const isOwner = session?.user?.email === pet.ownerEmail;

  // Loading
  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-600">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  // CHECK REQUEST
  useEffect(() => {
    const checkRequest = async () => {
      if (!session?.user) return;

      try {
        const res = await fetch(
          `http://localhost:5000/adoptions?email=${session.user.email}`
        );

        const data = await res.json();

        const existing = data.find((req) => req.petId === pet._id);

        if (existing) {
          setIsRequested(true);
          setAdoptionStatus(existing.status); // 👈 ADD THIS
        } else {
          setIsRequested(false);
          setAdoptionStatus(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkRequest();
  }, [session?.user?.email, pet._id]);

  // ADOPT OPEN
  const handleAdopt = () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  // ADOPTION SUBMIT
  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const adoptionData = {
      petId: pet._id,
      petName: pet.petName,
      adopterName: session?.user?.name,
      adopterEmail: session?.user?.email,
      ownerEmail: pet.ownerEmail,
      pickupDate: form.pickupDate.value,
      message: form.message.value,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Adoption request submitted!");
        setIsModalOpen(false);
        setIsRequested(true);
        setAdoptionStatus("pending"); // 👈 ADD THIS
        form.reset();
      } else {
        toast.error("Failed to submit request");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/pets/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Pet deleted successfully");
        setIsDeleteModalOpen(false);
        router.push("/all-pets");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-20">
      {/* BACK */}
      <Link href="/all-pets" className="mb-5 text-black font-medium">
        ← Back to All Pets
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-5">
        {/* IMAGE */}
        <div className="relative w-full h-[400px]">
          <Image
            src={pet.image}
            alt={pet.petName}
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-orange-600">
            {pet.petName}
          </h1>

          <div className="space-y-2 text-gray-700">
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Health:</strong> {pet.healthStatus}</p>
            <p><strong>Location:</strong> {pet.location}</p>
            <p><strong>Fee:</strong> ${pet.adoptionFee}</p>
          </div>

          <p className="mt-6 text-gray-600">{pet.description}</p>

          {/* BUTTONS */}
          <div className="mt-8">
            {isOwner ? (
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    router.push(`/dashboard/edit/${pet._id}`)
                  }
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(pet._id)}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
  onClick={handleAdopt}
  disabled={isRequested && adoptionStatus !== "rejected"}
  className={`mt-6 px-8 py-3 rounded-xl cursor-pointer ${
    adoptionStatus === "approved"
      ? "bg-green-500 text-white cursor-not-allowed"
      : isRequested
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-orange-500 text-white"
  }`}
>
  {adoptionStatus === "approved"
    ? "Adopted"
    : isRequested
    ? "Requested"
    : "Adopt Now"}
</button>
            )}
          </div>
        </div>
      </div>

      {/* ADOPTION MODAL */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-2xl font-bold mb-4">
              Adoption Request
            </h3>

            <form onSubmit={handleAdoptionSubmit} className="space-y-3">
              <input value={pet.petName} readOnly className="input w-full" />
              <input value={session?.user?.name || ""} readOnly className="input w-full" />
              <input value={session?.user?.email || ""} readOnly className="input w-full" />

              <input type="date" name="pickupDate" required className="input w-full" />
              <textarea name="message" required className="textarea w-full" />

              <button className="btn bg-orange-500 text-white w-full">
                Submit
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

      {/* DELETE CONFIRM MODAL */}
      {isDeleteModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold text-red-500">
              Confirm Delete
            </h3>

            <p className="py-4 text-gray-600">
              Are you sure you want to delete this pet? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="btn bg-red-500 text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </dialog>
      )}
    </div>
  );
}