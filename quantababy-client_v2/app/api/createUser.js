export async function createUser(reqBody) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/auth/register`,
            {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create User record`);
        }

        const jsonResponse = await response.json(); // Convert the response to JSON
        console.log('the response', jsonResponse);

        return jsonResponse.id;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
