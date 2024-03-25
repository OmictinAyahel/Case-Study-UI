<template>
  <div id="app">
    <header>
      <nav class="nav-app">
        <router-link to="/" class="nav-link-app">Tasks</router-link> | 
        <router-link to="/manage-task" class="nav-link-app">Manage Task</router-link>
      </nav>
    </header>
    <main>
      <router-view 
        :tasks="tasks" 
        @add-task="addTask" 
        @update-task="updateTask" 
        @delete-task="deleteTask" 
        @toggle-prioritize-task="togglePrioritizeTask"
        @complete-task="completeTask" />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      this.tasks = [
        { id: '1', title: 'Task 1', description: 'General Cleaning.', prioritized: false },
        { id: '2', title: 'Task 2', description: 'Washing Dishes.', prioritized: true }
      ];
    },
    addTask(task) {
      this.tasks.push(task);
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    togglePrioritizeTask(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.prioritized = !task.prioritized;
      }
    },
    completeTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = true; 
        this.tasks = [...this.tasks];
      }
    },
  },
};
</script>
<style scoped>
html, body{
  overflow: hidden;
}
.nav-app {
  background-color: #ffffff; 
  padding: 10px 20px;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  text-align: center;
}

.nav-link-app {
  text-decoration: none;
  color: #007bff; 
  font-weight: bold;
}
</style>