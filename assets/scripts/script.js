$(document).ready(function() {
	$("#sectionSelector").change(function() {
		//Declare Variables
		/*const articleImg;
		const articleImgCaption;
		const articleExcerpt;
		const articleLink;*/
		let content = '';
		const articleArea = $("#articleArea");
		const header = $("header");
		let url = "https://api.nytimes.com/svc/topstories/v2/"

		//Get selected section
		const section = $("#sectionSelector option:selected").val() + ".json";
		const apikey = "6a54040248ba4d669ff0dfc5db6bfd1b";
		
		//build url
		url += section;
		url += '?' + $.param({
			'api-key': apikey
		});

		articleArea.empty(); //Empty Article Area to make space for new articles

		$('.loading').show(); //Show Loading gif

		header.addClass('isLoading'); //Space Logo

		//Ajax call
		$.ajax({
			url: url,
			method: 'GET'
		}).done(function(data) { //On done, store result into data
			//set up article counter
			let count = 0;

			//change css to reflect that the articles are ready to be loaded
			articleArea.addClass('hasArticles');
			header.addClass('hasArticles');
			header.removeClass('noArticles');

			//start loop to pull required info out of data
			$.each(data.results, function(key, value){
				if (value.multimedia.length > 0) { //Make sure current article has images 
					const articleExcerpt = value.abstract; //Get abstract
					const articleImg = value.multimedia[3].url; //Get image
					const articleImgCaption = value.multimedia[3].caption;//Get caption of image
					const articleLink = value.url; //Get article link
					//Build content string with current articles information
					content += '<a href="'+ articleLink + '" class="article"><img class="articleImg" src="' + articleImg + '" alt="'+ articleImgCaption + '"><span class="articleExcerpt">' + articleExcerpt + '</span></a>';
					return ++count < 12; //increment by 1 then check to see if 12 articles have been hit
				}
			});

			articleArea.append(content); //add content to article area

			$('.loading').hide(); //remove loading gif

			header.removeClass('isLoading'); //remove css style for header while loading

			//fade articles in one by one with a delay
			$("#articleArea a").each(function(i) {
				$(this).delay((150 * i) + 400).fadeIn(500);
			});
		});		
	});
});