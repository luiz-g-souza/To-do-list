function updateTasksCach(){
    tasksCach.length = 0
    tasksCach = [...getTasks()]
}

/**
 * captura as tarefas do localStorage
 * @returns {Array}
 */

function getTasks(){
    let tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}

function updateTasks(tasks){
    localStorage.setItem( 'tasks',JSON.stringify(tasks) )
    updateTasksCach()
    populateTable()
}

function updateSingleTask(element,taskId){
    let tasks= getTasks()
    let index = -1

    for(let i = 0; i< tasks.length; i++){
        const task = tasks[i]
        if(task.id == taskId){
            index = i
            break
        }
    }
    if (!(index>-1)) return
    let task = tasks[index]
    task.finished = element.checked ? true : false;
    console.log(tasks[index])
    updateTasks(tasks)
}

function createTask(){
    let nameElement = document.querySelector('#name')
    let dateElement = document.querySelector('#date')

    if(!nameElement.value && !dateElement.value ) return

    let name = nameElement.value
    let date = dateElement.value
    date = date.split('-')

    let tasks = getTasks()
    let task = {
        finished: false,
        id: getHigherId(),
        name,
        validity: [date[2],date[1],date[0]].join('/'),
    }

    nameElement.value =''
    dateElement=''  
    tasks.push(task)
    updateTasks(tasks)
}

function getHigherId(){
    let id = 0
    let tasks = getTasks()
    tasks.forEach(e => {
        if (e.id > id) id = e.id
    });
    return id +1 || 1
}

function deletTask(taskId){
    let tasks= getTasks()
    let index = -1
    
    for(let i = 0; i< tasks.length; i++){
        const task = tasks[i]
        if(task.id == taskId){
            index = i
            break
        }
    }

    if(index>-1){
        tasks.splice(index,1)
    }
    updateTasks(tasks)
}


function isTask(task){
    return task.name && task.id && task.validity && typeof(task.finished) == 'boolean'
}

function validateDelet(taskId){
    if(!confirm(`deseja excluir esta tarefa?`)) return
    deletTask(taskId)
}