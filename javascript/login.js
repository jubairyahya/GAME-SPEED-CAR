document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
 // Find the user by username
 const user = users.find(user => user.username === username);

    if (user) { 
        // Check if the password matches
        if (user.password === password) {
            localStorage.setItem('loggedInUser', username);
            alert('Login successful!');
            window.location.href = '../pages/game.html';
        } else {
            alert('Incorrect password!');
        }
    } else {
        alert('User not found!');
    }
});