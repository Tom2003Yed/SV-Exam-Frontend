import { useContext, useState } from 'react'
import { AppContext } from '../AppContext'

function SearchMovie() {
  const { movies } = useContext(AppContext)
  const [search, setSearch] = useState('')

  const filteredMovies = search.trim()
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Search Movies</h1>
      <p className="mt-1 mb-8 text-neutral-500">Search by movie title.</p>

      <div className="relative mb-4 max-w-3xl">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-full border border-red-300 bg-white py-3 pl-12 pr-4 text-neutral-900 outline-none focus:border-red-500"
        />
      </div>

      {search && (
        <p className="mb-6 text-sm text-neutral-500">
          {filteredMovies.length} result{filteredMovies.length !== 1 ? 's' : ''} for &apos;{search}&apos;
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="text-xl font-bold text-neutral-900">{movie.title}</h2>
              <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                {movie.genre}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchMovie
