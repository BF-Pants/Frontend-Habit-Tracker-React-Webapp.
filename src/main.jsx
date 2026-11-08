import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext.jsx";
import HabitContextProvider from "./context/HabitContext.jsx";
import NotesContextProvider from "./context/NotesContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <AuthContextProvider>
              <HabitContextProvider>
                  <NotesContextProvider>
                    <App />
                  </NotesContextProvider>
              </HabitContextProvider>
          </AuthContextProvider>
      </Router>
  </StrictMode>,
)
