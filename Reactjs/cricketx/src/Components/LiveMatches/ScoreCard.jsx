import React, { useEffect, useState } from 'react';

const MyComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/40381/scard';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '30edb60294msh6efba22caacf94bp16eab4jsn305cc29b60cd',
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that useEffect runs only once on component mount

    return (
        <div>
            <h1>Data from API:</h1>
            {data ? (
                <pre>{data}</pre> // Displaying data as plain text
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MyComponent;
