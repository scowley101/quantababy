export async function updateRecord(table, recordId, reqBody) {
    try {
      const response = await fetch(`/api/${table}/${recordId}`, {
        method: 'put',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create ${table} record`);
      }
  
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  