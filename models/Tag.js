// model for mongoose
// contains wrappers for interacting with the Tag model
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
	name: { type: String, require: true, trim: true, lowercase: true, unique: true },
	uploads: { type: Number, default: 1 }
});

var Tag = mongoose.model('Tag', tagSchema);

exports.TagModel = Tag;

exports.getTags = function (req, res) {
	Tag.find({}, function(error, data){
		if (error) res.send("tags not found");
		res.json(data);
	});
};

exports.addTag = function(tags) {
	var newTag;
	var ta = tags.split(' ');
	ta.forEach( function (tag) {
		// check if tag already exists
		Tag.findOneAndUpdate({name: tag}, {$inc: {uploads: 1}},
		{upsert: true}, function (error, result) {
			if (error) res.send(error);
			console.log(result + "updated in DB");
		});
	});
};