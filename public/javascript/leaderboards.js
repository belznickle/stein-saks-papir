let arr = ['Rank', 'Name', 'Elo', 'Won', 'Lost', 'Drawn']
let tr = document.querySelectorAll('tr')[0]
for (let inner of arr) {
	let td = document.createElement('td')
	td.innerHTML = inner
	tr.appendChild(td)
}
