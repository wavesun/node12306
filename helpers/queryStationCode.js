//find stations here

var stations = require('../models/stations.js'),
		_string  = require('underscore.string');

module.exports = function(station){
	var arr = stations.split(/\d{1,4}\@/),matched=[];
	station = _string.trim(station);
	arr.forEach(function(v, i){
		var regexp = new RegExp('\\|' + station + '\\|');//add the pipe or it'll also match 北京东 for 北京
		if(v.match(regexp))
			matched.push(v)
	})

	matched.forEach(function(v, i){
		var s = v.split('|');
		matched[i] = {
			whatIsThis: s[0],
			name: s[1],
			code: s[2],
			py: s[3],
			acronym: s[4]
		}
	})

	return matched;
}