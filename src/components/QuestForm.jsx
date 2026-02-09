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
    // country: ''
  })

    const handleSubmit = async () => {
        evt.preventDefault();
        props.addQuest(formData);

    }

    // const handleChange = (event) => {
    //     const {name, value} = event.target
    //     if (name.includes('.')) {
    //         const [section, field] = name.split('.');
    //         setFormData(...for)
    //     setFormData({
    //         ...formData, 
    //         [event.target.name]: event.target.value
    //     })
    // }}

    // const handleColourChange = () => {

    // }

   return (
    <form onSubmit={handleSubmit}>
        <label>General</label>
          <input
            type="text"
            name="general"
            value={formData.general}
            onChange={handleChange}
          />
       
        <fieldset>
            <legend>Food</legend>
                <label htmlFor="food.review"> Review:</label>
                    <input
                        name="food.review"
                        value={formData.food.review}
                        onChange={handleChange}
                    />
                <label htmlFor="food.rating"> Review:</label>
                    <select
                    name="food.rating"
                    value={formData.food.rating}
                    onChange={handleChange}
            >
                {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
            </select>
            <label htmlFor="food.story">Story:</label>
            <textarea
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
                    name="experience.review"
                    value={formData.experience.review}
                     onChange={handleChange}
                />
                <label htmlFor="experience.rating">Rating:</label>
                <select
                    name="experience.rating"
                    value={formData.experience.rating}
                    onChange={handleChange}
                >
                {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="experience.story">Story:</label>
                <textarea
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
                    name="transport.review"
                    value={formData.transport.review}
                    onChange={handleChange}
                />
                <label htmlFor="transport.rating">Rating:</label>
                <select
                    name="transport.rating"
                    value={formData.transport.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="transport.story">Story:</label>
                <textarea
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
                    name="nature.review"
                    value={formData.nature.review}
                    onChange={handleChange}
                />

                <label htmlFor="nature.rating">Rating:</label>
                <select
                    name="nature.rating"
                    value={formData.nature.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="nature.story">Story:</label>
                <textarea
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
                    name="music.review"
                    value={formData.music.review}
                    onChange={handleChange}
                />
                <label htmlFor="music.rating">Rating:</label>
                <select
                    name="music.rating"
                    value={formData.music.rating}
                    onChange={handleChange}
                >
                    {ratingNumbers.map(number => <option key={number} name={number} value={number}>{number}</option>)}
                </select>
                <label htmlFor="music.story">Story:</label>
                <textarea
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

        {/* <fieldset>
            <legend>Country</legend>
                <select name="country" value={formData.country} onChange={handleChange} required>
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country._id} name={country._id} value={country._id}>{country.name}</option>
                ))}
                </select>
      </fieldset> */}

      <button type="submit">Submit Quest</button>
    </form>
  );
}

export default QuestForm