import { useContext, useState } from 'react'
import { AppContext } from '../AppContext'

function AddMovie() {
  const { setMovies } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedGenre = genre.trim()

    if (!trimmedTitle) {
      alert('שם הסרט חובה - לפחות תו אחד')
      return
    }
    if (trimmedTitle.length > 20) {
      alert('שם הסרט יכול להיות עד 20 תווים')
      return
    }
    if (!trimmedGenre) {
      alert('ז׳אנר חובה - לפחות תו אחד')
      return
    }
    if (description.length > 200) {
      alert('תיאור הסרט יכול להיות עד 200 תווים')
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: trimmedTitle,
          genre: trimmedGenre,
          description,
        }),
      })
      const newMovie = await res.json()
      setMovies((prev) => [...prev, newMovie])
      setTitle('')
      setGenre('')
      setDescription('')
    } catch (err) {
      console.log('Error:', err)
      alert('שגיאה בהוספת הסרט')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Add New Movie</h1>
      <p className="mt-1 mb-8 text-neutral-500">
        Fill in the details to add a movie to your watchlist.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-neutral-900">Movie Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Matrix"
            maxLength={20}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-900 outline-none focus:border-neutral-400"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-neutral-900">Genre</span>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Sci-Fi"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-900 outline-none focus:border-neutral-400"
          />
        </label>

        <label className="mb-8 block">
          <span className="mb-2 block text-sm font-semibold text-neutral-900">Short Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary of the movie..."
            maxLength={200}
            rows={4}
            className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-neutral-900 outline-none focus:border-neutral-400"
          />
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Movie
        </button>
      </form>
    </div>
  )
}

export default AddMovie
