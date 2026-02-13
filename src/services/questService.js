const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questFormData)
        });
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export async function getByCountry(userId, countryId) {
    const res = await fetch(`${BASE_URL}/${userId}/quests?country=${countryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    if (!res.ok) throw new Error('Failed to fetch quests by country')
    return res.json()
}



const show = async (userId, questId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests/${questId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const jsonRes = await res.json()
        return jsonRes
    } catch (error) {
        console.log(error)
    }
}

export const showQuest = async (questId) => {
    const res = await fetch(`${BASE_URL}/quests/${questId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    if (!res.ok) throw new Error('Failed to fetch quest')
    return res.json()
}


const deleteQuest = async (userId, questId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests/${questId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const jsonRes = await res.json()
        return jsonRes
    } catch (error) {
        console.log(error)
    }
}

const updateQuest = async (userId, questId, questFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests/${questId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questFormData)
        });
        const jsonRes = await res.json()
        return jsonRes
    } catch (error) {
        console.log(error)
    }
}

export { index, create, show, deleteQuest, updateQuest }
