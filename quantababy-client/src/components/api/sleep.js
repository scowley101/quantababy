// components/api/sleep.js
export async function createSleepRecord(sleepBody) {
    try {
      const response = await fetch('/api/sleep/new', {
        method: 'post',
        body: JSON.stringify(sleepBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to create sleep record');
      }
  
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  