const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    //event의 타겟 받아옴
    const li = btn.parentNode;
    //버튼의 부모 노드를 가져옴
    toDoList.removeChild(li);
    //그거 지움
    //toDos에서 지운 id와 일치하지 않는 것만 담는 cleanToDos 가져옴
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    //값 변경
    toDos = cleanToDos;
    //toDos를 save
    saveToDos();
}
function saveToDos(){
    //JSON 타입으로 데이터 저장(id와 텍스트)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = (newId);
    toDoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    toDos.push(todoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();