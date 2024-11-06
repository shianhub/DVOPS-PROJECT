// do your code here @shi an

document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const resourceId = event.target.dataset.id;

            try {
                const response = await fetch(`/delete-resource/${resourceId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Resource deleted successfully!');
                    // Optionally, remove the element from the DOM
                    event.target.closest('.resource-item').remove();
                } else {
                    const errorData = await response.json();
                    alert(`Error deleting resource: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while trying to delete the resource.');
            }
        });
    });
});
