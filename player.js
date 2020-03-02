
// strictly positive modulo function to be used instead of %
function mod(n, m) {
    return ((n % m) + m) % m;
}

// load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// path to illustration files and initialization of illu element
var illuList = [
    'resources/zetman_square.jpg',
    'resources/random_square.jpg',
    'resources/majin_boo_square.jpg',
    'resources/magic_square.jpg',
    'resources/gunnm_square.jpg',
    'resources/forest_square.jpg',
    'resources/akira_square.jpg'
];
var illu = document.querySelector('.illustration');
illu.setAttribute('src', illuList[0])

// ids of videos, index of currently played video and number of videos in the list
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


// create an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: id_list[index],
        playerVars: { 
            'autoplay': 0,
            'controls': 2 
        },
        events: {
            'onReady' : onPlayerReady,
            'onStateChange' :  onPlayerStateChange
        }
    });
}

// functions triggered by player events
function onPlayerReady(event) {
    console.log("video ready");
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
                illu.classList.contains('transparent') ? updateIllu() : 0;
                break;
        case 3: button_message = "buffering";
                break;
        default: button_message = "play";
                 break;
    }
    document.getElementById('button_play').innerHTML = button_message;
}

// button functions
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
    index = mod(index + 1, nb_elem);
    console.log(index);
    illu.classList.contains('transparent') ? 0 : illu.classList.add('transparent');
    player.loadVideoById(id_list[index]);
}
function vidPrev(){
    index = mod(index -1, nb_elem);
    console.log(index);
    illu.classList.contains('transparent') ? 0 : illu.classList.add('transparent');
    player.loadVideoById(id_list[index]);
}
function updateIllu(){
    illu.setAttribute('src', illuList[index]);
    illu.classList.remove('transparent');
}
