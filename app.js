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
});

var Router = Backbone.Router.extend ({
  routes: {
    "index":"index",
    "edit/:id":"edit_wine"
  }
});

var router = new Router;

function getWines () {
  // put all the wine from the API--that was originally on the document.ready function--see the app_without_backbone.js file"
  // the url with #index at the end will access this route
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
}

router.on("route:index", getWines);
//getWines is a function that allows for us to call for it more than once, on the show all (index) and on the delete routes

router.on("route:edit_wine", function(id) {
  //pasted what was originally in the document.onclick into this function for backbone.js
  //the url with #edit/:id can access this route
$.ajax({
    url: "http://daretodiscover.net/wine/" + id,
    type: "GET",
    success: function(data) {
        var html = editWineTemplate(data);
            $("#container").html(html);
           }, 
    error: function() {
      alert("Something went wrong");
      }
  });

})

//this command starts backbonejs!
Backbone.history.start();

//When user clicks on the "edit" button, we need to get the item that they want to edit first. 

$(document).on("click", ".edit-button", function(){
	
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

//when a user wants to delete an item...

$(document).on("click", ".delete-button", function(){
  $.ajax({
    url: "http://daretodiscover.net/wine/" + $(this).attr("id"),
    type: "DELETE", 
    success: function(){
      // this will reload the page
      location.reload(); 
    },
    error: function(){
      alert("Something went wrong!")
    }
 });
});

//when user wants to add a new wine ...

$(document).on("click", "#add-wine", function(){
  $.ajax({
    url: "http://daretodiscover.net/wine",
    type: "POST",
    data: {
     

        // notice how we are are using the "id on the modal form instead of the "name" on the form as as seen on the above ajax syntax

      name: $("#add-name").val(),
      year: $("#add-year").val(),
      grapes: $("#add-grapes").val(),
      country: $("#add-country").val(),
      region: $("#add-region").val(),
      description: $("#add-description").val(),
      picture: $("#add-picture").val()
     

    },
    success: function(){
      location.reload();

    },
    error: function(){
      alert("Something went wrong!")
    }

  });

});