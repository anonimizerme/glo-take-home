const _ = require('lodash'),
	express = require('express'),
	router = express.Router(),
	models = require('../models');

const findClasses = async (teacherId = null) => {
	let classQuery = models.Class.query()
		.eager('[Teacher, Style]')

	if (teacherId) {
		classQuery.where('teacher', teacherId);
	}

	return classQuery;
};

const prepareClassForResponse = (classInstance) => {
	let result = {...classInstance};
	result.teacher = result.Teacher;
	result.style = result.Style;

	delete result.Teacher;
	delete result.Style;

	return result;
}

// GET /classes
router.get('/', async (req, res, next) => {
	try {
		let classes = await findClasses();
		res.json(classes.map(prepareClassForResponse));
	}	
	catch (e) {
		return next({ status : 500 });
	}
});

router.get('/:teacherId', async (req, res, next) => {
	try {
		let classes = await findClasses(req.params.teacherId);
		res.json(classes.map(prepareClassForResponse));
	}
	catch (e) {
		return next({ status : 500 });
	}
});

module.exports = router;
