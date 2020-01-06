const async = require('async'),
	express = require('express'),
	request = require('superagent'),
	config = require('../config'),
	router = express.Router();

// Home / all teachers view
router.get('/', async (req, res, next) => {

	try {
		let teachers = await request.get(`${config.baseUrl}/api/teachers`).type('json');
		teachers = teachers.body;

		res.render('index', { 
			title: 'Glo',
			teachers
		});
	}
	catch (e) {
		return next({ status : 500 });
	}
});

// Individual teacher view
router.get('/:id', async (req, res, next) => {	
	try {
		let teacher = await request.get(`${config.baseUrl}/api/teachers/${req.params.id}`).type('json');
		teacher = teacher.body;

		let classes = await request.get(`${config.baseUrl}/api/classes/${req.params.id}`).type('json');
		classes = classes.body;

		// Group classes by style
		let classesByStyle = {};
		for (let i in classes) {
			const style = classes[i].style.name;
			if (classesByStyle[style] === undefined) {
				classesByStyle[style] = [];
			}

			classesByStyle[style].push(classes[i]);
		}

		res.render('detail', { 
			title: 'Glo',
			teacher,
			classes: classesByStyle
		});
	}
	catch (e) {
		return next({ status : 500 });
	}
});

module.exports = router;
