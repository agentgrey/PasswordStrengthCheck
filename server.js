const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1/ippopay', { useNewUrlParser: true, useUnifiedTopology: true });


const Request = mongoose.model('Request', {
  password: String,
  steps: Number,
  timestamp: { type: Date, default: Date.now },
});

app.use(bodyParser.json());

app.post('/checkStrength', async (req, res) => {
  const { password, steps } = req.body;

  const request = new Request({
    password,steps,
  });
  await request.save();
  res.json({ steps, borderColor });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
