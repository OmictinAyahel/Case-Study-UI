<template>
  <div id="app">
    <header>
      <nav class="nav-app" v-if="isAuthenticated">
        <div class="nav-main">
          <router-link to="/tasks" class="nav-link-app">Tasks</router-link> |
          <router-link to="/manage-task" class="nav-link-app">Manage Task</router-link>
        </div>
        <div class="nav-logout">
          <button class="btn-logout" @click="logout">Logout</button>
        </div>
      </nav>
    </header>
    <main>
      <router-view :tasks="tasks" @add-task="addTask" @update-task="updateTask" @delete-task="deleteTask"
        @toggle-prioritize-task="togglePrioritizeTask" @complete-task="completeTask" />
    </main>
  </div>
</template>

<script>
// Importing authService module
import authService from './services/authService';

export default {
  data() {
    // Initializing data properties
    return {
      tasks: [], // Array to store tasks
      authService: authService, // Reference to authentication service
      isAuthenticated: false, // Flag to track user authentication status
    };
  },

  beforeMount() {
    // Executed before mounting the component
    // Checking user authentication status
    console.log(authService.isAuthenticated)
    this.isAuthenticated = authService.isAuthenticated();
  },
  mounted() {
    // Executed after the component is mounted
    // Fetching tasks
    this.fetchTasks();
  },
  methods: {
    // Method to fetch tasks
    fetchTasks() {
      // Putting default tasks into the tasks array
      this.tasks = [
        { id: '1', title: 'Task 1', description: 'General Cleaning.', prioritized: false },
        { id: '2', title: 'Task 2', description: 'Washing Dishes.', prioritized: true }
      ];
    },
    // Method to add a task
    addTask(task) {
      // Adding the received task to the tasks array
      this.tasks.push(task);
    },
    // Method to update a task
    updateTask(updatedTask) {
      // Updating the task in the tasks array
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    // Method to delete a task
    deleteTask(taskId) {
      // Deleting the task from the tasks array
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    // Method to toggle task priority
    togglePrioritizeTask(taskId) {
      // Toggling the priority of a task in the tasks array
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.prioritized = !task.prioritized;
      }
    },
    // Method to mark a task as completed
    completeTask(taskId) {
      // Finding the index of the task
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        // Marking task as completed
        this.tasks[taskIndex].completed = true;
        // Updating tasks array
        this.tasks = [...this.tasks];
      }
    },
    // Method to handle user logout
    logout() {
      authService.logout().then(() => {
        // Reloading the window upon route changes
        window.location.reload();
        // Navigating user to the home page
        this.$router.push('/');
      })
    }
  },
};
</script>


<style scoped>
html,
body {
  overflow: hidden;
  background-color: #f5f5f5; 
}

.nav-app {
  background-color: #f9f9f9; 
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease; 
}

.nav-link-app {
  text-decoration: none; 
  color: #333; 
  font-weight: bold;
  font-size: 14px; 
  margin-right: 5px; 
  margin-left: 5px;
  transition: color 0.3s ease; 
}

.nav-link-app:hover {
  color: #007bff; 
}

.nav-main {
  display: flex;
  align-items: center;
}

.nav-logout {
  display: flex;
  align-items: center;
}

.btn-logout {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.btn-logout:hover {
  background-color: #0056b3; 
}
</style>
