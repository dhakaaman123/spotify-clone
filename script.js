console.log("welcome to Spotify");
// Initialize the variables 
let songIndex = 0; // Start from 0
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Kabootri_ofF...", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Jale2_official.", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "AMIT_SAINI_RH..", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "KALE_KAGAJ.....", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "BADLI-BADLI....", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "THAR-HOOKA.....", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "_KALLO-........", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "BHYANI_KI_TAHS.", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "GUNDE_CHACHA...", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "HERO_HONDA.....", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
];

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updatePlayState(true);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        updatePlayState(false);
    }
});

audioElement.addEventListener("timeupdate", () => {
    console.log("timeupdate");
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
   
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songItemPlay")[0].id = i;
   
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

const updatePlayState = (isPlaying) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
        if (index === songIndex) {
            element.classList.toggle('fa-circle-pause', isPlaying);
            element.classList.toggle('fa-circle-play', !isPlaying);
        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
};


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        if (audioElement.src.includes(`songs/${parseInt(e.target.id)+1}.mp3`)) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                
                masterSongName.innerText = songs[songIndex].songName;
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 1;
            }
        } else {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            masterPlay.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
        }
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove(`fa-circle-play`);
    masterPlay.classList.add(`fa-circle-pause`);
    updatePlayState(true);

});
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove(`fa-circle-play`);
    masterPlay.classList.add(`fa-circle-pause`);
    updatePlayState(true);
});

