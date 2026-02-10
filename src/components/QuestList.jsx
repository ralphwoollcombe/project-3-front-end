
const QuestList = (props) => {
console.log("quests", props.quests)
    return (
        <main>
            {props.quests?.map(quest => (
            <div key={quest._id}>  
                <h2>{quest.country.name}</h2>
            </div>
            ))}
        </main>
    )
}

export default QuestList