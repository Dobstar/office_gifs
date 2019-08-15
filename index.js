
// Deliverables
// Get GIFs from the specified API and display them on the page. The URL is in the provided code 
// Clicking the delete button should remove the GIF from the page and the backend without refreshing the page. 
// Clicking “Add more GIFs” should add one GIF without refreshing the page 
// Filling in the form should create a new GIF in the front  and backend without refreshing the page 

// Setup 
// Run json-server to get going. The command: json-server --watch db.json
// CSS has been provided to automatically style your GIFs. Don’t alter this.



// Get GIFs from the specified API and display them on the page. The URL is in the provided code :

API_URL = `http://localhost:3000/gifs/`;

//fetching the gifs

const fetchingGifs = () => {
    fetch(API_URL)
    .then(resp => resp.json())
    .then(resp => renderGifs(resp))
};

const renderGifs = (gifs) => {
    gifs.forEach(gif => {
        renderGif(gif)
    });
};
//querySelector to put the gif onto 


const main = document.querySelector('main');

const renderGif = (gif) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const deletebtn = document.createElement('button');
    
    //put an if else statement, so that when rendering a gif, if it is from the original array then 
    //use the gif.media[0].gif.url, else... use the gif.url which is for any new gifs that have
    //been added
    if (gif.media) {
        
        img.src = gif.media[0].gif.url
    } else {
    
        img.src = gif.url
    }
   

 
    //To delete something from the frontend: 
    //1. create the button and put it inside of render. Give the button the id of the gif that 
    //has been passed in. Apend it.
    //2. Create an event listener (click) and use target on the event, grab the parentElement and
    //use the method   .remove();
    //Create a DELETE REQ, which will also be called inside of the event listener. using the 
    //event.target.className

    deletebtn.className = gif.id

    div.append(img,deletebtn)
    main.append(div)

    deletebtn.addEventListener('click', event => {
        event.target.parentElement.remove();
        deleteGif( event.target.className);
    
    });
};

//DELETE REQ- passing the id into the function, fetching the Original URL and adding this id
//the id of the gif that the user wants to delete... string interpolated into the cointinuation
//of the URL.  (API_URL + `/${id}`, {}) and passing it an argument of the method of the request
//being used: DELETE!

// DELETE REQ (THE BACKEND)
const deleteGif = id => {
    fetch(API_URL + `/${id}`, {
        method: "DELETE"
    })
}


//Now to add a gif onto the page (using the form already made)

//so will use a query Selector to grab the form that will have the user's input inside.

const form = document.querySelector('#more-gifs');

//using newly selected form and putting a submit eventlistener onto it. also putting a prevent 
//Default inside
//creating a variable that targets the children of the form. [1] grabs the child that we want
//using value to get the value of the input.

//putting the addingGif(userInput) inside of the event listener that holds the details for the POST
//request to send to the backend

form.addEventListener('submit', event => {
    event.preventDefault();
    const userInput = event.target.children[1].value;

     addingGif(userInput);

});
//same as the if else statement made! in the renderGif section.
//  obj = {
//      media: [
//          {
//              gif: {
//                  url: userInput 
//              }
//          }
//      ]

//  }

//created the addingGif to create a post request to send the details to the backend.
let addingGif = (userInput) => {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "applicaton/json",
        },
        body: JSON.stringify({
            url: userInput})

        }).then(resp => resp.json())
        .then(resp => renderGif(resp))
}



document.addEventListener("DOMContentLoaded", () => {
    fetchingGifs();
})
