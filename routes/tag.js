var mongoose = require('mongoose'),
	Tag = require('../models/Tag');

// list of available tags

exports.tags = function(req, res){
  Tag.getTags(req, res);
};

// add a tag to the list of tags

exports.addTag = function(req, res) {
	Tag.addTag(req, res);
};