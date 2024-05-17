import React from "react"
import Home from "./home.jsx"
import { Route, Routes } from "react-router-dom"


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:numero' element={<Home />} />
    </Routes>
  )
}
