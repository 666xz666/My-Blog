async function isLoggedIn() {
    var token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        var response = await fetch('/validate-token', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            localStorage.removeItem('token'); // Remove the invalid token
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

function getUserInfo() {
    return fetch('/user-info', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = async function() {
    var loginButton = document.getElementById('login-button');

    if (await isLoggedIn()!==false) {
        var userInfo = await getUserInfo();
        loginButton.textContent = 'Logined';
        loginButton.title = 'username: ' + userInfo.username + '\nemail: ' + userInfo.email;
    } else {
        loginButton.textContent = 'Login';
        loginButton.title = '';
        document.querySelector('#login-button').addEventListener('click', function() {
            window.location.href = '/login_page/login.html'; 
        });
    }
};