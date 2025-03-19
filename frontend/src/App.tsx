import { useState } from 'react'
import './App.css'
import WatchList from './components/Watchlist'

const App: React.FC = () => {

  return (
    <>
      <h1>FinSight</h1>
      <WatchList />
    </>
  )
}

export default App
