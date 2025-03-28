<template>
  <div class="dashboard-container">
    <h2>Available Soccer Games</h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading">Loading matches...</div>

    <!-- Error state -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- No matches available state -->
    <div v-if="matches.length === 0" class="no-matches">
      No matches available at the moment.
    </div>

    <!-- Match List -->
    <div v-else>
      <div class="match-list">
        <div v-for="match in matches" :key="match._id" class="match-card">
          <h3>{{ match.title }}</h3>
          <p>Time: {{ new Date(match.time).toLocaleString() }}</p>
          <p>Location: {{ match.place }}</p>
          <p>Available Spots: {{ match.availableSpots }}</p>
          
          <!-- button -->
          <div class="display-flex">
              <!-- Join or Leave button -->
              <div v-if="isUserSubscribed(match)" class="w-10">
                <button @click="removeFromMatch(match._id)" class="leave-btn">
                  Leave Game
                </button>
              </div>
              <div v-else class="w-10">
                <button @click="joinMatch(match._id)" class="join-btn">
                  Join Game
                </button>
              </div>
              <!-- View Registered Users Button -->
              <div class="w-10 ml-1">
                <button @click="viewRegisteredUsers(match._id)" class="view-registered-btn">
                  Joining List
                </button>
              </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Registered Users Modal -->
    <div v-if="showUsersModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <!-- Close button -->
        <span @click="closeModal" class="close-btn">&times;</span>
        <h3>Registered Users</h3>
        <ul>
          <li v-for="user in registeredUsers" :key="user._id">
            {{ user.username }} - {{ user.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      matches: [],
      errorMessage: "",
      isLoading: false,
      showUsersModal: false, // Controls modal visibility
      registeredUsers: [], // Stores list of registered users
    };
  },
  methods: {
    // Fetch available matches from the backend API
    async fetchMatches() {
      this.isLoading = true;
      this.errorMessage = ""; // Clear previous error messages

      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          this.$router.push("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/match/available",
          {
            headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
          }
        );

        // Calculate available spots for each match
        this.matches = response.data.map((match) => ({
          ...match,
          availableSpots: match.maxPeople - match.listPeopleSubscribed.length,
        }));
      } catch (error) {
        // Check for 401 Unauthorized error
        if (error.response && error.response.status === 401) {
          // Clear local storage and redirect to login
          localStorage.removeItem("jwt_token");
          this.$router.push("/login"); // Redirect to login page
        }
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred while fetching the matches.";
      } finally {
        this.isLoading = false;
      }
    },

    // Check if the user is already subscribed to the match
    isUserSubscribed(match) {
      const userId = localStorage.getItem("user_id");
      return match.listPeopleSubscribed.includes(userId);
    },

    // Join a match
    async joinMatch(matchId) {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        await axios.post(
          `http://localhost:3000/api/v1/match/register/${matchId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.fetchMatches(); // Refresh matches after joining
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred while joining the match.";
      }
    },

    // Remove user from match
    async removeFromMatch(matchId) {
      const token = localStorage.getItem("jwt_token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        this.$router.push("/login");
        return;
      }

      try {
        await axios.post(
          `http://localhost:3000/api/v1/match/remove/${matchId}`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.fetchMatches(); // Refresh matches after leaving
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred while leaving the match.";
      }
    },

    // View registered users for a match
    async viewRegisteredUsers(matchId) {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/match/registered/${matchId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.registeredUsers = response.data.users;
        this.showUsersModal = true; // Show the modal with the registered users
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred while fetching the registered users.";
      }
    },

    // Close the modal
    closeModal() {
      this.showUsersModal = false;
    },
  },
  mounted() {
    this.fetchMatches(); // Fetch matches when the component is mounted
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.match-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.match-card {
  width: 45%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.match-card h3 {
  margin-bottom: 10px;
}

.match-card p {
  margin: 5px 0;
}

.join-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.join-btn:hover {
  background-color: #45a049;
}

.leave-btn {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.leave-btn:hover {
  background-color: #d32f2f;
}

.view-registered-btn {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-registered-btn:hover {
  background-color: #1976d2;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: left;
  position: relative; /* Needed for positioning the close button */
}

.close-btn {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  position: absolute;
  top: 5px;
  right: 5px;
}

.close-btn:hover {
  color: red;
}

.display-flex {
  display: flex;
  justify-content: center;
}

.w-10 {
  width: 10rem;
}

.ml-1 {
  margin-left: 0.2rem;
}
</style>
