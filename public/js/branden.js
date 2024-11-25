let allBlogs = [];

// Fetch and display all blogs when the page loads
function viewBlogs() {
    const request = new XMLHttpRequest();

    request.open('GET', '/view-blog', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            allBlogs = JSON.parse(request.responseText); // Store all blogs for filtering
            console.log("Blogs fetched:", allBlogs); // Debug: Log fetched data
            displayBlogs(allBlogs); // Display all blogs initially
        } else {
            console.error("Failed to fetch blogs:", request.status, request.statusText);
        }
    };

    request.onerror = function () {
        console.error("Request failed.");
    };

    request.send();
}

// Display blogs on the page
function displayBlogs(blogs) {
    let html = '';
    blogs.forEach(blog => {
        html += `
            <div class="blog-post">
                <h3>${blog.title}</h3>
                <p class="blog-content">${blog.description}</p>
                <p><strong>Created by:</strong> ${blog.author}</p>
                <div class="blog-actions">
                    <button class="blog actions" onclick="editResource(${JSON.stringify(blog).replace(/"/g, '&quot;')})">
                        <i class="fas fa-wrench"></i>
                    </button>
                    <button class="blog actions" onclick="deleteResource(${blog.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
    });
    document.getElementById('resourceContainer').innerHTML = html;
    console.log("Blogs displayed:", blogs); // Debug: Log displayed data
}

// Filter blogs when the search button is clicked
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchInput === '') {
        displayBlogs(allBlogs);
        return;
    }

    const filteredBlogs = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchInput)
    );

    if (filteredBlogs.length > 0) {
        displayBlogs(filteredBlogs);
    } else {
        document.getElementById('resourceContainer').innerHTML = '<p>Blog not found!</p>';
    }

    console.log("Search term:", searchInput);
    console.log("Filtered blogs:", filteredBlogs);
}

// Initialize functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    viewBlogs();

    // Attach event listener to the Search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearch);
});
