const express = require('express');
const fs = require('fs');
const app = express();
const port = 21180;
var watch = require('node-watch');

class OBip {
	constructor(path, from, mtime) {
		this.path = path;
		this.from = from;
		this.mtime = mtime;
	}
}

function setIPs(ips, key, obip, data, istime) {
	if (!istime) {
		obip.from = key + ": " + data + "";
		ips.set(key, obip);
		console.log(key + '.from: ' + obip.from + ", set.");
	} else {
		var dt = new Date(data);
		obip.mtime = " (modified: " + dt.toUTCString() + ")";
		ips.set(key, obip);
		console.log(key + '.mtime:' +  obip.mtime + ", set.");
	}
}

function readIP(key, obip, callback) {
	fs.readFile(obip.path, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		callback(ips, key, obip, data, false);
	});
	fs.stat(obip.path, (err, stats) => {
		if (err) {
			console.error(err);
			return;
		}
		callback(ips, key, obip, stats.mtime, true);
	});
}

var ips = new Map();
var fn = ['lennovoHK', 'lennovoK21'];
ips.set(fn[0], new OBip('/home/ubuntu/.' + fn[0] + '.obip', '0', '0'));
ips.set(fn[1], new OBip('/home/ubuntu/.' + fn[1] + '.obip', '1', '1'));
//console.log(ips);
var i = 0;
for (var [key, obip] of ips) {
	console.log(obip);
	readIP(key, obip, setIPs);

	watch(obip.path, 'utf8', (evt, name) => {
		if (name.indexOf(fn[0]) != -1) {
			readIP(fn[0], ips.get(fn[0]), setIPs);
		} else {
			readIP(fn[1], ips.get(fn[1]), setIPs);
		}
		console.log('(#%d) %s changed (event: %s)', i++, name, evt);
	});
}

app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
	name = 'Show me the IPs!';
	res.render('default', {
		title: name,
		ip1: ips.get(fn[0]).from + ips.get(fn[0]).mtime,
		ip2: ips.get(fn[1]).from + ips.get(fn[1]).mtime,
	});

}).listen(port, "0.0.0.0", () => {
	console.log('express is listening on ' + port + '!');
});
