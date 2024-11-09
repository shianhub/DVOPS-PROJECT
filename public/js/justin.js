// Function to create and add the modal HTML to the document
function createEditModal() {
    const modalHTML = `
        <div class="modal fade" id="editResourceModal" tabindex="-1" role="dialog" aria-labelledby="editResourceModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editResourceModalLabel">Edit Resource</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="editTitle">Title</label>
                                <input type="text" class="form-control" id="editTitle" placeholder="Enter title">
                            </div>
                            <div class="form-group">
                                <label for="editDescription">Description</label>
                                <textarea class="form-control" id="editDescription" rows="3" placeholder="Enter description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="editAuthor">Author</label>
                                <input type="text" class="form-control" id="editAuthor" placeholder="Enter author email">
                            </div>
                            <p id="editMessage" class=""></p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="updateButton">Update Resource</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append modal to document body if it doesn’t already exist
    if (!document.getElementById('editResourceModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Edit resource function to populate and show the modal
function editResource(data) {
    // Check if `data` is a string and parse only if necessary
    var selectedResource = typeof data === "string" ? JSON.parse(data) : data;

    // Dynamically create modal if it doesn't exist
    createEditModal();

    // Populate the form fields with resource data
    document.getElementById("editTitle").value = selectedResource.title || '';
    document.getElementById("editDescription").value = selectedResource.description || '';
    document.getElementById("editAuthor").value = selectedResource.author || '';

    // Set the update button to call updateResource with the correct ID
    document.getElementById("updateButton").setAttribute("onclick", `updateResource("${selectedResource.id}")`);

    // Show the modal
    $('#editResourceModal').modal('show');
}


// Update resource function to send updated data to the server
function updateResource(id) {
    var jsonData = {
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        author: document.getElementById("editAuthor").value
    };

    // Validation
    if (jsonData.title === "" || jsonData.description === "" || jsonData.author === "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").className = "text-danger";
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(jsonData.author)) {
        document.getElementById("editMessage").innerHTML = 'Invalid email format for author!';
        document.getElementById("editMessage").className = "text-danger";
        return;
    }

    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-resource/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        try {
            const response = JSON.parse(request.responseText);
            if (response.message === "Invalid email format for author!"){
                document.getElementById("editMessage").innerHTML = 'Invalid email format for author!';
                document.getElementById("editMessage").className = "text-danger";
            } else if (response.message === "Blog modified successfully!") {
                document.getElementById("editMessage").innerHTML = 'Edited blog successfully!';
                document.getElementById("editMessage").className = "text-success";
                $('#editResourceModal').modal('hide');
                // Redirect to home or refresh the page
                window.location.href = 'index.html';
            } else {
                document.getElementById("editMessage").innerHTML = 'Unable to edit blog!';
                document.getElementById("editMessage").className = "text-danger";
            }
        } catch (e) {
            document.getElementById("editMessage").innerHTML = 'Error updating blog!';
            document.getElementById("editMessage").className = "text-danger";
        }
    };

    request.onerror = function() {
        document.getElementById("editMessage").innerHTML = 'Network error occurred!';
        document.getElementById("editMessage").className = "text-danger";
    };

    request.send(JSON.stringify(jsonData));
}

