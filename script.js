//pre-loaded button list

    //input field that user can type in a search
    //on submit
        //append new button with that input value to the buttons div
        //give that button bootstrap classes as necessary
        //give it a data-name attr

    //on button click
        //ajax call to giphy api
        //for 10 gifs that it returns
            //append the following for each gif:
                //1. STATIC gif
                    //1a. when gif is clicked, it animates
                        //use data-still and data-animate to store each gif's still and animated urls
                        // on click listener to change source attribute
                //2. Title
                //3. Tags
                //4. Rating.

$(document).ready(function() {

    //when submit is clicked
    //a button is created with the value of the submitted input
    $("#submit").on("click", function(){
        event.preventDefault();

        let buttonText = $("#add-new-button").val();

        let newButton = $("<button>");
        newButton.attr("class", "btn btn-info gif-button m-2");
        newButton.attr("data-name", $("#add-new-button").val())
        newButton.text(buttonText);

        //button is appended to the button container
        $("#button-container").append(newButton);

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
                gifDiv.attr("class", "col-3 border border-rounded");

                //actual gif image
                let newGif = $("<img>");
                newGif.attr("src", response.data[i].images.fixed_width.url);
                newGif.attr("class", "mx-auto");
                
                //appending gif image and info to individual gif container
                gifDiv.append(newGif);
                $("#gif-container").append(gifDiv);
            }
        })
    })



    


})