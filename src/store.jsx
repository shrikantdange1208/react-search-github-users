import { configureStore } from '@reduxjs/toolkit'
import githubSlice from './features/github/githubSlice'

export const store = configureStore({
  reducer: {
    github: githubSlice,
  },
})
