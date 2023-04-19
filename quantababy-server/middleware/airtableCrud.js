import base from '../airtable/airtable.js';

function createCrud(table, recordId) {
  // Find a single record by ID
  const findOne = () => (req, res, next) => {
    base(table)
      .find(req.params.id)
      .then((record) => {
        const { fields } = record;
        const firstFieldName = Object.keys(fields)[0];
        const firstFieldValue = fields[firstFieldName];
        console.log('Retrieved', firstFieldValue);
        req.result = record;
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /* Find records for table

  Pass in an options object to change settings:
  * fields
  * filterByFormula
  * maxRecords
  * pageSize
  * sort

  See Airtable documentation for details */
  const find = (options) => (req, res, next) => {
    const records = [];
    const filterByUserIdFormula = userId ? `{user_id} = '${userId}'` : '';
    const updatedOptions = {
      ...options,
      filterByFormula: options.filterByFormula
        ? `AND(${options.filterByFormula}, ${filterByUserIdFormula})`
        : filterByUserIdFormula,
    };
  
    base(table)
      .select(updatedOptions)
      .eachPage(
        (pageRecords, fetchNextPage) => {
          pageRecords.forEach((record) => {
            const { fields } = record;
            const firstFieldName = Object.keys(fields)[0];
            const firstFieldValue = fields[firstFieldName];
            console.log('Retrieved', firstFieldValue);
            records.push(record);
          });
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          req.result = records;
          next();
        }
      );
  };

  // Create a new record
  // To use, create a form with the input fields matching the record fields
  const create = () => (req, res, next) => {
    const recordData = { ...req.body, userId }; // Add the userId field to the record data
    base(table)
      .create(recordData)
      .then((record) => {
        console.log(record.getId());
        req.result = record;
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Edit a record
  // To use, create a form with the input fields matching the record fields
  const update = () => (req, res, next) => {
    base(table)
      .update(req.params.id, req.body)
      .then((record) => {
        console.log(record.getId());
        req.result = record;
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    findOne,
    find,
    create,
    update,
  };
}

export default createCrud;
