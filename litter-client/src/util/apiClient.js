import axios from 'axios'
import store from '../redux/store'

axios.defaults.baseURL =
  'https://europe-west2-litter-cf67f.cloudfunctions.net/api'

const getToken = () => {
  return store.getState().user.token
}

export const post = async (url, data) => {
  console.log(url, getToken())
  return (
    await axios.post(url, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  ).data
}
export const get = async (url) => {
  console.log(url, getToken())
  return (
    await axios.get(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  ).data
}
