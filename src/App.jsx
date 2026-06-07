import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar'
import AllMovies from './components/AllMovies'
import AddMovie from './components/AddMovie'
import SearchMovie from './components/SearchMovie'
import { AppContext } from './AppContext'

function App() {
  const [movies, setMovies] = useState([]);

  const sendMessage = () => {
    let message = 'תן לי מתכון לעוגת גבינה ';
    if (!message.trim()) return
    fetch(`${import.meta.env.VITE_BACK_URL}/movies/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })
      .then(response => response.text())
      .then(data => {
        alert(`התשובה היא! ${data}`);
      }).catch(error => {
        console.error(error)
      })
  }

  
  
  const updateMovie = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Matrix Updated', genre: 'Action', description: 'Even better now' })
    });
    const updatedMovie = await res.json();
  
    setMovies((prevMovies) => 
      prevMovies.map((movie) => movie._id === id ? updatedMovie : movie)
    );
  };
  
  const deleteMovie = async (id) => {
    await fetch(`${import.meta.env.VITE_BACK_URL}/movies/${id}`, {
      method: 'DELETE'
    });
  
    setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
  };

  return (
    <BrowserRouter>
    <AppContext.Provider value={{ movies, setMovies }}>
    <div className="flex min-h-screen">
      <NavBar />

      <main className="flex-1 bg-neutral-100 p-8">
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/search-movies" element={<SearchMovie />} />
        </Routes>

      {movies.map(movie => {
        return (
          <div key={movie._id} className='bg-green-300 m-2 p-2'>
            <p>{movie.title}</p>
            <button onClick={() => updateMovie(movie._id)} className="bg-yellow-500 mr-2 p-1 text-sm">עדכן</button>
            <button onClick={() => deleteMovie(movie._id)} className="bg-red-500 mr-2 p-1 text-sm">מחק</button>
          </div>
        )
      })}
      
      <hr />
      <button onClick={() => sendMessage()}>לקבל מתכון עוגת גבינה בהערה</button>
      </main>
    </div>
    </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
