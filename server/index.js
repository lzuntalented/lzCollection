var arguments = process.argv.splice(2);
if(arguments.toString() == ""){
    console.log("miss argument for website!");
    process.exit();
}
var prefix_filename = arguments[0];

var fs = require("fs");

var xml = fs.readFileSync(prefix_filename + ".html", "utf-8");

var env = require('jsdom').env;

// first argument can be html string, filename, or url
env(xml, function(errors, window) {

	errors && console.log(errors);

	var $ = require('jquery')(window);

	var func = eval("prase_" + prefix_filename);
	if(typeof func !== "function"){
		console.log("not a function");
	}
	
	var result = func($);
	fs.writeFile(prefix_filename + ".json", JSON.stringify(result), function() {
		console.log("write ok");
	});
});


/**
 * 解析简书中我的喜欢
 * @param {Object} $
 */
function prase_jianshu($){
	var result = [];
	$('#bookmarks li').each(function() {

		var url = $(this).find(".wrap-img img").attr("src");
		var dom = $(this).find(".title a");
		var title = dom.text();
		var link = dom.attr("href");

		var labels = [];

		if(link.indexOf("http") !== 0) {
			link = "http://www.jianshu.com" + link;
		}

		result.push({
			"url": url,
			"title": title,
			"link": link,
			"labels": labels
		});
	});

	return result;
}

/**
 * 解析掘进中我的喜欢
 * @param {Object} $
 */
function prase_juejin($){
	var result = [];
	$('.entry-item').each(function() {

		var url = $(this).find(".screenshot").css("background-image");
		var dom = $(this).find(".entry-title-box a");
		var title = dom.attr("title");
		var link = dom.attr("href");

		var dom_label = $(this).find(".meta-tag-box .meta-tag");
		var labels = [];
		dom_label.each(function() {
			labels.push($(this).text());
		});

		url = url.replace(/url\((.*?)\)/, "$1");
		if(url.indexOf("http") !== 0) {
			url = "http://gold.xitu.io" + url;
		}

		result.push({
			"url": url,
			"title": title,
			"link": link,
			"labels": labels
		});
	});

	return result;
}
