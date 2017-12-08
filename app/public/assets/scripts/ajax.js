var api = "https://savtourapi.herokuapp.com";

var ajax = {
    
    signup: function(userInfo,error,success) {
         $.post(api + "/api/signup",userInfo, function(response){
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
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

   // retrieve locations
    getLocations: function(error,success) {
        $.get( api + "/api/locations", function(response){
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    // post a location
    postLocation: function (location, error, success){
        $.post(api + "/api/new/location", location, function(response){
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)  
            }    
        });
    },

    // remove a location
    // here, we only need location _id
    removeLocation: function( locationId, error, success ){ 
        $.get(api + "/api/remove/location/" + locationId, function(response){
          
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    updateLocation: function( location, error, success ){
        $.post(api + "/api/update/location/", function(response) {
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });        
    },

    getFriends: function( error, success ){
        $.get(api + "/api/friends?source=https://savannahtourofhomes.org/friends-of-the-tour/", function(response){
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        });
    },

    addEvent: function( event, error, success ){
        $.post(api + "/api/new/event", event, function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    updateEvent: function( event, error, success ){
        $.post(api + "/api/update/event", event, function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    getEvents: function( error, success ){
        $.get(api + "/api/events/", function(response){
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        });
    },

    removeEvents: function( eventID, error, success ){
        $.get(api + "/api/remove/event/" + eventID, function(response){
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    }
}