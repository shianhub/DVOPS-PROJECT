function viewBlogs() {
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/view-blog', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = '';
            if (response.length === 0) {
                html = '<p class = "no-blog"> No blogs found!</p>';
            } else {
        for (var i = 0; i < response.length; i++) {
            html += `
                <div class="blog-post">
                    <h3>${response[i].title}</h3>
                    <p class="blog-content">${response[i].description}</p>
                    <p><strong>Created by:</strong> ${response[i].author}</p>
                    <div class="blog-actions">
                        <button class="blog actions" onclick="editResource(${JSON.stringify(response[i]).replace(/"/g, '&quot;')})">
                            <i class="fas fa-wrench"></i>
                        </button>
                        <button class="blog actions" onclick="deleteResource(${response[i].id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`;
        }
    }   

        document.getElementById('resourceContainer').innerHTML = html;
    };
    request.send();
}
