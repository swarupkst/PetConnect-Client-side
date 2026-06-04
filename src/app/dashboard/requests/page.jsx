"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function MyRequests() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Private Route Protect
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending]);

  // Fetch requests
  useEffect(() => {
    if (session?.user?.email) {
      fetchRequests(false);
    }
  }, [session]);

const handleAdoptionSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  

  try {
    const res = await fetch("http://localhost:5000/adoptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptionData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message); // 👈 backend error show
      return;
    }

    toast.success("Request submitted!");
    setIsModalOpen(false);
    form.reset();
  } catch (error) {
    toast.error("Server error");
  }
};

  const fetchRequests = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/adoptions?email=${session.user.email}`
    );
    const data = await res.json();
    setRequests(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  // Cancel request
  const handleCancel = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/adoptions/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Request cancelled");
        setRequests(requests.filter((r) => r._id !== id));
      }
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        My Requests
      </h1>

      <div className="bg-white shadow rounded-xl p-4">

  {/* Desktop Table */}
  <div className="hidden md:block overflow-x-auto">
    <table className="table w-full">
      <thead className="text-black">
        <tr>
          <th>Pet Name</th>
          <th>Request Date</th>
          <th>Pickup Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className="text-black">
        {requests.map((req) => (
          <tr key={req._id}>
            <td>{req.petName}</td>

            <td>
              {new Date(req.createdAt).toLocaleDateString()}
            </td>

            <td>{req.pickupDate}</td>

            <td>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  req.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {req.status}
              </span>
            </td>

            <td className="flex gap-2">
              <Link
                href={`/pet/${req.petId}`}
                className="btn btn-sm border-none bg-blue-400 text-white"
              >
                View
              </Link>

              <button
                onClick={() => handleCancel(req._id)}
                className="btn btn-sm border-none bg-red-500 text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="md:hidden space-y-4">
    {requests.map((req) => (
      <div
        key={req._id}
        className="border rounded-xl p-4 shadow-sm"
      >
        <h2 className="font-bold text-lg text-black">
          {req.petName}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Request Date:{" "}
          {new Date(req.createdAt).toLocaleDateString()}
        </p>

        <p className="text-sm text-gray-500">
          Pickup Date: {req.pickupDate}
        </p>

        <div className="mt-3">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              req.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : req.status === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {req.status}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/pet/${req.petId}`}
            className="flex-1 btn btn-sm border-none bg-blue-400 text-white"
          >
            View
          </Link>

          <button
            onClick={() => handleCancel(req._id)}
            className="flex-1 btn btn-sm border-none bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {requests.length === 0 && (
    <p className="text-center py-10 text-gray-500">
      No adoption requests found
    </p>
  )}
</div>
    </div>
  );
}