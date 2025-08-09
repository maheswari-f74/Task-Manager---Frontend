const searchInput = document.querySelector('.search');
const sortOptions = document.querySelectorAll('.sort-section p');
const filterOptions = document.querySelectorAll('.filter-section p');
const darkModeToggle = document.querySelector('#dark-mode');
const addTaskBtn = document.querySelector('.add-task-btn');
let taskCards = document.querySelectorAll('.task-card');

// Search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.task-card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? '' : 'none';
  });
});

// Sort
sortOptions.forEach(option => {
  option.addEventListener('click', () => {
    const sortType = option.textContent.trim().toLowerCase();
    document.querySelectorAll('.task-column').forEach(column => {
      const tasks = Array.from(column.querySelectorAll('.task-card'));
      tasks.sort((a, b) => {
        if (sortType === 'due date') {
          return new Date(a.querySelector('p').textContent.replace('Due', '').trim()) -
                 new Date(b.querySelector('p').textContent.replace('Due', '').trim());
        } else if (sortType === 'priority') {
          const order = { low: 1, medium: 2, high: 3 };
          return order[getPriority(a)] - order[getPriority(b)];
        }
        return 0;
      });
      tasks.forEach(task => column.appendChild(task));
    });
  });
});

function getPriority(card) {
  if (card.querySelector('.low')) return 'low';
  if (card.querySelector('.medium')) return 'medium';
  if (card.querySelector('.high')) return 'high';
  return 'low';
}

// Filter
filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    const type = option.textContent.trim().toLowerCase();
    document.querySelectorAll('.task-card').forEach(card => {
      if (type === 'in progress') {
        card.style.display = card.querySelector('.in-progress') ? '' : 'none';
      } else if (type === 'high priority') {
        card.style.display = card.querySelector('.high') ? '' : 'none';
      }
    });
  });
});

// Dark Mode
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
});

// Add Task
addTaskBtn.addEventListener('click', () => {
  const title = prompt("Enter task title:");
  const dueDate = prompt("Enter due date (YYYY-MM-DD):");
  const priority = prompt("Enter priority (low, medium, high):").toLowerCase();
  const status = prompt("Enter status (To Do, In Progress, Done):");

  if (title && dueDate && priority && status) {
    const column = document.querySelector(`.task-column[data-status="${status}"]`);
    if (column) {
      const card = document.createElement('div');
      card.classList.add('task-card');
      card.innerHTML = `
        <h3>${title}</h3>
        <p>Due ${dueDate}</p>
        ${status.toLowerCase() === 'in progress' ? '<span class="tag in-progress">In Progress</span>' : ''}
        <span class="tag ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        <span class="delete-icon">🗑️</span>
      `;
      column.appendChild(card);
      attachDeleteEvent(card);
    }
  }
});

// Delete task
function attachDeleteEvent(card) {
  const delBtn = card.querySelector('.delete-icon');
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      card.remove();
    });
  }
}
document.querySelectorAll('.task-card').forEach(attachDeleteEvent);
