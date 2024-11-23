import React, { useState } from "react";
import axios from "axios";

export const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/search?q=${query}`);
      setResults(response.data);
    } catch {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch} disabled={!query}>
        Search
      </button>
      {loading && <div>Loading...</div>}
      {error && <div role="alert">{error}</div>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
