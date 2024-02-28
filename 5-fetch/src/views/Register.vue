<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  lastName: '',
  email: '',
  password: '',
});

const customGender = ref('');
const formSubmitted = ref(false);

const validate = (field, condition, errorMessage) => {
  return formSubmitted.value && condition ? errorMessage : '';
};

const validateName = () => validate('name', formData.value.name.trim() === '', 'El nombre no debe estar vacío.');
const validateLastName = () => validate('lastName', formData.value.lastName.trim() === formData.value.name, 'El apellido no puede ser igual al nombre.');
const validateEmail = () => validate('email', formData.value.email.trim() === '' || !isValidEmail(formData.value.email.trim()), 'Por favor, ingrese un correo válido.');
const validatePassword = () => validate('password', formData.value.password.trim() === '', 'Por favor, ingrese una contraseña.');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const hasValidationErrors = () => {
  return (
    validateName() ||
    validateLastName() ||
    validateEmail() ||
    validatePassword()
  );
};

const submitForm = () => {
  formSubmitted.value = true;

  if (!hasValidationErrors()) {
    const user = {
      name: formData.value.name,
      lastName: formData.value.lastName,
      age: formData.value.age,
      gender: formData.value.gender === 'otro' ? customGender.value : formData.value.gender,
      email: formData.value.email,
      password: formData.value.password,
    };

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    console.log(formData.value);
  } else {
    console.error(formData.value);
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="form">
      <img alt="Vue logo" class="logo" src="@/assets/ut-logo.png" height="80" />

      <h1>Formulario de Registro</h1>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input v-model="formData.name" type="text" id="name" class="form-input" />
        <span v-if="validateName()" class="error">{{ validateName() }}</span>
      </div>

      <div class="form-group">
        <label for="lastName">Apellido:</label>
        <input v-model="formData.lastName" type="text" id="lastName" class="form-input" />
        <span v-if="validateLastName()" class="error">{{ validateLastName() }}</span>
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input v-model="formData.email" type="email" id="register-email" class="form-input" />
        <span v-if="validateEmail()" class="error">{{ validateEmail() }}</span>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="formData.password" type="password" id="register-password" class="form-input" />
        <span v-if="validatePassword()" class="error">{{ validatePassword() }}</span>
      </div>

      <button type="submit" class="submit-button">Enviar</button>
    </form>

  </div>
</template>

<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }

  .form {
    overflow-y: auto;
    max-height: 80vh;
    background-color: #f2f2f2;
    width: 100%;
    padding: 20px;
    border: 1px solid #999;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
  }

  h1 {
    font-weight: bold;
    color: #4d4d4d;
    font-size: 24px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #4d4d4d;
  }

  .form-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
  }

  .error {
    color: red;
    margin-top: 5px;
  }

  .submit-button {
    background-color: #0066cc;
    color: #fff;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }

  .submit-button:hover {
    background-color: #005bb5;
  }

  .submitted-data {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #fff;
  }
</style>
