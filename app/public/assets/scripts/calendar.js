// ready function
$( function(){

    // click function for add event button
    $("[data-target='addEvent']").on("click", function(){
        $("#addEvent").modal("show");
    })
    
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

    $('.timepicker').timepicker({
        'showDuration': true,
        'timeFormat': 'g:ia'
    });

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
            eventClick(event, element);
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

function eventClick(event, element) {
    $(element).on("click", function(){
        console.log('clicked');
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
};

    $("#events-tab").on("click", function(event){
        renderEvents();
    });

    function renderEvents() {
        console.log("renderEvents function")
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
}); // end ready function