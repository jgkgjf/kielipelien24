
function goToHome() {
    window.location.href = "../index.html";
}

document.getElementById("square1").addEventListener("click", function() {
    window.location.href = "game_difwords/dif.html"; 
});

document.getElementById("square2").addEventListener("click", function() {
    window.location.href = "game_allwords/all.html"; 
});

document.getElementById("square3").addEventListener("click", function() {
    window.location.href = "game_hard/hard.html"; 
});

document.getElementById("square4").addEventListener("click", function() {
    window.location.href = "game_hardest/hardest.html"; 
});