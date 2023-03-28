const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  //{id:id}
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
};
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
  /* const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  }); */
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //const email=req.body.email;
  const { email, password } = req.body; //destructring syntax

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  //const user =await User.findOne({email:email})
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  //if user doesn't exist then this below line of code is not gonna run.
  //const correct = await user.correctPassword(password, user.password);
  /* if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401));
  } */
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
