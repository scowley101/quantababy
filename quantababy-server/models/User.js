import base from '../airtable/airtable.js';
// import createCrud from '../middleware/airtableCrud.js';

const usersTable = base('users');

const createUserObject = (record) => ({
  recordId: record.id,
  userId: record.get('user_id'),
  username: record.get('username'),
  email: record.get('email'),
  password: record.get('password'),
});

const findOne = async ({ email, id, user }) => {
  let filterByFormula;
  if (email) {
    filterByFormula = `{email} = '${email}'`;
  } else if (id) {
    filterByFormula = `RECORD_ID() = '${id}'`;
  } else if (user) {
    filterByFormula = `{user_id} = '${user}'`;
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
  const record = await usersTable.create([
    { fields: { username, email, password } },
  ]);
  if (record) {
    return createUserObject(record[0]);
  }
  return null;
};

export { findOne, create };
