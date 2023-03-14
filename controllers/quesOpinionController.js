const QuesOpinion = require('./../models/quesOpinionModel');

exports.getAllQuesOpinion = async (req, res) => {
  try {
    const quesOpinion = await QuesOpinion.find();

    res.status(200).json({
      status: 'success',

      results: quesOpinion.length,
      data: {
        quesOpinion,
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

exports.createQuesOpinion = async (req, res) => {
  try {
    console.log('questionOpinion Router ');
    console.log(req.body);
    const newQuesOpinion = await QuesOpinion.create(req.body);
    // console.log('id', req.params.id);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newQuesOpinion,
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
