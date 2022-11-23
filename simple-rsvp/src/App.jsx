import './App.css'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './shared/Header'
import CreateEvent from './pages/Create/CreateEvent'
import NearMe from './pages/Near Me/NearMe'
import Invitations from './pages/Invitations/Invitations'
import Login from './pages/User/Login'
import Signup from './pages/User/Signup'
import Profile from './pages/User/Profile'
import EventDetail from './pages/Event/EventDetail'
function App() {
    const { setUser } = useContext(UserContext)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            console.log(foundUser)
            setUser(foundUser)
        }
    }, [])
    return (
        <div className='App'>
            <Header />
            <div className='app-container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<CreateEvent />} />
                    <Route path='/nearme' element={<NearMe />} />
                    <Route path='/invitations' element={<Invitations />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/event/:id' element={<EventDetail />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
