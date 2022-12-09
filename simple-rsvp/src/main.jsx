import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { EventContextProvider } from './context/EventContext'
import { UserContextProvider } from './context/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContextProvider>
            <EventContextProvider>
                <Router>
                    <App />
                </Router>
            </EventContextProvider>
        </UserContextProvider>
    </React.StrictMode>
)
