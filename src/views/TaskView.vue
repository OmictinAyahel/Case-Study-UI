<template>
  <div class="task-view">
    <div class="header">
      <h1>Task Manager</h1>
      <router-link to="/manage-task" class="create-task-button">+ Create Task</router-link>
    </div>
    <div class="grid-container">
      <div class="task-section" v-if="todoTasks.length > 0">
        <h2>To-Do Tasks</h2>
        <TaskItem 
          v-for="task in todoTasks" 
          :key="task.id" 
          :task="task" 
          @request-completion="requestCompletion" />
      </div>
      <p v-else>There are no to-do tasks listed.</p>
      <div class="task-section">
        <h2>Prioritized Tasks</h2>
        <div v-if="prioritizedTasks.length > 0" class="task-list">
          <TaskItem 
            v-for="task in prioritizedTasks" 
            :key="task.id" 
            :task="task" 
            @request-completion="requestCompletion" />
        </div>
        <p v-else>There are no prioritized tasks listed.</p>
      </div>
      <div class="stats-section">
        <h3>Total Tasks</h3>
        <p>{{ tasks.length - completedTasks.length}}</p>
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
import TaskItem from '@/components/TaskItem.vue';

export default {
  props: ['tasks'],
  components: {
    TaskItem
  },
  computed: {
    todoTasks() {
      return this.tasks.filter(task => !task.prioritized && !task.completed);
    },
    prioritizedTasks() {
      return this.tasks.filter(task => task.prioritized && !task.completed);
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed);
    }
  },
  methods: {
    requestCompletion(taskId) {
      this.$emit('complete-task', taskId);
    },
  }
};
</script>
<style scoped>
html, body{
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

.task-view {
  padding: 20px;
  background: #F0F2F5;
  min-height: 80vh;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
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
  background-color: #5CACEE; 
  color: white;
  border-radius: 20px; 
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s; 
}

.create-task-button:hover {
  background-color: #007BFF; 
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.task-section, .stats-section {
  background: white;
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
  transition: transform 0.3s, box-shadow 0.3s; 
}

.task-section:hover, .stats-section:hover {
  transform: translateY(-5px); 
  box-shadow: 0 6px 12px rgba(0,0,0,0.2); 
}

.task-list {
  max-height: 250px;
  overflow-y: auto;
}

h2, h3 {
  color: #32465A; 
}

p {
  color: #596C78; 
}
</style>

