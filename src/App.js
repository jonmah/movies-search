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

  return (
    <div className='App'>
      <Header text='HOOKED' />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favourite movies</p>
      <div className='movies'>
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
