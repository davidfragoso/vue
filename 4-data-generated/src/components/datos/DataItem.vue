  <template>
    <div class="card-container">
      <div class="card">
        <div class="fotoContainer">
          <div v-if="visual == true" class="cortina">
            <img src="../../images/ut-logo.png" style="width: 145px" alt="Foto" />
            <img :src="props.image" class="foto" alt="Foto" />
          </div>
          <button @click="toggleVisibility" class="btnFoto">{{ visual ? 'Hide' : 'Show' }}</button>
        </div>
        <div class="card-content">
          <span>
            <h1>{{ props.name }} {{ props.lastname }}</h1>
          </span>
          <span>
            <h3>Edad: {{ props.age }}</h3>
            <h3>Genero: {{ props.gender }}</h3>
          </span>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import type { Card } from '@/interfaces/Card'
  import { ref } from 'vue';

  const props = defineProps<Card & { image: string }>();
  const visual = ref(true);

  const toggleVisibility = () => {
    visual.value = !visual.value;
  };
  </script>



<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');

h1 {
  font-weight: 500;
  color: #e74c3c; 
}

h2 {
  font-weight: 400;
  color: #2ecc71; 
}

h3 {
  font-weight: 300;
  color: #3498db; 
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  width: 50rem;
  height: 22rem;
  font-family: 'Quicksand', sans-serif;
  color: #f39c12;
  background-color: #fdfdfdd6;
  border-radius: 22px;
  padding: 2rem;
  margin: 10px;
  position: relative;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);

}

.card-content {
  width: 60%;
}

.fotoContainer {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-right: 2px solid #48b4b2db;

}

.foto {
  width: 11rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.5), 0 17px 50px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border 0.5s ease-in-out; 
}

.fotoContainer:hover .foto {
  border: 3px solid #3fcfa1;
}

.btnFoto {
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  color: #fff; 
  background-color: #e74c3c; 
  border: 2px solid #fff; 
  width: 11rem;
  height: 2.5rem;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.btnFoto:hover {
  opacity: 0.7;
}

.cortina {
  --border: 1px solid #e74c3c; 
}

.cortina img, .card {
  animation: breath 3s infinite alternate; /* Animación breath */
}

@keyframes breath {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}
</style>
@/interfaces/Card