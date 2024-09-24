document.addEventListener('DOMContentLoaded', () => {
    const audiocontrols = document.querySelector('.audio-controls');
    const audioBtn = audiocontrols.querySelectorAll('span');
    const songDiv = document.querySelector('.song-div');
    const playBtn = audioBtn[0];
    const stopBtn = audioBtn[1];
    const fullscreenBtn = audioBtn[2];
    const ytBtn = audioBtn[3];
    const langBtn = audioBtn[4];

    const audios = 'music.mp3';
    const song = generateAudio();

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time-div');

    let isPlaying = false;
    let isSwitched = false;
    let isLanguage = null;
    let isHome = true;
    let isCollapsed = false;

    function generateAudio() {
        const newAudio = new Audio(audios);
        return newAudio;
    }

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying
        updatePlayBtn(isPlaying);
        playsong(isPlaying);
        

        if (!isLanguage) {
            isLanguage = 'Norwegian'; // Default language to Norwegian on first play
            showLyrics();
        }
        
    });

    stopBtn.addEventListener('click', () => {

        if(!song.paused) {
            song.pause();
            song.currentTime = 0;

        }

        songDiv.style.display = 'none';
        document.querySelector('.welcome-message').style.display = 'flex';
        
        updatePlayBtn(false);
        isPlaying = false;

    });

    fullscreenBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
    
        // Toggle the collapse class on header
        document.querySelector('header').classList.toggle('collapse', isCollapsed);
    
        // If collapsed, set container to fullscreen, otherwise revert
        if (isCollapsed) {
            document.querySelector('.container').classList.add('fullscreen');
        } else {
            document.querySelector('.container').classList.remove('fullscreen');
        }
    });

    document.querySelector('.logo').addEventListener('click', function () {
        isCollapsed = !isCollapsed;
        document.querySelector('header').classList.toggle('collapse', !isCollapsed);

        if (isCollapsed) {
            document.querySelector('.container').classList.add('fullscreen');
        } else {
            document.querySelector('.container').classList.remove('fullscreen');
        }
    })

    ytBtn.addEventListener('click', () => {
        if(!song.paused) {
            song.pause();
        }
        
        displayYtVideo()
    });

    langBtn.addEventListener('click', () => {
        isSwitched = !isSwitched;
        isLanguage = isSwitched ? "English" : "Norwegian";
        langBtn.classList.toggle('playing', isSwitched)
        // Reset lyrics display when switching languages
        document.querySelectorAll('.song-div p').forEach(lyric => lyric.style.display = 'none');
        
        showLyrics(); // Update to show the correct language lyrics
    });
    

    document.querySelector('.progress-truck').addEventListener('click', function(event) {
        const width = this.clientWidth; // Get the width of the progress bar
        const click = event.offsetX; // Get the X position of the click relative to the progress bar
        const duration = song.duration; // Assuming you have the 'song' object defined
    
        if(!song.paused) {
            song.currentTime = (click / width) * duration; // Calculate the new current time
        }
    });
    
    document.querySelector('.progress-truck').addEventListener('mouseover', (event) => {
        displaytime(true, event.target, event);
    });

    document.querySelector('.progress-truck').addEventListener('mouseout', (event) => {
        displaytime(false, event.target, event);
    });

    document.querySelector('.progress-truck').addEventListener('mousemove', (e) => {
        // Update position of the div as the mouse moves
        timeDiv.style.left = `${e.pageX + 10}px`; // Offset the div by 10px to the right
        timeDiv.style.top = `${e.pageY + 10}px`;  // Offset the div by 10px to the bottom
        displaytime(true, e.target, e);
    });

    document.querySelector('.image-div').addEventListener('click', function() {
       this.style.display = 'none';
        setTimeout(() => {this.style.display = 'flex'},30)
    });

    function playsong(state) {
        if(state) {
            
            song.play();
        }
        else{
            song.pause();
        }

        songDiv.style.display = 'flex';
        document.querySelector('.welcome-message').style.display = 'none';
        document.querySelector('#total-time').textContent = ' / ' + formatTime(song.duration);
        

        song.addEventListener('timeupdate', () => {
            const percentage = (song.currentTime / song.duration) * 100;
            document.querySelector('.progress-bar').style.width = `${percentage}%`;
            document.getElementById('current-Time').textContent = `${formatTime(song.currentTime)}`;
            showLyrics(); // Call to update the displayed lyric line

            const threequarter = (song.duration * 3) / 4;

            if (song.currentTime >= threequarter){
                document.querySelector('.progress-bar').style.backgroundColor = 'cyan';
            }
            else{
                document.querySelector('.progress-bar').style.backgroundColor = 'deepskyblue';
            }

            const tenSecondsLeft = song.duration - 10;
            if (song.currentTime >= tenSecondsLeft) {
                console.log("The song is about to finish in 10 seconds!");
                // You can add any additional actions you want to perform here
                document.querySelector('.progress-bar').style.backgroundColor = '#FF0000';
            }
        });

        song.addEventListener('ended', () => {
            isPlaying = false;
            document.querySelector('.progress-bar').style.width = `0%`;
            updatePlayBtn(isPlaying);
            document.querySelector('.progress-bar').style.backgroundColor = 'deepskyblue';
        });

        document.querySelector('.logo').classList.toggle('playing', isPlaying);

    }

    function  displaytime(state,element, event) {
        const width = element.clientWidth;
        const mouseEvent = event.offsetX;
        const newTimeDisplay = (mouseEvent / width) * song.duration;

        timeDiv.textContent = formatTime(newTimeDisplay);
        if(state) {
            document.body.appendChild(timeDiv);
        }
        else{

            document.body.removeChild(timeDiv);
        }
    }

    function updatePlayBtn(state) {
        playBtn.innerHTML = state ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        playBtn.classList.toggle('playing', state)
    }

    function formatTime(audio) {
        const min = Math.floor(audio / 60);  // Calculate minutes
        const sec = Math.floor(audio % 60);  // Calculate seconds
    
        // Return formatted time with padded zeros if needed
        return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }

    
    function showLyrics() {
        if (isHome) {
            document.querySelector('.welcome-message').style.display = 'none';
            songDiv.style.display = 'flex';
            isHome = false;
        }
    
        // Get the current lyrics div based on the selected language
        const lyricsContainer = isLanguage === "Norwegian" 
            ? songDiv.querySelector('.norwegian-lyrics') 
            : songDiv.querySelector('.english-lyrics');


            songDiv.querySelector('.norwegian-lyrics').style.display = isLanguage === "Norwegian" ? 'flex' : 'none'; 
            songDiv.querySelector('.english-lyrics').style.display = isLanguage === "Norwegian" ? 'none' : 'flex'
        
        const allLyrics = lyricsContainer.querySelectorAll('p');
        
        // Loop through the lyrics to display or hide based on current time
        allLyrics.forEach(lyrics => {
            const lyricsStartTime = parseFloat(lyrics.getAttribute('data-start'));
            const lyricsEndTime = parseFloat(lyrics.getAttribute('data-end'));
    
            if (song.currentTime >= lyricsStartTime && song.currentTime <= lyricsEndTime) {
                lyrics.style.display = 'block';  // Show the lyric if within time range
            } else {
                lyrics.classList.add('myexit');
            
                lyrics.style.display = 'none';   // Hide otherwise
                
            }
        });
    }
    
    function displayYtVideo() {

        const overlayContainer = document.createElement('div');
        overlayContainer.classList.add('overlay-container');

        // Create the overlay div
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.display = 'flex'; // Make the overlay visible
    
        // Create the video container
        const videoContainer = document.createElement('div');
        videoContainer.id = 'video-container';
    
        // Create the YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.src = "https://www.youtube.com/embed/GR3qkECLJbw?si=lapBBa69GW1XSVM9";
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
    
        // Create the close button
        const closeButton = document.createElement('button');
        closeButton.id = 'close-btn';
        closeButton.innerText = 'Close';
    
        // Close button functionality
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none'; // Hide the overlay
            overlay.remove(); // Remove the overlay from the DOM
        });
    
        // Append iframe and close button to video container
        videoContainer.appendChild(iframe);
        videoContainer.appendChild(closeButton);
    
        // Append video container to overlay
        overlay.appendChild(videoContainer);
    
        // Append overlay to overlayContainer
        overlayContainer.appendChild(overlay);
        document.body.appendChild(overlayContainer);
    }
    
});
//-----------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('main').style.marginTop = headerHeight + 10 + 'px';
});
