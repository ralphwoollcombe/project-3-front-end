import { useParams, Link } from "react-router-dom";
import * as questService from '../services/questService.js'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const QuestDetails = (props) => {
    const [quest, setQuest] = useState(null);
    const {questId, userId} = useParams();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const questData = await questService.show(userId, questId)
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

    const renderStars = (rating) => {
        return "⭐".repeat(rating);
        };

    return (
        <main>
            <h1>My quest through {quest.country?.name}</h1>

            <section key={quest.general}>
                <h2>General:</h2>
                <p>{quest.general}</p>
            </section>

            {mainSections.map(([name, data]) => (
            <section key={name}>
                <h2>{name}</h2>
                <div>
                    <h3>Review:</h3>
                    <p>{data.review}</p>
                    <p>{renderStars(data.rating)}</p>
                </div>
                <div>
                    <h3>Story:</h3>
                    <p>{data.story}</p>
                </div>
            </section>
            ))}
            {userId === user._id && 
            <>
            <Link to={`/users/${userId}/quests/${quest._id}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteQuest(questId)}>Delete</button>
            </>
            }
        </main>
    )
}

export default QuestDetails