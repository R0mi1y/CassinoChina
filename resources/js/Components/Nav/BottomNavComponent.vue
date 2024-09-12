<template>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
   <div v-show="showScrollButton" class="w-[60px] flex items-center justify-center cursor-pointer flex-col min-h-[60px] p-[4px] bg-[var(--ci-primary-color)] border border-solid border-[var(--ci-secundary-color)] rounded-xl fixed bottom-20 right-4" @click="scrollToTop">
      <div class="flex items-center justify-center w-[30px] h-[30px] mb-[2px] text-[12px] text-white rounded-full bg-[var(--ci-primary-color)]">
        <i class="flex items-center justify-center text-[var(--ci-secundary-color)] rounded-[50%] bg-[var(--ci-primary-opacity-color)] p-1">
            <span class="material-symbols-sharp">
            rocket
            </span>
        </i>
      </div>
      <div class="w-full text-white [word-wrap:break-word] text-[12px] overflow-hidden text-center overflow-ellipsis align-middle font-medium">Topo</div>
    </div>

    <span class="hidden material-symbols-sharp" style="display: none;">rocket</span>
    
   <div class="flex sm:hidden">
        <div class="fixed z-40 w-full h-16 max-w-lg -translate-x-1/2    bottom-0 left-1/2  navBtn" style="background-color: var(--ci-primary-color); color: var(--ci-gray-light);">
            <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
                <button @click="$router.push('/')" data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-l-full  group">
                  <img :src="`/storage/rox/icons/home.png`" class="w-[25px]"/>
                    <span class="text-[12px]">Início</span>
                </button>
                <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip ">
                    
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button @click="$router.push('/home/events')" data-tooltip-target="tooltip-casino" type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                  <img :src="`/storage/rox/icons/promotion.png`" class="w-[26px]"/>
                    <span class="text-[12px]">Promoção</span>
                </button>
                <div id="tooltip-casino" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip ">
                    
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button v-if="isAuthenticated" @click="$router.push('/home/agents')" data-tooltip-target="tooltip-sport" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-r-full  group">
                  <img :src="`/storage/rox/icons/agent.png`" class="w-[25px]"/>
                    <span class="text-[12px]">Agente</span>
                </button>

                <button v-else @click="checkAuthAndRedirect('/home/agents')" data-tooltip-target="tooltip-sport" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-r-full  group">
                  <img :src="`/storage/rox/icons/wallet.png`" class="w-[25px]"/>
                    <span class="text-[12px]">Depósito</span>
                </button>
               
                
                <button @click="$router.push('/home/support')" data-tooltip-target="tooltip-sport" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-r-full group">
                  <img :src="`/storage/rox/icons/support.png`" class="w-[25px]"/>
                    <span class="text-[12px]">Suporte</span>
                </button>
                <div id="tooltip-sport" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip ">
                    
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button @click="checkAuthAndRedirect('/home/me')" data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-5  group">
                    <img :src="`/storage/rox/icons/profile.png`" class="w-[25px]"/>
                    <span class="text-[12px]">Perfil</span>
                </button>
                <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip ">
                    
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/Stores/Auth.js";

export default {
  data() {
    return {
      isLoading: false,
      showScrollButton: false, // Estado para controlar a visibilidade do botão
    };
  },
  
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuth;
    }
  },
  methods: {
    checkAuthAndRedirect(route) {
    if (this.isAuthenticated) {
      this.$router.push(route);
    } else {
      this.$router.push('/');
    }
  },
    handleScroll() {
      this.showScrollButton = window.scrollY > 400;
    },
    redirectToLink() {
      window.location.href = 'https://t.me/ROX_BR';
    },
    scrollToTop() {
      const topElement = document.getElementById("顶部");
      if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 60px;
  right: 8px;
}
.material-symbols-sharp {
  font-variation-settings:
  'FILL' 1,
  'wght' 500,
  'GRAD' 0,
  'opsz' 24
}
.navBtn {
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 4rem; /* Ajuste conforme necessário */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--ci-primary-color);
  color: var(--ci-gray-light);
  /* Outras estilizações existentes */
  overflow: hidden; /* Garante que o conteúdo não transborde */
}

.navBtn::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('/storage/rox/icon_btm_jr.webp'), url('/storage/rox/icon_btm_jr2.webp');
  background-repeat: no-repeat;
  background-size: auto 100%; /* Mantém a proporção das imagens preenchendo a altura do elemento */
  background-position: left center, right center; /* Posiciona a primeira imagem à esquerda e a segunda à direita */
  pointer-events: none; /* Garante que o pseudo-elemento não interfira com a interação dos botões */
  z-index: 9999; /* Coloca o pseudo-elemento atrás do conteúdo */
}
</style>