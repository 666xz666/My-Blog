
        var articles = document.querySelector('.navbar-center a[href="#Articles"]');

        // 添加点击事件监听器
        articles.addEventListener('click', function() {
            document.querySelector('.mid-container').innerHTML =`
            <style>
            .mid-container {
                color:white;
            }
            
            #sidebar {
                width: 25%; /* Adjust as needed */
                min-width: 100px; /* Adjust as needed */
                overflow: auto;
            }
            
            #content {
                width: 75%; /* Adjust as needed */
                overflow: auto;
            }
            
            #resizer {
                cursor: ew-resize;
                width: 5px;
                background: linear-gradient(to bottom, black, #ff6347,black);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                z-index: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .dot {
                width: 2px;
                height: 2px;
                margin:2px;
                background-color: black;
                border-radius: 50%;
            }
            </style>

            <div id="sidebar">
                <span class="option-intro"></span>
                <div class="article-title-container"></div>
            </div>
            <div class="resizer" id="resizer">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div id="content"></div>
            `


            // 获取 #sidebar 元素
            var sidebar = document.querySelector('#sidebar');

            sidebar.innerHTML=`
            <style>
                input, label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: white;
                    background-color: rgba(128, 128, 128, 0.5);
                }
                input {
                    width: 100%;
                    height: 30px;
                }
                label {
                    margin-top: 20px;
                    font-weight: bold;
                }
                #articles {
                    height:auto;
                    overflow-y: scroll;
                }
                .index {
                    background-color: rgba(0, 0, 0, 0.5);
                    padding: 10px;
                    border-radius: 5px;
                }
                .hidden {
                    display: none;
                }

                .input-row {
                    display: flex;
                    justify-content: space-between;
                }
                .input-row input {
                    width: 49%;
                }
            </style>
            
            <button id="toggle-index">v</button>

            <div id="index" class="index">
                <div class="input-row">
                    <input id="class" type="text" placeholder="Class">
                    <input id="title" type="text" placeholder="Title">
                </div>
                <div class="input-row">
                    <input id="author" type="text" placeholder="Author">
                    <input id="tag" type="text" placeholder="Tag">
                </div>
                <label for="release-date">Release Date:</label>
                <input id="release-date" type="date">
                <label for="last-updated-date">Last Updated:</label>
                <input id="last-updated-date" type="date">
            </div>
            
            <div id="articles"></div>
            `;

            var btn=document.getElementById('toggle-index');
            btn.addEventListener('click', function() {
                var index = document.getElementById('index');
                if (index.classList.contains('hidden')) {
                    index.classList.remove('hidden');
                    btn.style.transform = 'rotate(180deg)';
                } else {
                    index.classList.add('hidden');
                    btn.style.transform = 'rotate(0deg)';
                }
            });

            $('#class, #title, #author, #tag, #release-date, #last-updated-date').on('input', function() {
                var query = {
                    class: $('#class').val(),
                    title: $('#title').val(),
                    author: $('#author').val(),
                    tag: $('#tag').val(),
                    "release-date": $('#release-date').val(),
                    "last-updated-date": $('#last-updated-date').val()
                };
                filterArticles(query);
            });

            filterArticles({});
        });
        
        function filterArticles(query) {
            fetch('https://www.666xz666.top:3007/articles/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
            })
            .then(response => response.json())
            .then(data => {
                updateArticles(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        
        function updateArticles(articles) {
            var articlesDiv = document.querySelector('#articles');
            articlesDiv.innerHTML = '';
            articlesDiv.innerHTML +=`
                <style>
                    .article {
                        border: 1px solid #000;
                        padding: 10px;
                        margin-bottom: 20px;
                    }
                    .article h2 {
                        margin-top: 0;
                    }
                </style>
            `;
            articles.forEach(article => {
                var releaseDate = new Date(article["release-date"]).toLocaleDateString();
                var lastUpdatedDate = new Date(article["last-updated-date"]).toLocaleDateString();
                var tags = Array.isArray(article.tags) ? article.tags.join(',') : '';
                articlesDiv.innerHTML += `
                    <style>
                        .article {
                            background-color: rgba(0, 0, 0, 0.5);
                            color: white;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                        }
                        .article h2 {
                            width: 100%;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }
                        .article p {
                            width: 49%;
                            margin-bottom: 10px;
                            font-size: 0.8em;
                            font-style: italic;
                        }
                    </style>
                    <div class="article" style="background-color:rgba(0, 0, 0, 0.5);color:white">
                        <h2>${article.title}</h2>
                        <p>Author: ${article.author}</p>
                        <p>Class: ${article.class}</p>
                        <p>Tags: ${article.tags.join(',')}</p>
                        <p>Release Date: ${releaseDate}</p>
                        <p>Last Updated Date: ${lastUpdatedDate}</p>
                    </div>
                `;
            });
        }
        
        $('.navbar-center a[href="#Articles"]').click(function() {
            $('#class, #title, #author, #tag').show();
            filterArticles({});
        });
        