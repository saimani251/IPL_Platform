function toggleMenu() {
    var menu = document.getElementById("side-menu");
    if (menu.style.width === '250px') {
        menu.style.width = '0';
    } else {
        menu.style.width = '250px';
    }
}
let slideIndex = 0;
showSlides();


function plusSlides(n) {
  showSlides(slideIndex += n);
}


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length > 0) { 
    slides[slideIndex-1].style.display = "block";  
  }
  if (dots.length > 0) { 
    dots[slideIndex-1].className += " active";
  }
  setTimeout(showSlides, 4000); 
}

document.addEventListener('DOMContentLoaded', function () {
    var battingSelect = document.getElementById('batting_team');
    var bowlingSelect = document.getElementById('bowling_team');

    function handleTeamSelection(event, otherSelect) {
       
        var otherOptions = otherSelect.options;

        
        for (var i = 0; i < otherOptions.length; i++) {
            otherOptions[i].disabled = false; 
        }

       
        if (event.target.value) {
            var optionToDisable = Array.from(otherOptions).find(option => option.value === event.target.value);
            if (optionToDisable) {
                optionToDisable.disabled = true;
            }
        }

        
        if (otherSelect.options[otherSelect.selectedIndex].disabled) {
            otherSelect.value = ''; 
        }
    }

    battingSelect.addEventListener('change', function(event) {
        handleTeamSelection(event, bowlingSelect);
    });

    bowlingSelect.addEventListener('change', function(event) {
        handleTeamSelection(event, battingSelect);
    });
});


