var wineSource;
var wineTemplate;

var editWineSource;
var editWineTemplate;

$(document).ready(function()
{
	//All Wine Display template
		wineSource = $("#show-wines-template").html();
		wineTemplate = Handlebars.compile(wineSource);

	// Edit Product Template 
		editWineSource = $("#edit-wine-template").html();
		editWineTemplate = Handlebars.compile(editWineSource);

	$.ajax({
		url: "http://daretodiscover.net/wine",
		type: "GET",
		success: function(data) {
			var html = wineTemplate({wineData: data});

			//we push the html data into the div id="container"-see the index.html

			$("#container").html(html); 
		},
		error: function() { 
			alert("something went wrong");
		}
	});
});

//When user clicks on the "edit" button, we need to get the item that they want to edit first. 

$(document).on("click", ".edit-button", function(){
	$.ajax({
		url: "http://daretodiscover.net/wine/" + $(this).attr("id"),
		type: "GET",
		success: function(data) {
				var html = editWineTemplate(data);
					  $("#container").html(html);
           }, 
    error: function() {
      alert("Something went wrong");

			}

	});
});

//when user clicks on submit button after they have edited. 
$(document).on("click", "#submit-edits", function(){
  $.ajax({
    url: "http://daretodiscover.net/wine/" + $(this).attr("edit_id"),
    type: "PUT",
    data: {
      name: $("input[name=name]").val(),
      year: $("input[name=year]").val(),
      grapes: $("input[name=grapes]").val(),
      country: $("input[name=country]").val(),
      region: $("input[name=region]").val(),
      description: $("input[name=description]").val(),
      picture: $("input[name=picture]").val()
    },
    success: function(data){
      location.reload();

    },
    error: function(){
      alert("Something went wrong!")
    }
  });

});