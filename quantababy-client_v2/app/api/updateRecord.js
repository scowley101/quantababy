export async function updateRecord(table, token, recordId, reqBody) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/protected/${table}/${recordId}`,
            {
                method: 'PUT',
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

        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
