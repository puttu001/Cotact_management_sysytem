// document.getElementById('contactForm').addEventListener('submit', function (e) {
//     e.preventDefault();
    
//     const name = document.getElementById('name').value;
//     const phone = document.getElementById('phone').value;
//     const email = document.getElementById('email').value;
    
//     fetch('/addContact', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, phone, email })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             loadContacts();
//         } else {
//             console.error('Error:', data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

// function loadContacts() {
//     fetch('/getContacts')
//         .then(response => response.json())
//         .then(contacts => {
//             const contactList = document.getElementById('contactList');
//             contactList.innerHTML = '';
//             contacts.forEach(contact => {
//                 const li = document.createElement('li');
//                 li.textContent = `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`;
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Delete';
//                 deleteButton.addEventListener('click', () => {
//                     fetch(`/deleteContact/${contact._id}`, {
//                         method: 'DELETE'
//                     })
//                     .then(response => response.json())
//                     .then(data => {
//                         if (data.success) {
//                             loadContacts();
//                         } else {
//                             console.error('Error:', data.message);
//                         }
//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                     });
//                 });
//                 li.appendChild(deleteButton);
//                 contactList.appendChild(li);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// window.onload = loadContacts;





document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    fetch('/addContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadContacts(); // Reload contacts on index.html
            alert('Contact added successfully!');
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('viewContactsBtn').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/contacts.html'; // Navigate to contacts.html
});

function loadContacts() {
    fetch('/getContacts')
        .then(response => response.json())
        .then(contacts => {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    fetch(`/deleteContact/${contact._id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            loadContacts(); // Reload contacts after deletion
                        } else {
                            console.error('Error:', data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
                li.appendChild(deleteButton);
                contactList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





function loadContactsPage() {
    fetch('/getContacts')
        .then(response => response.json())
        .then(contacts => {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`;
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    fetch(`/deleteContact/${contact._id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            loadContactsPage();
                        } else {
                            console.error('Error:', data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
                li.appendChild(deleteButton);
                
                contactList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





window.onload = loadContacts; // Load contacts on initial page load
