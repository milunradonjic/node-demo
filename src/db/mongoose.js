const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => (err ? console.log(err) : console.log('Connection success'))
);
