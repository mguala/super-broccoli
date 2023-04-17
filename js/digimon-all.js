$(document).ready(function() {
  // Add click listener to search button
  $('#all').click(function() {
    getAllDigimon();
  });

  // Function to get all Digimon
  function getAllDigimon() {
    // Make AJAX request to Digimon API
    $.ajax({
      url: 'https://digimon-api.vercel.app/api/digimon',
      success: function(data) {
       // Sort the Digimon in ascending order by name
       data.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      
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