import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'

function AllMovies() {
  const { movies, setMovies } = useContext(AppContext)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/movies`)
        const data = await res.json()
        setMovies(data)
      } catch (err) {
        console.log('Error:', err)
      }
    }
    getMovies()
  }, [setMovies])

  const deleteMovie = async (id) => {
    setDeletingId(id)
    try {
      await fetch(`${import.meta.env.VITE_BACK_URL}/movies/${id}`, { method: 'DELETE' })
      setMovies((prev) => prev.filter((movie) => movie._id !== id))
    } catch (err) {
      console.log('Error:', err)
      alert('Error deleting movie')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">All Movies</h1>
      <p className="mt-1 mb-6 text-neutral-500 md:mb-8">
        {movies.length} movies in your watchlist
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="text-xl font-bold text-neutral-900">{movie.title}</h2>
              <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                {movie.genre}
              </span>
            </div>

            <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-600">
              {movie.description}
            </p>

            <button
              onClick={() => deleteMovie(movie._id)}
              disabled={deletingId === movie._id}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingId === movie._id ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  LOADING
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Delete Movie
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllMovies
