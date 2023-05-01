export async function createRecord(token, table, reqBody) {
    console.log(
        '🍆 createRecord called with: table:',
        table,
        'token:',
        token,
        'reqBody:',
        reqBody
    );
    try {
        const response = await fetch(
            `http://localhost:8080/api/protected/${table}/new`,
            {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: token,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create ${table} record`);
        }

        const jsonResponse = await response.json(); // Convert the response to JSON
        console.log('the response', jsonResponse);

        return jsonResponse.id;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
