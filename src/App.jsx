
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'

import Countries from './components/Countries/Countries'
import Continent from './components/Countries/Continent'
import CountryQuests from './components/Countries/CountryQuests'

import Landing from './components/Landing'

import QuestList from './components/QuestList'
import QuestForm from './components/QuestForm'
import QuestDetails from './components/QuestDetails'

import * as questService from './services/questService'
import * as countryService from './services/countryService'
import { AuthContext } from './contexts/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)
  const [quests, setQuests] = useState([])
  const [countries, setCountries] = useState([])
  const navigate = useNavigate()

  const addQuest = async (questFormData) => {
    const newQuest = await questService.create(questFormData, user._id)
    setQuests([...quests, newQuest])
    navigate('/countries')
  }

  const handleDeleteQuest = async (questId) => {
    await questService.deleteQuest(user._id, questId)
    setQuests(quests.filter((q) => q._id !== questId))
    navigate('/countries')
  }

  const handleUpdateQuest = async (questId, questFormData) => {
    const updatedQuest = await questService.updateQuest(user._id, questId, questFormData)
    setQuests(quests.map((q) => (q._id === questId ? updatedQuest : q)))
    navigate('/countries')
  }

  useEffect(() => {
    const fetchQuests = async () => {
      if (user) {
        const questData = await questService.index(user._id)
        setQuests(questData)
      }
    }
    fetchQuests()
  }, [user])

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await countryService.index()
      setCountries(countryData)
    }
    fetchCountries()
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={user ? <Navigate to="/countries" replace /> : <SignIn />} />
        <Route path="/sign-up" element={user ? <Navigate to="/countries" replace /> : <SignUp />} />
        <Route path="/sign-out" element={user ? <SignOut /> : <Navigate to="/" replace />} />

        <Route path="/countries" element={user ? <Countries /> : <Navigate to="/" replace />} />
        <Route path="/countries/:continent" element={user ? <Continent /> : <Navigate to="/" replace />} />

        <Route path="/countries/:continent/:countryId" element={user ? <CountryQuests /> : <Navigate to="/" replace />} />

        <Route path="/users/:userId/quests" element={<QuestList quests={quests} />} />
        <Route path="/quests/new" element={<QuestForm addQuest={addQuest} countries={countries} />} />
        <Route path="/users/:userId/quests/:questId" element={<QuestDetails handleDeleteQuest={handleDeleteQuest} />} />
        <Route path="/users/:userId/quests/:questId/edit" element={<QuestForm handleUpdateQuest={handleUpdateQuest} countries={countries} />} />
      </Routes>
    </>
  )
}

export default App