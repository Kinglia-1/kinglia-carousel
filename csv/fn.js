const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;

const write = async (fileName, data) => {
    // Output file in the same folder
    const filename = path.join(__dirname, `${fileName}`);
    let rows;
    // If file doesn't exist, create new file and add rows with headers
    if (!fs.existsSync(filename)) {
      rows = json2csv(data, { header: true, quote: '' });
    } else {
      // Rows without headers
      rows = json2csv(data, { header: false, quote: '' });
    }

    fs.appendFileSync(filename, rows);
    // Add new line if file already exists
    fs.appendFileSync(filename, "\r\n");
}

var data = [
  {
    'Name': 'George',
    'Position': 'Manager',
    'Salary': 10500
  },
  {
    'Name': 'Michael',
    'Position': 'Tester',
    'Salary': 5500
  },
  {
    'Name': 'Andrey',
    'Position': 'Developer',
    'Salary': 5500
  },
  {
    'Name': 'Emily',
    'Position': 'Team Lead',
    'Salary': 7500
  }
];

write('test.csv', data);