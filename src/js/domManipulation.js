function populateTable(){
    let list = document.querySelector('#list');
    let tBody = list.tBodies.length ? list.tBodies[0] : list.createTBody()
    let tasks = getTasks()

    tBody.innerHTML = '';
    tasks.forEach(task=>{
        let tr = createTableLine(task)
        tBody.appendChild(tr)
    })
    

}

function createTableLine(task){
    if(!isTask(task)) throw(new Error('task is invalid'))

    let tr = document.createElement('tr'),
    check = document.createElement('td'),
    name = document.createElement('td'),
    validity = document.createElement('td'),
    delet = document.createElement('td'),
    checkBtn = document.createElement('input'),
    deletBtn = document.createElement('span')

    checkBtn.type = 'checkbox'
    checkBtn.checked = task.finished ? true : false
    checkBtn.setAttribute('onclick', `updateSingleTask(this,${task.id})`)
    deletBtn.innerText = 'deletar'
    deletBtn.className = 'del'
    deletBtn.setAttribute('onclick', `validateDelet(${task.id})`)
    tr.id = `task-${task.id}`
    name.innerText = task.name
    validity.innerText = task.validity

    check.appendChild(checkBtn)
    delet.appendChild(deletBtn)
    tr.appendChild(check)
    tr.appendChild(name)
    tr.appendChild(validity)
    tr.appendChild(delet)
    
    return tr

}

function addListnners(){
    let fog = document.querySelector('.fog')
    let formBtn = document.querySelector('.btn-adicionar')
    let btn = document.querySelector('.adicionar')
    
    fog.addEventListener('click',togleFog)
    btn.addEventListener('click',togleFog)
    formBtn.addEventListener('click',togleFog)
    formBtn.addEventListener('click',createTask)

}

function togleFog(){
    let fog = document.querySelector('.fog')
    let form = document.querySelector('.form')

    form.classList.toggle('active')
    fog.classList.toggle('active')
}

function colorizeLines() {
    let list = [...document.querySelectorAll('#list tr')]
    list.forEach((e,i)=>{
        if(i%2 == 0) e.className = 'line-light'
        else e.className = 'line-dark'
    })
}