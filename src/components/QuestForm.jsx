import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as questService from '../services/questService'
import * as countryService from '../services/countryService'
import Continent from "./Countries/Continent";
import styles from './QuestForm.module.css'

const allColours = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'black', 'white'];
const ratingNumbers = [1,2,3,4,5]
const initialFormState = {
    general: '',
    food: {
        story: '',
        review: '',
        rating: 1
    },
    experience: {
        story: '',
        review: '',
        rating: 1
    },
    transport: {
        story: '',
        review: '',
        rating: 1
    },
    nature: {
        story: '',
        review: '',
        rating: 1
    },
    music: {
        story: '',
        review: '',
        rating: 1
    },
    colours: [],
    country: '',
    continent: ''
  }

const QuestForm = (props) => {
    const {questId, userId} = useParams()
    const [formData, setFormData] = useState(initialFormState)

    const handleSubmit = async (event) => {
        event.preventDefault();
    if (questId) {
        props.handleUpdateQuest(questId, formData)
    } else {
        await props.addQuest(formData);
    }}

    const handleChange = (event) => {
    const {name, value} = event.target
    const newValue = name.endsWith('rating') ? Number(value): value
    if (name.includes('.')) {
    const [section, field] = name.split('.');
    setFormData({...formData, 
        [section]: {...formData[section],
            [field]: newValue
        }})
      } else {
        setFormData({
             ...formData, 
             [event.target.name]: event.target.value
           })
      }
    }

    useEffect(() => {
        const fetchQuest = async () => {
            const questData = await questService.show(userId, questId)
            console.log('my quest data', questData)
            console.log(typeof questData.country)
            setFormData({
                ...questData,
                country: questData.country?._id || ''
        })
        };
        if (questId) fetchQuest();
        return () => {setFormData(initialFormState)}
    }, [questId])

    // const handleColourChange = () => {
        //}

   return (
    <main className={styles.container}>
        <h1>{questId ? 'Edit Quest' : 'New Quest'}</h1>
    <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset>
            <label htmlFor="general">General</label>
          <textarea
            id="general"
            type="text"
            name="general"
            value={formData.general}
            onChange={handleChange}
          />
       </fieldset>
        <fieldset>
            <legend>Food</legend>
                <div className={styles.reviewRow}>
                    <div>
                        <label htmlFor="food.review">Review</label>
                        <input id="food.review" name="food.review" value={formData.food.review} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="food.rating">Rating</label>
                        <select id="food.rating" name="food.rating" value={formData.food.rating} onChange={handleChange}>
                        {ratingNumbers.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    </div>
            <label htmlFor="food.story">Story:</label>
            <textarea
                id="food.story"
                name="food.story"
                value={formData.food.story}
                onChange={handleChange}
                required
            />
        </fieldset>   

        <fieldset>
            <legend>Experience</legend>
            <div className={styles.reviewRow}>
                <div>
                <label htmlFor="experience.review">Review</label>
                <input
                    id="experience.review"
                    name="experience.review"
                    value={formData.experience.review}
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="experience.rating">Rating</label>
                <select
                    id="experience.rating"
                    name="experience.rating"
                    value={formData.experience.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(num => (
                    <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                </div>
            </div>
            <label htmlFor="experience.story">Story</label>
            <textarea
                id="experience.story"
                name="experience.story"
                value={formData.experience.story}
                onChange={handleChange}
                required
            />
        </fieldset>

        <fieldset>
            <legend>Transport</legend>
            <div className={styles.reviewRow}>
                <div>
                <label htmlFor="transport.review">Review</label>
                <input
                    id="transport.review"
                    name="transport.review"
                    value={formData.transport.review}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label htmlFor="transport.rating">Rating</label>
                <select
                    id="transport.rating"
                    name="transport.rating"
                    value={formData.transport.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(num => (
                    <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                </div>
            </div>
            <label htmlFor="transport.story">Story</label>
            <textarea
                id="transport.story"
                name="transport.story"
                value={formData.transport.story}
                onChange={handleChange}
                required
            />
        </fieldset>

        <fieldset>
            <legend>Nature</legend>

            <div className={styles.reviewRow}>
                <div>
                <label htmlFor="nature.review">Review</label>
                <input
                    id="nature.review"
                    name="nature.review"
                    value={formData.nature.review}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label htmlFor="nature.rating">Rating</label>
                <select
                    id="nature.rating"
                    name="nature.rating"
                    value={formData.nature.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(num => (
                    <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                </div>
            </div>

            <label htmlFor="nature.story">Story</label>
            <textarea
                id="nature.story"
                name="nature.story"
                value={formData.nature.story}
                onChange={handleChange}
                required
            />
        </fieldset>

        <fieldset>
            <legend>Music</legend>

            <div className={styles.reviewRow}>
                <div>
                <label htmlFor="music.review">Review</label>
                <input
                    id="music.review"
                    name="music.review"
                    value={formData.music.review}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label htmlFor="music.rating">Rating</label>
                <select
                    id="music.rating"
                    name="music.rating"
                    value={formData.music.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(num => (
                    <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                </div>
            </div>

            <label htmlFor="music.story">Story</label>
            <textarea
                id="music.story"
                name="music.story"
                value={formData.music.story}
                onChange={handleChange}
                required
            />
        </fieldset>

        {/* <fieldset>
            <legend>Colours (choose up to three)</legend>
            {allColours.map(colour => (
                <label key={colour}>
                    <input
                    type="checkbox"
                    checked={formData.colours.includes(colour)}
                    onChange={() => handleColourChange(colour)}
                    />
                    {colour}
                </label>
            ))}
        </fieldset> */}

        <fieldset className={styles.countryWrapper}>
            <legend htmlFor="country">Country</legend>
                <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                <option value="">Select a country</option>
                {props.countries?.map(country => (
                    <option key={country._id} name={country._id} value={country._id}>{country.name}</option>
                ))}
                </select>
      </fieldset>

      <button type="submit">Submit Quest</button>
    </form>
    </main>
  );
}

export default QuestForm





   