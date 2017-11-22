// load spinner
var loadSpinner = $("<div>").attr("id","loadSpinner").html("<i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");

// doc ready function
$(function(){

    renderEvents();

    $(".display").on('click', function (){
        var elementTarget = $(this).attr("data-target");

        if ($(elementTarget).css('display') === "none") {
            $(elementTarget).css("display", "block");
        } else {
            $(elementTarget).css("display", "none");
        }
    });

    $(".dropdown-menu").on('click', 'a', function(){
      $(".dropdownButton:first-child").text($(this).text());
      $(".dropdownButton:first-child").val($(this).text());
   });

    //date and time picker
    $('.datepicker1').datepicker({
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome'
    });

    $('.datepicker2').datepicker({
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome'
    });

    $('.datepicker3').datepicker({
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome'
    });

    $('.datepicker4').datepicker({
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome'
    });

    // $('.timepicker').timepicker({
    //     'showDuration': true,
    //     'timeFormat': 'g:ia'
    // });

    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyCe-TswixIGT0FYQGnCqxUwWPj-urYA6HI',
        eventSources: [
            {
                googleCalendarId: 'u7lunt18utajm5dd2ifbqsiegk@group.calendar.google.com'
            }
        ],
        editable: true,
        eventStartEditable: true,
        eventDurationEditable: true,
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
                $("#eventEditDisplay").html("<h4 class='blackFont'>" + event.title + "</h4><br><h5 class='blackFont'>Start:</h5><p class='blackFont'>" + (moment(event.start).format('MMMM Do')) + ", " + (moment(event.start).format('h:mm A')) + "</p><h5 class='blackFont'>End:</h5><p class='blackFont'>" + (moment(event.end).format('MMMM Do')) + ", " + (moment(event.end).format('h:mm A')) + "</p><br><p>" + event.description + "</p>")                       
                $("#checkDisplay").html("<p>Delete "+ event.title + "?</p><button type='button' id='trueDeleteEvent' data-id='" + event._id + "' class='btn btn-warning btn-space' data-dismiss='modal'>Yes</button><button type='button' class='btn btn-default btn-space' data-dismiss='modal'>No</button>");
                    $("#trueDeleteEvent").on("click", function(){
                        // removeLocation method takes id, error callback, success callback
                        ajax.removeEvents($(this).attr("data-id"), 
                        // error callback
                        function(response){
                            console.log(response);
                            // update error modal and show it
                            $("#errorDisplay").html("There was an error deleting this event.");
                            $("#errorModal").modal("show");
                        },
                        //success callback
                        function(response){
                            renderEvents();
                        }); // end removeEvent call
                    }); // end "true delete" click
                    $("updateEventButton").on("click", function(){
                        var updateTitle;
                        var updateDescription;
                        var updateStartDate;
                        var updateStartTime;
                        var updateEndDate;
                        var updateEndTime;

                        if ($("#editEventTitle").val().trim() !== "") {
                            updateTitle = $("#editEventTitle").val().trim();
                        } else {
                            updateTitle = event.title;
                        }

                        if ($("#editEventDescription").val().trim() !== "") {
                            updateDescription = $("#editEventDescription").val().trim();
                        } else {
                            updateDescription = event.description;
                        }

                        if ($("#editEventStartDate").val().trim() !== "") {
                            updateStartDate = $("#editEventStartDate").val().trim();
                        } else {
                            updateStartDate = (moment(event.start).format('YYYY-MM-DD'));
                        }

                        if ($("#editEventStartTime").val().trim() !== "") {
                            updateStartTime = $("#editEventStartTime").val().trim();
                        } else {
                            updateStartTime = (moment(event.start).format('hh:mm:ss'));
                        }

                        if ($("#editEventEndDate").val().trim() !== "") {
                            updateEndDate = $("#editEventEndDate").val().trim();
                        } else {
                            updateEndDate = (moment(event.end).format('YYYY-MM-DD'));
                        }

                        if ($("#editEventEndTime").val().trim() !== "") {
                            updateEndTime = $("#editEventEndTime").val().trim();
                        } else {
                            updateEndTime = (moment(event.end).format('hh:mm:ss'));
                        }

                        var updateStart = updateStartDate + "T" + updateStartTime;
                        var updateEnd = updateEndDate + "T" + updateEndTime;

                        var updatedEvent = {
                            _id: event._id,
                            title: updateTitle,
                            description: updateDescription,
                            start: updateStart,
                            end: updateEnd
                        }    

                        console.log(updatedEvent);   

                        ajax.updateEvent(updateEvent),
                        function(response){
                            console.log(response);
                            $("#errorDisplay").html("There was an error deleting this event.");
                        },
                        function(response){
                            renderEvents();
                        }

                    });
                $("#eventTitle").html(event.title);
                $("#startTime").html((moment(event.start).format('MMMM Do')) + ", " + (moment(event.start).format('h:mm A')));
                $("#endTime").html((moment(event.end).format('MMMM Do')) + ", " + (moment(event.end).format('h:mm A')));
                $("#eventInfo").html(event.description);
                $("#eventContent").dialog({ modal: true, width:450});
            });
        },
        eventDrop: function (event, element) {

            var updateDropEvent = {
                _id: event._id,
                title: event.title,
                description: event.description,
                start: event.start,
                end: event.end
            };

            console.log(updateDropEvent);

            ajax.updateEvent(updateDropEvent),
            function(response){
                console.log(response);
                $("#errorDisplay").html("There was an error deleting this event.");
            },
            function(response){
                renderEvents();
            }
        },
        eventColor: '#5bc0de'
    });

    $("#events-tab").on("click", function(event){
        renderEvents();
    });

    function renderEvents() {
        $('#calendar').fullCalendar('removeEvents')
        ajax.getEvents( 
            function(response) {
                console.log("There was an error:",response.message);
                // update error modal and show it
                $("#errorDisplay").html("There was an error retrieving your data.");
                $("#errorModal").modal("show");
            }, // end error callback
            // success callback
            function(response) {
                console.log(response.data);
                var events = [];
                for(var i = 0; i < response.data.length; i++){
                    events.push(response.data[i]);
                }
                $('#calendar').fullCalendar( 'renderEvents', events, true);
            } // end getEvents success callback
        ) // end ajax.getEvents call      
    }

    $("#addNewEventButton").on("click", function(){
        var startDate = $("#eventStartDate").val().trim();
        var startTime = $("#eventStartTime").val().trim();
        var endDate = $("#eventEndDate").val().trim();
        var endTime = $("#eventEndTime").val().trim();

        var start = startDate + "T" + startTime;
        var end = endDate + "T" + endTime; 

        var event = {
            title: $("#addEventTitle").val().trim(),
            description: $("#addEventDescription").val().trim(),
            start: start,
            end: end
        };

        console.log(event);

        ajax.addEvent(event, 
            // error callback
            function(response){
                console.log(response);
                // update error modal and show it
                $("#errorDisplay").html("There was an error posting this location.");
                $("#errorModal").modal("show");
            },
            //success callback
            function(response){
                renderEvents();
            }
        )
    });


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