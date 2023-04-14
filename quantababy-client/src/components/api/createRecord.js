export async function createRecord(table, reqBody) {
    try {
      const response = await fetch(`/api/${table}/new`, {
        method: 'post',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create ${table} record`);
      }

   const jsonResponse = await response.json(); // Convert the response to JSON
    console.log("the response", jsonResponse);

    return jsonResponse.id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  