const songs = [
    { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "song3.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const progressBar = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const muteUnmuteBtn = document.getElementById("mute-unmute");
const playlist = document.getElementById("playlist");
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => loadSong(index));
    playlist.appendChild(li);
});
function loadSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[currentSongIndex].src;
    songTitle.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].artist;
    highlightActiveSong();
    playSong();
}
function highlightActiveSong() {
    const allSongs = playlist.querySelectorAll("li");
    allSongs.forEach((li, index) => {
        li.classList.toggle("active", index === currentSongIndex);
    });
}
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
}
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
}
playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});


volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value / 100;
});

muteUnmuteBtn.addEventListener("click", () => {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteUnmuteBtn.textContent = "🔊";
    } else {
        audioPlayer.muted = true;
        muteUnmuteBtn.textContent = "🔇";
    }
});

loadSong(currentSongIndex);
