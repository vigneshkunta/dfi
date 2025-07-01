export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};
