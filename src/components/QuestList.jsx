import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './QuestList.module.css';
import worldMap from '../assets/world.png'; 

const QuestList = (props) => {
  console.log("quests", props.quests);
  const { userId } = useParams();

  const norm = (s) =>
    (s || '').toLowerCase().trim().replace(/\s+/g, '-');

  const europe = props.quests?.filter(q => norm(q.continent) === "europe");
  const asia = props.quests?.filter(q => norm(q.continent) === "asia");
  const africa = props.quests?.filter(q => norm(q.continent) === "africa");
  const northAmerica = props.quests?.filter(
    q => norm(q.continent) === "north-america" || norm(q.continent) === "americas"
  );
  const southAmerica = props.quests?.filter(q => norm(q.continent) === "south-america");
  const oceania = props.quests?.filter(q => norm(q.continent) === "oceania");

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>MY QUESTS</h1>

      <div
        className={styles.map}
        style={{ backgroundImage: `url(${worldMap})` }}
      >
        <div className={`${styles.zone} ${styles.europe}`}>
          {europe?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.zone} ${styles.asia}`}>
          {asia?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.zone} ${styles.africa}`}>
          {africa?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.zone} ${styles.northAmerica}`}>
          {northAmerica?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.zone} ${styles.southAmerica}`}>
          {southAmerica?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.zone} ${styles.oceania}`}>
          {oceania?.map(q => (
            <Link
              key={q._id}
              to={`/users/${userId}/quests/${q._id}`}
              className={styles.tag}
            >
              {q.country.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default QuestList;
