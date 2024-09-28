<template>
  <div class="tigrinho-container">
    <h1>Tigrinho Game</h1>

    <div class="item-game-container" @click="redirectToGame">
      <div class="item-game text-gray-700 w-full h-auto mr-4 cursor-pointer"
        @mouseover="showIcon = true"
        @mouseleave="showIcon = false">
        <div class="relative w-full h-full">

          <img :src="distribution === 'kagaming' ? cover : `/storage/` + cover" alt="Jogo Tigrinho" class="w-full" style="border-radius: 15px;">
          <div v-if="showIcon" class="bdc">
            <i class="fa-solid fa-circle-play"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIcon: false,

      id: 50,
      slug: 126,
      cover: '/path/to/tigrinho-cover.jpg',
      distribution: 'kagaming',
    };
  },
  methods: {
    redirectToGame() {
      this.$router.push({ name: 'casinoPlayPage', params: { id: this.id, slug: this.slug } });
    }
  }
};
</script>

<style scoped>
.tigrinho-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-game-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-game {
  position: relative;
  border-radius: 15px !important;
  background-color: var(--ci-primary-color) !important;
  cursor: pointer;
}

.bdc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bdc i {
  font-size: 3rem;
  color: var(--ci-primary-color);
  z-index: 1;
}

.item-game img {
  display: block;
  border-radius: 15px;
}
</style>
