"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function AdminRequests() {
  const { data: session } = authClient.useSession();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchRequests();
    }
  }, [session]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/adoptions?ownerEmail=${session.user.email}`
      );
      const data = await res.json();

      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/adoptions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`Marked as ${status}`);

        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, status } : r
          )
        );
      } else {
        toast.error("No changes made");
      }
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Admin Panel - Adoption Requests
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead className="text-black">
            <tr>
              <th>Pet</th>
              <th>User</th>
              <th>Pickup Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr className="text-black" key={req._id}>
                <td>{req.petName}</td>
                <td>{req.adopterEmail}</td>
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
                  {req.status === "pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(req._id, "approved")}
                        className="btn btn-sm bg-green-500 text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(req._id, "rejected")}
                        className="btn btn-sm bg-red-500 text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Finalized
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No requests found
          </p>
        )}
      </div>
    </div>
  );
}