<template>
  <div class="signup-wrapper">
    <!-- Welcome Header with Animation -->
    <div class="welcome-header">
      <h1 class="welcome-title">Welcome to <span class="brand-gradient">K-Trade Securities</span></h1>
      <p class="welcome-subtitle">Your gateway to smarter investments</p>
    </div>

    <!-- Sign Up Card with Floating Animation -->
    <div class="signup-card animate-float">
      <h2 class="form-title">Create Your Account</h2>
      <form @submit.prevent="handleSignup" class="form-box">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            placeholder="Full Name"
            required
            class="form-input"
          />
          <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <div class="input-group">
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            required
            class="form-input"
          />
          <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>

        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="form-input"
          />
          <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <button type="submit" class="form-button">
          <span v-if="!isLoading">Sign Up</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <transition name="fade">
          <p v-if="message" class="form-message" :class="{ 'success-message': !message.includes('already') }">
            {{ message }}
          </p>
        </transition>

        <p class="form-link">
          Already have an account?
          <router-link to="/login" class="link-underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: '',
      isLoading: false
    }
  },
  methods: {
    async handleSignup() {
      this.isLoading = true;
      this.message = '';
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const exists = users.some(u => u.email === this.email);
      
      if (exists) {
        this.message = 'This email is already registered';
      } else {
        users.push({
          name: this.name,
          email: this.email,
          password: this.password
        });
        localStorage.setItem('users', JSON.stringify(users));
        this.message = 'Account created successfully! Redirecting...';
        setTimeout(() => this.$router.push('/login'), 1500);
      }
      
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
input.form-input{
  color: black;
}
/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

/* Layout */
.signup-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

/* Welcome Section */
.welcome-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease-out;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  line-height: 1.2;
}

.brand-gradient {
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin-top: 0.8rem;
  font-weight: 400;
}

/* Sign Up Card */
.signup-card {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(160, 174, 192, 0.15);
  transform: translateY(0);
  animation: float 6s ease-in-out infinite;
}

.animate-float {
  animation: fadeInUp 0.8s ease-out, float 6s ease-in-out infinite 0.8s;
}

/* Form Elements */
.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #2d3748;
  text-align: center;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #f8fafc;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
}

.form-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
  background-color: white;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  stroke: #64748b;
  transition: stroke 0.3s;
}

.form-input:focus + .input-icon {
  stroke: #4f46e5;
}

/* Button */
.form-button {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
  position: relative;
  overflow: hidden;
}

.form-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.25);
}

.form-button:active {
  transform: translateY(0);
}

.loading-spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

/* Messages */
.form-message {
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  margin-top: 1rem;
  background-color: #fee2e2;
  color: #dc2626;
}

.success-message {
  background-color: #dcfce7;
  color: #16a34a;
}

/* Link */
.form-link {
  margin-top: 1.5rem;
  font-size: 1rem;
  text-align: center;
  color: #4a5568;
}

.link-underline {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  position: relative;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #4f46e5;
  transition: width 0.3s;
}

.link-underline:hover::after {
  width: 100%;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .signup-card {
    padding: 2rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
}
</style>