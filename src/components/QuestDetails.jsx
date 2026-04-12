import { useParams, Link } from "react-router-dom";
import * as questService from '../services/questService.js'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from './QuestDetails.module.css'

const QuestDetails = (props) => {
    const [quest, setQuest] = useState(null);
    const [error, setError] = useState('');
    const [openSection, setOpenSection] = useState(null);
    const { questId, userId } = useParams();
    const { user } = useContext(AuthContext);

    const toggleSection = (name) => {
        setOpenSection(openSection === name ? null : name);
    };

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                setError('')
                const questData = userId
                    ? await questService.show(userId, questId)
                    : await questService.showQuest(questId)

                setQuest(questData)
            } catch (error) {
                console.log(error)
                setError(error.message || 'Something went wrong')
            }
        }
        fetchQuest()
    }, [questId, userId])

    if (error) return <p>{error}</p>
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
        <main className={styles.container}>
            <div className={styles.contentWrapper}>
                
                <div className={styles.header}>
                    <section className={styles.headerTitle}>
                        {userId === quest.author._id ? (
                        <h1>My quest through {quest.country?.name}</h1>
                        ):(
                        <h1>A quest through {quest.country?.name}</h1>
                        )}
                    </section>
                    <section className={styles.generalCard}>
                        <div>
                            <h2>General</h2>
                            <p>{quest.general}</p>
                        </div>
                    </section>
                </div>
            
                <div className={styles.grid}>
                    {mainSections.map(([name, data]) => {
                        const isOpen = openSection === name;
                        return (
                            <section 
                                key={name} 
                                className={`${styles.card} ${styles[name]} ${isOpen ? styles.cardOpen : ''}`}
                            >
                                <h2>{name}</h2>
                                
                                <div className={styles.reviewRow}>
                                    <strong>Review:</strong>
                                    <p>{data.review}</p>
                                    <span>{renderStars(data.rating)}</span>
                                </div>

                                <div className={styles.storyBlock}>
                                    <div 
                                        className={styles.storyToggle}
                                        onClick={()=> toggleSection(name)}
                                    >
                                        {isOpen ? 'Close Story ▲' : 'Read Story ▼'}
                                    </div>
                                    
                                    {isOpen && (
                                        <div className={styles.storyContent}>
                                            <p>{data.story}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )
                    })}
                </div>
                {quest.author?._id === user._id &&
                    <div className={styles.actionButtons}>
                        <Link className={styles.editBtn} to={`/users/${userId}/quests/${quest._id}/edit`}>Edit Quest</Link>
                        <button className={styles.deleteBtn} onClick={() => props.handleDeleteQuest(questId)}>Delete Quest</button>
                    </div>
                }
            </div>
        </main>
    )
}

export default QuestDetails