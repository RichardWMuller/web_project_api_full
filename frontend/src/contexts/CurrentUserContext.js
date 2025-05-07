import { createContext, useContext } from 'react'
import { useState } from 'react'

export const CurrentUserContext = createContext({})

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext)
  return context
}
