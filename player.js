﻿function mod(n, m) {
    return ((n % m) + m) % m;
}
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var id_list = [
    'hs7jE4Ou6dA',
    'U6Hg5tnJ3OA',
    '2h0AiBic6gM',
    'd2f13rxiThs',
    'k0IaA04Vvf8',
    'lSe9bdkIh5Y',
    '8D0y30TFt0I'
    ];
var index = 0;
var nb_elem = id_list.length;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: id_list[index],
        playerVars: { 'controls': 2 },
        events: {
            'onReady' : onPlayerReady,
            'onStateChange' :  onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log("vidéo ready");
    document.getElementById('button_play').onclick = vidPlay;
    document.getElementById('button_previous').onclick = vidPrev;
    document.getElementById('button_next').onclick = vidNext;
}
function onPlayerStateChange(event) {
    let button_message = "";
    switch(event.target.getPlayerState()){
        case 0: button_message = "replay";
                break;
        case 1: button_message = "pause";
                break;
        case 3: button_message = "buffering";
                break;
        default: button_message = "play";
                 break;
    }
    document.getElementById('button_play').innerHTML = button_message;
}
function vidPlay(){
    if (player.getPlayerState()==1){
        player.pauseVideo();
        console.log("pause");
    }
    else {
        player.playVideo();
        console.log("play");
    }
}
function vidNext(){
    // index = (index + 1).mod(nb_elem);
    index = mod(index + 1, nb_elem);
    console.log(index);
    player.loadVideoById(id_list[index]);
    //vidPlay();
}
function vidPrev(){
    // index = (index - 1).mod(nb_elem);
    index = mod(index -1, nb_elem);
    console.log(index);
    player.loadVideoById(id_list[index]);
    //vidPlay();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function stopVideo() {
player.stopVideo();
    }