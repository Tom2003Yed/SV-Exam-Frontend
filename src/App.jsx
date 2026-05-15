import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect( async () => {
    const res = await fetch('http://sv-exam-backend-production.up.railway.app/users');
    const data = await res.json();
    setUsers(data);
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
