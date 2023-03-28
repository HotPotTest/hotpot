const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

/*exports.signup = async (req, res,next) => {
  try {
   
    const newUser = await User.create(req.body);
   
    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: 'Invalid data ',
    });
  }
}; */
/*exports.signup = catchAsync(async (req, res, next) => {
  //not good to send signup data using create 
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
}); */

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  //we have payload and the secret token header will be created automatically
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});
