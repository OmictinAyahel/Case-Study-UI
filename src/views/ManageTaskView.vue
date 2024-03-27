<template>
  <div class="manage-task">
    <h1>Manage Tasks</h1>
    <div class="tasks-container">
      <div class="task-form-container" v-if="selectedTaskId === null">
        <div class="task-form">

          <input class="input-field" v-model="taskTitle" placeholder="Task Title" />

          <input class="input-field" v-model="taskDescription" placeholder="Task Description" />
          <button class="action-button-task" @click="addTask">Add Task</button>
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
// Importing authService module
import authService from '@/services/authService';

export default {
  props: ['tasks'], // Define props for receiving tasks from parent component
  data() {
    // Initializing data properties
    return {
      taskTitle: '', // Title of the new task
      taskDescription: '', // Description of the new task
      editingTitle: '', // Title of the task being edited
      editingDescription: '', // Description of the task being edited
      taskError: '', // Error message for task input validation
      selectedTaskId: null, // ID of the selected task for editing
    };
  },
  mounted() {
    // Executed after the component is mounted
    // Call the function to check if user is authenticated
    this.authenticated();
  },
  methods: {
    // Method to check if user is authenticated
    authenticated() {
      // Redirect to login page if user is not authenticated
      if (!authService.isAuthenticated()) {
        this.$router.replace('/login');
      }
    },
  
    // Method to add a new task
    addTask() {
      // Validate if title and description are not empty
      if (!this.taskTitle || !this.taskDescription) {
        this.taskError = 'Title and description cannot be empty ';
        return;
      }

      // Create a new task object with provided details
      const newTask = {
        id: Date.now().toString(), // Generate unique ID for the task
        title: this.taskTitle, // Set task title
        description: this.taskDescription, // Set task description
        prioritized: false, // Initialize task as not prioritized
      };
      // Clear any previous error messages
      this.taskError = '';
      // Emit the new task to the parent component
      this.$emit('add-task', newTask);
      // Clear input fields after adding task
      this.taskTitle = '';
      this.taskDescription = '';
    },
    // Method to select a task for editing
    selectTaskForEditing(task) {
      // Set editing state with selected task details
      this.editingTitle = task.title;
      this.editingDescription = task.description;
      this.selectedTaskId = task.id;
    },
    // Method to save updates made to a task
    saveUpdate() {
      // Create an updated task object with edited details
      const updatedTask = {
        id: this.selectedTaskId, // Retain the original task ID
        title: this.editingTitle, // Update task title
        description: this.editingDescription, // Update task description
        prioritized: this.tasks.find(task => task.id === this.selectedTaskId)?.prioritized || false, // Retain prioritization status
      };
      // Emit the updated task to the parent component
      this.$emit('update-task', updatedTask);
      // Reset editing state/values after saving update
      this.resetEditingState();
    },
    // Method to reset editing state/values
    resetEditingState() {
      // Reset all editing-related state/values
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
  background-color: #f0f0f0;
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
  background-color: #ffffff; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field,
.action-button-task,
.action-button,
.edit-button,
.delete-button,
.priority-button {
  width: 350px;
  padding: 8px 10px; 
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, opacity 0.3s;
}

.action-button{

  margin-left:20px;

}

.input-field:focus,
.action-button:hover,
.action-button-task:hover,
.edit-button:hover,
.delete-button:hover,
.priority-button:hover {
  outline: none;
}

.action-button,
.action-button-task,
.edit-button,
.delete-button,
.priority-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #007BFF;
  color: white;
  font-size: 14px; 
  
}



.edit-button:hover,
.action-button:hover,
.action-button-task:hover,
.delete-button:hover,
.priority-button:hover {
  background-color: #0056b3;
}

.task-item,
.edit-fields {
  margin-bottom: 10px;
}

.task-item span,
.edit-fields input {
  display: block;
  margin-bottom: 5px; 
  margin-left: 20px; 
  margin-top: 10px;
}

.buttons {
  display: flex;
  margin-left: 30px;
  
}

h1 {
  color: #32465A; 
  margin-bottom: 20px;
}

.task-list {
  flex-basis: 60%;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.task-form-container {
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
