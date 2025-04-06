const audio = document.getElementById("audio");
const title = document.getElementById("title");

const songs = [
  { title: "Break Me - Maggie Lindemann", src: "music/Maggie_Lindemann_Siiickbrain_-_break_me.mp3" },
  { title: "Paint The Town Blue - Arcane", src: "music/Paint_The_Town_Blue_from_the_series_Arcane_League_of_Legends.mp3" },
  { title: "Papercut - Linkin Park", src: "music/Papercut_Official_HD_Music_Video_-_Linkin_Park.mp3" },
  { title: "Where Is My Mind - Pixies", src: "music/Pixies_-_Where_Is_My_Mind_Official_Lyric_Video.mp3" },
  { title: "Her - Poppy", src: "music/Poppy_-_Her_Official_Music_Video.mp3" },
  { title: "Animal I Have Become - Three Days Grace", src: "music/Three_Days_Grace_-_Animal_I_Have_Become.mp3" },
  { title: "At The Risk Of Feeling Dumb - Twenty One Pilots", src: "music/Twenty_One_Pilots_-_At_The_Risk_Of_Feeling_Dumb_Official_Video.mp3" },
  { title: "Jumpsuit - Twenty One Pilots", src: "music/twenty_one_pilots_-_Jumpsuit_Official_Video.mp3" },
  { title: "Navigating - Twenty One Pilots", src: "music/Twenty_One_Pilots_-_Navigating_Official_Video.mp3" },
  { title: "The Hype - Twenty One Pilots", src: "music/twenty_one_pilots_-_The_Hype_Official_Video.mp3" }
];

const pandaImages = [
  "images/panda.jpg", "images/panda2.jpg", "images/panda3.jpg", "images/panda4.jpg",
  "images/panda5.jpg", "images/panda6.jpg", "images/panda7.jpg", "images/panda8.jpg",
  "images/panda9.jpg", "images/panda10.jpg"
];

let shuffledSongs = [...songs];
let currentSongIndex = 0;

function shufflePlaylist() {
  for (let i = shuffledSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
  }
}

function playAudio() {
  audio.play();
  document.querySelector('.play-btn').style.display = 'none';
  document.querySelector('.pause-btn').style.display = 'inline-block';
}

function pauseAudio() {
  audio.pause();
  document.querySelector('.play-btn').style.display = 'inline-block';
  document.querySelector('.pause-btn').style.display = 'none';
}

function skipAudio() {
  if (audio.paused) {
    audio.play();
  }
  if (currentSongIndex >= shuffledSongs.length) {
    currentSongIndex = 0;
    shufflePlaylist();
  }

  const nextSong = shuffledSongs[currentSongIndex];
  audio.src = nextSong.src;
  title.textContent = nextSong.title;
  audio.play();
  
  const randomPandaImage = getRandomPandaImage();
  const albumArt = document.querySelectorAll(".album-art");
  albumArt.forEach(img => {
    img.src = randomPandaImage;
  });

  currentSongIndex++;
}

function previousAudio() {
  if (audio.paused) {
    audio.play(); 
  }
  
  if (currentSongIndex <= 0) {
    currentSongIndex = shuffledSongs.length - 1;  
  } else {
    currentSongIndex--;
  }

  const prevSong = shuffledSongs[currentSongIndex];
  audio.src = prevSong.src;
  title.textContent = prevSong.title;
  audio.play();

  const randomPandaImage = getRandomPandaImage();
  const albumArt = document.querySelectorAll(".album-art");
  albumArt.forEach(img => {
    img.src = randomPandaImage;
  });
}

function getRandomPandaImage() {
  const randomIndex = Math.floor(Math.random() * pandaImages.length);
  return pandaImages[randomIndex];
}

function onAudioEnded() {
 
  if (currentSongIndex >= shuffledSongs.length) {
    currentSongIndex = 0;
    shufflePlaylist();
  }

  const nextSong = shuffledSongs[currentSongIndex];
  audio.src = nextSong.src;
  title.textContent = nextSong.title;
  audio.play();
  
  const randomPandaImage = getRandomPandaImage();
  const albumArt = document.querySelectorAll(".album-art");
  albumArt.forEach(img => {
    img.src = randomPandaImage;
  });

  currentSongIndex++;
}


audio.addEventListener('ended', onAudioEnded);

shufflePlaylist();
skipAudio();

document.getElementById("volume").addEventListener("input", changeVolume);

function changeVolume() {
  const volumeSlider = document.getElementById("volume");
  audio.volume = volumeSlider.value;
  document.getElementById('volume-label').textContent = `${Math.round(volumeSlider.value * 100)}%`;
}

audio.addEventListener('loadeddata', () => {
  console.log('Audio is ready to play!');
});
