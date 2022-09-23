import './style.css'

const toggleWork = document.getElementById('toggleWork')

const changeValue = (e) => {
	const value = toggleWork.getAttribute('data-value')
	console.log(value)
}
toggleWork.addEventListener('click', (e) => changeValue(e))
