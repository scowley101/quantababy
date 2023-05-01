export async function hitProtected(token) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/auth/protected`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: token,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`💩 Failed to hit route`);
        }

        const jsonResponse = await response.json(); // Convert the response to JSON
        console.log('the response', jsonResponse);

        return jsonResponse.id;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
