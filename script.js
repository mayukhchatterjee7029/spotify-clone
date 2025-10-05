// let musicDir = new URL("http://127.0.0.1:5500/Projects/Spotify%20clone/assets/songs/");
// let musicDir = new URL("http://192.168.29.128:5500/Projects/Spotify%20clone/assets/songs/");
let musicDir = new URL("https://github.com/mayukhchatterjee7029/spotify-clone/tree/main/assets/songs");
let currentSong = new Audio();

let songLinks = [];
let songNames = [];
let playingNow;

function showDuration(current_time, song_duration) {

    let curTime = current_time.split('.')
    curTime = curTime.join(":")
    // console.log(curTime)

    let songDur = song_duration.split('.')
    songDur = songDur.join(":")
    // console.log(songDur)

    let duration_string = `0${curTime} / 0${songDur}`
    // console.log(dur)

    return duration_string;
}





async function getSongs(musicDir) {

    // let songLinks = []
    // let songNames = []

    try {

        const response = await fetch(musicDir)
        if (!response.ok) {
            throw new Error(`Playlist not found! ${response.status}`);
        }

        const result = await response.text()
        // console.log(result);

        const div = document.createElement('div')
        div.innerHTML = result

        const listItems = div.querySelectorAll("li > a")
        // console.log(listItems)

        songLinks = []

        listItems.forEach(anchor => {
            if (anchor.href.endsWith('.mp3')) {
                songLinks.push(anchor.href)
            }
        })


        songsParsed = []
        songLinks.forEach((song) => {
            let fileName = song.split('/').pop()
                .replace('.mp3', '')
                .replace('%20', " ")
                .replace(/_/g, ' ')

            // Decoding Japanese Characters
            fileName = decodeURIComponent(fileName)
            // .replace(/_g/g, ' ')
            // .replace(/-/g, ' ')

            songsParsed.push(fileName)
            // console.log(fileName)
        })

        // console.log(songsParsed)
        // return [songsParsed, songLinks]


    }
    catch (error) {
        console.log('Something went wrong! ' + error);
    }

    finally {
        return [songsParsed, songLinks]
    }
}


// PlayMusic Function
const playMusic = (track, songName = null, paused = false) => {
    currentSong.src = track;

    if (songName) {
        document.querySelector('.song-playing').innerHTML = songName
        console.log('Now playing: ' + songName)
    }

    if (!paused) {
        currentSong.play()
        document.querySelector('#play-btn').style.backgroundImage = "url('assets/icons/pause.svg')"
    }

}


function shufflePlay(songNames, songLinks) {

    let randomSelect = Math.floor(Math.random() * songNames.length)

    // document.querySelector('.song-playing').innerHTML = songNames[randomSelect]
    playMusic(songLinks[randomSelect], songNames[randomSelect], true)

    // console.log('Now playing: ' + songNames[randomSelect])
}



// Using IIFE to get the song names
(async function mainFunc() {

    let [songNames, songLinks] = await getSongs(musicDir)

    shufflePlay(songNames, songLinks)

    // console.log(songNames) 
    // console.log(songLinks)

    // let shuffle_btn = document.querySelector("#play-shuffle")



    // Show all the songs in the playlist
    let playlists = document.querySelector('.left .library .playlists ul')

    for (let i = 0; i < songNames.length; i++) {

        playlists.insertAdjacentHTML('beforeend', `<li class="song-card circular p1"><img class='music-icon invert' src="assets/icons/music-icon.svg" alt="music"><p class="songs color-grey">${songNames[i]}</p> <p class="song-link">${songLinks[i]}</p> <img class='play-icon music-icon invert' src="assets/icons/play.svg" alt="play"> </li>`)

    }


    // Attach an event listener to each song
    let songArr = Array.from(document.querySelector('.playlists').getElementsByTagName('li')).forEach((e) => {
        e.addEventListener("click", element => {
            playingNow = e.children[1].innerHTML
            // console.log('Now playing: ' + playingNow)

            // document.querySelector('.song-playing').innerHTML = playingNow
            let song_link = e.querySelector('.song-link').innerHTML
            playMusic(song_link, playingNow)
            // console.log(song_link)
            // console.log(e)

        })
    })
    // console.log(songArr)


    // Attach an event listener to play, next, previous

    let play_prev = document.querySelector('#play-prev')
    let play = document.querySelector('#play-btn')
    let play_next = document.querySelector('#play-next')

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.style.backgroundImage = "url('assets/icons/pause.svg')"
        }
        else {
            currentSong.pause()
            play.style.backgroundImage = "url('assets/icons/play-outline.svg')"
        }
    })


    // Listen of timeupdate event
    currentSong.addEventListener("timeupdate", () => {

        let current_time = (currentSong.currentTime / 60).toFixed(2)
        let song_duration = (currentSong.duration / 60).toFixed(2)

        // console.log(current_time, song_duration)

        let duration_string = showDuration(current_time, song_duration)

        let durationDiv = document.querySelector('.song-duration')
        durationDiv.innerHTML = duration_string

        let songDuration = document.querySelector("#thumb")
        songDuration.style.left = (current_time / song_duration) * 100 + '%'

    })


    // Attach event listener to the seekbar

    let seekbar = document.querySelector('.seekbar')
    seekbar.addEventListener('click', (e) => {

        let progressPercent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector('#thumb').style.left = progressPercent + '%'

        currentSong.currentTime = ((currentSong.duration) * progressPercent) / 100
    })


    let hamburger = document.querySelector('#hamburger')
    hamburger.addEventListener('click', () => {
        document.querySelector('.left').style.left = '0'
        // document.querySelector('.left').style.width = '90vw'
    })

    let cancel_icon = document.querySelector('#cancel-icon')
    cancel_icon.addEventListener('click', () => {
        document.querySelector('.left').style.left = '-100%'
        // document.querySelector('.left').style.width = '90vw'
    })

    // Add event listener to play-previous button
    play_prev.addEventListener("click", () => {
        let currentSong_index = songLinks.indexOf(currentSong.src)
        // console.log(currentSong_index)

        if (currentSong_index > 0) {
            let prevSongIndex = currentSong_index - 1
            playMusic(songLinks[prevSongIndex], songNames[prevSongIndex])
            // document.querySelector('.song-playing').innerHTML = songNames[prevSongIndex]
            console.log(prevSongIndex)
        }
        else {
            let lastIndex = songLinks.length - 1

            playMusic(songLinks[lastIndex], songNames[lastIndex])
            // document.querySelector('.song-playing').innerHTML = songNames[lastIndex]
            console.log(lastIndex)
        }


    })

    // Add event listener to play-next button
    play_next.addEventListener("click", () => {
        let currentSong_index = songLinks.indexOf(currentSong.src)
        // console.log(currentSong_index)

        let nextSongIndex = currentSong_index + 1
        if (nextSongIndex < songNames.length) {
            playMusic(songLinks[nextSongIndex], songNames[nextSongIndex])
            // document.querySelector('.song-playing').innerHTML = songNames[nextSongIndex]
            console.log(nextSongIndex)
        }
        else {
            playMusic(songLinks[0], songNames[0])
            // document.querySelector('.song-playing').innerHTML = songNames[0]
            console.log(0)
        }
    })

    // AUTO-PLAY the next song when current ends
    let isLoopEnabled = false;

    currentSong.addEventListener("ended", () => {

        if (isLoopEnabled) {

            let currentSong_index = songLinks.indexOf(currentSong.src)
            console.log("Song ended, auto-playing next...")

            let nextSongIndex = currentSong_index + 1
            if (nextSongIndex < songNames.length) {
                playMusic(songLinks[nextSongIndex], songNames[nextSongIndex])
                console.log('Auto-playing: ' + songNames[nextSongIndex])
            }
        }
    })

    // Add event listener to the play-loop button
    let loop_btn = document.querySelector('#play-loop')
    loop_btn.addEventListener('click', () => {
        isLoopEnabled = !isLoopEnabled // toggle loop start

        if (isLoopEnabled) {
            loop_btn.classList.add('loopOn')
            console.log('Loop On')
        } else {
            loop_btn.classList.remove('loopOn')
            console.log('Loop Off')
        }
    })

    // Playlist Maker 
    let artistLisa = songNames.filter(e => e.includes('LiSA'))
    let otherTaste = songNames.filter(e => e.toLowerCase().includes('un'))

    let artistLisaLink = [];
    let OtherTasteLink = [];

    for (let i = 0; i < artistLisa.length; i++) {
        artistLisaLink.push(songLinks[songNames.indexOf(artistLisa[i])])
    }
    // console.log(artistLisaLink)


    for (let i in otherTaste) {
        OtherTasteLink.push(songLinks[songNames.indexOf(otherTaste[i])])
    }
    // console.log(OtherTasteLink)


    let myPlaylist = [artistLisa, otherTaste]
    let myPlaylistLink = [artistLisaLink, OtherTasteLink]

    let listMap = NewSong(myPlaylist, myPlaylistLink)

    cardCreator(listMap)


    // Add event listener to the play-cards
    for (let i = 0; i < myPlaylist.length; i++) {

        // console.log(myPlaylist.length)

        let playcard = document.querySelector(`.play-card:nth-child(${i + 1})`)
        if (playcard) {
            playcard.addEventListener("click", () => {
                console.log(`Playlist ${i + 1} clicked`)

                let playlistSongs = myPlaylist[i]
                let playlistLinks = myPlaylistLink[i]

                if (playlistSongs.length > 0) {
                    // document.querySelector(".song-playing").innerHTML = playlistSongs[0]
                    playMusic(playlistLinks[0], playlistSongs[0])
                }
            })
        }
    }


    // Adding event listener to the green-play button

    // let playImg = document.querySelector(".play-img")
    // playImg.addEventListener("click", ()=>{
    //     let greenPlayButton = document.querySelector(".play-green")
    //     greenPlayButton.style.display = 'block'
    //     greenPlayButton.style.bottom = '42%'
    // })






})()
// Main function End


// Creates a dictionary object of all playlist available
function NewSong(playlist, listLink) {

    let listMap = {}
    let listLinkMap = {}

    playlist.forEach((value, index) => {
        listMap[`playlist${index + 1}`] = value
    })

    listLink.forEach((value, index) => {
        listLinkMap[`listLink${index + 1}`] = value
    })

    // console.log(listMap['playlist1'])

    return listMap
}


// Creates dedicated cards for the playlists
function cardCreator(listMap) {

    let hero2 = document.querySelector('.hero-row2')
    let mapLength = Object.keys(listMap).length;

    for (let p = 0; p < mapLength; p++) {

        let picLink = Math.floor(Math.random() * 3)

        let playCardHTML = `<div class="play-card circular">
            <img class="play-img" src="assets/images/playlist-bg/pic${picLink}.png" alt="song">
            <div class="play-text">
            <h3 class="playlist-header">My PlayList ${p + 1}</h3>
            <p class="playlist-desc">Hits curated for you</p>
            </div>
            <span class="play-green"></span>
        </div>`

        // console.log(hero2)

        hero2.insertAdjacentHTML("beforeend", playCardHTML)
    }

    // console.log(hero2)
    // console.log(currentSong.src)
}


// console.log(songLinks)

// Debug
// let artistLisa = songN.filter(e => e.includes('LiSA'))
// let otherTaste = songN.filter(e => e.toLowerCase().includes('un'))

// console.log(artistLisa)
// console.log(otherTaste)

// playMusic(artistLisa[0])

