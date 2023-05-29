import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mockUser from '../mockdata/mockUser'
import mockRepos from '../mockdata/mockRepos'
import mockFollowers from '../mockdata/mockFollowers'
import { getGithubUserThunk, getRequestsInfoThunk } from './githubThunk'
import { toast } from 'react-toastify'

const initialState = {
  isLoading: false,
  githubUser: mockUser,
  githubRepos: mockRepos,
  githubFollowers: mockFollowers,
  remainingRequests: 0,
  error: { show: false, msg: '' },
}

export const getRequestsInfo = createAsyncThunk(
  'github/getRequestsInfo',
  getRequestsInfoThunk
)

export const getGithubUser = createAsyncThunk(
  'github/getGithubUser',
  getGithubUserThunk
)

const githubSlice = createSlice({
  name: 'github',
  initialState,

  reducers: {
    toggleError: (state, { payload: { show, msg } }) => {
      state.error.show = show
      state.error.msg = msg
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequestsInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRequestsInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.remainingRequests = payload
      })
      .addCase(getRequestsInfo.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(getGithubUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGithubUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.githubUser = payload
        state.githubFollowers = payload['githubFollowers']
        state.githubRepos = payload['repos']
      })
      .addCase(getGithubUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { toggleError } = githubSlice.actions
export default githubSlice.reducer
