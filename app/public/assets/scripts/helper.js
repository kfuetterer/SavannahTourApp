// load spinner
var loadSpinner = $("<div>").attr("id","loadSpinner").html("<i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");

// doc ready function
$(function(){



    $("#tourstops-tab").on("click", getLocations);

    $("#sponsors-tab").on("click", function(event){
    
        // add load spinner
        $("#tourstops").append(loadSpinner);

        ajax.getLocations( 
            
            // error callback
            function(response) {

                // remove load spinner
                $(loadSpinner).remove();
                console.log("There was an error:",response.message);
                // update error modal and show it
                $("#errorDisplay").html("There was an error retrieving your data.");
                $("#errorModal").modal("show");
            }, // end error callback

            // success callback
            function(response) {

                $("#dropdownAllSponsors").on("click", function (event) {
                    $(loadSpinner).remove();
                    var sponsorTableBody = $("#sponsorsdata").children().eq(1);
                    $(sponsorTableBody).empty();
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor") {

                            // build contextual icons
                            var deleteIcon = "<i data-action=\"delete\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>";
                            var editIcon = "<i data-action=\"edit\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
                            var detailedIcon = "<i data-action=\"view\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-id-card-o\" aria-hidden=\"true\"></i>";

                            // build row
                            var thisRow = $("<tr><td>" + editIcon + " " + deleteIcon + " " + detailedIcon + "</td><td>" + response.data[i].name + "</td><td>" + response.data[i].address + "</td><td>" + response.data[i].map + "</td></tr>");
                            // add row to table
                            sponsorTableBody.append(thisRow);

                            $("[data-action='view'").on("click", function(){
                                console.log("you clicked view");
                                $("#detailedDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                        
                                $("#detailedLocation").modal("show");    
                            });

                            $("[data-action='edit'").on("click", function(){
                                $("#locationEditDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                                            
                                $("#editLocationModal").modal("show");
                            });
                            
                            // add click listeners to icons
                            // delete
                            $("[data-action='delete'").on("click", function(){
                                $("#checkDisplay").html("<p>Delete "+ $(this).attr("data-name") + "?</p><button type='button' id='trueDelete' data-id='" + $(this).attr('data-id') + "' class='btn btn-info btn-space' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-default btn-space' data-dismiss='modal'>No</button>");

                                //delete action
                                $("#trueDelete").on("click", function(){
                                    // removeLocation method takes id, error callback, success callback
                                    ajax.removeLocation($(this).attr("data-id"), 
                                    // error callback
                                    function(response){
                                        console.log(response);
                                        // update error modal and show it
                                        $("#errorDisplay").html("There was an error deleting this tour stop.");
                                        $("#errorModal").modal("show");
                                    },
                                    //success callback
                                    function(response){
                                        getLocations();
                                    }
                                ); // end removeLocation call
                            }); // end "true delete" click

                            $("#checkModal").modal("show");
                            }) // end "delete" button click
                        } // end type is "stop" condition
                    } // end response "for" loop
                }); // end dropdownAllSponsors function
                
                $("#dropdownSponsorWLocations").on("click", function (event) {
                    $(loadSpinner).remove();
                    var sponsorTableBody = $("#sponsorsdata").children().eq(1);
                    $(sponsorTableBody).empty();
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor" && response.data[i].map === true) {

                            // build contextual icons
                            var deleteIcon = "<i data-action=\"delete\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>";
                            var editIcon = "<i data-action=\"edit\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
                            var detailedIcon = "<i data-action=\"view\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-id-card-o\" aria-hidden=\"true\"></i>";

                            // build row
                            var thisRow = $("<tr><td>" + editIcon + " " + deleteIcon + " " + detailedIcon + "</td><td>" + response.data[i].name + "</td><td>" + response.data[i].address + "</td><td>" + response.data[i].map + "</td></tr>");
                            // add row to table
                            sponsorTableBody.append(thisRow);

                            $("[data-action='view'").on("click", function(){
                                console.log("you clicked view");
                                $("#detailedDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                        
                                $("#detailedLocation").modal("show");    
                            });

                            $("[data-action='edit'").on("click", function(){
                                $("#locationEditDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                                            
                                $("#editLocationModal").modal("show");
                            });
                            
                            // add click listeners to icons
                            // delete
                            $("[data-action='delete'").on("click", function(){
                                $("#checkDisplay").html("<p>Delete "+ $(this).attr("data-name") + "?</p><button type='button' id='trueDelete' data-id='" + $(this).attr('data-id') + "' class='btn btn-warning btn-space' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-default btn-space' data-dismiss='modal'>No</button>");

                                //delete action
                                $("#trueDelete").on("click", function(){
                                    // removeLocation method takes id, error callback, success callback
                                    ajax.removeLocation($(this).attr("data-id"), 
                                    // error callback
                                    function(response){
                                        console.log(response);
                                        // update error modal and show it
                                        $("#errorDisplay").html("There was an error deleting this tour stop.");
                                        $("#errorModal").modal("show");
                                    },
                                    //success callback
                                    function(response){
                                        getLocations();
                                    }
                                ); // end removeLocation call
                            }); // end "true delete" click

                            $("#checkModal").modal("show");
                            }) // end "delete" button click
                        } // end type is "stop" condition
                    } // end response "for" loop
                }); // end dropdownSponsorWLocations function
                
                $("#dropdownSponsorNoLocations").on("click", function (event) {
                    $(loadSpinner).remove();
                    var sponsorTableBody = $("#sponsorsdata").children().eq(1);
                    $(sponsorTableBody).empty();
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor" && response.data[i].map === false) {

                            // build contextual icons
                            var deleteIcon = "<i data-action=\"delete\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>";
                            var editIcon = "<i data-action=\"edit\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
                            var detailedIcon = "<i data-action=\"view\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-id-card-o\" aria-hidden=\"true\"></i>";

                            // build row
                            var thisRow = $("<tr><td>" + editIcon + " " + deleteIcon + " " + detailedIcon + "</td><td>" + response.data[i].name + "</td><td>" + response.data[i].address + "</td><td>" + response.data[i].map + "</td></tr>");
                            // add row to table
                            sponsorTableBody.append(thisRow);

                            $("[data-action='view'").on("click", function(){
                                console.log("you clicked view");
                                $("#detailedDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                        
                                $("#detailedLocation").modal("show");    
                            });

                            $("[data-action='edit'").on("click", function(){
                                $("#locationEditDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                                            
                                $("#editLocationModal").modal("show");
                            });
                                            
                            // add click listeners to icons
                            // delete
                            $("[data-action='delete'").on("click", function(){
                                $("#checkDisplay").html("<p>Delete "+ $(this).attr("data-name") + "?</p><button type='button' id='trueDelete' data-id='" + $(this).attr('data-id') + "' class='btn btn-warning btn-space' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-default btn-space' data-dismiss='modal'>No</button>");

                                //delete action
                                $("#trueDelete").on("click", function(){
                                    // removeLocation method takes id, error callback, success callback
                                    ajax.removeLocation($(this).attr("data-id"), 
                                    // error callback
                                    function(response){
                                        console.log(response);
                                        // update error modal and show it
                                        $("#errorDisplay").html("There was an error deleting this tour stop.");
                                        $("#errorModal").modal("show");
                                    },
                                    //success callback
                                    function(response){
                                        getLocations();
                                    }
                                ); // end removeLocation call
                            }); // end "true delete" click

                            $("#checkModal").modal("show");
                            }) // end "delete" button click
                        } // end type is "stop" condition
                    } // end response "for" loop
                }); // end dropdownSponsorNoLocations function
            } // end getLocations success callback
        ) // end ajax.getLocations call      
    }); 

    $("#friendsoftour-tab").on("click", function(event){
        $("#friendsoftour").append(loadSpinner);
        ajax.getFriends( 
            function(response) {
                $(loadSpinner).remove();
                console.log("There was an error:",response.message);
                // update error modal and show it
                $("#errorDisplay").html("There was an error retrieving your data.");
                $("#errorModal").modal("show");
            }, // end error callback
            // success callback
            function(response) {
                $(loadSpinner).remove();
                var friendsTableBody = $("#friendsdata").children().eq(1);
                $(friendsTableBody).empty();
                console.log(response.data);

                for(var i = 0; i < response.data.length; i++){
                    var thisRow = $("<tr><td>" + response.data[i] + "</td></tr>");
                    // add row to table
                    friendsTableBody.append(thisRow);
                }
            } // end getEvents success callback
        ) // end ajax.getEvents call   
    });

    /*****************
        USER SIGN UP and SIGN IN BUTTONS
    ******************/ 
    $("#signupButton").on("click",function(event){
        event.preventDefault();
        if ($("#signupUser").val()==="") {
            $("#signupUser").addClass("has-error");
            return false;
        }
        else if ($("#signupPass").val()==="") {
            return false;
        }

        // validated form; attempt new user creation
        else {
            // remove any text from inputs
            $("#signupUser","#signupPass").val("");
            var userInfo = {
                "username": $("#signupUser").val().trim(),
                "password": $("#signupPass").val().trim()
            };
            // the signup method (in ajax.js) takes the user object plus error and success callback fns as arguments
            ajax.signup( userInfo,
                // error callback
                function(response) {
                    console.log(response)
                },
                // success callback
                function(response) {
                    console.log(response)
                }
            );

        };
    }) // end click function for user sign up

    $("#signinButton").on("click",function(event){
        event.preventDefault();
        if ($("#signinUser").val()==="") {
            return false;
        }
        else if ($("#signinPass").val()==="") {
            return false;
        }

        // validated form; attempt new user creation
        else {
            console.log("validated. moving on");
            // remove any text from inputs
            $("#signinUser","#signinPass").val("");
            var userInfo = {
                "username": $("#signinUser").val().trim(),
                "password": $("#signinPass").val().trim()
            };
            // the signin method (in ajax.js) takes the user object plus error and success callback fns as arguments
            ajax.signin( userInfo,
                // error callback
                function(response) {
                    console.log(response)
                },
                // success callback
                function(response) {
                    localStorage.setItem("savTourToken", response.token);
                    localStorage.setItem("savTourUser", response.user);
                    location.href="tour.html";
                }
            );

        };
    }); // end click function for user sign in

/*****************
 * LOCATIONS OPERATIONS
 ****************/

// get all locations
function getLocations(){
    
    // add load spinner
    $("#tourstops").append(loadSpinner);

    ajax.getLocations( 
        
        // error callback
        function(response) {

            // remove load spinner
            $(loadSpinner).remove();
            console.log("There was an error:",response.message);
            // update error modal and show it
            $("#errorDisplay").html("There was an error retrieving your data.");
            $("#errorModal").modal("show");
        }, // end error callback

        // success callback
        function(response) {
            // remove load spinner
            $(loadSpinner).remove();

            var tourStopTableBody = $("#tourstopdata").children().eq(1);
            $(tourStopTableBody).empty();

            for(var i = 0; i < response.data.length; i++){
                if (response.data[i].type === "stop") {

                    // build contextual icons
                    var deleteIcon = "<i data-action=\"delete\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>";
                    var editIcon = "<i data-action=\"edit\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
                    var detailedIcon = "<i data-action=\"view\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\" data-address=\"" + response.data[i].address + "\" data-description=\"" + response.data[i].description + "\" data-image=\"" + response.data[i].image + "\" data-lat=\"" + response.data[i].pos.lat + "\" data-lng=\"" + response.data[i].pos.lng + "\" class=\"fa fa-id-card-o\" aria-hidden=\"true\"></i>";

                    // build row
                    var thisRow = $("<tr><td>" + editIcon + " " + deleteIcon + " " + detailedIcon + "</td><td>" + response.data[i].name + "</td><td>" + response.data[i].address + "</td></tr>");
                    // add row to table
                    tourStopTableBody.append(thisRow);

                    $("[data-action='view'").on("click", function(){
                        $("#detailedDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                
                        $("#detailedLocation").modal("show");    
                    });

                    $("[data-action='edit'").on("click", function(){
                        $("#locationEditDisplay").html("<h4 class='blackFont'>" + $(this).attr("data-name") + "</h4><br><h5 class='blackFont'>" + $(this).attr("data-address") + "</h5><br><p>" + $(this).attr("data-description") + "</p><img src=" + $(this).attr("data-image") + " width=100%><br><br><h5 class='blackFont'>Position:</h5><p>" + $(this).attr("data-lat") + ", " + $(this).attr("data-lng") + "</p>")
                                       
                        $("#editLocationModal").modal("show");
                    });
                    
                    // add click listeners to icons
                    // delete
                    $("[data-action='delete'").on("click", function(){
                        $("#checkDisplay").html("<p>Delete "+ $(this).attr("data-name") + "?</p><div class='btn-toolbar'><button type='button' id='trueDelete' data-id='" + $(this).attr('data-id') + "' class='btn btn-warning btn-space' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-secondary btn-space' data-dismiss='modal'>No</button></div>");

                        //delete action
                        $("#trueDelete").on("click", function(){
                            // removeLocation method takes id, error callback, success callback
                            ajax.removeLocation($(this).attr("data-id"), 
                            // error callback
                            function(response){
                                console.log(response);
                                // update error modal and show it
                                $("#errorDisplay").html("There was an error deleting this tour stop.");
                                $("#errorModal").modal("show");
                            },
                            //success callback
                            function(response){
                                getLocations();
                            }
                        ); // end removeLocation call
                    }); // end "true delete" click

                    $("#checkModal").modal("show");
                    }) // end "delete" button click
                } // end type is "stop" condition
            } // end response "for" loop
        } // end getLocations success callback
    ) // end ajax.getLocations call      
}; // end getLocations function

// add location - click function for submit button on "add location" modal
$("#addLocationButton").on("click",function(){
    // validate form
    var textInputs = $("#addLocationModal [data-input]");
    var complete=true;

    // loop through text values
    textInputs.each(function(index,element){
        if ($(element).val().trim() === "" && $("#type input:radio:checked").val() === "stop") {
            // update error modal and show it
            $("#errorDisplay").html("The value for " + $(element).attr("placeholder") + " cannot be empty.");
            $("#errorModal").modal("show");
            complete=false;
            return false;
            };
        });

    // did "complete" status stay true?
    if (complete) {
        thisLocation = {
            "name": $("#locName").val().trim(),
            "description": $("#locDesc").val().trim(),
            "type": $("#type input:radio:checked").val(),
            "map": $("#shouldMap input:radio:checked").val(),
            "address": $("#locAddress").val().trim(),
            "image": $("#locImage").val().trim(),
            "pos": {
                "lat": $("#locPosLat").val().trim(),
                "lng":$("#locPosLng").val().trim()
            }
        };

           // let's make sure this is what they want
            var dataTable = $("<table class='checkData' table table-striped table-hover'>");
            dataTable.append("<thead><tr><th>Info</th><th>Value</th></tr></thead>");
            dataTable.append("<tbody>");

            $.each( thisLocation, function( key, value) {
                if ( key === "pos") {
                    value = "lat: "+value.lat + ", lng: " + value.lng;
                }
                var row = $("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
                dataTable.children().eq(1).append(row);
            });

            // update and show check modal
            $("#checkDisplay").html("<p>Is this what you want to post?</p>").append(dataTable);
            $("#checkDisplay").append("<button type='button' id='truePost' class='btn btn-warning' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-default' data-dismiss='modal'>No</button>");

            $("#checkModal").modal("show");

            
            //true post action
            $("#truePost").on("click", function(){

            // postLocation method takes post object, error, success callbacks
               
            ajax.postLocation(thisLocation, 
                // error callback
                function(response){
                    console.log(response);
                    // update error modal and show it
                    $("#errorDisplay").html("There was an error posting this location.");
                    $("#errorModal").modal("show");
                },
                //success callback
                function(response){
                    getLocations();
                }
            ); // end postLocation call
        }); // end "true post" click 
    }; // end "is complete" condition
}); // 

    // update location
    $("#updateLocationButton").on("click",function(){
        // todo: matchup jQuery selectors here with what we use in HTML
        var id = $("#")
        if ($("#locName").val()==="") 
            return false
            else {
                var name = $("#locName").val();
        
                if ($("#locDesc").val()==="") 
                    return false
                    else {
                        var description = $("#locDesc").val().trim();
        
                            var type = $("#type input:radio:checked").val();
                            var map = $("#shouldMap input:radio:checked").val();
                            var address = $("#locAddress").val().trim();        
                            var image = $("#locImage").val().trim();
                            var pos = {"lat": $("#locPosLat").val().trim(),"lng":$("#locPosLng").val().trim()}; 
                            var thisLocation = 
                            {
                                "name": name,
                                "type": type,
                                "map": map,
                                "address": address,
                                "description": description,
                                "image": image,
                                "pos": pos
                            };
                        }
                    };
            
            console.log("location:",thisLocation);
            ajax.updateLocation( thisLocation,
            //error callback
            function(response){
                console.log("Error:",response)
            },
        
            //success callback
            function(response){
                console.log(response);
                renderLocations(response);
            });    
    }); // end click function for updating Location item

}); //end doc ready