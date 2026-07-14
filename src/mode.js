import { createContext, useContext } from 'react'

// 'render' = the finished paper/ink page. 'blueprint' = the cyanotype
// technical-drawing twin that lives inside the lens.
export const ModeContext = createContext('render')
export const useMode = () => useContext(ModeContext)
