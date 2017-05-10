let arr = ['Rank', 'Name', 'Elo', 'Won', 'Lost', 'Drawn']
let tr = document.querySelectorAll('tr')[0]
for (let inner of arr) {
	let td = document.createElement('td')
	td.innerHTML = inner
	tr.appendChild(td)
}

tr = document.querySelectorAll('tr')
for (let i = 1; i < tr.length; i++) {
	let td = document.querySelectorAll('td')[(i * 6) + 2]
	td.innerHTML = parseInt(td.innerHTML)
	console.log(td.innerHTML)
}
