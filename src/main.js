import './style.css'

const contentWork = document.getElementById('contentWork')
const contentSkills = document.getElementById('contentSkills')
const toggleWork = document.getElementById('toggleWork')
const toggleSkills = document.getElementById('toggleSkills')

const changeContent = (target) => {
	const targetId = target.id
	const targetValue = target.getAttribute('data-value')
	if (targetId === 'toggleWork') {
		if (targetValue === 'dev') {
			return contentWork.setAttribute('data-content', 'dev')
		}
		contentWork.setAttribute('data-content', 'ui')
		return
	}
	if (targetId === 'toggleSkills') {
		if (targetValue === 'dev') {
			return contentSkills.setAttribute('data-content', 'dev')
		}
		contentSkills.setAttribute('data-content', 'ui')
		return
	}
}

const changeValue = (e) => {
	const target = e.target
	const targetValue = target.getAttribute('data-value')
	if (targetValue === 'ui') {
		target.setAttribute('data-value', 'dev')
		changeContent(target)
		return
	}
	target.setAttribute('data-value', 'ui')
	changeContent(target)
	return
}

toggleWork.addEventListener('click', (e) => changeValue(e))
toggleSkills.addEventListener('click', (e) => changeValue(e))
