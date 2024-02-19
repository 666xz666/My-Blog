var playlist = [
    {file: '/resources/musics/晴天--周杰伦/晴天--周杰伦.mp3', title: '晴天--周杰伦', cover: '/resources/musics/晴天--周杰伦/晴天--周杰伦.jpg'},
    {file: '/resources/musics/最长的电影--周杰伦/最长的电影--周杰伦.mp3', title: '最长的电影--周杰伦', cover: '/resources/musics/最长的电影--周杰伦/最长的电影--周杰伦.jpg'},
    // Add more songs as needed
];
var currentSong = 0;
var sound = new Howl({
    src: [playlist[currentSong].file],
    onend: function() {
        nextSong();
    }
});

function setSongInfo() {
    document.getElementById('song-title').textContent = playlist[currentSong].title;
    document.getElementById('cover').src = playlist[currentSong].cover;
    document.getElementById('play-pause-button').children[0].src = "/resources/icons/mu_play.png"; // 修改为播放图标的路径
}

function playSong() {
    sound.play();
    var cover = document.getElementById('cover');
    cover.classList.add('rotating');
    document.getElementById('song-title').textContent = playlist[currentSong].title;
    document.getElementById('cover').src = playlist[currentSong].cover;
    document.getElementById('play-pause-button').children[0].src = "/resources/icons/mu_pause.png";
}

function pauseSong() {
    sound.pause();
    var cover = document.getElementById('cover');
    cover.classList.remove('rotating');
    document.getElementById('play-pause-button').children[0].src = "/resources/icons/mu_play.png";
}

function nextSong() {
    sound.stop();
    currentSong = (currentSong + 1) % playlist.length;
    sound = new Howl({
        src: [playlist[currentSong].file],
        onend: function() {
            nextSong();
        }
    });
    playSong();
}

function prevSong() {
    sound.stop();
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    sound = new Howl({
        src: [playlist[currentSong].file],
        onend: function() {
            nextSong();
        }
    });
    playSong();
}

document.getElementById('play-pause-button').addEventListener('click', function() {
    if (sound.playing()) {
        pauseSong();
    } else {
        playSong();
    }
});
document.getElementById('next-button').addEventListener('click', nextSong);
document.getElementById('prev-button').addEventListener('click', prevSong);

// 在页面加载完成后，初始化播放器的图片和名称信息
window.addEventListener('load', setSongInfo);