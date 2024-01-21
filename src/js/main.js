const crm__tabulation = document.querySelector('#crm__tabulation')
const crm__main = document.querySelector('main')

const checkPreSave = () => {
	clearCRM()
	noneFile()
}

const checkFileUpload = (e) => {
	const n = e.target.files[0].name
	if(n.endsWith('.json')) {
		loadFile(n)
		return true
	}
	const a = document.querySelector('.crm__file__label__name')
	a.innerText = 'Por favor selecione arquivos .json, apenas!'
	return false
}

const clearCRM = () => {
	crm__main.innerHTML = ''
	crm__tabulation.innerHTML = ''
}

const generateCRM = data => {
	const data = JSON.parse(data)
	const a = document.createElement('table')
	const z = document.createElement('ul')
	data['views'].forEach((view) => {
		const el = document.createElement('li')
		el.innerText = view
		z.append(el)
	})
	crm__main.append(a, z)
}

const generateFormGetFile = () => {
	const a = document.createElement('form')
	const b = document.createElement('span')
	b.innerText = 'para utilizar do CRM carregue algum arquivo...'
	const l = document.createElement('label')
	l.setAttribute('for', 'crm__file--get')
	const c = document.createElement('input')
	c.setAttribute('type', 'file')
	c.setAttribute('accept', '.json')
	c.setAttribute('id', 'crm__file--get')
	c.addEventListener('change', checkFileUpload)
	const d = document.createElement('span')
	d.classList.add('crm__file__label__span')
	d.innerText = 'ESCOLHER ARQUIVO'
	const e = document.createElement('span')
	e.classList.add('crm__file__label__name')
	l.append(c, d, e)
	a.append(b, l)
	return a
}

const generateTabNoneFileLog = () => {
	const s = document.createElement('span')
	s.classList.add('ghost')
	s.innerText = 'Nenhum arquivo carregado.'
}

const loadFile = file => {
	const r = new XMLHttpRequest()
	r.onload = () => {
		generateCRM(this.responseText)
	}
	r.open('GET', 'b/drain_data.php?d=' + file)
	r.send()
}

const noneFile = () => {
	/*  MAIN  */
	crm__main.classList.add('crm--none')
	const a = generateFormGetFile()
	crm__main.append(a)
	/*  FOOTER  */
	const b = generateTabNoneFileLog()
	crm__tabulation.append(b)
}

const start = () => {
	checkPreSave()
}

start()