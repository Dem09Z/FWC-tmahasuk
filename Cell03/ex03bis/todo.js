$(document).ready(function() {
    loadTodos();

    $('#new_btn').on('click', function() {
        const text = prompt('Enter a new TO DO:');
        if (text && text.trim() !== '') {
            addTodo(text.trim());
            saveTodos();
        }
    });
});

function addTodo(text) {
    const $todoDiv = $('<div></div>')
        .addClass('todo-item')
        .text(text);

    $todoDiv.on('click', function() {
        if (confirm('Do you want to remove this TO DO?')) {
            $(this).remove();
            saveTodos();
        }
    });

    $('#ft_list').prepend($todoDiv);
}

function saveTodos() {
    const todos = [];
    $('.todo-item').each(function() {
        todos.push($(this).text());
    });

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