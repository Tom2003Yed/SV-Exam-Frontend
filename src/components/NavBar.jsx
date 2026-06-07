import { NavLink } from 'react-router-dom'

function NavBar() {
  const linkClass = ({ isActive }) =>
    `block whitespace-nowrap px-4 py-3 rounded-lg text-white text-sm md:text-base ${isActive ? 'bg-neutral-800' : ''}`

  return (
    <aside className="flex w-full flex-col bg-black p-4 md:w-64 md:min-h-screen">
      <h1 className="mb-4 px-2 text-lg font-bold text-white md:mb-6">Watchlist</h1>

      <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        <NavLink to="/" end className={linkClass}>All Movies</NavLink>
        <NavLink to="/add-movie" className={linkClass}>Add New Movie</NavLink>
        <NavLink to="/search-movies" className={linkClass}>Search Movie</NavLink>
      </nav>

      <p className="mt-4 hidden px-2 text-xs text-neutral-600 md:mt-auto md:block">
        Your personal movie tracker
      </p>
    </aside>
  )
}

export default NavBar
