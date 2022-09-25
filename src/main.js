import './style.css'

const button = document.getElementById('button')
const buttonTwo = document.getElementById('buttonTwo')
const homeImg = document.getElementById('homeImg')

const changeHomeImg = (theme) => {
	const img = theme === 'light' ? './img/home.jpg' : './img/home-invert.jpg'
	homeImg.src = img
}

const loadTheme = () => {
	if (!localStorage.theme) {
		localStorage.theme = 'light'
	}
	const theme = localStorage.theme
	document.documentElement.classList.add(theme)
	changeHomeImg(theme)
}

const changeTheme = () => {
	if (localStorage.theme === 'light') {
		document.documentElement.classList.add('dark')
		document.documentElement.classList.remove('light')
		localStorage.theme = 'dark'
		changeHomeImg(localStorage.theme)
		return
	}
	document.documentElement.classList.add('light')
	document.documentElement.classList.remove('dark')
	localStorage.theme = 'light'
	changeHomeImg(localStorage.theme)
}

button.addEventListener('click', changeTheme)
buttonTwo.addEventListener('click', changeTheme)
window.addEventListener('load', loadTheme)

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

const form = document.getElementById('form')

form.addEventListener('submit', formSubmit)

function formSubmit(e) {
	e.preventDefault()
	if (detectInternet()) return

	const name = document.getElementById('name').value
	const email = document.getElementById('email').value
	const message = document.getElementById('message').value
	const ui = document.getElementById('ui').checked
	const startup = document.getElementById('startup').checked
	const landing = document.getElementById('landing').checked
	const app = document.getElementById('app').checked
	const agency = document.getElementById('agency').checked
	const frontend = document.getElementById('frontend').checked
	const friends = document.getElementById('friends').checked

	if (!name.trim() || !email.trim() || !message.trim())
		return (formStatus.innerHTML =
			'<div class="flex"><svg class="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Por favor rellena los campos</div>')

	const formData = new FormData()
	formData.append('name', name)
	formData.append('usermail', email)
	formData.append('message', message)
	formData.append('ui', ui)
	formData.append('startup', startup)
	formData.append('landing', landing)
	formData.append('app', app)
	formData.append('agency', agency)
	formData.append('frontend', frontend)
	formData.append('friends', friends)

	fetch('https://getform.io/f/70eb8b59-ca4f-4583-8e28-1e5dfba0f978', {
		method: 'POST',
		body: formData,
	})
		.then((response) => {
			console.log(response)
			if (!response.ok)
				return (formStatus.innerHTML =
					'<div class="flex"><svg class="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Ha ocurrido un error</div>')

			form.reset()
			formStatus.innerHTML =
				'<div class="flex"><svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Su mensaje ha sido enviado!</div>'
		})
		.catch((err) => {
			console.error(err)
			formStatus.innerHTML =
				'<div class="flex"><svg class="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Ha ocurrido un error</div>'
		})
}

const formStatus = document.getElementById('formStatus')

window.addEventListener('load', detectInternet)
window.addEventListener('online', detectInternet)
window.addEventListener('offline', detectInternet)

function detectInternet() {
	if (!navigator.onLine) {
		formStatus.innerHTML =
			'<div class="flex"><svg class="w-6 h-6 mr-2 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>No internet connection</div>'
		return true
	}
	formStatus.innerHTML = ''
	return false
}
