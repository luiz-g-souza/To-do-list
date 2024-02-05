let tasksCach = [];
document.onload = initialize()

function initialize(){
    updateTasksCach()
    populateTable()
    colorizeLines()
    addListnners()
}

