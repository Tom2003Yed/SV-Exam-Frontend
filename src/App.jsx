import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      try {
        const url = `${import.meta.env.VITE_BACK_URL}/users`;

        const res = await fetch(url);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log('Error:', err);
      }
    }

    getUsers()
  }, [])

  return (
    <>
      {users.map(user => {
        return <p key={user._id}>{user.name}</p>
      })}
    </>
  )
}

export default App
