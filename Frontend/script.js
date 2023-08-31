// Date and Time
function upadateDateTime() {
    var currentTime = new Date();
    var date = currentTime.toLocaleDateString();
    var time = currentTime.toLocaleTimeString();
    var dateTimeString = date + ", " + time;
    document.getElementById("datetime").innerHTML = "Date & Time : " + dateTimeString;

}
upadateDateTime();
setInterval(upadateDateTime, 1000);


// Registration Form validation
function validateForm() {
    let vname = document.getElementById('name').value;
    if (vname === "" || vname.length > 50) {
        alert("Name should be filled out and should be less than 50 letters.");
        return false;
    }

    let vpnum = document.getElementById('phone').value;
    if (vpnum === "" || !/^[6-9]\d{9}$/.test(vpnum)) {
        alert("Enter correct phone number.");
        return false;
    }

    let vemail = document.getElementById('email').value;
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(vemail)) {
        alert("Enter correct email.");
        return false;
    }

    let vaddress = document.getElementById('address').value; // Corrected typo "myForms" to "myForm"
    if (vaddress === "" || vaddress.length > 150) {
        alert("Enter address and it should be less than 150 letters.");
        return false;
    }

    return true;
}


// Posting the data to the database //
document.getElementById('btn-sub').addEventListener('click', function () {
    if (validateForm()) {
        // Gather form data
        const formData = new FormData(document.forms['myForm']);
        const postData = {};
        formData.forEach((value, key) => {
            postData[key] = value;
        });

        // Make the POST request
        fetch('http://localhost:8080/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Thanks! " + data.name + ", Your id is " + data.id + " Keep it safe for the future reference.");
                document.forms['myForm'].reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

});



// Get the data by their id //
document.addEventListener('DOMContentLoaded', function () {
    const userIdInput = document.getElementById('userId');
    const submitBtn = document.getElementById('btn-sub');
    const resetBtn = document.getElementById('btn-reset');
    const userDataContainer = document.getElementById('user-data');

    function createTable(data) {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        ['ID', 'Name', 'Email', 'Phone No.', 'Address'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        const dataRow = document.createElement('tr');
        dataRow.innerHTML = `
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phoneNum}</td>
            <td>${data.address}</td>
        `;

        table.appendChild(headerRow);
        table.appendChild(dataRow);

        userDataContainer.innerHTML = '';
        userDataContainer.appendChild(table);
    }

    function clearUserData() {
        userDataContainer.innerHTML = '';
    }

    function fetchData() {
        const userId = userIdInput.value;

        if (userId) {
            const url = `http://localhost:8080/students/${userId}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && Object.keys(data).length > 0) {
                        createTable(data);
                    } 
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Enter a valid id.');
        }
    }

    resetBtn.addEventListener('click', function () {
        clearUserData();
        userIdInput.value = '';
    });

    submitBtn.addEventListener('click', fetchData);

    userIdInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchData();
        }
    });

});



// Get whole student details //
document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-gd-css');
    const tableContainer = document.getElementById('table-container');
    const getDetailsButton = document.getElementById('getDetails');


    function editStudent(id) {
        const row = event.target.closest('tr');
        const rowData = {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            email: row.cells[2].textContent,
            phoneNum: row.cells[3].textContent,
            address: row.cells[4].textContent
        };
    
        // Convert rowData to a query string
        const queryParams = Object.keys(rowData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(rowData[key])}`).join('&');
    
        // Redirect to the html page with the data as URL parameters
        window.location.href = `registrationForm.html?${queryParams}`;
    }

    function deleteStudent(id, row) {
        console.log('Delete student with ID:', id);

        if (row) {
            row.remove();
            fetch(`http://localhost:8080/students/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Student deleted:', data);
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                });
        }
    }

    // Use event delegation to handle button clicks
    tableContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const row = target.closest('tr');
            const id = row.querySelector('td:first-child').textContent;

            if (target.textContent === 'Edit') {
                editStudent(id);
            } else if (target.textContent === 'Delete') {
                deleteStudent(id, row);
            }
        }
    });

    // Fetch data from the API
    function fetchData() {
        fetch('http://localhost:8080/students')
            .then(response => response.json())
            .then(data => {
                createTable(data);
                formContainer.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to create the table
    function createTable(data) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['ID', 'Name', 'Email', 'Phone No.', 'Address', 'Actions'].forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        thead.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phoneNum}</td>
                <td>${item.address}</td>
                <td>
                    <button id="editButton">Edit</button>
                    <button id="deleteButton">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    // Add event listener to Get Details button
    getDetailsButton.addEventListener('click', function () {
        fetchData();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Parse query parameters
    const queryParams = new URLSearchParams(window.location.search);
    
    // Populate form fields with data from query parameters
    document.getElementById('name').value = queryParams.get('name');
    document.getElementById('email').value = queryParams.get('email');
    document.getElementById('phone').value = queryParams.get('phoneNum');
    document.getElementById('address').value = queryParams.get('address');
    const id = parseInt(queryParams.get('id'));

});


