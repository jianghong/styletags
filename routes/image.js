var mongoose = require('mongoose'),
	Tag = require('../models/Tag'),
	cloudinary = require('cloudinary'),
	fs = require('fs');

cloudinary.config({
	cloud_name: 'styletabs',
	api_key: '144943367941172',
	api_secret: 'Z2AkQAvabdBETVF7rN3ew4apmcI'
});

exports.upload = function(req, res) {
	var tags = req.body.tags;
	console.log(tags);
	var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary'}),
		cloudStream = cloudinary.uploader.upload_stream(function (result) {
			res.redirect('/');
		}, { tags: tags});

	imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
};

exports.index = function(req, res) {
	cloudinary.api.resources(function (items) {
		res.render('index', { images : items.resources, cloudinary: cloudinary,
			title: "style#tags" });
	});
};