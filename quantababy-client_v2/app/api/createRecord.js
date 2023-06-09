export async function createRecord(table, userId, reqBody) {
    try {
        console.log(
            'createRecord called with table:',
            table,
            'userId:',
            userId,
            'reqBody:',
            reqBody
        );

        console.log('the body is', JSON.stringify(reqBody));

        const response = await fetch(`/api/${table}/new`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

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
