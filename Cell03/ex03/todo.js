const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = () => {
    loadTodos();
};

newBtn.addEventListener('click', () => {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        addTodo(text.trim());
        saveTodos();
    }
});

function addTodo(text) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = text;

    todoDiv.addEventListener('click', () => {
        if (confirm('Do you want to remove this TO DO?')) {
            todoDiv.remove(); 
            saveTodos();
        }
    });

    ftList.insertBefore(todoDiv, ftList.firstChild);
}

function saveTodos() {
    const todos = [];
    const items = ftList.getElementsByClassName('todo-item');
    
    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].textContent);
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `ft_todos=${encodeURIComponent(JSON.stringify(todos))}; expires=${expires}; path=/`;
}

function loadTodos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('ft_todos='));

    if (todoCookie) {
        try {
            const jsonStr = decodeURIComponent(todoCookie.split('=')[1]);
            const todos = JSON.parse(jsonStr);

            for (let i = todos.length - 1; i >= 0; i--) {
                addTodo(todos[i]);
            }
        } catch (e) {
            console.error('Failed to parse todo cookie:', e);
        }
    }
}