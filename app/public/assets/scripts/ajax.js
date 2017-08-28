const api = "https://savtourapi.herokuapp.com";

const ajax = {
    
    signup: (userInfo,error,success) =>  {
         $.post(`${api}/api/signup`,userInfo, (response)=>{
            if (!response.success) {
                error(response.message)
            }
            else {
                console.log("Sign-up successful");
                success(response)
                }
            })
        },

    signin: (userInfo,error,success) => {
        $.post(`${api}/api/signin`,userInfo, (response) =>{
            if(!response.success) {
                error(response.message)
            }
            else {
                console.log("Sign-in successful");
                success(response)
                }
            })
        },

   // retrieve locations
    getLocations: (error,success) =>{
        $.get(`${api}/api/locations`, (response) => {
            if(!response.success) {
                error(response.message)
            }
            else {
                console.log("Locations fetch successful");
                success(response)
            }
        })
    },

    // post a location
    postLocation: ( location, error, success ) => {

        $.post(`${api}/api/new/location`, location, (response) => {
            if (!response.success) {
                error(response.message)
            }
            else {
                console.log("Location post successful");
                success(response)  
            }    
        })
    },

    // remove a location
    // here, we only need song_id
    removeLocation: ( locationId, error, success ) => { 

        console.log("Location", locationId);
        $.get(`${api}/api/remove/location/${locationId}`, (response) => {
          
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
            }
        })
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

    addFriend: ( error, success ) => {
        $.post(`${api}/api/new/friend`, friend, (response) => {
            if (response.error){
                error(response)
            }
            else {
                console.log("Friend post successful", response);
                success(response)
            }
        })
        },

    removeFriend: ( friendID, error, success ) => {
        $.get(`${api}/api/remove/friend/${friendId}`, (response) => {
            if (response.error){
                error(response)
            }
            else {
                console.log("Friend deletion successful", response);
                success(response)
            }
        })
        },

    getFriends: ( error, success ) => {
        $.get(`${api}/api/friendsoftour/`, (response)=>{
            if (response.error){
                error(response)
            }
            else {
                console.log("Friends search successful");
                // response will be object where data is in 'data' key
                success(response)
            }
            }) 
        }
}