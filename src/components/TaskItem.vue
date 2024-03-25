<template>
  <li>
    <input type="checkbox" :checked="task.completed" @change="confirmCompletion">
    <strong>{{ task.title }}</strong>
    <p>{{ task.description }}</p>
  </li>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    confirmCompletion() {
      this.$emit('request-completion', this.task.id);
    },
  },
};
</script>
