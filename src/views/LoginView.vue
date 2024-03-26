<template>
    <div class="login-page">

        <div class="login-container">

            <center><h1>Login </h1></center>
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
                <button type="submit" class="login-button">submit</button>
            </form>
        </div>
    </div>
</template>

<script>
// Importing authService module
import authService from '@/services/authService';

export default {
    data() {
        // Initializing data properties
        return {
            username: '', // User input for username
            password: '', // User input for password
            errorHandler: '', // Error message handler
        };
    },
    mounted() {
        // Executed after the component is mounted
        // Call the function to check if user is authenticated
        this.authenticated();
    },
    methods: {
        // Method to check if user is authenticated
        authenticated() {
            // Check if user is authenticated using authService
            if (authService.isAuthenticated()) {
                // Redirect to tasks page if authenticated
                this.$router.replace('/tasks');
            }
        },
        // Method to handle user login
        login() {
            // Login function using authService
            authService.login(this.username, this.password)
                .then(() => {
                    // Redirect to tasks page upon successful login
                    // Reload the window upon route changes
                    window.location.reload();
                    this.$router.replace('/tasks');
                })
                .catch(() => {
                    // Display error message for invalid credentials
                    this.errorHandler = 'Invalid username or password';
                });
        }
    }
};
</script>


<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5; 
}

.login-container {
    width: 100%;
    max-width: 350px;
    margin: auto;
    padding: 25px;
    background-color: #f9f9f9; 
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="password"] {
    width: calc(100% - 24px); 
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #f8f9fa;
    transition: border-color 0.3s, background-color 0.3s; 
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #007bff; 
    background-color: #e9ecef;
    outline: none;
}

.login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff; 
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s; 
}

.login-button:hover {
    background-color: #0056b3; 
    transform: translateY(-2px); 
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333; 
}

h1 {
    margin-bottom: 20px;
    color: #333; 
}

h5 {
    color: red;
    margin-bottom: 20px;
}
</style>
