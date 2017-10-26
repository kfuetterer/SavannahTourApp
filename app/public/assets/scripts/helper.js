// load spinner
var loadSpinner = $("<div>").attr("id","loadSpinner").html("<i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");

// doc ready function
$(function(){

    // $('#datepicker').datepicker({
    //     uiLibrary: 'bootstrap4',
    //     iconsLibrary: 'fontawesome'
    // });

        //var CLIENT_ID = '439243599097-lerjf9s77a5l755l7rklijr6jb23ouu9.apps.googleusercontent.com';
        //API KEY: AIzaSyCe-TswixIGT0FYQGnCqxUwWPj-urYA6HI

    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyCe-TswixIGT0FYQGnCqxUwWPj-urYA6HI',
        eventSources: [
            {
                googleCalendarId: 'u7lunt18utajm5dd2ifbqsiegk@group.calendar.google.com'
            }
        ],
        editable: true,
        weekMode: 'liquid',
        defaultView: 'month',
        header: {
            left:   'today prev,next',
            center: 'title',
            right:  'month, agendaWeek, agendaDay'
        },
        eventRender: function (event, element) {
            element.attr('href', 'javascript:void(0);');
            element.click(function() {
                $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
                $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
                $("#eventInfo").html(event.description);
                $("#eventLink").attr('href', event.url);
                $("#eventContent").dialog({ modal: true, title: event.title, width:350});
            });
        },
        events: [

        ]
    });

    $("events-tab").on("click", function(event){

    });

    var event={id:1 , title: 'New event', start:  new Date()};

    $('#calendar').fullCalendar( 'renderEvent', event, true);

        // "name": name,
        // "type": type,
        // "map": map,
        // "address": address,
        // "description": description,
        // "image": image,
        // "pos": pos

    $("#tourstops-tab").on("click", getLocations);

    $("#sponsors-tab").on("click", function(event){
        ajax.getLocations( 
            // error callback
            function(response) {
                console.log("There was an error:",response.message);
            },
            // success callback
            function(response) {
                console.log(response);

                //only retrieve type: sponsor, for all sponsors
                //only retrieve type: sponsor, map: true, for all sponsors with tourstops
                //only retrieve type: sponsor, map: false, for all sponsors without tourstops

                var sponsorTableBody = $("sponsorsdata").children().eq(1);

                $("#dropdownAllSponsors").on("click", function (event) {
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor") {
                            $(sponsorTableBody).append("<tr><td>" + response.data[i].name + "</td><td>" + response.data[i].type + "</td><td>" + response.data[i].address + "</td></tr>");
                        }
                    }
                });

                $("#dropdownSponsorWLocations").on("click", function (event) {
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor" && response.data[i].map === "true") {
                            $(sponsorTableBody).append("<tr><td>" + response.data[i].name + "</td><td>" + response.data[i].type + "</td><td>" + response.data[i].address + "</td></tr>");
                        }
                    }
                });
                
                $("dropdownSponsorNoLocations").on("click", function (event) {
                    for(var i = 0; i < response.data.length; i++){
                        if (response.data[i].type === "sponsor" && response.data[i].map === "false") {
                            $(sponsorTableBody).append("<tr><td>" + response.data[i].name + "</td><td>" + response.data[i].type + "</td><td>" + response.data[i].address + "</td></tr>");
                        }
                    }
                });
            });
    });

    $("#friendsoftour-tab").on("click", function(event){

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
                    console.log(response)
                }
            );

        };
    }); // end click function for user sign in

/*****************
 * FRIENDS OF TOUR OPERATIONS
 ****************/

// get all friends of tour
$("#friendsButton").on("click",function(){
    ajax.getFriends( 
        // error callback
        function(response) {
            console.log("There was an error:",response.message);
        },
        // success callback
        function(response) {
            console.log("Successful:",response);
            renderFriends(response);
            // to do: create a function to render friends list to page and call it here; we'll do it that way because we'll call ajax.getFriends() from other places, not just as a click function. 
            // The renderFriends() function must include adding data-id attributes both to a "remove" button and the element containing the friend name
        }
    )
}) // end click function for Friends of Tour list button

// add Friend of Tour
$("#addFriendButton").on("click",function(){
    if ($("#friendName").val()==="") 
        return false
    else {
        var friend = {"name": $("#friendName").val()};
        console.log("friend:",friend);
        ajax.addFriend( friend,
        //error callback
        function(response){
            console.log("Error:",response)
        },
    
        //success callback
        function(response){
            console.log(response);
            // after adding, get full list again
            ajax.getFriends(
                // error callback
                function(response) {
                    console.log("There was an error:",response.message);
                },
                // success callback
                function(response) {
                    console.log(response);
                    renderFriends(response);
                }
            );   
        });
    };    
}); // end click function for getting Friends of Tour list

// update Friend of Tour
$(".updateFriendButton").on("click", function(){
    // todo: matchup jQuery selector here ($(this)) with what we use in HTML
    var id = $(this).attr("data-id");
    var friend = { 
        "name": $(".friendContainer['data-id'=id]").val().trim(), 
        "id": id
    };
    ajax.updateFriend(friend,
        // error callback
        function(response){
            console.log("There was an error:",response.message);
        },
        //success callback
        function(response){
            console.log(response);
            // after adding, get full list again
            ajax.getFriends(
                // error callback
                function(response) {
                    console.log("There was an error:",response.message);
                },
                // success callback
                function(response) {
                    console.log(response);
                    renderFriends(response);
                }
            );   
        });
}); // end click function for updating Friends of Tour item


$(".removeFriendButton").on("click",function(){
    ajax.removeFriend( friendID,
    //error callback
    function(response){
        console.log("There was an error:",response.message)
    },
    //success callback
    function(response){
        console.log(response);
        ajax.getFriends(
            // error callback
            function(response) {
                console.log("There was an error:",response.message);
            },
            // success callback
            function(response) {
                console.log("Successful:",response);
                renderFriends(response);
            }
        );
    });
});

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
            console.log(response);

            // remove load spinner
            $(loadSpinner).remove();

            var tourStopTableBody = $("#tourstopdata").children().eq(1);
            $(tourStopTableBody).empty();

            for(var i = 0; i < response.data.length; i++){
                if (response.data[i].type === "stop") {

                    // build contextual icons
                    var deleteIcon = "<i data-action=\"delete\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>";
                    var editIcon = "<i data-action=\"edit\" data-id=\"" + response.data[i]._id + "\" data-name=\"" + response.data[i].name + "\"  class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";

                    // build row
                    var thisRow = $("<tr><td>" + editIcon + " " + deleteIcon + "</td><td>" + response.data[i].name + "</td><td>" + response.data[i].address + "</td></tr>");
                    // add row to table
                    tourStopTableBody.append(thisRow);
                    
                    // add click listeners to icons
                    // delete
                    $("[data-action='delete'").on("click", function(){
                        $("#checkDisplay").html("<p>Delete "+ $(this).attr("data-name") + "?</p><div type='button' id='trueDelete' data-id='" + $(this).attr('data-id') + "' class='btn btn-info' data-dismiss='modal'>Yes</div><div type='button' class='btn btn-info' data-dismiss='modal'>No</div>");

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

// add location
$("#addLocationButton").on("click",function(){
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
        ajax.postLocation( thisLocation,
        //error callback
        function(response){
            console.log("Error:",response)
        },
    
        //success callback
        function(response){
            console.log(response);
            renderLocations(response);
        });    
            
    }); // end click function for adding location button

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

})// end doc ready