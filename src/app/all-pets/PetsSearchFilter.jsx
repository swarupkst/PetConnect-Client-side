export default function PetsSearchFilter({
  searchTerm = "",
  setSearchTerm,
  speciesFilter = "All",
  setSpeciesFilter,
  speciesList = [],
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by pet name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-600 text-white"
      />

      {/* Species Filter */}
      <select
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        className="select select-bordered w-full md:w-60 bg-gray-600 text-white"
      >
        {speciesList?.length > 0 ? (
          speciesList.map((species, index) => (
            <option key={index} value={species}>
              {species}
            </option>
          ))
        ) : (
          <option value="All">All</option>
        )}
      </select>
    </div>
  );
}