import { createApp } from 'vue';
import TaskItem from './components/TaskItem.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component('TaskItem' , TaskItem);

app.use(router).mount('#app');
