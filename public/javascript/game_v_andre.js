
let stoneEl = document.querySelector("#stone")
stoneEl.addEventListener("click", chosen)
let scissorEl = document.querySelector("#scissor")
scissorEl.addEventListener("click", chosen)
let paperEl = document.querySelector("#paper")
paperEl.addEventListener("click", chosen)

function chosen(e) {
	//Koden under er noe merkelig greier fra eirik

	// form for å sende valg av stein/saks/papir
	let form = document.createElement('form')
	let formData = new FormData()
	form.id = 'form'
	form.method = 'POST'
	form.action = '/game'

	let element = document.createElement('input')
	element.name = 'choice'
	element.type = 'hidden'

	if (e.target.id === "stone") element.value = 'stein'
	else if (e.target.id === "scissor") element.value = 'saks'
	else if (e.target.id === "paper") element.value = 'papir'

	form.appendChild(element)
	document.body.appendChild(form)

	$.ajax({
		url: '/game',
		type: 'POST',
		data: $('#form').serialize(),
		success: () => {}
	})

	form.parentNode.removeChild(form) // fjerner seg selv

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
