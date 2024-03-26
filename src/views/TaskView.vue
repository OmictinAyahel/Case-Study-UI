<template>
  <div class="task-view">
    <div class="header">
      <h1>Task Manager</h1>
      <router-link to="/manage-task" class="create-task-button">+ Create Task</router-link>
    </div>
    <div class="grid-container">


      <div class="task-section">
        <h2>To-Do Tasks</h2>
        <div v-if="todoTasks.length > 0" class="task-list">
          <TaskItem v-for="task in todoTasks" :key="task.id" :task="task" 
            @request-completion="requestCompletion" />
        </div>
        <p v-else>There are no to-do tasks listed.</p>
      </div>

      <div class="task-section">
        <h2>Prioritized Tasks</h2>
        <div v-if="prioritizedTasks.length > 0" class="task-list">
          <TaskItem v-for="task in prioritizedTasks" :key="task.id" :task="task"
            @request-completion="requestCompletion" />
        </div>
        <p v-else>There are no prioritized tasks listed.</p>
      </div>

      <div class="stats-section">
        <h3>Total Tasks</h3>
        <p>{{ tasks.length - completedTasks.length }}</p>
      </div>
      <div class="stats-section">
        <h3>Completed Tasks ({{ completedTasks.length }})</h3>
        <div v-if="completedTasks.length > 0" class="task-list">
          <div v-for="task in completedTasks" :key="task.id" class="completed-task-item">
            <strong>{{ task.title }}</strong>
            <p>{{ task.description }}</p>
          </div>
        </div>
        <p v-else>No tasks have been completed yet.</p>
      </div>
    </div>
  </div>
</template>


<script>
// Importing authService module
import authService from '@/services/authService';

export default {
  props: ['tasks'], // Define props for receiving tasks from parent component
  mounted() {
    // Executed after the component is mounted
    // Call the function to check if user is authenticated
    this.authenticated();
  },
  methods: {
    // Method to check if user is authenticated
    authenticated() {
      // Check if user is authenticated using authService
      if (!authService.isAuthenticated()) {
        // If user is not authenticated, redirect to login page
        this.$router.replace('/login');
      }
    },
    // Method to request completion of a task
    requestCompletion(taskId) {
      // Emit the task ID to indicate completion request
      this.$emit('complete-task', taskId);
    },
  },
  computed: {
    // Computed property to filter tasks that are not prioritized and not completed
    todoTasks() {
      return this.tasks.filter(task => !task.prioritized && !task.completed);
    },
    // Computed property to filter tasks that are prioritized and not completed
    prioritizedTasks() {
      return this.tasks.filter(task => task.prioritized && !task.completed);
    },
    // Computed property to filter tasks that are completed
    completedTasks() {
      return this.tasks.filter(task => task.completed);
    }
  }
};
</script>



<style scoped>
html,
body {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

.task-view {
  padding: 20px;
  background: #f5f5f5; 
  min-height: 80vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  margin: 0;
  color: #32465A;
}

.create-task-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.create-task-button:hover {
  background-color: #0056b3;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.task-section,
.stats-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.task-section:hover,
.stats-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.task-list {
  max-height: 250px;
  overflow-y: auto;
}

h2,
h3 {
  color: #32465A;
}

p {
  color: #596C78;
}
</style>