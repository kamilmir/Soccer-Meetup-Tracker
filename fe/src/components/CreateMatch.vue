<template>
    <div class="create-match-container">
      <h2>Create a New Soccer Match</h2>
  
      <!-- Display loading state if creating match -->
      <div v-if="isLoading" class="loading">Creating match...</div>
  
      <!-- Form for creating match -->
      <form @submit.prevent="handleSubmit" class="create-match-form">
        <div class="form-group">
          <label for="title">Match Title</label>
          <input
            type="text"
            id="title"
            v-model="match.title"
            placeholder="Enter match title"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="time">Match Time</label>
          <input
            type="datetime-local"
            id="time"
            v-model="match.time"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="place">Match Place</label>
          <input
            type="text"
            id="place"
            v-model="match.place"
            placeholder="Enter match place"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="maxPeople">Max People</label>
          <input
            type="number"
            id="maxPeople"
            v-model="match.maxPeople"
            placeholder="Enter max number of people"
            min="1"
            required
          />
        </div>
  
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  
        <button type="submit" class="submit-btn" :disabled="isLoading">Create Game</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        match: {
          title: "",
          time: "",
          place: "",
          maxPeople: 1,
        },
        isLoading: false,
        errorMessage: "",
      };
    },
    methods: {
      async handleSubmit() {
        this.isLoading = true;
        this.errorMessage = ""; // Reset any previous error messages
  
        try {
          const token = localStorage.getItem("jwt_token");
          if (!token) {
            this.$router.push("/login"); // Redirect to login if no token
            return;
          }
  
          const response = await axios.post(
            "http://localhost:3000/api/v1/match/create",
            this.match,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          console.log(response);
  
          // Redirect to dashboard after successful match creation
          this.$router.push("/dashboard");
        } catch (error) {
          this.errorMessage = error.response
            ? error.response.data.message
            : "An error occurred while creating the match.";
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .create-match-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .create-match-container h2 {
    margin-bottom: 20px;
  }
  
  .create-match-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-btn {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    font-size: 16px;
  }
  </style>
  