document.addEventListener('DOMContentLoaded', function() {
    // All our code goes here

    const slider = document.getElementById('myRange');
    const valueDisplay = document.getElementById('length-value')

    // Update display when slider changes
    slider.addEventListener('input', function() {
      valueDisplay.innerText = this.value;
    });

  });