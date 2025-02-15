let level_tmp = "";

document.getElementById('startBtn').addEventListener('click', function() {
    level_tmp = document.getElementById('level').value;
    localStorage.setItem('gameLevel', level_tmp); 
    localStorage.setItem('action', 'game1'); 
    window.location.href = './loading.html'; 
});


document.getElementById('startBtn2').addEventListener('click', function() {
    level_tmp = document.getElementById('level').value;
    localStorage.setItem('gameLevel', level_tmp); 
    localStorage.setItem('action', 'game2'); 
    window.location.href = './loading.html'; 
});



document.addEventListener('DOMContentLoaded', function() {

    let text = 'Bienvenue dans "4 Images, 1 Mot" !'; 

    if (localStorage.getItem('recommercer') !== null) {
        text = 'Vous avez déjà joué. Recommencer ?'; 
    }
    
    const heading = document.getElementById('animatedText');
    let index = 0;

    function writeCharacter() {
        if (index < text.length) {
            heading.innerHTML += text.charAt(index); 
            index++;
        } else {
            clearInterval(interval); 
        }
    }

    const interval = setInterval(writeCharacter, 300); 
});