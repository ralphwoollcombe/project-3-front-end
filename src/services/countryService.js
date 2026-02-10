
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async () => {
    try {
        const res = await fetch(`${BASE_URL}/countries`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        const jsonRes = await res.json();
        return jsonRes 
    } catch (error) {
        console.log(error)
    }
}

export {
    index
}