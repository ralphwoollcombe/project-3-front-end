
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = aysnc (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/quests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {

    }
    
}