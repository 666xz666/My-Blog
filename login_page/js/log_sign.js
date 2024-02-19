function check_login() {
    var name = $("#user_name").val();
    var pass = $("#password").val();

    // 发送POST请求到登录API
    fetch('https://www.666xz666.top:3007/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            password: pass
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'Login successful') {
            alert("Login successfully！\n" + name + " welcome!😋");
            $("#user_name").val("");
            $("#password").val("");

            // 将 JWT 存储到 localStorage 中
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));
            
            // test如果用户是管理员，跳转到管理员页面
            if (data.isAdmin) {
                alert("You are an administrator\nJump to the administrator page！");
                window.location.href = '/admin';
            } else {
                alert("going back to the home page！");
                window.location.href = '/';
            }
        } else {
            if (data.message === 'User does not exist') {
                alert("User does not exist");
            } else if (data.message === 'Incorrect password') {
                alert("Incorrect password");
            }
            $("#login_form").removeClass('shake_effect');  
            setTimeout(function() {
                $("#login_form").addClass('shake_effect')
            }, 1);  
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function check_register() {
    var name = $("#r_user_name").val();
    var pass = $("#r_password").val();
    var email = $("#r_email").val();

    if(name != "" && pass != "" && email != "") {
        // 发送POST请求到注册API
        fetch('https://www.666xz666.top:3007/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: pass,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User info saved!') {
                alert("Sign successfully！\n" + name + " welcome!😋");
                $("#user_name").val("");
                $("#password").val("");
            } else if (data.message === 'Username already exists') {
                alert("Username already exists");
            } else {
                alert("Server error");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        $("#login_form").removeClass('shake_effect');  
        setTimeout(function() {
            $("#login_form").addClass('shake_effect')
        }, 1);  
    }
}


$(function(){
    $("#create").click(function(){
        check_register();
        return false;
    })
    $("#login").click(function(){
        check_login();
        return false;
    })
    $('.message a').click(function () {
        $('form').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });
})