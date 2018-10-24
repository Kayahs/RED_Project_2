$(document).ready(function() {
	$("#sectionSelector").change(function() {
		var articleImg;
		var articleImgCaption;
		var articleExcerpt;
		var articleLink;
		var content;
		var articleArea = $("#articleArea");
		var header = $("header");
		var url = "https://api.nytimes.com/svc/topstories/v2/"
		var section = $("#sectionSelector option:selected").val() + ".json";
		var apikey = "6a54040248ba4d669ff0dfc5db6bfd1b";
		url += section;
		url += '?' + $.param({
			'api-key': apikey
		});
		articleArea.empty();
		//articleArea.append('<a href="' + url + '">' + url + '</a>');
		$.getJSON(url).done(function(data) {
			console.log(data.results);
			var count = 0;
			articleArea.addClass('hasArticles');
			header.addClass('hasArticles');
			header.removeClass('noArticles');
			$.each(data.results, function(key, value){
				if (value.multimedia.length > 0) {
					articleExcerpt = value.abstract;
					articleImg = value.multimedia[3].url;
					articleImgCaption = value.multimedia[3].caption;
					articleLink = value.url;
					content = '<a href="'+ articleLink + '" class="article"><img class="articleImg" src="' + articleImg + '" alt="'+ articleImgCaption + '"><span class="articleExcerpt">' + articleExcerpt + '</span></a>';
					$("#articleArea").append(content);
					return ++count < 12;
				}
			});
		});
	});
});