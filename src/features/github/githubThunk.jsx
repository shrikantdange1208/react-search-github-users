import axios from 'axios'
import { toast } from 'react-toastify'
import { getRequestsInfo, toggleError } from './githubSlice'

const rootUrl = 'https://api.github.com'
const rootUrl1 = 'https://api.github.co'

export const getRequestsInfoThunk = async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${rootUrl}/rate_limit`)
    const data = response.data
    if (data.rate.remaining === 0) {
      thunkAPI.dispatch(
        toggleError({
          show: true,
          msg: 'sorry, you have exceeded your hourly rate limit!',
        })
      )
    }
    return data.rate.remaining
  } catch (error) {
    console.error('Error occurred while retrieving data from github')
  }
}

export const getGithubUserThunk = async (user, thunkAPI) => {
  try {
    console.log(`search for user ${user}`)
    thunkAPI.dispatch(toggleError({ show: false, msg: '' }))
    const response = await axios.get(`${rootUrl}/users/${user}`)
    const userData = response.data
    const { login, followers_url, repos_url } = userData
    const repos = await getGithubUserRepos(login, repos_url)
    const followers = await getGithubUserFollowers(login, followers_url)
    userData['repos'] = repos
    userData['githubFollowers'] = followers
    thunkAPI.dispatch(getRequestsInfo())
    return userData
  } catch (error) {
    console.log(`Error response code ${error.response.status}`)
    console.log(`Error message ${error.message}`)
    if (error.response.status === 404) {
      thunkAPI.dispatch(
        toggleError({
          show: true,
          msg: `There is no user with username ${user}`,
        })
      )
    }
    return thunkAPI.rejectWithValue(`There is no user with username ${user}`)
  }
}

export const getGithubUserRepos = async (user, repos_url) => {
  console.log(`get repos for user ${user}`)
  try {
    const response = await axios.get(`${repos_url}?per_page=100`)
    const repos = response.data
    return repos
  } catch (error) {
    console.log(`Error response code ${error.response.status}`)
    console.log(`Error message ${error.message}`)
  }
}

export const getGithubUserFollowers = async (user, followers_url, thunkAPI) => {
  console.log(`get followers for user ${user}`)
  try {
    const response = await axios.get(`${followers_url}?per_page=100`)
    const followers = response.data
    return followers
  } catch (error) {
    console.log(`Error response code ${error.response.status}`)
    console.log(`Error message ${error.message}`)
  }
}
