$(document).ready(function(){

    // add listeners to buttons

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
 * FRIENDS OF TOUR LIST BUTTON
 ****************/
    $("#friendsButton").on("click",function(){
        ajax.getFriends( 
            // error callback
            function(response) {
                console.log("There was an error:",response.message);
            },
            // success callback
            function(response) {
                console.log("Successful:",response);
            }
        )
    }) // end click function for Friends of Tour list button


/*****************
 * LOCATIONS OPERATIONS
 ****************/

// get all locations
$("#locationsButton").on("click",function(){
    ajax.getLocations( 
        // error callback
        function(response) {
            console.log("There was an error:",response.message);
        },
        // success callback
        function(response) {
            console.log(response);

        }
    )
}) // end click function for Friends of Tour list button

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
        });    
            
    }); // end click function for adding location button

})// end doc ready