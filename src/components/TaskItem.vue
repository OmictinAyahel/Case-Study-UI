<template id="task-item">
  <li>
    <input type="checkbox" :checked="task.completed" @change="confirmCompletion">
    <strong>{{ task.title }}</strong>
    <p>{{ task.description }}</p>
  </li>
</template>

<script>
export default {
  // Receive the task as a prop [array]
  props: ['task'],
  methods: {
    // Method to confirm completion of a task
    confirmCompletion() {
      // Emit the task ID to request completion
      this.$emit('request-completion', this.task.id);
    },
  },
};
</script>



<style scoped>
li {
  list-style-type: none; 
  margin-bottom: 15px;
}

strong {
  font-weight: bold;
}

p {
  margin-top: 5px;
  color: #666;
}

input[type="checkbox"] {
  margin-right: 10px;
}

input[type="checkbox"]:checked + strong {
  text-decoration: line-through;
}
</style>