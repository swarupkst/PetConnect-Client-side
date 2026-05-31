"use client";

import { useEffect, useState } from "react";
import PetsHeader from "./PetsHeader";
import PetsSearchFilter from "./PetsSearchFilter";
import PetsResultsCount from "./PetsResultsCount";
import PetsGrid from "./PetsGrid";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destination`
        );

        const data = await res.json();

        setPets(data);
        setFilteredPets(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setPets([]);
        setFilteredPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    let filtered = [...pets];

    if (searchTerm) {
      filtered = filtered.filter((pet) =>
        pet.petName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (speciesFilter !== "All") {
      filtered = filtered.filter(
        (pet) => pet.species === speciesFilter
      );
    }

    setFilteredPets(filtered);
  }, [searchTerm, speciesFilter, pets]);

  const speciesList = [
    "All",
    ...new Set(pets.map((pet) => pet.species)),
  ];

  // ✅ IMPORTANT: loading UI here (best place)
 

  return (
    <div className="container mx-auto px-4 py-10 pt-20 ">
      <PetsHeader />

      <PetsSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        speciesList={speciesList}
      />

      <PetsResultsCount count={filteredPets.length} />

      <PetsGrid pets={filteredPets} />
    </div>
  );
}