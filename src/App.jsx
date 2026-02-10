import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'

import Countries from './components/Countries/Countries'
import Continent from './components/Countries/Continent'

import Landing from './components/Landing'

import QuestList from './components/QuestList'
import QuestForm from './components/QuestForm'

import * as questService from './services/questService';
import * as cuntryService from './services/cuntryService';
import { AuthContext } from './contexts/AuthContext';


const App = () => {
  const { user } = useContext(AuthContext);
  const [quests, setQuests] = useState([]);
  const countries = fetch
  const navigate = useNavigate();

  const addQuest = async (questFormData) => {
    const newQuest = await questService.create(questFormData, user._id)
    setQuests([...quests, newQuest])
    console.log('these are all the quests', quests)
    navigate(`/users/${user._id}/quests`)
  }

  useEffect(() => {
    const fetchQuests = async () => {
      const questData = await questService.index(user._id);
      setQuests(questData)
      console.log(quests)
    }
    if (user) {
      fetchQuests()
    }
  }, [user])

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

        <Route path="/users/:userId/quests" element={<QuestList quests={quests} />} />
        <Route path="/quests/new" element={<QuestForm addQuest={addQuest} />} />
      </Routes>
    </>
  )
}

export default App
