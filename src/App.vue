<template>
  <div id="app">
    <header>
      <nav class="nav-app" v-if="isAuthenticated">
        <div class="nav-main">
          <router-link to="/tasks" class="nav-link-app">Tasks</router-link> |
          <router-link to="/manage-task" class="nav-link-app">Manage Task</router-link>
        </div>
        <div class="nav-logout" hidden>
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
import authService from './services/authService';

export default {
  data() {
    return {
      tasks: [],
      authService: authService,
      isAuthenticated: false,
    };
  },

  beforeMount() {
    console.log(authService.isAuthenticated)
    this.isAuthenticated = authService.isAuthenticated();
  },
  mounted() {
    // Fetch tasks if load
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      //putting default value
      this.tasks = [
        { id: '1', title: 'Task 1', description: 'General Cleaning.', prioritized: false },
        { id: '2', title: 'Task 2', description: 'Washing Dishes.', prioritized: true }
      ];
    },
    addTask(task) {
      //putting the receive value in tasks array
      this.tasks.push(task);
    },
    updateTask(updatedTask) {
      //updating the task in tasks array
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(taskId) {
      //deleting the task in tasks array
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    togglePrioritizeTask(taskId) {
      //toggling the priority task in tasks array
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.prioritized = !task.prioritized;
      }
    },
    completeTask(taskId) {
      //completing the task in tasks array
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        // Mark task as completed
        this.tasks[taskIndex].completed = true;
        this.tasks = [...this.tasks];
      }
    },
    logout() {
      authService.logout().then(() => {
        // Reload the window upon route changes
        window.location.reload();
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
}

.nav-app {
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link-app {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
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
}
</style>