import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar'
import AllMovies from './components/AllMovies'
import AddMovie from './components/AddMovie'
import SearchMovie from './components/SearchMovie'
import { AppContext } from './AppContext'

function App() {
  const [movies, setMovies] = useState([])

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ movies, setMovies }}>
        <div className="flex min-h-screen flex-col md:flex-row">
          <NavBar />

          <main className="flex-1 bg-neutral-100 p-4 md:p-8">
            <Routes>
              <Route path="/" element={<AllMovies />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/search-movies" element={<SearchMovie />} />
            </Routes>
          </main>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
