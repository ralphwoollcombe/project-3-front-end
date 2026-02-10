
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        const jsonRes = await res.json();
        return jsonRes
    } catch (error) {
        console.log(error)
    }
}

const create = async (questFormData, userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',},
            body: JSON.stringify(questFormData)
    });
    return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {index, create}