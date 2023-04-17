document.addEventListener("DOMContentLoaded", function() {
  // Add click listener to search button
  document.querySelector("#buscar").addEventListener("click", function() {
    searchDigimon();
  });
  
  // Add event listener for Enter key press
  document.querySelector("#digimon-level").addEventListener("keypress", function(e) {
    if (e.which == 13) {
      searchDigimon();
    }
  });
  
  // Function to search Digimon
  function searchDigimon() {
    // Get search query from input field
    var query = document.querySelector("#digimon-level").value;
  
    // Make AJAX request to Digimon API
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Build HTML to display Digimon results
          var data = JSON.parse(xhr.responseText);
          var html = '<div class="row">';
          for (var i = 0; i < data.length; i++) {
            var digimon = data[i];
            html += '<div class="col-md-4">';
            html += '<div class="card mb-4">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">' + digimon.name + '</h5>';
            html += '<p class="card-text">Level: ' + digimon.level + '</p>';
            html += '<img src="' + digimon.img + '" alt="' + digimon.name + '" class="img-fluid">';
            html += '</div></div></div>';
          }
          html += '</div>';
  
          // Display Digimon results in container
          document.querySelector("#result-container").innerHTML = html;
        } else {
          // Display error message
          document.querySelector("#result-container").innerHTML = "<p>Error: " + xhr.statusText + "</p>";
        }
      }
    };
    xhr.open("GET", "https://digimon-api.vercel.app/api/digimon/level/" + query);
    xhr.send();
  }
});
