const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calendar', (req, res) => {
  const { operation, value, fromDate } = req.body;

  let result;
  const dateFrom = fromDate ? moment(fromDate) : moment();

  switch (operation) {
    case 'add':
      result = dateFrom.add(value, 'days').format('YYYY-MM-DD');
      break;
    case 'subtract':
      result = dateFrom.subtract(value, 'days').format('YYYY-MM-DD');
      break;
    default:
      res.status(400).json({ error: 'Invalid operation' });
      return;
  }

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});