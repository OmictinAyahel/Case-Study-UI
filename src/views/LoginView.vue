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
                    // Reload the window upon route changes
                    window.location.reload();
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #e9ecef;
}

.login-container {
    width: 100%;
    max-width: 350px;
    margin: auto;
    padding: 25px;
    background-color: #AEC2B6;
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
    transition: border 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border: 1px solid #007bff;
    background-color: #e9ecef;
    outline: none;
}

input[type="text"]:hover,
input[type="password"]:hover {
    background-color: #f1f3f5;
}

.login-button {
    width: 65%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #5F7464; 
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
    text-align: center;
    margin-left: 17%;
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
    margin-bottom: .5rem;
    color: #495057;
}

</style>
