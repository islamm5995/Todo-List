let main = document.createElement("main");
main.className = "container";

document.body.prepend(main);

let projectName = document.createElement("h1");
projectName.innerHTML = "let's do it";
main.append(projectName);

let listBlock = document.createElement("div");
listBlock.className = "mainBlock";
main.append(listBlock);

let firsDiv = document.createElement("div");
listBlock.append(firsDiv);

let texIn = document.createElement("input");
texIn.className = "texIn";
texIn.setAttribute("placeholder", "иштерди жаз...");
firsDiv.append(texIn);

let setDate = document.createElement("input");
setDate.className = "setDate";
setDate.setAttribute("type", "date");
firsDiv.append(setDate);

let addBtn = document.createElement("button");
addBtn.innerHTML = "ADD";
addBtn.id = "addBtn";
firsDiv.append(addBtn);

let list = document.createElement("ul");
listBlock.append(list);

let todosArray = localStorage.getItem('todos') == null?
[]
:
[...JSON.parse(localStorage.getItem('todos'))] 

const renderTodoItem = () => {
  list.innerHTML = "";
  todosArray.map((todo, id) => {
    console.log(todo);
    let li = document.createElement("li");
    li.className = todo.cheked ? 'taskItem done':'taskItem'
    li.id=id

    let doneBtn = document.createElement("img");
    doneBtn.src = "done1.png";
    doneBtn.className = "btn";
    doneBtn.addEventListener("click", completeTodo);

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "delete.png";
    deleteBtn.className = "btn";
    deleteBtn.addEventListener("click", deleteTodo);

    let label = document.createElement("label");
    label.append(todo.text + " - " + todo.date);
    li.append(label);

    li.append(doneBtn);
    li.append(deleteBtn);

    list.append(li);
  });
};

const addTodo = () => {
  let newTask = texIn.value;
  let date = setDate.value;
  if (newTask != "") {
    todosArray.push({
      text: newTask,
      date,
      cheked: false,
    });
    localStorage.setItem("todos", JSON.stringify(todosArray));
    texIn.value = "";
    setDate.value = "";

    renderTodoItem();
  }
};

const completeTodo = (e) => {
  // console.log(e.target.parentNode)
  // e.target.parentNode.classList.toggle('done')
  let todoTemporary = [...todosArray]
  let index = e.target.parentNode.id

  let objectElement = todoTemporary[index].cheked
  todoTemporary[index].cheked = !objectElement

  localStorage.setItem('todos',JSON.stringify(todosArray))
  console.log(index)


  let isDone = e.target.parentNode.classList.contains("done");

  isDone
    ? e.target.parentNode.classList.remove("done")
    : e.target.parentNode.classList.add("done");
};

const deleteTodo = (e) => {
  //   console.log(e.target.parentNode)
  let index = e.target.parentNode.id
  todosArray.splice(index,1)
  localStorage.setItem('todos',JSON.stringify(todosArray))
  renderTodoItem()
};
renderTodoItem();

addBtn.addEventListener("click", addTodo);

