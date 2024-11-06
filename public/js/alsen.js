function addResource() {
    var response = "";
    var jsonData = new Object();
    jsonData.title = document.getElementById("title").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.author = document.getElementById("author").value;
  
    // Ensure all fields are filled out
    if (jsonData.title == "" || jsonData.description == "" || jsonData.author == "") {
      document.getElementById("message").innerHTML = 'All fields are required!';
      document.getElementById("message").setAttribute("class", "text-danger");
      return;
    }
  
    var request = new XMLHttpRequest();
    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
      response = JSON.parse(request.responseText);
      console.log(response);
      
      if (!response.message) {
        document.getElementById("message").innerHTML = 'Added Resource: ' + jsonData.title + '!';
        document.getElementById("message").setAttribute("class", "text-success");
        
        // Clear form fields
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("author").value = "";
        
        window.location.href = 'index.html';
      } else {
        document.getElementById("message").innerHTML = 'Unable to add resource!';
        document.getElementById("message").setAttribute("class", "text-danger");
      }
    };
    
    request.send(JSON.stringify(jsonData));
  }
  