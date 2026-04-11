const MusicInput = ({
  mode,
  query,
  mood,
  setQuery,
  setMood,
  loading,
  onSearch,
}) => (
  <div className="flex items-center space-x-2 mb-6">
    <input
      type="text"
      placeholder={
        mode === "search"
          ? "Caută melodii, artiști..."
          : "Cum te simți azi? (ex: stresat, fericit)"
      }
      value={mode === "search" ? query : mood}
      onChange={(e) =>
        mode === "search" ? setQuery(e.target.value) : setMood(e.target.value)
      }
      className="flex-1 px-4 py-2 border border-gray-500 rounded shadow-sm bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onSearch}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {loading
        ? "Se încarcă..."
        : mode === "search"
          ? "Caută"
          : "Generează melodii"}
    </button>
  </div>
);

export default MusicInput;
