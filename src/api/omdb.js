import axios from 'axios'

export const apiKey = '4a3b711b'
export const baseUrl = 'https://www.omdbapi.com/'
export const searchUrl = searchString =>
  `${baseUrl}?s=${searchString}&apiKey=${apiKey}`

export const getSearch = async searchValue => {
  const result = await axios.get(searchUrl(searchValue))
  return result.data
}
