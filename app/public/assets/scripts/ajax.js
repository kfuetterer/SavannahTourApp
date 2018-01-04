var api = "http://localhost:3000";
//var api = "https://savtourapi.herokuapp.com";

var ajax = {
    
    signup: function(userInfo,error,success) {
        $.ajax({
            method: "POST",
            url: api + "/api/signup",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
            },
            data: userInfo
        })
        .done( function(response){
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }        
        })
        .fail( function(err){
            console.log("Signup error:",err);
            error(err);
        })
    },

    signin: function(userInfo,error,success){
        $.post( api + "/api/signin",userInfo, function(response){
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    getUsers: function( error, success ){
        $.ajax({
            method: "GET",
            url: api + "/api/users/",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                }
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response.data)
            }
        })
        .fail( function(err){
            console.log("Error getting users:",err);
        })
    },

    // update an admin user
    updateUser: function( user, error, success ){
        $.ajax({
            method: "POST",
            url: api + "/api/update/user",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                },
            data: user
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error updating user:",err);
        })
    },

    // remove an admin user
    // here, we only need user _id
    removeUser: function( userId, error, success ){ 
        $.ajax({
            method: "GET",
            url: api + "/api/remove/user/" + userId,
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                } 
        })
        .done( function(response){         
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        })
        .fail (function(err){
            console.log("Error removing user:",err);
        })
    },

   // retrieve locations
    getLocations: function(error,success) {
        $.ajax({
            method: "GET",
            url: api + "/api/locations",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                }
            })
        .done( function(response){
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error getting locations:",err);
        })    
    },

    // post a location
    postLocation: function (location, error, success){
        $.ajax({
            method: "POST",
            url: api + "/api/new/location", beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                },
            data: location
            })
            .done ( function(response){
                if (!response.success) {
                    error(response.message)
                }
                else {
                    success(response)  
                } 
            })
            .fail ( function(err) {
                console.log("Error posting a location:",err);
            })
    },

    // remove a location
    // here, we only need location _id
    removeLocation: function( locationId, error, success ){ 
        $.ajax({
            method: "GET",
            url: api + "/api/remove/location/" + locationId,
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                } 
        })
        .done( function(response){         
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        })
        .fail (function(err){
            console.log("Error removing location:",err);
        })
    },

    updateLocation: function( location, error, success ){
        $.ajax({
            method: "POST",
            url: api + "/api/update/location/",
            data: location,
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                }    
        })
        .done( function(response){
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error updating location:",err)
        });    
    },

    getFriends: function( error, success ){
        $.ajax({
            method: "GET",
            url: api + "/api/friends?source=https://savannahtourofhomes.org/friends-of-the-tour/",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                } 
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error retrieving Friends of the Tour:",err)
        })
    },

    addEvent: function( event, error, success ){
        $.ajax({
            method: "POST",
            url: api + "/api/new/event",
            data: event, 
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                } 
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error adding event:",err);
        })
    },

    updateEvent: function( event, error, success ){
        $.ajax({
            method: "POST",
            url: api + "/api/update/event",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                },
            data: event
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error updating event:",err);
        })
    },

    getEvents: function( error, success ){
        $.ajax({
            method: "GET",
            url: api + "/api/events/",
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                }
        })
        .done( function(response){
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error getting events:",err);
        })
    },

    removeEvents: function( eventID, error, success ){
        $.ajax({
            method: "GET",
            url: api + "/api/remove/event/" + eventID,
            beforeSend: function(request){
                request.setRequestHeader("x-access-token", localStorage.savTourToken) 
                }
        }).
        done( function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        })
        .fail( function(err){
            console.log("Error removing event:",err);
        })
    }
}