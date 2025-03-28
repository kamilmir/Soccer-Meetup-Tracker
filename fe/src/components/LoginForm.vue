<template>
  <div class="login-container">
    <h2>Login to Soccer App</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = ""; // Clear previous error message

      try {
        // Make API request to login
        const response = await axios.post("http://localhost:3000/api/v1/user/login", {
          username: this.username,
          password: this.password
        });

        // On successful login, store the JWT token in localStorage
        localStorage.setItem("jwt_token", response.data.jwt_token);
        localStorage.setItem("user_id", response.data.user_id);

        // Redirect user to the home page or dashboard after successful login
        this.$router.push("/dashboard"); // If using vue-router
      } catch (error) {
        // Handle error and show error message
        this.errorMessage = error.response ? error.response.data.message : "An error occurred!";
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    // Check if the user is already logged in (i.e., JWT token exists)
    if (localStorage.getItem("jwt_token")) {
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: #ccc;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 14px;
}

p {
  text-align: center;
  margin-top: 10px;
}
</style>
