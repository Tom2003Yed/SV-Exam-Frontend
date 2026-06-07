import { useContext, useState } from 'react'
import { AppContext } from '../AppContext'

function AddMovie() {
  const { setMovies } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedGenre = genre.trim()

    if (!trimmedTitle) {
      alert('Movie title is required - at least 1 character')
      return
    }
    if (trimmedTitle.length > 20) {
      alert('Movie title can be up to 20 characters')
      return
    }
    if (!trimmedGenre) {
      alert('Genre is required - at least 1 character')
      return
    }
    if (description.length > 200) {
      alert('Description can be up to 200 characters')
      return
    }

    setIsSubmitting(true)
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
      alert('Error adding movie')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateDescription = async () => {
    const trimmedTitle = title.trim()
    const trimmedGenre = genre.trim()

    if (!trimmedTitle || !trimmedGenre) {
      alert('Please fill in movie title and genre before generating a description')
      return
    }

    setIsGenerating(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/movies/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle, genre: trimmedGenre }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error generating description')

      setDescription((data.description || '').slice(0, 200))
    } catch (err) {
      console.log('Error:', err)
      alert(err.message || 'Error generating description')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">Add New Movie</h1>
      <p className="mt-1 mb-6 text-neutral-500 md:mb-8">
        Fill in the details to add a movie to your watchlist.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-8"
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

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={generateDescription}
            disabled={isGenerating || isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                Generate Description with AI
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={isSubmitting || isGenerating}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Movie
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie
