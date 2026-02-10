import { useState } from "react";

const allColours = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'black', 'white'];
const ratingNumbers = [1,2,3,4,5]

const QuestForm = (props) => {
const [formData, setFormData] = useState({
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
    country: ''
  })

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.addQuest(formData);
    }

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

    // const handleColourChange = () => {
        //}

   return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="general">General</label>
          <textarea
            id="general"
            type="text"
            name="general"
            value={formData.general}
            onChange={handleChange}
          />
       
        <fieldset>
            <legend>Food</legend>
                <label htmlFor="food.review"> Review:</label>
                    <input
                        id="food.review"
                        name="food.review"
                        value={formData.food.review}
                        onChange={handleChange}
                    />
                <label htmlFor="food.rating"> Rating:</label>
                    <select
                    id="food.rating"
                    name="food.rating"
                    value={formData.food.rating}
                    onChange={handleChange}
            >
                {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
            </select>
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
                <label htmlFor="experience.review">Review:</label>
                <input
                    id="experience.review"
                    name="experience.review"
                    value={formData.experience.review}
                     onChange={handleChange}
                />
                <label htmlFor="experience.rating">Rating:</label>
                <select
                    id="experience.rating"
                    name="experience.rating"
                    value={formData.experience.rating}
                    onChange={handleChange}
                >
                {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="experience.story">Story:</label>
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
                <label htmlFor="transport.review">Review:</label>
                <input
                    id="transport.review"
                    name="transport.review"
                    value={formData.transport.review}
                    onChange={handleChange}
                />
                <label htmlFor="transport.rating">Rating:</label>
                <select
                    id="transport.rating"
                    name="transport.rating"
                    value={formData.transport.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="transport.story">Story:</label>
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
                <label htmlFor="nature.review">Review:</label>
                <input
                    id="nature.review"
                    name="nature.review"
                    value={formData.nature.review}
                    onChange={handleChange}
                />

                <label htmlFor="nature.rating">Rating:</label>
                <select
                    id="nature.rating"
                    name="nature.rating"
                    value={formData.nature.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="nature.story">Story:</label>
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
                <label htmlFor="music.review">Review:</label>
                <input
                    id="music.review"
                    name="music.review"
                    value={formData.music.review}
                    onChange={handleChange}
                />
                <label htmlFor="music.rating">Rating:</label>
                <select
                    id="music.rating"
                    name="music.rating"
                    value={formData.music.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="music.story">Story:</label>
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

        <fieldset>
            <legend htmlFor="country">Country</legend>
                <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                <option value="">Select a country</option>
                {props.countries.map(country => (
                    <option key={country._id} name={country._id} value={country._id}>{country.name}</option>
                ))}
                </select>
      </fieldset>

      <button type="submit">Submit Quest</button>
    </form>
  );
}

export default QuestForm





   