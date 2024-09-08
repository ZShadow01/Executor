let playerIndex = 0;


document.addEventListener('DOMContentLoaded', function() {
    const characterImages = document.getElementsByClassName('player-character-image');
    const playerAnimationDelay = 400;
    for (let i = 0; i < characterImages.length; i++) {
        characterImages.item(i).style.animationDelay = playerAnimationDelay * i + 'ms';
    }
    
    setTimeout(() => {
        nextPlayer();
        setInterval(nextPlayer, 10_000);  // 10_000
    }, 2500);
});


function nextPlayer() {
    const characterContainers = document.getElementsByClassName('player-character-container');
    const playerInfoContainers = document.getElementsByClassName('player-info-container');

    document.querySelector('.player-character-container.active')?.classList.remove('active');
    document.querySelector('.player-info-container.active')?.classList.remove('active');

    characterContainers.item(playerIndex).classList.add('active');
    playerInfoContainers.item(playerIndex).classList.add('active');

    playerIndex = (playerIndex + 1) % characterContainers.length;
}
