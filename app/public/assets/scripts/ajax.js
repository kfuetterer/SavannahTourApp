const api = "https://savtourapi.herokuapp.com";

const ajax = {
    
    signup: (userInfo,error,success) =>  {
         $.post(`${api}/api/signup`,userInfo, (response)=>{
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    signin: (userInfo,error,success) => {
        $.post(`${api}/api/signin`,userInfo, (response) =>{
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

   // retrieve locations
    getLocations: (error,success) =>{
        $.get(`${api}/api/locations`, (response) => {
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    // post a location
    postLocation: ( location, error, success ) => {
        console.log("posting:",location);
        $.post(`${api}/api/new/location`, location, (response) => {
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
    removeLocation: ( locationId, error, success ) => { 
        $.get(`${api}/api/remove/location/${locationId}`, (response) => {
          
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });
    },

    updateLocation: ( location, error, success ) => {
        $.post(`${api}/api/update/location/`, (response)=> {
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });        
    },

    addFriend: ( friend, error, success ) => {
        $.post(`${api}/api/new/friend`, friend, (response) => {
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    removeFriend: ( friendID, error, success ) => {
        $.get(`${api}/api/remove/friend/${friendId}`, (response) => {
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    getFriends: ( error, success ) => {
        $.get(`${api}/api/friendsoftour/`, (response)=>{
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        });
    },

    updateFriend: ( friend, error, success ) => {
        $.post(`${api}/api/update/friend/`, (response)=> {
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        });        
    },

    addEvent: ( event, error, success ) => {
        $.post(`${api}/api/new/event`, event, (response) => {
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    updateEvent: ( event, error, success ) => {
        $.post(`${api}/api/update/event`, event, (response) => {
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    },

    getEvents: ( error, success ) => {
        $.get(`${api}/api/events/`, (response)=>{
            if (response.error){
                error(response)
            }
            else {
                // response will be object where data is in 'data' key
                success(response)
            }
        });
    },

    removeEvents: ( eventID, error, success ) => {
        $.get(`${api}/api/remove/event/${eventID}`, (response) => {
            if (response.error){
                error(response)
            }
            else {
                success(response)
            }
        });
    }
}