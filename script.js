const songs = [
    {
        title: 'Akhiya Gulab',
        artist: 'Mitraz',
        src: './assets/music/music-4.mp3',
        albumArt: './assets/images/poster-4.jpg'
    },
    {
        title: 'Khalasi',
        artist: 'Achint, Aditya Gadhvi, Saumya Josh',
        src: './assets/music/music-7.mp3',
        albumArt: './assets/images/poster-7.jpg'
    },
    {
        title: 'Amplifier - Imran Khan',
        artist: 'Imran Khan, Unforgettable',
        src: './assets/music/music-9.mp3',
        albumArt: './assets/images/poster-9.jpg'
    },
    {
        title: 'Tujhme rab Dikhta Hai',
        artist: 'Roopkumar Rathod',
        src: './assets/music/music-10.mp3',
        albumArt: './assets/images/poster-10.jpg'
    },
    {
        title: 'Too Sweet',
        artist: 'Hozier',
        src: './assets/music/music-1.mp3',
        albumArt: './assets/images/poster-1.jpeg'
    },
    {
        title: 'Not Like Us',
        artist: 'Kendrick Lamar',
        src: './assets/music/music-2.mp3',
        albumArt: './assets/images/poster-2.jpeg'
    },
    {
        title: 'Big Dawgs',
        artist: 'Hanumankind',
        src: './assets/music/music-5.mp3',
        albumArt: './assets/images/poster-5.jpeg'
    },
    {
        title: 'Dagabaaz Re',
        artist: 'Rahat Fateh Ali Khan, Shadab Faridi, and Shreya Ghoshal',
        src: './assets/music/music-3.mp3',
        albumArt: './assets/images/poster-3.jpeg'
    },
    {
        title: 'End of Beginning',
        artist: 'Djo',
        src: './assets/music/music-6.mp3',
        albumArt: './assets/images/poster-6.jpeg'
    },
    {
        title: 'I Wanna Be Yours',
        artist: 'Arctic Monkeys',
        src: './assets/music/music-8.mp3',
        albumArt: './assets/images/poster-8.jpeg'
    },
    {
        title: 'Kun Faya Kun',
        artist: 'A. R. Rahman, Javed Ali, and Mohit Chauhan',
        src: './assets/music/music-11.mp3',
        albumArt: './assets/images/poster-11.jpeg'
    },
    {
        title: 'Aasa Kooda',
        artist: ' Sai Abhyankkar and Sai Smriti',
        src: './assets/music/music-12.mp3',
        albumArt: './assets/images/poster-12.jpeg'
    },
    {
        title: 'Aaoge Tum Kabhi',
        artist: 'The Local Train',
        src: './assets/music/music-13.mp3',
        albumArt: './assets/images/poster-13.jpeg'
    },
    {
        title: 'Dil To Bachcha Hai Ji',
        artist: 'Rahat fateh Ali Khan',
        src: './assets/music/music-14.mp3',
        albumArt: './assets/images/poster-14.jpeg'
    },
    {
        title: 'Gulabi Sadi',
        artist: ' Sanju Rathod',
        src: './assets/music/music-15.mp3',
        albumArt: './assets/images/poster-15.jpeg'
    },

];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumArt = document.getElementById('album-art');
const playlist = document.getElementById('playlist').querySelector('ul');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.albumArt;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playPause();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playPause();
}

function shuffleSongs() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    playPause();
}

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
});

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
shuffleBtn.addEventListener('click', shuffleSongs);

// Render playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playPause();
    });
    playlist.appendChild(li);
});

// Load the initial song
loadSong(currentSongIndex);