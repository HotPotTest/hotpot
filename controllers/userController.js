const User = require('./../models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: 'success',

      results: user.length,
      data: {
        genre,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
};

//slide 91
