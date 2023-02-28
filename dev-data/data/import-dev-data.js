const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Quiz = require('./../../models/quizModel');

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

// READ JSON FILE
const quiz = JSON.parse(fs.readFileSync(`${__dirname}/quiz.json`, 'utf-8'));
// we need to convert it into js object using json.parse

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Quiz.create(quiz); //can also accept array of objects
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Quiz.deleteMany(); // will delete all the documents from the collection
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '--import') {
  //importData();
} else if (process.argv[2] === '--delete') {
  //deleteData();
}
