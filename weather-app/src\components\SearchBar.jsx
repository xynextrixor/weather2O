import { useState } from 'react'

export default function SearchBar({ onSearch, onLocate, disabled }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <div className="search-area">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city (e.g. London, Tokyo)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
          aria-label="Search city"
        />
        <button type="submit" disabled={disabled || !query.trim()}>
          Search
        </button>
      </form>
      <button
        type="button"
        className="locate-btn"
        onClick={onLocate}
        disabled={disabled}
      >
        Use my location
      </button>
    </div>
  )
}
