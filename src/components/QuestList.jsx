import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

const QuestList = (props) => {
console.log("quests", props.quests)
const {userId} = useParams()

    return (
        <main>
            {props.quests?.map(quest => (
            <div key={quest._id}>  
                <Link to={`/users/${userId}/quests/${quest._id}`}><h2>{quest.country.name}</h2></Link>
            </div>
            ))}
        </main>
    )
}

export default QuestList