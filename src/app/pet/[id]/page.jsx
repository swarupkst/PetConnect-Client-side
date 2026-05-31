import PetDetails from "./PetDetails";
import PrivateRoute from "@/components/PrivateRoute";

async function getPet(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function PetDetailsPage({ params }) {
  const { id } = await params; // ✅ FIX HERE

  const pet = await getPet(id);

  if (!pet) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Pet not found 🐾
        </h2>
      </div>
    );
  }

  return ( 
    <PrivateRoute> <PetDetails pet={pet} /></PrivateRoute>
  );
 
}