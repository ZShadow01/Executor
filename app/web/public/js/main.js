document.addEventListener('DOMContentLoaded', function() {
    const characterImages = document.getElementsByClassName('character-image');
    for (let i = 0; i < characterImages.length; i++) {
        characterImages.item(i).style.opacity = 0;
    }

    const duration = 400;
    let index = 0;
    let timeout;
    const startChainAnimation = () => {
        if (index < characterImages.length) {
            characterImages.item(index).style.opacity = null;
            characterImages.item(index).style.animation = `fade-in ${duration}ms ease`;
            index++;
            timeout = setTimeout(startChainAnimation, 500);
        } else {
            clearTimeout(timeout);
        }
    };
    
    timeout = setTimeout(startChainAnimation, 50);
});
