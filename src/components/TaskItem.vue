<template id="task-item">
  <li>
    <input type="checkbox" :checked="task.completed" @change="confirmCompletion">
    <strong>{{ task.title }}</strong>
    <p>{{ task.description }}</p>
  </li>
</template>

<script>
export default {
  //Receive the task as a prop [array]
  props: ['task'],
  methods: {
   //Pass the id and call function from the task to complete a task
    confirmCompletion() {
      this.$emit('request-completion', this.task.id);
    },
  },
};
</script>
