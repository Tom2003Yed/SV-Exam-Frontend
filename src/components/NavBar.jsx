import { NavLink } from 'react-router-dom'

function NavBar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-white ${isActive ? 'bg-neutral-800' : ''}`

  return (
    <aside className="w-64 min-h-screen bg-black p-4 flex flex-col">
      <h1 className="text-white font-bold text-lg mb-6 px-2">Watchlist</h1>

      <NavLink to="/" end className={linkClass}>All Movies</NavLink>
      <NavLink to="/add-movie" className={linkClass}>Add New Movie</NavLink>
      <NavLink to="/search-movies" className={linkClass}>Search Movie</NavLink>

      <p className="mt-auto text-xs text-neutral-600 px-2">Your personal movie tracker</p>
    </aside>
  )
}

export default NavBar
