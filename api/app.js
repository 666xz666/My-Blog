//服务器api
var express = require('express');
var https = require('https');
var fs = require('fs');
const path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const uuid = require('uuid');


// 创建数据库连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER_www_666xz666_top,
    password : process.env.DB_PASS_www_666xz666_top,
    database : 'www_666xz666_top'
});

var app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.headers['content-type'] === 'application/json' && !req.body) {
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    next();
});
app.use(cookieParser());
app.use(cors({
    origin: 'https://www.666xz666.top', // 你的源地址
    credentials: true  // 允许发送 cookies
}));


/*用户管理api*/
// 哈希密码函数
function hashPassword(password) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// 注册用户API
app.post('/register', function (req, res) {
    var username = req.body.username;
    var password = hashPassword(req.body.password); // 对密码进行哈希处理
    var email = req.body.email;

    // 首先，检查用户名是否已经存在
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        } else {
            // 如果用户名已经存在
            if (results.length > 0) {
                res.json({message: 'Username already exists'});
            } else {
                // 否则，插入新用户
                var post  = {username: username, password: password, email: email, isAdmin: false};
                connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json({message: 'Server error'});
                    } else {
                        res.json({message: 'User info saved!'});
                    }
                });
            }
        }
    });
});

// 登录API
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = hashPassword(req.body.password); // 对密码进行哈希处理

    // 查询用户
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        } else {
            // 如果用户不存在
            if (results.length === 0) {
                res.json({message: 'User does not exist'});
            } else {
                // 检查密码是否正确
                if (results[0].password === password) {
                    // 生成 JWT
                    var token = jwt.sign({ username: username }, 'VmAf2BynS8FTOJp');
                    res.json({status: 'Login successful', token: token,isAdmin: results[0].isAdmin});
                } else {
                    res.json({message: 'Incorrect password'});
                }
            }
        }
    });
});

// 注销API
app.post('/logout', function (req, res) {
    var username = req.body.username;
    var password = hashPassword(req.body.password); // 对密码进行哈希处理

    // 查询用户
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        } else {
            // 如果用户不存在
            if (results.length === 0) {
                res.json({message: 'User does not exist'});
            } else {
                // 检查密码是否正确
                if (results[0].password === password) {
                    // 删除用户
                    connection.query('DELETE FROM users WHERE username = ?', [username], function (error, results, fields) {
                        if (error) {
                            console.error(error);
                            res.status(500).json({message: 'Server error'});
                        } else {
                            res.json({message: 'User has been logged out and deleted'});
                        }
                    });
                } else {
                    res.json({message: 'Incorrect password'});
                }
            }
        }
    });
});

// 修改密码API
app.post('/change-password', function (req, res) {
    var username = req.body.username;
    var oldPassword = hashPassword(req.body.oldPassword); // 对旧密码进行哈希处理
    var newPassword = hashPassword(req.body.newPassword); // 对新密码进行哈希处理

    // 查询用户
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        } else {
            // 如果用户不存在
            if (results.length === 0) {
                res.json({message: 'User does not exist'});
            } else {
                // 检查旧密码是否正确
                if (results[0].password === oldPassword) {
                    // 更新密码
                    connection.query('UPDATE users SET password = ? WHERE username = ?', [newPassword, username], function (error, results, fields) {
                        if (error) {
                            console.error(error);
                            res.status(500).json({message: 'Server error'});
                        } else {
                            res.json({message: 'Password has been changed'});
                        }
                    });
                } else {
                    res.json({message: 'Incorrect password'});
                }
            }
        }
    });
});

// 获取用户信息API
app.get('/user-info', function (req, res) {
    var token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header

    jwt.verify(token, 'VmAf2BynS8FTOJp', function(err, decoded) {
        if (err) {
            res.status(401).json({message: 'Unauthorized'});
        } else {
            var username = decoded.username;

            // Query the user's email
            connection.query('SELECT email FROM users WHERE username = ?', [username], function (error, results, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).json({message: 'Server error'});
                } else {
                    // If the user does not exist
                    if (results.length === 0) {
                        res.json({message: 'User does not exist'});
                    } else {
                        // Return the username and email
                        res.json({username: username, email: results[0].email});
                    }
                }
            });
        }
    });
});


/*文章文件管理api*/ 
id=1;//文章id

// 读取 JSON 文件
function readJsonFile() {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, 'articles.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
}

// 写入 JSON 文件
function writeJsonFile(data) {
    try {
        const jsonStr = JSON.stringify(data, null, 2);
        fs.writeFileSync(path.resolve(__dirname, 'articles.json'), jsonStr);
    } catch (err) {
        console.error(err);
    }
}

// 获取所有文章
app.get('/articles', (req, res) => {
    const articles = readJsonFile();
    res.json(articles);
});




//获取符合条件的文章
app.post('/articles/search', (req, res) => {
    const articles = readJsonFile();
    const query = req.body;
    const filteredArticles = articles.filter(article =>
        (!query.id    || article.id    === "" || article.id    === query.id) &&
        (!query.class || article.class  === "" || article.class === query.class) &&
        (!query.title || article.title  === "" || article.title === query.title) &&
        (!query.author || article.author  === "" || article.author === query.author) &&
        (!query.tag || article.tags === "" || article.tags.includes(query.tag)) &&
        (!query["release-date"] || new Date(article["release-date"]) >= new Date(query["release-date"])) &&
        (!query["last-updated-date"] || new Date(article["last-updated-date"]) <= new Date(query["last-updated-date"]))
    );
    res.json({ data: filteredArticles });
});



// 创建新文章
app.post('/articles', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // 从 Authorization 头部获取 token

    // 验证 JWT
    jwt.verify(token, 'VmAf2BynS8FTOJp', function(err, decoded) {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // JWT 验证成功，decoded 对象包含了你在 JWT 中嵌入的数据
        var username = decoded.username;

        const articles = readJsonFile();
        const newArticle = req.body;
        newArticle.id = uuid.v4();  // 自动生成 UUID
        newArticle['release-date'] = new Date().toISOString();  // 设置发布日期为当前时间
        newArticle['last-updated-date'] = newArticle['release-date'];  // 设置最近更新日期为当前时间
        newArticle.author = username;  // 设置文章的作者为 JWT 中的用户名
        articles.push(newArticle);
        writeJsonFile(articles);
        res.json({ message: 'Article created', data: newArticle });
    });
});

// 更新指定 ID 的文章
app.put('/articles/:id', (req, res) => {
    const articles = readJsonFile();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // 从 Authorization 头部获取 token
    const updatedFields = req.body;

    // 验证 JWT
    jwt.verify(token, 'VmAf2BynS8FTOJp', function(err, decoded) {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // JWT 验证成功，decoded 对象包含了你在 JWT 中嵌入的数据
        var username = decoded.username;

        updatedFields['last-updated-date'] = new Date().toISOString();  // 更新最近更新日期为当前时间
        const articleToUpdate = articles.find(a => a.id === Number(req.params.id));
        if (!articleToUpdate) {
            return res.status(404).json({ message: 'Article not found' });
        }
        if (articleToUpdate.author !== username) {
            return res.status(403).json({ message: 'You are not the author of this article' });
        }
        const newArticles = articles.map(a => a.id === Number(req.params.id) ? { ...a, ...updatedFields } : a);
        writeJsonFile(newArticles);
        const updatedArticle = newArticles.find(a => a.id === Number(req.params.id));
        res.json({ message: 'Article updated', data: updatedArticle });
    });
});




// 删除指定 ID 的文章
app.delete('/articles/:id', (req, res) => {
    const articles = readJsonFile();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // 从 Authorization 头部获取 token

    // 验证 JWT
    jwt.verify(token, 'VmAf2BynS8FTOJp', function(err, decoded) {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // JWT 验证成功，decoded 对象包含了你在 JWT 中嵌入的数据
        var username = decoded.username;

        const articleToDelete = articles.find(a => a.id === Number(req.params.id));
        if (!articleToDelete) {
            return res.status(404).json({ message: 'Article not found' });
        }
        // 查询用户是否是管理员
        connection.query('SELECT isAdmin FROM users WHERE username = ?', [username], function (error, results, fields) {
            if (error) {
                console.error(error);
                res.status(500).json({message: 'Server error'});
            } else {
                const isAdmin = results[0].isAdmin;
                if (articleToDelete.author !== username && !isAdmin) {
                    return res.status(403).json({ message: 'You are not the author of this article' });
                }
                const newArticles = articles.filter(a => a.id !== Number(req.params.id));
                writeJsonFile(newArticles);
                res.json({ message: 'Article deleted', data: null });
            }
        });
    });
});


/*创建 HTTPS 服务器*/
// 读取 SSL 证书和私钥
var privateKey = fs.readFileSync('/www/server/panel/vhost/ssl/666xz666.top/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/www/server/panel/vhost/ssl/666xz666.top/fullchain.pem', 'utf8');

var credentials = {
    key: privateKey,
    cert: certificate
};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(3007, function () {
    console.log('HTTPS Server is listening on port 3007');
});



