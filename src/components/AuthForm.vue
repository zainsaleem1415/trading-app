<template>
    <div class="form-container">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        
        <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        <p class="toggle">
          <span>{{ isLogin ? "Don't have an account?" : "Already have an account?" }}</span>
          <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Sign Up' : 'Login' }}</a>
        </p>
        <p v-if="message" class="message">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthForm',
    data() {
      return {
        isLogin: true,
        form: {
          email: '',
          password: ''
        },
        message: ''
      }
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
        this.form.email = '';
        this.form.password = '';
        this.message = '';
      },
      handleSubmit() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
  
        if (this.isLogin) {
          const user = users.find(u => u.email === this.form.email && u.password === this.form.password);
          if (user) {
            this.message = 'Login successful!';
          } else {
            this.message = 'Invalid credentials.';
          }
        } else {
          const exists = users.some(u => u.email === this.form.email);
          if (exists) {
            this.message = 'User already exists.';
          } else {
            users.push({ ...this.form });
            localStorage.setItem('users', JSON.stringify(users));
            this.message = 'Signup successful. Please login.';
            this.isLogin = true;
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 300px;
  }
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover {
    background-color: #5a67d8;
  }
  .toggle {
    margin-top: 1rem;
    text-align: center;
  }
  .toggle a {
    color: #667eea;
    cursor: pointer;
    text-decoration: none;
    margin-left: 5px;
  }
  .message {
    margin-top: 1rem;
    color: #444;
    font-weight: bold;
    text-align: center;
  }
  </style>
  