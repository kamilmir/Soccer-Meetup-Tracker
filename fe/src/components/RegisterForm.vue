<template>
    <div class="register-container">
      <h2>Sign Up for Soccer App</h2>
      <form @submit.prevent="handleRegister">
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
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
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
  
        <button type="submit">Register</button>
  
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
  
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
        errorMessage: ""
      };
    },
    methods: {
      async handleRegister() {
        try {
          // Make API request to register user
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username: this.username,
            email: this.email,
            password: this.password
          });
          console.log(response);
  
          // On successful registration, redirect user to login page
          this.$router.push("/login");
        } catch (error) {
          // Handle error and show error message
          this.errorMessage = error.response ? error.response.data.message : "An error occurred!";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
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
  
  button:hover {
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
  