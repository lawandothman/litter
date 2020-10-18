import axios from 'axios'
import store from '../redux/store'

axios.defaults.baseURL =
  'https://europe-west2-litter-cf67f.cloudfunctions.net/api'

const getToken = () => {
  return store.getState().user.token
}
// Post Requests
export const post = async (url, data) => {
  return (
    await axios.post(url, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  ).data
}
// Get Requests
export const get = async (url) => {
  return (
    await axios.get(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  ).data
}
// Delete Requests
export const del = async (url) => {
  return (
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  ).data
}
