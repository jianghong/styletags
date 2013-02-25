// model for mongoose
// contains wrappers for interacting with the Image model
var mongoose = require('mongoose');

var allimagesSchema = mongoose.Schema({
	public_id: String,
	format: String,
	version: Number,
	url: String,
	tags: Array
});

var Img = mongoose.model('Img', allimagesSchema);

exports.ImagesModel = Img;

exports.getImages = function (req, res) {
	Img.find({}, function (error, data) {
		if (error) res.send('images not found');
		res.json(data);
	});
};

exports.addImage = function (result, tags) {
	var image = new Img({
		public_id: result.public_id,
		format: result.format,
		version: result.version,
		url: result.url,
		tags: tags.split(' ')
	});

	image.save(function (error, data) {
		if (error) res.send(error);
		console.log(data + " added to DB");
	});
};