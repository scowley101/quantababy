import base from '../airtable/airtable.js';
// import createCrud from '../middleware/airtableCrud.js';

 const usersTable = base('users');

 const createUserObject = (record) => ({
    id: record.id,
    username: record.get('username'),
    email: record.get('email'),
    password: record.get('password'),
  });
  
  const findOne = async ({ email, id }) => {
    let filterByFormula;
    if (email) {
      filterByFormula = `{email} = '${email}'`;
    } else if (id) {
      filterByFormula = `RECORD_ID() = '${id}'`;
    } else {
      return null;
    }
  
    const records = await usersTable.select({ filterByFormula }).firstPage();
    if (records.length > 0) {
      return createUserObject(records[0]);
    }
    return null;
  };
  
  const create = async ({ username, email, password }) => {
    const record = await usersTable.create([{ fields: { username, email, password } }]);
    if (record) {
      return createUserObject(record[0]);
    }
    return null;
  };
  
  export {
    findOne,
    create,
  };
  
  