<template>
  <div class="auth-wrapper">
    <!-- Animated Background -->
    <div class="animated-bg"></div>

    <!-- Welcome Header -->
    <div class="welcome-header">
      <h1 class="welcome-title">Welcome to <span class="brand-gradient">KTrade Securities</span></h1>
      <p class="welcome-subtitle">Your gateway to smarter investments</p>
    </div>

    <!-- Login Card -->
    <div class="auth-card animate-float">
      <div class="card-header">
        <h2 class="form-title">Login to Your Account</h2>
        <p class="form-subtitle">Welcome back! Please enter your details</p>
      </div>

      <form @submit.prevent="handleLogin" class="form-box">
        <div class="input-group">
          <svg class="input-icon" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            required
            class="form-input"
          />
        </div>

        <div class="input-group">
          <svg class="input-icon" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
            class="form-input"
          />
          <button 
            type="button" 
            class="password-toggle"
            @click="showPassword = !showPassword"
          >
            <svg viewBox="0 0 24 24">
              <path v-if="showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle v-if="showPassword" cx="12" cy="12" r="3"/>
              <path v-else d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line v-else x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe"/>
            <span>Remember me</span>
          </label>
          <router-link to="/forgot-password" class="forgot-password">
            Forgot password?
          </router-link>
        </div>

        <button type="submit" class="form-button" :disabled="isLoading">
          <span v-if="!isLoading">Login</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <transition name="fade">
          <p v-if="message" class="form-message" :class="{ 'success-message': !message.includes('Invalid') }">
            {{ message }}
          </p>
        </transition>

        <p class="form-link">
          Don't have an account?
          <router-link to="/signup" class="link-underline">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      message: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true
      this.message = ''
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const users = JSON.parse(localStorage.getItem('users')) || []
      const user = users.find(u => u.email === this.email && u.password === this.password)
      
      if (user) {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('loggedInUserEmail', this.email)
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.email)
        }
        this.message = 'Login successful! Redirecting...'
        setTimeout(() => this.$router.push('/dashboard'), 1500)
      } else {
        this.message = 'Invalid credentials. Please try again.'
      }
      
      this.isLoading = false
    }
  },
  mounted() {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      this.email = rememberedEmail
      this.rememberMe = true
    }
  }
}
</script>

<style scoped>
input.form-input{
  color: grey;
}
/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
}

/* Layout */
.auth-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
  z-index: 0;
  animation: gradientShift 12s ease infinite;
  background-size: 200% 200%;
}

/* Welcome Section */
.welcome-header {
  text-align: center;
  margin-bottom: 3rem;
  z-index: 1;
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

/* Auth Card */
.auth-card {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(160, 174, 192, 0.15);
  z-index: 1;
  transform: translateY(0);
  animation: fadeInUp 0.8s ease-out, float 6s ease-in-out infinite 0.8s;
}

.card-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #718096;
  font-size: 1rem;
}

/* Form Elements */
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

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.password-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke: #64748b;
  transition: stroke 0.3s;
}

.password-toggle:hover svg {
  stroke: #4f46e5;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  cursor: pointer;
}

.remember-me input {
  accent-color: #4f46e5;
}

.forgot-password {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #4338ca;
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

.form-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.25);
}

.form-button:active:not(:disabled) {
  transform: translateY(0);
}

.form-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
}

.error-message {
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

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .auth-card {
    padding: 2rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
}
</style>