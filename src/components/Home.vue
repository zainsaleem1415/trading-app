<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="hero-title">Welcome to <span class="brand">K-Trade Securities</span></h1>
      <p class="hero-subtitle">Your gateway to smarter investments</p>
    </div>

    <div class="auth-options">
      <div class="auth-card signup-card">
        <h2>New to K-Trade?</h2>
        <p>Create an account to start your investment journey</p>
        <router-link to="/signup" class="auth-button primary">
          Sign Up
        </router-link>
      </div>

      <div class="auth-card login-card">
        <h2>Already have an account?</h2>
        <p>Sign in to access your portfolio and alerts</p>
        <router-link to="/login" class="auth-button secondary">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.brand {
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 400;
}

.auth-options {
  display: flex;
  gap: 2rem;
  max-width: 900px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

.auth-card {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(160, 174, 192, 0.15);
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

.auth-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.auth-card p {
  color: #718096;
  margin-bottom: 1.5rem;
}

.auth-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
}

.primary {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
}

.primary:hover {
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  transform: translateY(-2px);
}

.secondary {
  background: white;
  color: #4f46e5;
  border: 1px solid #e2e8f0;
}

.secondary:hover {
  background: #f8fafc;
  border-color: #c7d2fe;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .auth-options {
    flex-direction: column;
    align-items: center;
  }
  
  .auth-card {
    width: 100%;
  }
}
</style>