// Function to fetch the bearer token from local storage
function getBearerToken() {
    return localStorage.getItem('accessToken'); // Ensure the token is stored under 'accessToken' in localStorage
}

// Function to fetch all courses and populate the page
function fetchCourses() {
    const token = getBearerToken();

    fetch('https://hwzthat.com/api/all-course-list', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the token from localStorage
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'course_id': '' // You can pass specific data if needed
        })
    })
    .then(response => response.json())
    .then(data => {
        // Check if the result contains data
        if (data.result && Array.isArray(data.result.data)) {
            populateCourses(data.result.data);
        } else {
            console.error('Unexpected response format for courses:', data);
        }
    })
    .catch(error => console.error('Error fetching courses:', error));
}

// Populate courses dynamically
function populateCourses(courses) {
    const courseContainer = document.getElementById('course-container');
    const totalCourses = document.getElementById('total-courses');
    
    // Clear existing content
    courseContainer.innerHTML = '';
    
    // Update total courses count
    totalCourses.innerText = courses.length;

    courses.forEach(course => {
        // Use default image if the course image URL is not available
        const courseImage = course.image_url || 'images/cricketer.jpg';
        
        const courseElement = `
            <a href="course-details.html?id=${course.id}">
                <div class="package">
                    <div class="package-image">
                        <img src="${courseImage}" alt="${course.title}">
                        <div class="status-ribbon" style="background-image: url('images/${course.status}.png');">
                            <h4>${course.status}</h4>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="text">
                            <h4>${course.title}</h4>
                        </div>
                        <div class="course-details">
                            <h4><span>Duration: </span>${course.duration}</h4>
                            <span>|</span>
                            <h4><span>Batches: </span>${course.batches}</h4>
                        </div>
                        <div class="ribbon">
                            <h4>$${course.price}</h4>
                        </div>
                    </div>
                </div>
            </a>
        `;
        courseContainer.innerHTML += courseElement;
    });
}

// Function to fetch all packages and populate the page
function fetchPackages() {
    const token = getBearerToken();

    fetch('https://hwzthat.com/api/package-list', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the token from localStorage
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        // Check if the result contains data
        if (data.result && Array.isArray(data.result.data)) {
            populatePackages(data.result.data);
        } else {
            console.error('Unexpected response format for packages:', data);
        }
    })
    .catch(error => console.error('Error fetching packages:', error));
}

// Populate packages dynamically
function populatePackages(packages) {
    const packageContainer = document.getElementById('package-container');
    const totalPackages = document.getElementById('total-packages');

    // Clear existing content
    packageContainer.innerHTML = '';

    // Update total packages count
    totalPackages.innerText = packages.length;

    packages.forEach(pkg => {
        // Use default image if the package image URL is not available
        const packageImage = pkg.image_url || 'images/summer-camp.jpg';

        const packageElement = `
            <div class="package">
                <div class="package-image">
                    <img src="${packageImage}" alt="${pkg.title}">
                    <div class="status-ribbon" style="background-image: url('images/${pkg.status}.png');">
                        <h4>${pkg.status}</h4>
                    </div>
                </div>
                <div class="bottom">
                    <div class="text">
                        <h4>${pkg.title}</h4>
                    </div>
                    <div class="course-details">
                        <h4><span>Courses: </span>${pkg.course_count}</h4>
                    </div>
                    <div class="ribbon">
                        <h4 class="cross">$${pkg.price}</h4>
                        <h4>$${pkg.discounted_price}</h4>
                    </div>
                </div>
            </div>
        `;
        packageContainer.innerHTML += packageElement;
    });
}

// Function to fetch courses for the package dropdown (multiple courses)
function fetchCoursesForPackage() {
    const token = getBearerToken();
    const coursesList = document.getElementById('coursesList');

    fetch('https://hwzthat.com/api/all-course-list', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'course_id': '' // Modify based on required API parameters
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result && Array.isArray(data.result.data)) {
            coursesList.innerHTML = ''; // Clear the current dropdown options
            data.result.data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.text = course.title;
                coursesList.appendChild(option);
            });
        } else {
            console.error('Unexpected response format:', data);
        }
    })
    .catch(error => console.error('Error fetching courses:', error));
}

// Event listener to populate the courses dropdown when the modal is shown
$('#add-package').on('shown.bs.modal', fetchCoursesForPackage);

// Function to save the package
document.getElementById('savePackageBtn').addEventListener('click', function() {
    const token = getBearerToken();
    const packageName = document.getElementById('packageName').value;
    const selectedCourses = Array.from(document.getElementById('coursesList').selectedOptions).map(option => option.value);
    const packageFee = document.getElementById('packageFee').value;
    const packageDiscount = document.getElementById('packageDiscount').value;
    const packageDescription = document.getElementById('packageDescription').value;

    const payload = {
        package_id: "", // Assuming it's a new package, leave empty or modify as needed
        package_name: packageName,
        package_fees: packageFee,
        package_discount: packageDiscount,
        package_description: packageDescription,
        course_ids: selectedCourses // Send an array of selected course IDs
    };

    fetch('https://hwzthat.com/api/package-store', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Check for successful response using errorcode
        if (data.errorcode === 0) {
            alert('Package added successfully!');
            $('#add-package').modal('hide'); // Close the modal
            // Optionally refresh the packages list
            fetchPackages();
        } else {
            alert(`Error adding package: ${data.errormessage}`);
        }
    })
    .catch(error => console.error('Error saving package:', error));
});

// Ensure the script initializes when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchCourses();
    fetchPackages();
});
