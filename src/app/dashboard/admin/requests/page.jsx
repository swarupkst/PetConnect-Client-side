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
      const res = await fetch(`http://localhost:5000/adoptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`Marked as ${status}`);

        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
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
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8 pt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-500">
        Admin Panel - Adoption Requests
      </h1>

      {/* ================= TABLE (DESKTOP ONLY) ================= */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full min-w-[650px]">
          <thead className="text-black">
            <tr>
              <th>Pet</th>
              <th>User</th>
              <th>Pickup Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {requests.map((req) => (
              <tr key={req._id} className="text-black">
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
                <td>
                  <div className="flex gap-2">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= TABLET CARDS ================= */}
      <div className="hidden sm:block lg:hidden space-y-5">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-lg rounded-2xl p-6 border"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl text-black font-semibold">{req.petName}</h2>

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

            <div className="space-y-1 text-gray-600 text-sm">
              <p>
                <span className="font-medium">User:</span>{" "}
                {req.adopterEmail}
              </p>
              <p>
                <span className="font-medium">Pickup:</span>{" "}
                {req.pickupDate}
              </p>
            </div>

            <div className="mt-4 flex gap-3">
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
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow rounded-xl p-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-black text-xl">{req.petName}</h2>

              <span
                className={`px-2 py-1 rounded-full text-xs ${
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

            <p className="text-sm text-gray-600">
              <span className="font-medium">User:</span>{" "}
              {req.adopterEmail}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Pickup:</span>{" "}
              {req.pickupDate}
            </p>

            <div className="flex gap-2 flex-wrap">
              {req.status === "pending" ? (
                <>
                  <button
                    onClick={() => updateStatus(req._id, "approved")}
                    className="btn btn-xs border-none bg-green-500 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(req._id, "rejected")}
                    className="btn btn-xs border-none bg-red-500 text-white"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-xs">
                  Finalized
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}