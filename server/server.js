require('dotenv').config();
const express = require('express')
const tinyurl = require('tinyurl')
const cors = require('cors')
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TinyUrl = require('./models/tinyurl')

// MongoDB
mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log('Successfully connected to mongodb!')
    
    // Clear!
    // TinyUrl.collection.remove({});

    TinyUrl.find().then(results => {
      console.log(results);
    });
  },
  err => {
    console.error.bind(console, 'connection error:')
  }
);

const app = express()

app.use(cors());

app.use(bodyParser.json());

app.get('/api/tinyurl/', (req, res) => {
  const found = TinyUrl.find().then(results => {
    return res.json(results);
  });
});

app.patch('/api/tinyurl/', (req, res) => {
  const url = req.body.url;
  if (!url) {
    res.json({err: "'url' is required."});
  }

  tinyurl.shorten(url, tinyUrl => {
    TinyUrl.updateOne(
      { 
        "url" : url
      },
      { $set: { "tinyUrl" : tinyUrl, "clicks" : 0 } },
      { upsert : true }
    ).then(results => {
      return res.json(results)
    });
  });
});

app.patch('/api/click/', (req, res) => {
  const tinyUrl = req.body.tinyUrl;
  if (!tinyUrl) {
    res.json({err: "'tinyUrl' is required."});
  }

  TinyUrl.updateOne(
    { 
      "tinyUrl" : tinyUrl
    },
    { $inc: { "clicks" : 1 } }
  ).then(results => {
    return res.json(results);
  });
});

app.listen(8000, () => {
  console.log('Server started!');
});

