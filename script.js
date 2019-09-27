//pre-loaded button list
    //append the following for each gif:
        //1. STATIC gif
            //1a. when gif is clicked, it animates
                //use data-still and data-animate to store each gif's still and animated urls
                // on click listener to change source attribute


$(document).ready(function() {

    let buttons = [];

    //////////
    //push value of input field to buttons array
    // addNewButton function
    // for each item in buttons
    // create new buttons
    // call function every time submit is clicked??
    //////////////////////

    /////////////////////
    //a button is created with the value of the submitted input
    function createNewButton() {
        
        //text for the new button is equal to the input field's value (whatever the user types)
        let buttonText = $("#add-new-button").val();

        //setting content and attributes for the new button
        let newButton = $("<button>");
        newButton.attr("class", "btn btn-info gif-button m-2");
        newButton.attr("data-name", $("#add-new-button").val())
        newButton.text(buttonText);

        buttons.push(newButton);

        //button is appended to the button container
        $("#button-container").append(newButton);
    }
    //when submit is clicked
    
    $("#submit").on("click", function(){
        event.preventDefault();
        createNewButton();
        //clear the input field after the button has been appended
        $("#add-new-button").val("");
    });

    $(document).on("click", ".gif-button", function(){
        const apiKey = "7xcMQFVtRXWFvzwDuLfsYyabvpQjkV1C";
        const buttonTitle = $(this).attr('data-name');
        const queryUrl = `https://api.giphy.com/v1/gifs/search?apikey=${apiKey}&limit=10&q=${buttonTitle}`;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            //for loop to append 10 gifs to the gif area
            for (let i = 0; i <= 10; i++) {
                //individual gif container
                let gifDiv = $("<div>");
                gifDiv.attr("class", "col-3 mx-auto");

                //actual gif image
                let newGif = $("<img>");
                newGif.attr("src", response.data[i].images.fixed_width.url);
                newGif.attr("class", "mx-auto gif");

                let ratingInfo = $("<p>");
                ratingInfo.text(`Rating: ${response.data[i].rating}`);
                
                let gifTitle = $("<p>");
                gifTitle.text(`Title: ${response.data[i].title}`);

                //appending gif image and info to individual gif container
                gifDiv.append(newGif, gifTitle, ratingInfo);
                $("#gif-container").append(gifDiv);

            }
        })
    })


    $(document).on("click", ".gif", function(){
        //set up to pause and play gifs.....
        
        

    })
    


})