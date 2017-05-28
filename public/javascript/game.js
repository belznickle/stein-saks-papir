let choices = ['stein', 'saks', 'papir']

for (let choice of choices) {
	let button = document.createElement('button')
	button.innerHTML = choice
	button.addEventListener('click', (e) => {
		let form = document.createElement('form')
		form.method = 'POST'
		form.action = '/game'

		let element = document.createElement('input')
		element.name = 'choice'
		element.type = 'hidden'
		element.value = e.target.innerHTML

		form.appendChild(element)
		document.body.appendChild(form)
		form.submit()
	})
	document.body.appendChild(button)
}
