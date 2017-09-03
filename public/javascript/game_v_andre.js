
let stoneEl = document.querySelector("#stone")
stoneEl.addEventListener("click", chosen)
let scissorEl = document.querySelector("#scissor")
scissorEl.addEventListener("click", chosen)
let paperEl = document.querySelector("#paper")
paperEl.addEventListener("click", chosen)

function chosen(e) {
	//Koden under er noe merkelig greier fra eirik
	// sender valg av stein/saks/papir
	let data = {choice: ''}
	if (e.target.id === "stone") data.choice = 'stein'
	else if (e.target.id === "scissor") data.choice = 'saks'
	else if (e.target.id === "paper") data.choice = 'papir'

	let xhr = new XMLHttpRequest()
	xhr.open('POST', '/game', true)
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(data))

	//koden under er skrevet av mesteren
	if(e.target.id === "stone"){
		if(document.querySelector("#leftSide").className.length > 4){
			// nothing happens
		}
		else {
		document.querySelector("#leftSide").className += " stone"
		}
	}
	if(e.target.id === "scissor"){
		if(document.querySelector("#leftSide").className.length > 4){
			// nothting happens
		}
		else {
		document.querySelector("#leftSide").className += " scissor"
		}
	}
	if(e.target.id === "paper"){
		if(document.querySelector("#leftSide").className.length > 4){
			// nothing happens
		}
		else {
		document.querySelector("#leftSide").className += " paper"
		}
	}
}
