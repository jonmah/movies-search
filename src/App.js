import React, { useState, useEffect } from 'react'
import './App.css'
import { getSearch } from './api/omdb'
import { Header, Movie, Search } from './components'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getSearch('man').then(r => {
      setMovies(r.Search)
      setLoading(false)
    })
  }, [])

  const search = searchValue => {
    setLoading(true)
    setErrorMessage(null)

    getSearch(searchValue).then(r => {
      if (r.Error) {
        setErrorMessage(r.Error)
      } else {
        setMovies(r.Search)
      }
      setLoading(false)
    })
  }

  const renderErrorMessage = errorMessage =>
    errorMessage && <div className='errorMessage'>{errorMessage}</div>
  const renderLoading = loading => errorMessage =>
    loading && !errorMessage && <span>loading...</span>
  const renderMovies = A => loading => errorMessage =>
    !loading &&
    !errorMessage &&
    A.map((movie, index) => (
      <Movie key={`${index}-${movie.Title}`} movie={movie} />
    ))

  return (
    <div className='App'>
      <Header text='HOOKED' />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favourite movies</p>
      <div className='movies'>
        {renderLoading(loading)(errorMessage)}
        {renderErrorMessage(errorMessage)}
        {renderMovies(movies)(loading)(errorMessage)}
      </div>
    </div>
  )
}

export default App
