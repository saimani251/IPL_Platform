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

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
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
  if (slides.length > 0) { // Check if there are slides
    slides[slideIndex-1].style.display = "block";  
  }
  if (dots.length > 0) { // Check if there are dots
    dots[slideIndex-1].className += " active";
  }
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

document.addEventListener('DOMContentLoaded', function () {
    var battingSelect = document.getElementById('batting_team');
    var bowlingSelect = document.getElementById('bowling_team');

    function handleTeamSelection(event, otherSelect) {
        // Find all options in the other select
        var otherOptions = otherSelect.options;

        // Loop through all options in the other select element
        for (var i = 0; i < otherOptions.length; i++) {
            otherOptions[i].disabled = false; // Enable all options first
        }

        // Disable the option in the other select that matches the selected value
        if (event.target.value) {
            var optionToDisable = Array.from(otherOptions).find(option => option.value === event.target.value);
            if (optionToDisable) {
                optionToDisable.disabled = true;
            }
        }

        // Reset the other select if the currently selected team is now disabled
        if (otherSelect.options[otherSelect.selectedIndex].disabled) {
            otherSelect.value = ''; // Resets the select box if selected team is disabled
        }
    }

    battingSelect.addEventListener('change', function(event) {
        handleTeamSelection(event, bowlingSelect);
    });

    bowlingSelect.addEventListener('change', function(event) {
        handleTeamSelection(event, battingSelect);
    });
});


