import '../env.js'
import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE;
const tableName = process.env.AIRTABLE_TABLE;

Airtable.configure({ apiKey });
const base = Airtable.base(baseId);



// // If you only want the first page of records, you can
// // use `firstPage` instead of `eachPage`.
// base('all values').select({
//     view: '🌐 all values'
// }).firstPage(function(err, records) {
//     if (err) { console.error(err); return; }
//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('Field 1'));
//     });
// });

export default function airtableCheck() { 
    base('all values').select({
        // Selecting the first 3 records in 🌐 all values:
        maxRecords: 5,
        view: "🌐 all values"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Field 1'));
        });
        
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
};