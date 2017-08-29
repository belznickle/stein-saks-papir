
let stoneEl = document.querySelector("#stone")
stoneEl.addEventListener("click", chosen)
let scissorEl = document.querySelector("#scissor")
scissorEl.addEventListener("click", chosen)
let paperEl = document.querySelector("#paper")
paperEl.addEventListener("click", chosen)
function chosen(e) {
	//Koden under er noe merkelig greier fra eirik
	let form = document.createElement('form')
	form.method = 'POST'
	form.action = '/game'

	let element = document.createElement('input')
	if(e.target.id === "stone"){
		element.name = 'stein'
	}
	else if (e.target.id === "scissor"){
		element.name = 'saks'
	}
	else if (e.target.id === "paper"){
		element.name = 'papir'
	}

	element.type = 'hidden'
	element.value = e.target.innerHTML

	form.appendChild(element)
	document.body.appendChild(form)
	form.submit()
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
