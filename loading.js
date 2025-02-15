document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        if(localStorage.getItem("action")=="game1"){
            window.location.href = "./game.html"; 
        }else{
            window.location.href = "./game2.html"; 
        }
        
    }, 3000); 
   // setInterval(writeCharacter, 2000);
});
