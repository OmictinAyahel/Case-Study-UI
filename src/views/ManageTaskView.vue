<template>
  <div class="manage-task">
    <h1>Manage Tasks</h1>
    <div class="tasks-container">
      <div class="task-form-container" v-if="selectedTaskId === null">
        <div class="task-form">
          <input class="input-field" v-model="taskTitle" placeholder="Task Title" />
          <input class="input-field" v-model="taskDescription" placeholder="Task Description" />
          <button class="action-button" @click="addTask">Add Task</button>
        </div>
      </div>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id">
          <div v-if="selectedTaskId === task.id" class="edit-fields">
            <input class="input-field" v-model="editingTitle" placeholder="Edit Title" />
            <input class="input-field" v-model="editingDescription" placeholder="Edit Description" />
            <button class="action-button" @click="saveUpdate">Save Update</button>
          </div>
          <div v-else class="task-item">
            <span>{{ task.title }} - {{ task.description }}</span>
            <div class="buttons">
              <button class="edit-button" @click="selectTaskForEditing(task)">Update</button>
              <button class="priority-button" @click="$emit('toggle-prioritize-task', task.id)">
                {{ task.prioritized ? 'Unprioritize' : 'Prioritize' }}
              </button>
              <button class="delete-button" @click="$emit('delete-task', task.id)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tasks: Array,
  },
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      editingTitle: '',
      editingDescription: '',
      selectedTaskId: null,
    };
  },
  methods: {
    addTask() {
      if (!this.taskTitle || !this.taskDescription) return; 
      const newTask = {
        id: Date.now().toString(),
        title: this.taskTitle,
        description: this.taskDescription,
        prioritized: false,
      };
      this.$emit('add-task', newTask);
      this.taskTitle = '';
      this.taskDescription = '';
    },
    selectTaskForEditing(task) {
      this.editingTitle = task.title;
      this.editingDescription = task.description;
      this.selectedTaskId = task.id;
    },
    saveUpdate() {
      const updatedTask = {
        id: this.selectedTaskId,
        title: this.editingTitle,
        description: this.editingDescription,
        prioritized: this.tasks.find(task => task.id === this.selectedTaskId)?.prioritized || false,
      };
      this.$emit('update-task', updatedTask);
      this.resetEditingState();
    },
    resetEditingState() {
      this.taskTitle = '';
      this.taskDescription = '';
      this.editingTitle = '';
      this.editingDescription = '';
      this.selectedTaskId = null;
    },
  },
};
</script>

<style scoped>
.manage-task {
  padding: 20px;
  background: #F0F2F5; 
  max-width: 100%;
  min-height: 85vh; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
}

.tasks-container {
  display: flex;
  gap: 20px; 
}

.task-form-container, .task-list {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); 
}

.input-field, .action-button, .edit-button, .delete-button, .priority-button {
  width: calc(100% - 20px); 
  padding: 10px;
  margin: 10px 0; 
  border-radius: 5px;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
}

.action-button, .edit-button, .delete-button, .priority-button {
  display: inline-flex; 
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #5CACEE; 
  color: black;
  margin-right: 10px; 
}

.action-button:hover, .edit-button:hover, .delete-button:hover, .priority-button:hover {
  opacity: 0.9; 
}

.edit-button {
  background-color: #FFC107; 
}

.delete-button {
  background-color: #F44336; 
}

.priority-button {
  background-color: #4CAF50; 
}

.task-item, .edit-fields {
  margin-bottom: 10px;
}

.task-item span, .edit-fields input {
  display: block; 
}

.buttons {
  display: flex;
  justify-content: space-between; 
}

h1 {
  color: #32465A; 
  margin-bottom: 20px; 
  text-align: center;
}


.buttons > button:last-child {
  margin-right: 0;
}

.task-list {
  flex-basis: 60%; 
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.task-form-container {
  flex-basis: 30%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
}

</style>
