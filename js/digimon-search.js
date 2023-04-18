$(document).ready(function() {
  // Add click listener to search button
  $('#buscar').click(function() {
    searchDigimon();
  });
  
  // Add event listener for Enter key press
  $('#digimon-name').keypress(function(e) {
    if (e.which == 13) {
      searchDigimon();
    }
  });
  
  // Function to search Digimon
  function searchDigimon() {
    // Get search query from input field
    var query = $('#digimon-name').val();

    // Make AJAX request to Digimon API
    $.ajax({
      url: 'https://digimon-api.vercel.app/api/digimon/name/' + query,
      success: function(data) {
        // Build HTML to display Digimon results
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
        $('#result-container').html(html);
      },
      error: function(xhr, status, error) {
        // Display error message
        $('#result-container').html('<p>Error: ' + error + '</p>');
      }
    });
  }
});
