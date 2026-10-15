import { createContext, useContext } from 'react'

/** Set to done:true once the preloader has lifted (or was skipped). */
export const IntroContext = createContext({ done: true })

export const useIntro = () => useContext(IntroContext)
