const { Model } = require('objection');

let sqlite = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: "./mydb.sqlite"
	},
	useNullAsDefault: true
});

Model.knex(sqlite);

class Class extends Model {
	static get idColumn() {
		return 'id';
	}

	static get tableName() {
		return 'classes';
	}

	static get relationMappings() {
		return {
			Teacher: {
				relation: Model.BelongsToOneRelation,
				modelClass: Teacher,
				join: {
					from: 'classes.teacher',
					to: 'teachers.id'
				}
			},
			Style: {
				relation: Model.BelongsToOneRelation,
				modelClass: Style,
				join: {
					from: 'classes.style',
					to: 'styles.id'
				}
			}
		};
	}
}
class Style extends Model {
	static get idColumn() {
		return 'id';
	}

	static get tableName() {
		return 'styles';
	}
}
class Teacher extends Model {
	static get idColumn() {
		return 'id';
	}

	static get tableName() {
		return 'teachers';
	}
}

exports.Class = Class;
exports.Style = Style;
exports.Teacher = Teacher;