var mongoose = require('mongoose'),
	Tag = require('../models/Tag'),
	cloudinary = require('cloudinary'),
	fs = require('fs');

cloudinary.config({
	cloud_name: 'styletabs',
	api_key: '144943367941172',
	api_secret: 'Z2AkQAvabdBETVF7rN3ew4apmcI'
});


var TAGS;

cloudinary.api.tags(function (result){
	TAGS = result.tags;
}, {max_results: 100});

exports.load = function(req, res) {
	cloudinary.api.resources(function (result) {
		res.render('index', {next: result.next_cursor, tags: TAGS, images: result.resources,
			cloudinary: cloudinary, title:"style#tags"});
	}, { next_cursor: req.params.next, max_results: 30 });
};

exports.load_by_tag = function(req, res) {
	var tag = req.params.tag;
	cloudinary.api.resources_by_tag(tag, function (result) {
		res.render('index', {next: result.next_cursor, tags: TAGS, images: result.resources,
			cloudinary: cloudinary, title:"#" + tag, tag: tag});
	}, { max_result:30, next_cursor: req.params.next });
};

exports.upload = function(req, res) {
	var tags = req.body.tags;
	// file was uploaded, handle uploading
	if (req.body.image){
		var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary'}),
			cloudStream = cloudinary.uploader.upload_stream(function (result) {
				cloudinary.api.tags(function (result){
					TAGS = result.tags;
				}, { max_results: 100 });
				res.redirect('/');
			}, { tags: tags});

		imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
	} else { // handle url fetch
		cloudinary.uploader.upload(req.body.urlimage, function(result) {
			cloudinary.api.tags(function (result) {
				TAGS = result.tags;
			}, {max_results: 100});
			res.redirect('/');
		}, {tags: tags});
	}
};

exports.index = function(req, res) {
	cloudinary.api.resources(function (items) {
		console.log(items);
		res.render('index', { next: items.next_cursor, tags: TAGS, images : items.resources,
		cloudinary: cloudinary, title: "style#tags"});
	}, {max_results: 30});
};

exports.show = function(req, res) {
	var tag = req.params.tag;
	cloudinary.api.resources_by_tag(tag, function (items) {
		res.render('index', { next: items.next_cursor, tags: TAGS, images: items.resources,
		cloudinary: cloudinary, title: "#" + tag, tag: tag});
	}, {max_results: 30});
};