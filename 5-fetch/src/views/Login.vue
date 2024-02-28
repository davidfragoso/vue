<template>
  <div class="container">
    <div v-if="loggedIn">
      <h1>Bienvenido a la tabla</h1>
      <div class="tabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>
                <button @click="editUser(user)">Editar</button>
                <button @click="deleteUser(user.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="logout">Cerrar Sesión</button>
      </div>
    </div>
    <div v-else>
      <h2 v-if="formSubmitted && !loggedIn" class="error">
        Acceso denegado. Correo o contraseña incorrectos.
      </h2>
      <form @submit.prevent="submitForm" class="form">
        <img alt="Vue logo" class="logo" src="@/assets/ut-logo.png" height="80" />

        <h1>Iniciar Sesión</h1>
        <div v-for="field in ['email', 'password']" :key="field" class="form-group">
          <label :for="field">{{ field === 'email' ? 'Correo Electrónico' : 'Contraseña' }}:</label>
          <input v-model="formData[field]" :type="field === 'password' ? 'password' : 'text'" class="form-input" />
          <span v-if="formSubmitted" class="error">{{ validateField(field) }}</span>
        </div>
        <hr>
        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>
    </div>

    <!-- Modal para editar usuario -->
    <div v-if="editingUser" class="modal">
      <div class="modal-content">
        <h2>Editar Usuario</h2>
        <label for="editName">Nombre:</label>
        <input v-model="editingUser.name" type="text" id="editName" class="form-input" />

        <label for="editLastName">Apellido:</label>
        <input v-model="editingUser.lastName" type="text" id="editLastName" class="form-input" />

        <button @click="saveEditedUser">Guardar Cambios</button>
        <button @click="cancelEdit">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { emit } = defineProps(['emit'])

const users = ref([])
const loggedIn = ref(false)
const editingUser = ref(null)

const saveEditedUser = () => {
  const index = users.value.findIndex((user) => user.id === editingUser.value.id)
  users.value.splice(index, 1, editingUser.value)
  localStorage.setItem('users', JSON.stringify(users.value))
  editingUser.value = null
}

const cancelEdit = () => {
  editingUser.value = null
}

const editUser = (user) => {
  editingUser.value = { ...user }
}

const deleteUser = (userId) => {
  users.value = users.value.filter((user) => user.id !== userId)
  localStorage.setItem('users', JSON.stringify(users.value))
}

const handleLoginSuccess = (userData) => {
  const existingUser = users.value.find((user) => user.id === userData.id)

  if (!existingUser) {
    users.value.push(userData)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  loggedIn.value = true
  emit('loginSuccess', userData)
}

const logout = () => {
  loggedIn.value = false
}

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.meta.requiresAuth && !loggedIn.value) {
    router.push({ name: 'login' })
  } else {
    loadUsers()
  }
})

const formData = ref({
  email: '',
  password: ''
})

const formSubmitted = ref(false)
const validationRules = {
  email: (value) =>
    formSubmitted.value && (value.trim() === '' || !isValidEmail(value))
      ? 'Por favor, ingrese un correo válido.'
      : '',
  password: (value) =>
    formSubmitted.value && value.trim() === '' ? 'Por favor, ingrese una contraseña.' : ''
}

const validateField = (fieldName) => validationRules[fieldName](formData.value[fieldName])

const loadUsers = () => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || []
  users.value = [...storedUsers]
}

const isEmailAlreadyRegistered = (email) => {
  const existingUser = users.value.find(
    (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
  )
  return !!existingUser
}

const hasValidationErrors = () => {
  return Object.keys(validationRules).some((fieldName) => validateField(fieldName) !== '')
}
const submitForm = () => {
  formSubmitted.value = true;

  if (!hasValidationErrors()) {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const matchingUser = storedUsers.find(
      (user) =>
        user.email.trim().toLowerCase() === formData.value.email.trim().toLowerCase() &&
        user.password.trim() === formData.value.password.trim()
    );

    if (matchingUser) {
      console.log('Inicio de sesión exitoso:', matchingUser);
      handleLoginSuccess(matchingUser);
      setTimeout(() => {
        formSubmitted.value = false; // Después de 3 segundos, ocultar el mensaje
      }, 3000);
    } else {
      if (isEmailAlreadyRegistered(formData.value.email)) {
        console.error('Registro fallido. El correo electrónico ya está registrado.');
      } else {
        const newUser = {
          id: Date.now(),
          name: '',
          lastName: '',
          email: formData.value.email.trim(),
          password: formData.value.password.trim(),
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        console.log('Registro exitoso:', newUser);
        handleLoginSuccess(newUser);
      }
    }
  } else {
    console.error('Datos del formulario no válidos.');
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
</script>

<style scoped>
hr {
  margin: 20px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabla {
  width: 80%;
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: #4d4d4d;
}

th {
  background-color: #f2f2f2;
}

button {
  cursor: pointer;
  margin-right: 5px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #0066cc;
  color: #fff;
}

button:hover {
  background-color: #005bb5;
}

.form {
  height: 80vh;
  background-color: #f2f2f2;
  max-width: 250px;
  height: 400px;
  padding: 20px;
  border: 1px solid #999;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}

h1 {
  font-weight: bold;
  color: #4d4d4d;
  font-size: 24px;
  margin-bottom: 20px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px; /* Ajusta el ancho del modal según tus necesidades */
}
</style>
