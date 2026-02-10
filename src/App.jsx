import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'

import Countries from './components/Countries/Countries'

import QuestList from './components/QuestList'
import QuestForm from './components/QuestForm'

import * as questService from './services/questService';
import { AuthContext } from './contexts/AuthContext';


const App = () => {
  const {user} = useContext(AuthContext);
  const [quests, setQuests] = useState([]);
  const navigate = useNavigate();

  const addQuest = async (questFormData) => {
    const newQuest = await questService.create(questFormData)
    setQuests([...quests, newQuest])
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
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<SignOut />} />

        <Route path="/countries" element={<Countries />} />

        <Route path="/users/:userId/quests" element={<QuestList quests={quests} />} />
        <Route path="/quests/new" element={<QuestForm addQuest={addQuest} />} />
      </Routes>
    </>
  )
}

export default App
