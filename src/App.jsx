import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function getMovies() {
      try {
        const url = `${import.meta.env.VITE_BACK_URL}/movies`;

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.log('Error:', err);
      }
    }

    getMovies()
  }, [])

  const sendMessage = () => {
    debugger;
    let message = 'תן לי מתכון לעוגת גבינה ';
    if (!message.trim()) return
    fetch(`${import.meta.env.VITE_BACK_URL}/chat`, {
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

  const addMovie = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Inception', genre: 'Sci-Fi', description: 'Dream inside a dream' })
    });
    const newMovie = await res.json();
    
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };
  
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
    <>
      <button onClick={addMovie} className="bg-blue-500 p-2 m-2 block">הוסף סרט בדיקה</button>
      <hr />

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
    </>
  )
}

export default App
