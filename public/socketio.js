const socket = io();
var scoreboard = document.querySelector("body > div");

socket.on("scores", result => {
	scoreboard.innerHTML = " ";
	var number = 1;
	scoreboard.innerHTML += `
		<span class="header">Scoreboard</span> `
	console.log(result);
	result.forEach(element => {
		scoreboard.innerHTML += `
		<span class="scores">${number}- ${element.name} --> ${element.correctAnswers}</span>`;
		number++;
		console.log(element.id);
		console.log(element.name);
	});
});
