<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { emit } = defineProps(['emit'])

const users = ref([])
const loggedIn = ref(false)
const editingUser = ref(null)
const formSubmitted = ref(false)

const route = useRoute()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const storedUsers = computed(() => JSON.parse(localStorage.getItem('users')) || [])

const matchingUser = computed(() => {
  return storedUsers.value.find((user) =>
    user.email.trim().toLowerCase() === formData.value.email.trim().toLowerCase() &&
    user.password.trim() === formData.value.password.trim()
  )
})

const alertShown = ref(false)

const hasValidationErrors = computed(() => {
  return Object.keys(validationRules).some((fieldName) => validateField(fieldName) !== '')
})

const validationRules = {
  email: (value) =>
    formSubmitted.value && (value.trim() === '' || !isValidEmail(value))
      ? 'Por favor, ingrese un correo válido.'
      : '',
  password: (value) =>
    formSubmitted.value && value.trim() === '' ? 'Por favor, ingrese una contraseña.' : ''
}

const validateField = (fieldName) => validationRules[fieldName](formData.value[fieldName])

onMounted(() => {
  if (route.meta.requiresAuth && !loggedIn.value) {
    router.push({ name: 'login' })
  } else {
    loadUsers()
  }
})

const loadUsers = () => {
  users.value = storedUsers.value
}

const isEmailAlreadyRegistered = (email) => {
  const existingUser = users.value.find(
    (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
  )
  return !!existingUser
}

const submitForm = () => {
  formSubmitted.value = true

  if (!hasValidationErrors.value) {
    if (matchingUser.value) {
      console.log('Inicio de sesión exitoso:', matchingUser.value)
      handleLoginSuccess(matchingUser.value)
      setTimeout(() => {
        formSubmitted.value = false
      }, 3000)
    } else {
      if (!alertShown.value) {
        alert('Error de credenciales.')
        alertShown.value = true
      }

      if (isEmailAlreadyRegistered(formData.value.email)) {
        console.error('Registro fallido. El correo electrónico ya está registrado.')
      } else {
        const newUser = {
          id: Date.now(),
          name: '',
          lastName: '',
          email: formData.value.email.trim(),
          password: formData.value.password.trim()
        }

        storedUsers.value.push(newUser)
        localStorage.setItem('users', JSON.stringify(storedUsers.value))

        console.log('Registro exitoso:', newUser)
        handleLoginSuccess(newUser)
      }
    }
  } else {
    console.error('Datos del formulario no válidos.')
  }
}

const handleLoginSuccess = (userData) => {
  const existingUser = users.value.find((user) => user.email === userData.email)

  if (existingUser) {
    loggedIn.value = true
    emit('loginSuccess', userData)

    formData.value.email = ''
    formData.value.password = ''
  } else {
    console.error('Inicio de sesión fallido. Usuario no encontrado.')
  }
}

const logout = () => {
  loggedIn.value = false
}

const editUser = (user) => {
  editingUser.value = user
}

const saveEditedUser = () => {
  localStorage.setItem('users', JSON.stringify(users.value))
  editingUser.value = null
}

const cancelEdit = () => {
  editingUser.value = null
}

const deleteUser = (userId) => {
  users.value = users.value.filter((user) => user.id !== userId)
  localStorage.setItem('users', JSON.stringify(users.value))
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>

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
      <form @submit.prevent="submitForm" class="form">
        <img alt="Vue logo" class="logo" src="@/assets/ut-logo.png" height="80" />

        <h1>Iniciar Sesión</h1>
        <div v-for="field in ['email', 'password']" :key="field" class="form-group">
          <label :for="field">{{ field === 'email' ? 'Correo Electrónico' : 'Contraseña' }}:</label>
          <input
            v-model="formData[field]"
            :type="field === 'password' ? 'password' : 'text'"
            class="form-input"
          />
          <span v-if="formSubmitted" class="error">{{ validateField(field) }}</span>
        </div>
        <div class="register-link">
          <p>¿No tienes una cuenta? <router-link to="/">Regístrate</router-link></p>
        </div>

        <hr />
        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>
    </div>

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

<style scoped>
hr {
  margin: 20px;
}
p {
  color: #4d4d4d;
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
  width: 300px;
}
</style>
