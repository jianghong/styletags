// model for mongoose
// contains wrappers for interacting with the Tag model

// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/tags');

// var tagSchema = mongoose.Schema({
// 	name: { type: String, require: true, trim: true, lowercase: true, unique: true }
// });

// var Tag = mongoose.model('Tag', tagSchema);

// exports.TagModel = Tag;
// exports.getTags = function (req, res) {
// 	Tag.find({}, function(error, data){
// 		if (error) res.send("tags not found");
// 		res.json(data);
// 	});
// };

// exports.addTag = function(req, res) {
// 	var tagname = req.body.name;

// 	if (tagname) {
// 		var tag = new Tag({ name: tagname });

// 		tag.save(function(error, data) {
// 			if (error) res.send(error);
// 			res.redirect("/tags");
// 		});
// 	} else {
// 		res.send(404);
// 	}

// };