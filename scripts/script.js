$(document).ready(function() {
	$("#sectionSelector").change(function() {
		var url = "https://api.nytimes.com/svc/topstories/v2/"
		var section = $("#sectionSelector option:selected").val() + ".json";
		var apikey = "6a54040248ba4d669ff0dfc5db6bfd1b";
		alert("Section selected is: " + section);
		url += section;
		url += '?' + $.param({
			'api-key': apikey
		});
		$("#articleArea").append('<a href="' + url + '">' + url + '</a>');
	});
});