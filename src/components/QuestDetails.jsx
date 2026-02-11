import { useParams } from "react-router-dom";
import * as questService from '../services/questService.js'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const QuestDetails = () => {
    const [quest, setQuest] = useState(null);
    const {questId} = useParams();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const questData = await questService.show(user._id, questId)
                console.log('my quest data', questData)
                setQuest(questData)
            } catch (error) {
                console.log(error)
            } 
        }
        fetchQuest();
        
    }, [questId])

    if (!quest) return <p>Loading...</p>

    const mainSections = Object.entries(quest).filter(
        ([key, value]) => 
            value &&
            typeof value === 'object' && 
            "story" in value
    )

    return (
        <main>
            <h1>My quest through {quest.country?.name}</h1>

            <section>
                <h2>General:</h2>
                <p>{quest.general}</p>
            </section>

            {mainSections.map(([name, data]) => (
            <section>
                <h2>{name}</h2>
                <div>
                    <h3>Review:</h3>
                    <p>{data.review}</p>
                </div>
                <div>
                    <h3>Rating:</h3>
                    <p>{data.rating}</p>
                </div>
                <div>
                    <h3>Story:</h3>
                    <p>{data.story}</p>
                </div>
            </section>
            ))}
        </main>
    )
}

export default QuestDetails