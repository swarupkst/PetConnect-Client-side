"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/adoptions");
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Update Status
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
          <thead>
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
              <tr key={req._id}>
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
                  <button
                    onClick={() =>
                      updateStatus(req._id, "approved")
                    }
                    className="btn btn-sm bg-green-500 text-white"
                    disabled={req.status === "approved"}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(req._id, "rejected")
                    }
                    className="btn btn-sm bg-red-500 text-white"
                    disabled={req.status === "rejected"}
                  >
                    Reject
                  </button>
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