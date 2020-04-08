
      var chiudoilvideo = document.getElementById("closebuttonvideo");

   // Get accetto
    var tastoaccetto = document.getElementById("accetto");
           // Get the modal
     var modal = document.getElementById("myModal");

     var carousel = document.getElementById("insidetrash");
     var carouselvideo = document.getElementById("insidedownload");

     // Get the button that opens the modal
     var btn = document.getElementById("mex");

     var btntrash = document.getElementById("trash");
      var btndownload = document.getElementById("download");

     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];

     var spantrash = document.getElementsByClassName("closetrash")[0];
     var spandownload = document.getElementsByClassName("closedownload")[0];

     var vidmood = document.getElementById("moodvideo");
     var vidfinale = document.getElementById("videoparte2");


     // When the user clicks on the button, open the modal

chiudoilvideo.onclick = function() {
  document.getElementById("myVideo").remove();
  document.getElementById("backsupport").style.display="none";
  document.getElementById("closebuttonvideo").style.display="none";
}

tastoaccetto.onclick = function() {
  document.getElementById("myModal").remove();
  document.getElementById("mex").remove();
  document.getElementById("mexstatico").style.display="block";
}


btntrash.onclick = function() {
  carousel.style.display = "block";
}


btndownload.onclick = function() {
  carouselvideo.style.display = "block";
}



     btn.onclick = function() {
       modal.style.display = "block";
     }

     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
       modal.style.display = "none";
     }


     spantrash.onclick = function() {
       carousel.style.display = "none";
       vidfinale.pause();
     }

     spandownload.onclick = function() {
       carouselvideo.style.display = "none";
       vidmood.pause();
     }

     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
       if (event.target == modal) {
         modal.style.display = "none";
       }
     }
