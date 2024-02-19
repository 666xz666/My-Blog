// 创建新文章 
function createArticle(article) {
    var token = localStorage.getItem('token');  // 从 localStorage 中获取 token

    $.ajax({
        url: 'https://www.666xz666.top:3007/articles',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': 'Bearer ' + token  // 将 token 添加到请求头中
        },
        data: JSON.stringify({
            class: article.class,
            title: article.title,
            content: article.content,
            tags: article.tags
        }),
        contentType: 'application/json',
        success: function(response) {
            alert(response.message);
        }
    });
}


