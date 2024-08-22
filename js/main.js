// console.log('hellо world');

const tasksList = document.querySelector('#tasksList');
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');


let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(event) {
	event.preventDefault();

	// Достаем текст задачи из поля ввода
	const taskText = taskInput.value;

	// Описываем задачу в виде объекта
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// Добавляем задачу в массив с задачами
	tasks.push(newTask);

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	// Рендерим задачу на странице
	renderTask(newTask);

	// Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = '';
	taskInput.focus();

	// checkEmptyList();
}
function deleteTask(event) {
	// Проверяем если клик был НЕ по кнопке "удалить задачу"
	if (event.target.dataset.action !== "delete") return;

	const parenNode = event.target.closest(".task-item");

	// Определяем ID задачи
	const id = Number(parenNode.id);

	// Удаляем задча через фильтрацию массива
	tasks = tasks.filter((task) => task.id !== id);

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	// Удаляем задачу из разметки
	parenNode.remove();


}
function doneTask(event) {
	// Проверяем что клик был НЕ по кнопке "задача выполнена"
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.task-item');

	// Определяем ID задачи
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);
	task.done = !task.done;

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	const taskTitle = parentNode.querySelector
		('.task-title');
	taskTitle.classList.toggle('task-title--done');
}


function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	// Формируем разметку для новой задачи
	const taskHTML = `<li id="${task.id}" class="task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="" width="18" height="18">
						</button>
					</div>
				</li>`

	// Добавляем задачу на страницу
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

