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
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.age }}</td>
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
      <h1>Acceso denegado. Por favor, inicia sesión.</h1>
      <Login @loginSuccess="handleLoginSuccess" :emit="emit" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import Login from '../views/Login.vue';
import { useRoute, useRouter } from 'vue-router';

const { emit } = defineProps(['emit']);

const users = ref([]);
const loggedIn = ref(false);

const editUser = (user) => {
  console.log('Editar usuario:', user);
};

const deleteUser = (userId) => {
  users.value = users.value.filter(user => user.id !== userId);
};

const handleLoginSuccess = (userData) => {
  users.value.push(userData); // Utiliza push para agregar un nuevo usuario al array
  loggedIn.value = true;
};

const logout = () => {
  loggedIn.value = false;
};

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.meta.requiresAuth && !loggedIn.value) {
    router.push({ name: 'login' });
  }
});

watch(loggedIn, (newValue) => {
  if (newValue === false && route.meta.requiresAuth) {
    router.push({ name: 'login' });
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  cursor: pointer;
  margin-right: 5px;
}
</style>
