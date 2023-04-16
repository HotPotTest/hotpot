const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

var cors = require('cors');
app.use(cors());

//db connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('db connection successful ');
  });

const port = process.env.PORT || 'https://hotpot-server.onrender.com' || 'http://localhost:3000'; 
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));
