<template>
  <div class="manage-task">
    <h1>Manage Tasks</h1>
    <div class="tasks-container">
      <div class="task-form-container" v-if="selectedTaskId === null">
        <div class="task-form">

          <input class="input-field" v-model="taskTitle" placeholder="Task Title" />

          <input class="input-field" v-model="taskDescription" placeholder="Task Description" />
          <button class="action-button" @click="addTask">Add Task</button>
          <h5 style="color: red;"> {{ taskError }}</h5>
        </div>
      </div>
      <ul class="task-list">
        <li v-if="!tasks || tasks.length === 0">
          No task available
        </li>
        <li v-else v-for="task in tasks" :key="task.id">
          <div v-if="selectedTaskId === task.id" class="edit-fields">
            <input class="input-field" v-model="editingTitle" placeholder="Edit Title" />
            <input class="input-field" v-model="editingDescription" placeholder="Edit Description" />
            <button class="action-button" @click="saveUpdate">Save Update</button>
          </div>
          <div v-else class="task-item">
            <span><strong>{{ task.title }}</strong> - {{ task.description }}</span>
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
import authService from '@/services/authService';
export default {
  props: ['tasks'],
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      editingTitle: '',
      editingDescription: '',
      taskError: '',
      selectedTaskId: null,
    };
  },
  mounted() {
    //call the function for protecting the routes
    this.authenticated();
  },
  methods: {
    // Check if user is authenticated function
    authenticated() {
      if (!authService.isAuthenticated()) {
        this.$router.replace('/login');
      }
    },
  
    // Add task
    addTask() {
      // Check if title and description are not empty
      if (!this.taskTitle || !this.taskDescription) {
        this.taskError = 'Title and description cannot be empty ';

        return;
      }

      //putting all the needed values in an object
      const newTask = {
        id: Date.now().toString(),
        title: this.taskTitle,
        description: this.taskDescription,
        prioritized: false,
      };
      this.taskTitleError = '';
      this.taskDescriptionError = '';
      //emit the new task (pass the object to the parent component)
      this.$emit('add-task', newTask);
      this.taskTitle = '';
      this.taskDescription = '';
    },
    selectTaskForEditing(task) {
      //selecting the task for editing
      this.editingTitle = task.title;
      this.editingDescription = task.description;
      this.selectedTaskId = task.id;
    },
    saveUpdate() {
      //function to update the selected task
      //putting all the needed values in an object
      const updatedTask = {
        id: this.selectedTaskId,
        title: this.editingTitle,
        description: this.editingDescription,
        prioritized: this.tasks.find(task => task.id === this.selectedTaskId)?.prioritized || false,
      };
      //emit the updated task (pass the object to the parent component)
      this.$emit('update-task', updatedTask);
      this.resetEditingState();
    },
    resetEditingState() {

      //resetting the editing state/values
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
  background: #AEC2B6;
  max-width: 100%;
  min-height: 85vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tasks-container {
  display: flex;
  gap: 20px;
}

.task-form-container,
.task-list {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.input-field,
.action-button,
.edit-button,
.delete-button,
.priority-button {
  width: calc(80% - 20px);
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
}

.action-button,
.edit-button,
.delete-button,
.priority-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #CCD6A6;
  color: #32465A;
  margin-right: 10px;
  width: 40%;
  
}

.action-button:hover,
.edit-button:hover,
.delete-button:hover,
.priority-button:hover {
  opacity: 0.9;
}

.edit-button {
  background-color: #7D8F69;
  color: white;
}

.delete-button {
  background-color: #7D8F69;
  color: white;
}

.priority-button {
  background-color: #7D8F69;
  color: white;
}

.task-item,
.edit-fields {
  margin-bottom: 10px;
}

.task-item span,
.edit-fields input {
  display: block;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

h1 {
  color: #32465A;
  margin-bottom: 20px;
 
}

.buttons>button:last-child {
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.task-form-container {
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
