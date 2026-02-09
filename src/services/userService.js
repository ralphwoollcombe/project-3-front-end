const BASE_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
        header: {authorization: `bearer ${localStorage.getItem('token')}`}
        });
        const data = await res.json();
        console.log(data)
        if (data.err) {
            throw new Error(data.err);
        }

    return data
    } catch (error) {
    console.log(error);
    throw new Error(error);
    }
}

export {index}