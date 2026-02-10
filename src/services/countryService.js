const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/countries`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch countries');

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { index };
