<template>
    <aside :class="[
            sidebar ?  '-translate-x-full' : 'translate-x-0',
            'transition-transform duration-300 ease-in-out fixed z-1000 top-0 md:top-[60px] left-0 bg-green-500 w-fit max-w-[50%] overflow-x-visible'
        ]"
        aria-label="Sidebar"
        style="z-index: 9999; top: 0px;">
        
        <div class="sm-w-72 h-screen md:h-screen overflow-x-visible sidebar-color">
            <div class="flex items-center justify-between pl-6 p-3 gap-2">
                <img
                    :src="`/storage/rox/logo.png`"
                    alt="News"
                    class="logo"
                />
                <button class="fa-solid items-center text-sm arrow_side_bar" @click="toggleMenu">
                    <img :src="`/storage/rox/arrow_side_bar.png`" alt="Close Menu">
                </button>
            </div>

            <div class="pb-2 pl-5 pr-5 pt-0 sidebar-color justify-start gap-2 items-start">
                <div v-for="(card, index) in cardList" :key="index" class="cardside mb-2" @click="handleCardClick(card)">
                    <img :src="card.image" :alt="card.name" @mousedown.prevent @contextmenu.prevent @dragstart.prevent />
                    <p class="card-text">{{ card.name }}</p>
                </div>
            </div>


            <div class="ml-2 mr-4 px-3 py-2 rounded-lg" style="background-color: var(--side-menu-color); color: white;">
                <div class="flex justify-around items-center px-3 relative">
                    <i class="fa-solid fa-backward-step text-sm" @click="prevMusic" style="cursor: pointer;"></i>
                    <i class="fa-solid" :class="playIconClass" @click="toggleAudio" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-forward-step text-sm" @click="nextMusic" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-repeat text-sm" style="cursor: pointer;"></i>
                    <div class="relative" @click="toogleMusics">
                        <i class="fa-sharp fa-solid fa-list-music text-sm" style="cursor: pointer;"></i>
                        <span class="absolute top-[-10px] left-[-8px] bg-red-500 text-white text-xs rounded-full px-1">1</span>
                    </div>
                
                </div>

                <p class="mt-1 text-center text-xs md:text-sm">{{ musicName }}</p>
                <audio ref="audioPlayer" :src="audioSource"></audio>
            </div>
            <div class="p-2  sidebar-color flex flex-wrap justify-start gap-2 items-start">
                <div v-for="(image, index) in imageList" :key="index" @click="$router.push(image.link)" :class="['image-container', { 'full-width': index === imageList.length - 1 && imageList.length % 2 !== 0 }]">
                    <img :src="image.src" :alt="image.text" @mousedown.prevent @contextmenu.prevent @dragstart.prevent/>
                    <p class="text-xs">{{ image.text }}</p>
                </div>  
            </div>
            <div class="p-2 pl-4  sidebar-color flex flex-col flex-wrap justify-start items-start text-md gap-4">
                <a class="flex gap-2 justify-between items-center w-[95%]  cursor-pointer relative" @click="tooglePing">
                    <div class="flex gap-4 items-center language-toggle text-xs md:text-base">
                        <div class="flex flex-col items-center gap-0 ">
                            <img class="w-5 " :src="pingImage" />
                            <span :class="{
                                'text-green-500': latencia < 80,
                                'text-red-600': latencia > 150,
                                'text-[8px]': true,
                                'text-center': true,
                                'text-nowrap': true
                                }">
                                {{ latencia }}MS
                            </span>
                        </div>
                        <p>Linha 1</p>
                    </div>
                    <i v-if="ping" class="fa-solid fa-caret-right"></i>
                    <i v-else class="fa-solid fa-caret-down"></i>
                    <p v-if="shouldShowPing" class="popup bg-[var(--ci-primary-color)] border border-[var(--ci-secundary-color)] rounded-lg py-3 px-4 text-center text-nowrap display flex gap-4 md:gap-8 text-sm"><span>Linha 1: </span><span>{{ latencia }}MS <i class="fa-solid fa-circle-check text-[var(--sub-text-color)]"></i></span></p>
                </a>

                <a class="flex gap-2 justify-between items-center w-[95%]  cursor-pointer relative" @click="toogleLanguage">
                    <div class="flex gap-4 items-center language-toggle">
                        <i class="text-xl fa-light fa-globe"></i>
                        <p class="text-xs md:text-base">Português</p>
                    </div>
                    <i v-if="languageSelector" class="fa-solid fa-caret-right"></i>
                    <i v-else class="fa-solid fa-caret-down"></i>
                    <p v-if="shouldShowLanguage" class="popup bg-[var(--ci-primary-color)] border border-[var(--ci-secundary-color)] rounded-lg py-3 px-4 text-center text-sm">Português</p>
                </a>
                <div v-if="showButton">
                    <button class="flex gap-4 items-center" @click="installPWA">
                        <i class="text-xl fa-solid fa-download"></i>
                        <p class="text-xs md:text-base">Baixar App</p>
                    </button>
                </div>
                
                <a class="flex gap-4 items-center " href="/home/support">
                    <i class="text-xl fa-solid fa-headset"></i>
                    <p class="text-xs md:text-base">Suporte</p>
                </a>
                <!-- <a class="flex gap-4 items-center " href="/home/support">
                    <i class="text-xl fa-regular fa-circle-question"></i>
                    <p class="text-xs md:text-base">FAQ</p>
                </a> -->
            </div>
        </div>
    </aside>
    <div v-if="musicSelector" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="closeMusicModal" style="z-index: 9998"></div>
    <div v-if="musicSelector" class="fixed left-[50%] top-[50%] bg-[var(--ci-primary-color)] px-4 py-3 z-50 rounded-lg w-[90%] max-w-2xl transform -translate-x-1/2 -translate-y-1/2" style="z-index: 9999;">
        <div class="w-full flex items-center justify-between mb-3">
            <div></div>
            <div class="text-lg">Música</div>
            <i class="fa-regular fa-xmark cursor-pointer" @click="closeMusicModal"></i>
        </div>

        <div class="w-full px-5 py-3 bg-[var(--side-menu-color)] flex items-center justify-around rounded-lg gap-3 mb-3">
            <p>Música</p>
            <input 
            type="range" 
            v-model="rangeValue" 
            class="styled-range w-[50%]" 
            @input="updateRange" 
            min="0" 
            max="100"
            ref="rangeInput"
            >
            <i class="fa-solid fa-volume-high text-[var(--sub-text-color)]"></i>
        </div>

        <div class="w-full px-4 py-3 bg-[var(--side-menu-color)] flex flex-col items-center rounded-lg gap-2 mb-3">
            <p class="w-full text-center text-white">{{ musicName }}</p>
           
            <div class="w-full flex gap-4 items-center justify-between">
                <div class="cursor-pointer flex items-center justify-center text-[var(--sub-text-color)]">
                    <p class="text-[8px] text-center"><i class="fa-solid fa-repeat  cursor-pointer text-sm text-[var(--sub-text-color)]" ></i><br>Ciclo</p>
                </div>
                
                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-lg text-[var(--sub-text-color)] cursor-pointer shadow-md" @click="prevMusic" ><i class="fa-solid fa-backward-step text-sm" style="cursor: pointer;"></i></div>
                <div class="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-xl text-[var(--sub-text-color)] cursor-pointer shadow-md" @click="toggleAudio"><i class="fa-solid" :class="playIconClass"  style="cursor: pointer;"></i></div>
                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-lg text-[var(--sub-text-color)] cursor-pointer shadow-md" @click="nextMusic" ><i class="fa-solid fa-forward-step text-sm" style="cursor: pointer;"></i></div>
                <div class="flex items-center justify-center text-[var(--sub-text-color)]">
                    <p class="text-xs text-center">3<br><span class="text-[8px]">Listen</span></p>
                </div>
            </div>
        </div>

        <div class="w-full px-4 py-3 bg-[var(--side-menu-color)] flex flex-col items-center rounded-lg gap-2 mb-2">
            <div class="w-full flex justify-around items-center border-b border-gray-300 text-sm mb-2">
                <p class="text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)]">Sistema de música</p>
                <p class="cursor-not-allowed">Minhas músicas</p>
            </div>

            <div class="w-full flex flex-col gap-2 h-[200px]">
            <div class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3">
                <div class="flex gap-2">
                    <i v-if="musicName == musicName1" class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"></i>
                    <p v-if="musicName != musicName1">1</p>
                    <p :class="musicName == musicName1 ? 'text-[var(--sub-text-color)]' : 'text-white'">{{ musicName1 }}</p>
                    <p class="text-gray-500">163K</p>
                </div>

                <i class="fa-solid fa-star text-[var(--sub-text-color)] cursor-pointer"></i>
            </div>

            <div class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3">
                <div class="flex gap-2">
                    <i v-if="musicName == musicName2" class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"></i>
                    <p v-if="musicName != musicName2">2</p>
                    <p :class="musicName == musicName2 ? 'text-[var(--sub-text-color)]' : 'text-white'">{{ musicName2 }}</p>
                    <p class="text-gray-500">358K</p>
                </div>

                <i class="fa-solid fa-star text-[var(--sub-text-color)] cursor-pointer"></i>
            </div>

            <div class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3">
                <div class="flex gap-2">
                    <i v-if="musicName == musicName3" class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"></i>
                    <p v-if="musicName != musicName3">3</p>
                    <p :class="musicName == musicName3 ? 'text-[var(--sub-text-color)]' : 'text-white'">{{ musicName3 }}</p>
                    <p class="text-gray-500">362K</p>
                </div>

                <i class="fa-solid fa-star text-gray-500 cursor-pointer"></i>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { sidebarStore } from '@/Stores/SideBarStore.js';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/Stores/Auth.js';
import { useSettingStore } from '@/Stores/SettingStore.js';
import { missionStore } from '@/Stores/MissionStore.js';

export default {
  props : {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: { RouterLink },
  data() {
    return {
      deferredPrompt: null,
      showButton: false,
      isPlaying: false,
      playIconClass: 'fa-play',
      audioSource: '/storage/rox/musics/1rox.mp3',
      sidebar: false,
      isLoading: true,
      modalMission: null,
      setting: null,
      musicName: '',
      musicName1: '',
      musicName2: '',
      musicName3: '',
      pingImage: '/storage/rox/ping1.png',
      languageSelector: false,
      musicSelector: false,
      sideSelector: false,
      selectedCategory: 'Popular',
      rangeValue: 30,
      ping: null,
      latencia: null,
      screenWidth: window.innerWidth,
      cardList: [
        { name: 'Popular', image: '/storage/rox/popular_on.png', id: '#popular' },
        { name: 'Slots', image: '/storage/rox/slots_off.png', id: '#slots' },
        { name: 'Pescaria', image: '/storage/rox/fish_off.png', id: '#pescaria' },
        { name: 'Blockchain', image: '/storage/rox/blockchain_off.png', id: '#blockchain' },
        { name: 'Recentes', image: '/storage/rox/recente_off.png', id: '#top' },
        { name: 'Favoritos', image: '/storage/rox/favorito_off.png', id: '#top' },
      ],
      imageList: [
        { src: '/storage/rox/rox_btn_1rox.png', text: 'Eventos', link: '/home/events' },
        { src: '/storage/rox/rox_btn_2rox.png', text: 'Pendente', link: '/home/pendents' },
        { src: '/storage/rox/rox_btn_3rox.png', text: 'Agente', link: '/home/agents' },
      ]
    };
  },
  setup() {
    const screenWidth = ref(window.innerWidth);
    const deferredPrompt = ref(null);
    const showButton = ref(false);
    const isPlaying = ref(false);
    const playIconClass = ref('fa-play');
    const audioSource = ref('/storage/rox/musics/1rox.mp3');
    const sidebar = ref(false);
    const modalMission = ref(null);
    const setting = ref(null);
    const musicName = ref('');
    const musicName1 = ref('');
    const musicName2 = ref('');
    const musicName3 = ref('');
    const pingImage = ref('/storage/rox/ping1.png');
    const languageSelector = ref(false);
    const musicSelector = ref(false);
    const sideSelector = ref(false);
    const selectedCategory = ref('Popular');
    const rangeValue = ref(30);
    const ping = ref(null);
    const latencia = ref(null);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateScreenWidth);

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt.value = e;
        showButton.value = true;
      });

      window.addEventListener('appinstalled', () => {
        showButton.value = false;
        console.log('PWA foi instalado');
      });

      // Initial setup
      fetchEnvVariables();
      calcularLatencia();
      getSetting();
      setupMutationObserver();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateScreenWidth);
    });

    // Your methods here...
  },
  computed: {
    navTop() {
      return this.visible ? '68px' : '40px';
    },
    pingBarHeight() {
      return (index) => {
        if (!this.latencia) return '10px';
        const maxHeight = 40;
        return `${Math.min((this.latencia / (index * 10)) * maxHeight, maxHeight)}px`;
      };
    },
    sidebarMenuStore() {
      return sidebarStore();
    },
    sidebarMenu() {
      const sidebar = sidebarStore();
      return sidebar.getSidebarStatus;
    },
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuth;
    },
    shouldShowLanguage() {
      return this.languageSelector && (this.screenWidth > 480 || this.sidebar);
    },
    shouldShowPing() {
      return this.ping && (this.screenWidth > 480 || this.sidebar);
    },
    shouldShowMusics() {
      return this.musicSelector && (this.screenWidth > 480 || this.sidebar);
    }
  },
  methods: {
    async installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('Usuário aceitou instalar o PWA');
        } else {
          console.log('Usuário recusou a instalação');
        }
        this.deferredPrompt = null;
        this.showButton = false;
      }
    },
    closeMusicModal() {
      this.toogleMusics();
      this.sideSelector = false;
    },
    updateRange(event) {
      const audio = this.$refs.audioPlayer;
      const volume = event.target.value / 100;
      audio.volume = volume;
      event.target.style.setProperty('--value', event.target.value);
    },
    async calcularLatencia() {
      try {
        const start = Date.now();
        await fetch('https://ws.suitpay.app/api/v1/gateway/pix-payment');
        const end = Date.now();
        const ping = end - start;
        this.latencia = ping * 0.4;
        this.latencia = parseInt(this.latencia);

        if (this.latencia < 80) {
          this.pingImage = '/storage/rox/ping3.png';
        } else if (this.latencia >= 80 && this.latencia < 150) {
          this.pingImage = '/storage/rox/ping2.png';
        } else {
          this.pingImage = '/storage/rox/ping1.png';
        }
      } catch (error) {
        console.error('Erro ao calcular latência:', error);
        this.latencia = 115;
      }
    },
    toogleMusics() {
      this.musicSelector = !this.musicSelector;
      if (this.musicSelector) {
        this.sideSelector = this.screenWidth <= 480;
      }
    },
    tooglePing() {
      this.ping = !this.ping;
    },
    toogleLanguage() {
      this.languageSelector = !this.languageSelector;
    },
    async fetchEnvVariables() {
      try {
        const response = await axios.post('/api/env');
        this.musicName = response.data.musicNameConfig1;
        this.musicName1 = response.data.musicNameConfig1;
        this.musicName2 = response.data.musicNameConfig2;
        this.musicName3 = response.data.musicNameConfig3;
      } catch (error) {
        if (error.response) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            console.log(`${value}`);
          });
        } else if (error.request) {
          console.error('Erro na solicitação:', error.request);
        } else {
          console.error('Erro:', error.message);
        }
      }
    },
    handleCardClick(card) {
      if (card.id) {
        let element = document.querySelector(card.id);
        if (element) {
          const headerOffset = 7 * 16;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          this.selectedCategory = card.name;
          this.updateCardImages();
          this.toggleMenu();
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          console.error('Elemento com ID não encontrado:', card.id);
          this.toggleMenu();
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        console.warn('Card não tem ID definido:', card);
        this.toggleMenu();
      }
    },
    updateCardImages() {
      this.cardList.forEach(card => {
        card.image = card.name === this.selectedCategory ? card.image.replace('_off', '_on') : card.image.replace('_on', '_off');
      });
    },
    handleScroll(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = this.cardList.find(card => card.id === '#' + entry.target.id);
          if (card) {
            this.selectedCategory = card.name;
            this.updateCardImages();
          }
        }
      });
    },
    observeElements() {
      const observer = new IntersectionObserver(this.handleScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      });

      this.cardList.forEach(card => {
        const element = document.querySelector(card.id);
        if (element) {
          observer.observe(element);
        }
      });
    },
    setupMutationObserver() {
      const mutationObserver = new MutationObserver(() => {
        this.observeElements();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

      this.observeElements();
    },
    toggleMenu() {
        this.sidebarMenuStore.setSidebarToogle();
        this.sidebar = this.sidebarMenuStore.getSidebarStatus();
        this.$emit('update:sidebar', this.sidebar);
    },
    toggleMissionModal() {
      const missionDataStore = missionStore();
      missionDataStore.setMissionToogle();
    },
    getSetting() {
      const settingStore = useSettingStore();
      this.setting = settingStore.setting;
    },
    toggleAudio() {
      const audio = this.$refs.audioPlayer;

      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
        this.playIconClass = 'fa-pause';
      } else {
        audio.pause();
        this.isPlaying = false;
        this.playIconClass = 'fa-play';
      }
    },
    nextMusic() {
      const audio = this.$refs.audioPlayer;
      const currentSource = this.audioSource;
      let newSource;
      let newName;

      if (currentSource === '/storage/rox/musics/1rox.mp3') {
        newSource = '/storage/rox/musics/2rox.mp3';
        newName = this.musicName2;
      } else if (currentSource === '/storage/rox/musics/2rox.mp3') {
        newSource = '/storage/rox/musics/3rox.mp3';
        newName = this.musicName3;
      } else {
        newSource = '/storage/rox/musics/1rox.mp3';
        newName = this.musicName1;
      }

      if (this.isPlaying) {
        this.toggleAudio();
      }

      this.audioSource = newSource;
      this.musicName = newName;
      audio.load();

      if (this.isPlaying) {
        audio.play();
      }
    },
    prevMusic() {
      const audio = this.$refs.audioPlayer;
      const currentSource = this.audioSource;
      let newSource;
      let newName;

      if (currentSource === '/storage/rox/musics/1rox.mp3') {
        newSource = '/storage/rox/musics/3rox.mp3';
        newName = this.musicName3;
      } else if (currentSource === '/storage/rox/musics/2rox.mp3') {
        newSource = '/storage/rox/musics/1rox.mp3';
        newName = this.musicName1;
      } else {
        newSource = '/storage/rox/musics/2rox.mp3';
        newName = this.musicName2;
      }

      if (this.isPlaying) {
        this.toggleAudio();
      }

      this.audioSource = newSource;
      this.musicName = newName;
      audio.load();

      if (this.isPlaying) {
        audio.play();
      }
    }
  },
  created() {
    this.calcularLatencia();
    this.getSetting();
    this.fetchEnvVariables();
  },
  mounted() {
    if (localStorage.getItem('visible') !== null) {
      this.visible = JSON.parse(localStorage.getItem('visible'));
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'visible') {
        this.visible = JSON.parse(event.newValue);
      }
    });

    const audio = this.$refs.audioPlayer;
    audio.volume = this.rangeValue / 100;

    const rangeInput = this.$refs.rangeInput;
    rangeInput.style.setProperty('--value', this.rangeValue);

    this.updateCardImages();
    this.setupMutationObserver();
  },
  watch: {
    sidebarMenu(newVal) {
      this.sidebar = newVal;
    },
    screenWidth(newWidth) {
      // Update logic if needed
    }
  },
  beforeUnmount() {
    // Cleanup code if needed
  }
};
</script>


<style scoped>
.cardside {
  background-color: var(--side-menu-color);
  border: 1px solid var(--side-menu-color);
  /* width: 240px; */
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #fecf28;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}

.cardside > img {
  height: 35px;
}

@media screen and (max-width: 480px) {
  .cardside {
    height: 65px;
    gap: 0.3rem;
    padding: 6px;
    font-size: 0.8rem;
    width: calc(50% - 6px);
  }
  .cardside > img {
    height: 25px;
  }
}

.image-container {
  width: calc(50% - 8px);
  position: relative;
}

.full-width {
  width: 97.5%;
}

.image-container img {
  width: 100%;
  cursor: pointer;
}

.image-container p {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  text-align: left;
  padding: 5px;
  margin: 0;
  cursor: pointer;
}

.popup{
    position: absolute;
    z-index: 9999;
    left: 248px;
}

@media screen and (max-width: 480px) {
    .popup{
        left: 115%;
    }
    
}

.arrow_side_bar {
    width: 35px;
}

.animation {
    transition: width .28s;
}

.logo {
    height: 36px;
}

@media (min-width: 640px) {
  .sm-w-72 {
    width: 18rem; /* 288px */
  }
}


input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 3px;
    background: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    border-radius: 3px;
    background: linear-gradient(
        to right, 
        var(--sub-text-color) 0%, 
        var(--sub-text-color) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) 100%
    );
    border-radius: 6px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: var(--ci-primary-color);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px; /* Ajusta a posição vertical do thumb */
}

input[type="range"]::-moz-range-track {
    width: 100%;
    height: 10px;
    border-radius: 3px;
    background: linear-gradient(
        to right, 
        var(--sub-text-color) 0%, 
        var(--sub-text-color) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) 100%
    );
    border-radius: 6px;
}

input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: var(--ci-primary-color);
    border-radius: 50%;
    cursor: pointer;
}

input[type="range"]::-ms-track {
    width: 100%;
    height: 10px;
    border-radius: 3px;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type="range"]::-ms-fill-lower {
    background: var(--sub-text-color);
    border-radius: 6px;
}

input[type="range"]::-ms-fill-upper {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 6px;
}

input[type="range"]::-ms-thumb {
    width: 18px;
    height: 18px;
    background: var(--ci-primary-color);
    border-radius: 50%;
    cursor: pointer;
}

input[type="range"].styled-range {
    --value: 30;
    background: linear-gradient(
        to right, 
        var(--sub-text-color) 0%, 
        var(--sub-text-color) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) calc(var(--value) * 1%), 
        rgba(255, 255, 255, 0.7) 100%
    );
}

.card-text {
    flex: 1;
    margin-right: 10px;
    font-style: italic;
    font-weight: 800;
    font-size: 16px;
    color: #fecf28;
}
       
</style>