 // Retrieve and display leaderboard
 function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    const tbody = document.querySelector('#leaderboardTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    leaderboard.forEach((entry, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load leaderboard on page load
window.onload = loadLeaderboard;