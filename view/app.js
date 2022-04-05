/* 
fetch("/api/users")
    // Converting received data to JSON
    .then(response => response.json())
    .then(json => {
  
        // Create a variable to store HTML
        let li = `<div><tr><th>Name</th><th>Age</th><th>Email</th></tr></div>`;

        // Loop through each data and add a table row
        json.forEach(user => {
            li += `<div><tr>
                <td>${user.firstName} </td>
                <td>${user.age} </td>
                <td>${user.email}</td>
            </tr></div>`;
        });
  
    // Display result
    document.getElementById("users").innerHTML = li;

});
*/
let getUserBtn = document.querySelector("#getUsers")
let createUserBtn = document.querySelector("#createNew")

const newName = document.querySelector('#new-name');
const newAge = document.querySelector('#new-age');
const newEmail = document.querySelector('#new-email');



createUserBtn.addEventListener('click', e => {
    e.preventDefault()
    const newUser = {
        firstName: newName.value,
        age: newAge.value,
        email: newEmail.value
    };
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
    .catch( err => console.log(err))
})

getUserBtn.addEventListener('click', e => {
    e.preventDefault()
    fetchAPI()
})


function fetchAPI() {
    fetch("/api/users").then((data)=>{
        //console.log(data);
        // convert to object format
        return data.json()
    }).then((completeData) => {
        //completeData is array object
        //console.log(completeData[0].firstName);
        //completeData.forEach(user => {
        let dataArray = ""
        completeData.map((values) => {
            // this gives all objects, without dataArray +=, this only returns the first object.
            dataArray += `<div class="inner-app"> 
            <p>User's first name: ${values.firstName}</p>
            <p>User's age: ${values.age}</p>
            <p>User's email: ${values.email}</p>
            <p>User's id: ${values._id}</p>
            <input type="text" id="update-name" value="update first name">
            <input type="text" id="update-age" value="update age">
            <input type="email" id="update-email" value="update email">
            <button data-delete="${values._id}">Delete User</button>
            <button data-update="${values._id}">Update User</button>
            <p>(click "get all users" button to refresh updated information)</p>
            </div>
            `
        });
        document.getElementById("app").innerHTML=dataArray;
        const updateName = document.querySelector('#update-name');
        const updateAge = document.querySelector('#update-age');
        const updateEmail = document.querySelector('#update-email');
        // delete user by ID
        document.querySelectorAll('[data-delete]').forEach( btn => {
            btn.addEventListener('click', e => {
                e.preventDefault()
                fetch(`/api/users/${e.target.dataset.delete}`, {
                    method: 'DELETE',
                })
                .then( raw=> raw.json())
                .then( data => console.log(data))
            })
        })
        document.querySelectorAll('[data-update]').forEach( btn => {
            btn.addEventListener('click', e => {
                e.preventDefault()
                const updateUser = {
                    firstName: updateName.value,
                    age: updateAge.value,
                    email: updateEmail.value
                };
                fetch(`/api/users/${e.target.dataset.update}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(updateUser)
                })
                .then( raw=> raw.json())
                .then( data => console.log(data))
            })
        })
        }).catch((err) =>{
            console.log(err);
        })
    
}



fetchAPI()
