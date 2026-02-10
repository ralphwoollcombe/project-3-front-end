import { useParams } from "react-router";
import * as questService from '../../services/questService'
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const QuestDetails = () => {
    const [quest, setQuest] = useState(null);
    const {questId} = useParams();
    const {user} = useContext(UserContext);
    const mainSections = Object.entries(quest).filter()

    useEffect(() => {
        const fetchQuest = async () => {
            const questData = await questService.show(questId)
            setQuest(questData)
        }
        fetchQuest();
    })
    return (
        <main>
            <title>My quest through {quest.country.name}</title>
            <section>
                <
            </section>
            {quest}
        </main>
    )
}