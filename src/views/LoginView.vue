<template>
    <div class="login-page">

        <div class="login-container">
            <h5>admin:admin</h5>
            <h2>Login </h2>
            <h5 style="color: red;">{{ errorHandler }}</h5>
            <form @submit.prevent="login" class="login-form">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username" required />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import authService from '@/services/authService';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorHandler: '',
        };
    },
    mounted() {
        //call the function for protecting the routes
        this.authenticated();
    },
    methods: {
        authenticated() {
            // Check if user is authenticated function
            if (authService.isAuthenticated()) {
                this.$router.replace('/tasks');
            }
        },
        login() {
            // Login function
            authService.login(this.username, this.password)
                .then(() => {
                    // Redirect to tasks page
                    this.$router.replace('/tasks');
                })
                .catch(() => {
                    // Display error message
                    this.errorHandler = 'Invalid username or password';
                });
        }
    }
};
</script>

<style scoped>
.login-page {
    margin-top: 10%;
}

.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;

}

.login-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>
