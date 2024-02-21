<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  name: '',
  lastName: '',
  email: '',
  password: '',
});

const customGender = ref('');
const formSubmitted = ref(false);

const validate = (field, condition, errorMessage) => formSubmitted.value && condition ? errorMessage : '';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = ref(() => validate('name', formData.value.name.trim() === '', 'El nombre no debe estar vacío.'));
const validateLastName = ref(() => validate('lastName', formData.value.lastName.trim() === formData.value.name, 'El apellido no puede ser igual al nombre.'));
const validateEmail = ref(() => validate('email', formData.value.email.trim() === '' || !isValidEmail(formData.value.email.trim()), 'Por favor, ingrese un correo válido.'));
const validatePassword = ref(() => validate('password', formData.value.password.trim() === '', 'Por favor, ingrese una contraseña.'));

const hasValidationErrors = () => validateName.value() || validateLastName.value() || validateEmail.value() || validatePassword.value();

const submitForm = () => {
  formSubmitted.value = true;

  if (!hasValidationErrors()) {
    const user = {
      name: formData.value.name,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
    };

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    router.push({ name: 'login' });
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
        <span v-if="formSubmitted && validateName()" class="error">{{ validateName() }}</span>
      </div>

      <div class="form-group">
        <label for="lastName">Apellido:</label>
        <input v-model="formData.lastName" type="text" id="lastName" class="form-input" />
        <span v-if="formSubmitted && validateLastName()" class="error">{{ validateLastName() }}</span>
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input v-model="formData.email" type="email" id="register-email" class="form-input" />
        <span v-if="formSubmitted && validateEmail()" class="error">{{ validateEmail() }}</span>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input v-model="formData.password" type="password" id="register-password" class="form-input" />
        <span v-if="formSubmitted && validatePassword()" class="error">{{ validatePassword() }}</span>
      </div>
      <div class="register-link">
        <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>
      <hr>

      <button type="submit" class="submit-button">Enviar</button>
    </form>
  </div>
</template>


<style scoped>
hr {
  margin: 20px;
}
p{
  color: #4d4d4d;
}
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
</style>
