# 服务器api：app.js
1.**注册用户API**

**URL**: `/register`

**Method**: `POST`

**Headers**: `Content-Type: application/json`

**Body**:

```json
{
    "username": "<username>",
    "password": "<password>",
    "email": "<email>"
}
```

2.**登录API**

**URL**: `/login`

**Method**: `POST`

**Headers**: `Content-Type: application/json`

**Body**:

```json
{
    "username": "<username>",
    "password": "<password>"
}
```

3.**注销API**

**URL**: `/logout`

**Method**: `POST`

**Headers**: `Content-Type: application/json`

**Body**:

```json
{
    "username": "<username>",
    "password": "<password>"
}
```

4.**获取所有文章API**

**URL**: `/articles`

**Method**: `GET`

5.**获取指定ID的文章API**

**URL**: `/articles/:id`

**Method**: `GET`

6.**获取指定标题的文章API**

**URL**: `/articles/title/:title`

**Method**: `GET`

7.**创建新文章API**

**URL**: `/articles`

**Method**: `POST`

**Headers**: `Authorization: Bearer <token>`

**Body**:

```json
{
    "class":"<class>",
    "title": "<title>",
    "content": "<content>"
}
```

8.**更新指定ID的文章API**

**URL**: `/articles/:id`

**Method**: `PUT`

**Headers**: `Authorization: Bearer <token>`

**Body**:

```json
{
    "class":"<class>",
    "title": "<title>",
    "content": "<content>"
}
```

9.**删除指定ID的文章API**

**URL**: `/articles/:id`

**Method**: `DELETE`

**Headers**: `Authorization: Bearer <token>`