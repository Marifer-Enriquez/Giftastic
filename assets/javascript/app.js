// Initial array of singers
    var singers = ["Adam Levine", "Justin Timberlake", "Jared Leto", "Robbie Williams", "Bruno Mars", "Zac Efron", "Keith Urban"];

      function displayGif (){
        reset ();
        //$("#singers-gif").empty();
        var singer = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ singer + "&api_key=dc6zaTOxFJmzC&limit=12";
        //ajax method to call gifs
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
          console.log(response);
          var results = response.data;
          for (var i = 0; i<results.length; i++){
            var imagedis = $(`<div class="card" id="cardgif${i}"  style="width: 18rem;">
            <img class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title"id="cardrating${i}">Rating: </h5>
              <p class="card-text"></p>
            </div>
            </div>`);
            $("#singers-gif").append(imagedis);
            var imageUrl = response.data[i].images.fixed_height_still.url;
            $("#cardgif" + i + " .card-img-top").attr("src", imageUrl);
            $("#cardgif" + i + " .card-img-top").attr("data-still", response.data[i].images.fixed_height_still.url);
            $("#cardgif" + i + " .card-img-top").attr("data-state", "still");
            $("#cardgif" + i + " .card-img-top").addClass ("gif");
            $("#cardgif" + i + " .card-img-top").attr("data-animate", response.data[i].images.fixed_height.url);
            imagedis.attr("alt", "Here's your gif");
            // Storing the rating
            var rating = response.data[i].rating;
            $("#cardrating" + i).html("Rating: "+ rating);
            stopGif();
          }
        })
      };

      function stopGif (){
       $(" .card-img-top").on("click", function(){
          var state = $(this).attr("data-state");
          if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          }     
          else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
         }
       })
      }


        // Function for displaying new singers
        function renderButtons() {
          // Delete the content inside the movies-view div prior to adding new movies
          $("#singers-gif").empty();
          // Loop through the array of singers, then generate buttons for each new in the array
          var a = $("<button>")
          for (var i = 0; i < singers.length; i++) {
            var a = $("<button>");
            a.addClass("singer-btn");
            a.attr("data-name", singers[i]);
            a.text(singers[i]);
            $("#singers-view").append(a);
          }
        };

      // This function handles events where the add singer button is clicked
      $("#add-singer").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        event.preventDefault();
        $("#singers-gif").empty();
        var singer = $("#singers-input").val().trim();
        singers.push(singer);
        renderButtons();
      });

      function reset(){
        $("#singers-gif").html("");
         
      }
      // Adding a click event listener to all elements with a class of "singer-btn"
      $(document).on("click", ".singer-btn", displayGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


      //background color
      var colors = new Array(
        [62,35,255],
        [60,255,60],
        [255,35,98],
        [45,175,230],
        [255,0,255],
        [255,128,0]);
      
      var step = 0;
      //color table indices for: 
      // current color left
      // next color left
      // current color right
      // next color right
      var colorIndices = [0,1,2,3];
      
      //transition speed
      var gradientSpeed = 0.002;
      
      function updateGradient()
      {
        
        if ( $===undefined ) return;
        
      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];
      
      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb("+r1+","+g1+","+b1+")";
      
      var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      var color2 = "rgb("+r2+","+g2+","+b2+")";
      
       $('#gradient').css({
         background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
          background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
        
        step += gradientSpeed;
        if ( step >= 1 )
        {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          
          //pick two new target color indices
          //do not pick the same as the current one
          colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          
        }
      }
      
      setInterval(updateGradient,10);
      
      