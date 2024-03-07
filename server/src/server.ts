import express from 'express';
import mock from './mock/MOCK_DATA.json';

const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

app.get('/api/alerts', (req, res) => {
  res.json(mock);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
