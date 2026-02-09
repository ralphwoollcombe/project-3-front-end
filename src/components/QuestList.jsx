
const QuestList = (props) => {

    return (
        <main>
            {props.quests.map(quest => (
            <div>  
                <h2>{quest.country.name}</h2>
            </div>
            ))}
        </main>
    )
}

export default QuestList