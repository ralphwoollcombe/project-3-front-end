import { useParams } from "react-router-dom";
import * as questService from '../services/questService.js'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const QuestDetails = () => {
    const [quest, setQuest] = useState(null);
    const {questId} = useParams();
    const {user} = useContext(AuthContext);
    const mainSections = Object.entries(quest).filter()

    useEffect(() => {
        const fetchQuest = async () => {
            const questData = await questService.show(user._id, questId)
            setQuest(questData)
        }
        fetchQuest();
    })
    return (
        <main>
            <title>My quest through {quest.country.name}</title>
            <section>
                
            </section>
            {quest}
        </main>
    )
}

export default QuestDetails