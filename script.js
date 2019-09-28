
$(document).ready(function() {

    //premade list of buttons
    let buttons = ["Dogs", "Puppies", "The Office", "The Sopranos", "The Office", "Peaky Blinders"];
    // localStorage.setItem("buttons", buttons);


    function renderButtons() {
        //empty button container
        $("#button-container").empty();

        //get button list from localStorage
        let buttons = localStorage.getItem("buttons").split(",");

        //create buttons for every item in buttons array
        for (let i = 0; i < buttons.length; i++) {

            let buttonText = buttons[i];

            //button attributes
            let newButton = $("<button>");
            newButton.attr("class", "btn btn-info button m-2");
            newButton.attr("data-name", buttons[i]);
            newButton.text(buttonText);

            //append button to 
            $("#button-container").append(newButton);
        }
    }
    renderButtons();
    
       //when submit is clicked
    //create a new button and clear the input field
    $("#submit").on("click", function(){
        event.preventDefault();

        //add input value to buttons array
        buttons.push($("#add-new-button").val());

        localStorage.setItem("buttons", buttons);
        
        //render buttons function call to ensure the new button added is rendered to the div
        renderButtons();

        //clear the input field after the button has been appended
        $("#add-new-button").val("");
    });

   

 

    $(document).on("click", ".button", function(){
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

                //actual gif image and attributes
                let newGif = $("<img>");
                newGif.attr("src", response.data[i].images.fixed_width.url);
                newGif.attr("data-state", "animate");
                newGif.attr("data-animate", response.data[i].images.fixed_width.url);
                newGif.attr("data-still",  response.data[i].images.fixed_width_still.url);
                newGif.attr("class", "mx-auto gif");

                //ratings and title
                let ratingInfo = $("<p>");
                ratingInfo.text(`Rating: ${response.data[i].rating}`);
                let gifTitle = $("<p>");
                gifTitle.text(response.data[i].title);

                //appending gif image and info to individual gif container
                gifDiv.append(newGif, gifTitle, ratingInfo);
                $("#gif-container").append(gifDiv);

            }
        })
    })


    $(document).on("click", ".gif", function(){
        let imageState = $(this).attr("data-state");

        console.log(imageState);

        //changes image url between still and animated conditionally based on the data-state attribute of the image
        if (imageState === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          } else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
    })
    



})