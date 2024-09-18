<template>
  <aside
    :class="[
      sidebar ? '-translate-x-full' : 'translate-x-0',
      'transition-transform duration-300 ease-in-out fixed z-1000 top-0 md:top-[60px] left-0 bg-green-500 w-fit overflow-y-auto aside-style',
      widthMenor1330 ? 'w-full' : ''
    ]"
    style="background-color: rgba(0, 0, 0, 0.85);"
    aria-label="Sidebar"
  >
    <div class="sm-w-72 h-full md:h-full overflow-y-auto sidebar-color">
      <div class="flex items-center justify-between pl-6 p-3 gap-2">
        <img :src="`/storage/rox/logo.png`" alt="News" class="logo" />
        <button class="fa-solid items-center text-sm arrow_side_bar" @click="toggleMenu">
          <img :src="`/storage/rox/arrow_side_bar.png`" alt="Close Menu" />
        </button>
      </div>

      <div class="pb-2 pl-5 pr-5 pt-0 sidebar-color justify-start gap-2 items-start">
        <div
          v-for="(card, index) in cardList.slice(0, Math.ceil(cardList.length / 2))"
          :key="index"
          class="banner__item mb-2"
          @click="handleCardClick(card)"
        >
          <div class="inner_banner ml-3">
            <img
              :src="card.image"
              class="image-banner"
              :alt="card.name"
              @mousedown.prevent
              @contextmenu.prevent
              @dragstart.prevent
            />
            <p class="card-text">{{ card.name }}</p>
          </div>
          <div
            class="circle circle-2"
            :class="['color-' + index]"
            data-v-f127b5d0=""
          ></div>
          <div
            class="circle circle-3"
            :class="['color-' + index]"
            data-v-f127b5d0=""
          ></div>
          <div
            class="circle circle-1"
            :class="['color-' + index]"
            data-v-f127b5d0=""
          ></div>
        </div>

        <!-- Activity section -->
        <div class="activity mt-3 mb-2" data-v-f127b5d0="">
          <div
            :class="['activity__header', isActivityOpen ? ' border-b' : '']"
            @click="toggleActivity"
            data-v-f127b5d0=""
          >
            <span data-v-f127b5d0="">Centro de promoção</span>
            <span
              class="activity__header--icon"
              :class="isActivityOpen ? '' : 'closed'"
              data-v-f127b5d0=""
            >
            </span>
          </div>
          <div class="activity__content special" data-v-f127b5d0="">
            <div
              class="activity__list"
              :class="isActivityOpen ? '' : 'hidden'"
              data-v-f127b5d0=""
            >
              <div
                v-for="(card, index) in cardList.slice(Math.ceil(cardList.length / 2))"
                :key="index"
                @click="handleCardClick(card)"
                class="activity__item mb-2"
                data-v-f127b5d0=""
              >
                <img
                  class="activity__item--img image-banner"
                  :src="card.image"
                  :alt="card.name"
                  @mousedown.prevent
                  @contextmenu.prevent
                  @dragstart.prevent
                  data-v-f127b5d0=""
                />
                <span class="activity__item--label" data-v-f127b5d0="">{{
                  card.name
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="telegram mt-3" data-v-f127b5d0="">
          <span class="telegram--icon" data-v-f127b5d0=""></span
          ><span class="telegram--text" data-v-f127b5d0="">Telegram</span>
        </div>

        <div class="download mt-2" data-v-f127b5d0="">
          <span class="download--icon" data-v-f127b5d0=""></span
          ><span class="download--text" data-v-f127b5d0="">Download app</span
          ><span class="download--circle" data-v-f127b5d0=""></span>
        </div>
      </div>

      <div
        class="ml-2 mr-4 px-3 py-2 rounded-lg"
        style="background-color: var(--side-menu-color); color: white"
      >
        <div class="flex justify-around items-center px-3 relative">
          <i
            class="fa-solid fa-backward-step text-sm"
            @click="prevMusic"
            style="cursor: pointer"
          >
          </i>
          <i
            class="fa-solid"
            :class="playIconClass"
            @click="toggleAudio"
            style="cursor: pointer"
          >
          </i>
          <i
            class="fa-solid fa-forward-step text-sm"
            @click="nextMusic"
            style="cursor: pointer"
          >
          </i>
          <i class="fa-solid fa-repeat text-sm" style="cursor: pointer"> </i>
          <div class="relative" @click="toogleMusics">
            <i class="fa-sharp fa-solid fa-list-music text-sm" style="cursor: pointer">
            </i>
            <span
              class="absolute top-[-10px] left-[-8px] bg-red-500 text-white text-xs rounded-full px-1"
              >1</span
            >
          </div>
        </div>

        <p class="mt-1 text-center text-xs md:text-sm">{{ musicName }}</p>
        <audio ref="audioPlayer" :src="audioSource"></audio>
      </div>
      <div class="p-2 sidebar-color flex flex-wrap justify-start gap-2 items-start">
        <div
          v-for="(image, index) in imageList"
          :key="index"
          @click="$router.push(image.link)"
          :class="[
            'image-container',
            {
              'full-width': index === imageList.length - 1 && imageList.length % 2 !== 0,
            },
          ]"
        >
          <img
            :src="image.src"
            :alt="image.text"
            @mousedown.prevent
            @contextmenu.prevent
            @dragstart.prevent
          />
          <p class="text-xs">{{ image.text }}</p>
        </div>
      </div>
      <div
        class="p-2 pl-4 sidebar-color flex flex-col flex-wrap justify-start items-start text-md gap-4"
      >
        <a
          class="flex gap-2 justify-between items-center w-[95%] cursor-pointer relative"
          @click="tooglePing"
        >
          <div class="flex gap-4 items-center language-toggle text-xs md:text-base">
            <div class="flex flex-col items-center gap-0">
              <img class="w-5" :src="pingImage" />
              <span
                :class="{
                  'text-green-500': latencia < 80,
                  'text-red-600': latencia > 150,
                  'text-[8px]': true,
                  'text-center': true,
                  'text-nowrap': true,
                }"
              >
                {{ latencia }}MS
              </span>
            </div>
            <p>Linha 1</p>
          </div>
          <i v-if="ping" class="fa-solid fa-caret-right"> </i>
          <i v-else class="fa-solid fa-caret-down"> </i>
          <p
            v-if="shouldShowPing"
            class="popup bg-[var(--ci-primary-color)] border border-[var(--ci-secundary-color)] rounded-lg py-3 px-4 text-center text-nowrap display flex gap-4 md:gap-8 text-sm"
          >
            <span>Linha 1: </span>
            <span
              >{{ latencia }}MS
              <i class="fa-solid fa-circle-check text-[var(--sub-text-color)]"> </i>
            </span>
          </p>
        </a>

        <a
          class="flex gap-2 justify-between items-center w-[95%] cursor-pointer relative"
          @click="toogleLanguage"
        >
          <div class="flex gap-4 items-center language-toggle">
            <i class="text-xl fa-light fa-globe"> </i>
            <p class="text-xs md:text-base">Português</p>
          </div>
          <i v-if="languageSelector" class="fa-solid fa-caret-right"> </i>
          <i v-else class="fa-solid fa-caret-down"> </i>
          <p
            v-if="shouldShowLanguage"
            class="popup bg-[var(--ci-primary-color)] border border-[var(--ci-secundary-color)] rounded-lg py-3 px-4 text-center text-sm"
          >
            Português
          </p>
        </a>
        <div v-if="showButton">
          <button class="flex gap-4 items-center" @click="installPWA">
            <i class="text-xl fa-solid fa-download"> </i>
            <p class="text-xs md:text-base">Baixar App</p>
          </button>
        </div>

        <a class="flex gap-4 items-center" href="/home/support">
          <i class="text-xl fa-solid fa-headset"> </i>
          <p class="text-xs md:text-base">Suporte</p>
        </a>
        <!-- <a class="flex gap-4 items-center " href="/home/support">
                    <i class="text-xl fa-regular fa-circle-question">
                    </i>
                    <p class="text-xs md:text-base">FAQ</p>
                </a> -->
      </div>
    </div>
  </aside>
  <div
    v-if="musicSelector"
    class="fixed inset-0 bg-black bg-opacity-50 z-50"
    @click="closeMusicModal"
    style="z-index: 9998"
  ></div>
  <div
    v-if="musicSelector"
    class="fixed left-[50%] top-[50%] bg-[var(--ci-primary-color)] px-4 py-3 z-50 rounded-lg w-[90%] max-w-2xl transform -translate-x-1/2 -translate-y-1/2"
    style="z-index: 9999"
  >
    <div class="w-full flex items-center justify-between mb-3">
      <div></div>
      <div class="text-lg">Música</div>
      <i class="fa-regular fa-xmark cursor-pointer" @click="closeMusicModal"> </i>
    </div>

    <div
      class="w-full px-5 py-3 bg-[var(--side-menu-color)] flex items-center justify-around rounded-lg gap-3 mb-3"
    >
      <p>Música</p>
      <input
        type="range"
        v-model="rangeValue"
        class="styled-range w-[50%]"
        @input="updateRange"
        min="0"
        max="100"
        ref="rangeInput"
      />
      <i class="fa-solid fa-volume-high text-[var(--sub-text-color)]"> </i>
    </div>

    <div
      class="w-full px-4 py-3 bg-[var(--side-menu-color)] flex flex-col items-center rounded-lg gap-2 mb-3"
    >
      <p class="w-full text-center text-white">{{ musicName }}</p>

      <div class="w-full flex gap-4 items-center justify-between">
        <div
          class="cursor-pointer flex items-center justify-center text-[var(--sub-text-color)]"
        >
          <p class="text-[8px] text-center">
            <i
              class="fa-solid fa-repeat cursor-pointer text-sm text-[var(--sub-text-color)]"
            >
            </i>
            <br />Ciclo
          </p>
        </div>

        <div
          class="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-lg text-[var(--sub-text-color)] cursor-pointer shadow-md"
          @click="prevMusic"
        >
          <i class="fa-solid fa-backward-step text-sm" style="cursor: pointer"> </i>
        </div>
        <div
          class="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-xl text-[var(--sub-text-color)] cursor-pointer shadow-md"
          @click="toggleAudio"
        >
          <i class="fa-solid" :class="playIconClass" style="cursor: pointer"> </i>
        </div>
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--ci-primary-color)] text-lg text-[var(--sub-text-color)] cursor-pointer shadow-md"
          @click="nextMusic"
        >
          <i class="fa-solid fa-forward-step text-sm" style="cursor: pointer"> </i>
        </div>
        <div class="flex items-center justify-center text-[var(--sub-text-color)]">
          <p class="text-xs text-center">
            3<br />
            <span class="text-[8px]">Listen</span>
          </p>
        </div>
      </div>
    </div>

    <div
      class="w-full px-4 py-3 bg-[var(--side-menu-color)] flex flex-col items-center rounded-lg gap-2 mb-2"
    >
      <div
        class="w-full flex justify-around items-center border-b border-gray-300 text-sm mb-2"
      >
        <p class="text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)]">
          Sistema de música
        </p>
        <p class="cursor-not-allowed">Minhas músicas</p>
      </div>

      <div class="w-full flex flex-col gap-2 h-[200px]">
        <div
          class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3"
        >
          <div class="flex gap-2">
            <i
              v-if="musicName == musicName1"
              class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"
            >
            </i>
            <p v-if="musicName != musicName1">1</p>
            <p
              :class="
                musicName == musicName1 ? 'text-[var(--sub-text-color)]' : 'text-white'
              "
            >
              {{ musicName1 }}
            </p>
            <p class="text-gray-500">163K</p>
          </div>

          <i class="fa-solid fa-star text-[var(--sub-text-color)] cursor-pointer"> </i>
        </div>

        <div
          class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3"
        >
          <div class="flex gap-2">
            <i
              v-if="musicName == musicName2"
              class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"
            >
            </i>
            <p v-if="musicName != musicName2">2</p>
            <p
              :class="
                musicName == musicName2 ? 'text-[var(--sub-text-color)]' : 'text-white'
              "
            >
              {{ musicName2 }}
            </p>
            <p class="text-gray-500">358K</p>
          </div>

          <i class="fa-solid fa-star text-[var(--sub-text-color)] cursor-pointer"> </i>
        </div>

        <div
          class="w-full flex justify-between items-center border-b border-[var(--ci-secundary-color)] text-sm py-2 px-3"
        >
          <div class="flex gap-2">
            <i
              v-if="musicName == musicName3"
              class="text-xs fa-solid fa-music text-[var(--sub-text-color)]"
            >
            </i>
            <p v-if="musicName != musicName3">3</p>
            <p
              :class="
                musicName == musicName3 ? 'text-[var(--sub-text-color)]' : 'text-white'
              "
            >
              {{ musicName3 }}
            </p>
            <p class="text-gray-500">362K</p>
          </div>

          <i class="fa-solid fa-star text-gray-500 cursor-pointer"> </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch, beforeDestroy } from "vue";
import { sidebarStore } from "@/Stores/SideBarStore.js";
import { RouterLink } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/Stores/Auth.js";
import { useSettingStore } from "@/Stores/SettingStore.js";
import { missionStore } from "@/Stores/MissionStore.js";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: { RouterLink },
  data() {
    return {
      screenWidth: window.innerWidth,
      widthMenor1330: window.innerWidth < 1330,
      isActivityOpen: true,
      deferredPrompt: null,
      showButton: false,
      isPlaying: false,
      playIconClass: "fa-play",
      audioSource: "/storage/rox/musics/1rox.mp3",
      sidebar: false,
      isLoading: true,
      modalMission: null,
      setting: null,
      musicName: "",
      musicName1: "",
      musicName2: "",
      musicName3: "",
      pingImage: "/storage/rox/ping1.png",
      languageSelector: false,
      musicSelector: false,
      sideSelector: false,
      selectedCategory: "Popular",
      rangeValue: 30,
      ping: null,
      latencia: null,
      screenWidth: window.innerWidth,
      cardList: [
        { name: "Popular", image: "/storage/rox/popular_on.png", id: "#popular" },
        { name: "Slots", image: "/storage/rox/slots_off.png", id: "#slots" },
        { name: "Pescaria", image: "/storage/rox/fish_off.png", id: "#pescaria" },
        {
          name: "Blockchain",
          image: "/storage/rox/blockchain_off.png",
          id: "#blockchain",
        },
        { name: "Recentes", image: "/storage/rox/recente_off.png", id: "#top" },
        { name: "Favoritos", image: "/storage/rox/favorito_off.png", id: "#top" },
      ],
      imageList: [
        { src: "/storage/rox/rox_btn_1rox.png", text: "Eventos", link: "/home/events" },
        {
          src: "/storage/rox/rox_btn_2rox.png",
          text: "Pendente",
          link: "/home/pendents",
        },
        { src: "/storage/rox/rox_btn_3rox.png", text: "Agente", link: "/home/agents" },
      ],
    };
  },
  setup() {
    const deferredPrompt = ref(null);
    const showButton = ref(false);
    const widthMenor1330 = ref(true);
    const isPlaying = ref(false);
    const playIconClass = ref("fa-play");
    const audioSource = ref("/storage/rox/musics/1rox.mp3");
    const sidebar = ref(false);
    const modalMission = ref(null);
    const setting = ref(null);
    const musicName = ref("");
    const musicName1 = ref("");
    const musicName2 = ref("");
    const musicName3 = ref("");
    const pingImage = ref("/storage/rox/ping1.png");
    const languageSelector = ref(false);
    const musicSelector = ref(false);
    const sideSelector = ref(false);
    const selectedCategory = ref("Popular");
    const rangeValue = ref(30);
    const ping = ref(null);
    const latencia = ref(null);
    
    onMounted(() => {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt.value = e;
        showButton.value = true;
      });

      window.addEventListener("appinstalled", () => {
        showButton.value = false;
        console.log('PWA foi instalado');
      });
    });
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  computed: {
    navTop() {
      // return this.visible ? "68px" : "40px";
    },
    pingBarHeight() {
      return (index) => {
        if (!this.latencia) return "10px";
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
    },
    
    
  },
  methods: {
    async installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === "accepted") {
          // console.log('Usuário aceitou instalar o PWA');
        } else {
          // console.log('Usuário recusou a instalação');
        }
        this.deferredPrompt = null;
        this.showButton = false;
      }
    },
    updateScreenWidth() {
      const isWidthLessThan1330 = window.innerWidth < 1330;
      this.screenWidth = window.innerWidth;
      
      if (isWidthLessThan1330 !== this.widthMenor1330) {
        this.widthMenor1330 = isWidthLessThan1330;
        this.sidebarMenuStore.setSidebarStatus(isWidthLessThan1330);
        this.$emit("update:visible", !isWidthLessThan1330);
      }
    },
    closeMusicModal() {
      this.toogleMusics();
      this.sideSelector = false;
    },
    updateRange(event) {
      const audio = this.$refs.audioPlayer;
      const volume = event.target.value / 100;
      if (audio) audio.volume = volume;
      event.target.style.setProperty("--value", event.target.value);
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
        const response = await axios.post("/api/env");
        this.musicName = response.data.musicNameConfig1;
        this.musicName1 = response.data.musicNameConfig1;
        this.musicName2 = response.data.musicNameConfig2;
        this.musicName3 = response.data.musicNameConfig3;
      } catch (error) {
        if (error.response) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            // console.log(`${value}`);
          });
        } else if (error.request) {
          console.error("Erro na solicitação:", error.request);
        } else {
          console.error("Erro:", error.message);
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
            behavior: "smooth",
          });
          this.selectedCategory = card.name;
          this.updateCardImages();
          this.toggleMenu();
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          console.error("Elemento com ID não encontrado:", card.id);
          this.toggleMenu();
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.warn("Card não tem ID definido:", card);
        this.toggleMenu();
      }
    },
    updateCardImages() {
      this.cardList.forEach((card) => {
        card.image =
          card.name === this.selectedCategory
            ? card.image.replace("_off", "_on")
            : card.image.replace("_on", "_off");
      });
    },
    handleScroll(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = this.cardList.find((card) => card.id === "#" + entry.target.id);
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
        rootMargin: "0px",
        threshold: 0.5,
      });

      this.cardList.forEach((card) => {
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
        subtree: true,
      });

      this.observeElements();
    },
    toggleMenu() {
      this.sidebarMenuStore.setSidebarToogle();
      this.$emit("update:visible", !this.visible);
    },
    toggleActivity() {
      this.isActivityOpen = !this.isActivityOpen;
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
        if (audio) audio.play();
        this.isPlaying = true;
        this.playIconClass = "fa-pause";
      } else {
        if (audio) audio.pause();
        this.isPlaying = false;
        this.playIconClass = "fa-play";
      }
    },
    nextMusic() {
      const audio = this.$refs.audioPlayer;
      const currentSource = this.audioSource;
      let newSource;
      let newName;

      if (currentSource === "/storage/rox/musics/1rox.mp3") {
        newSource = "/storage/rox/musics/2rox.mp3";
        newName = this.musicName2;
      } else if (currentSource === "/storage/rox/musics/2rox.mp3") {
        newSource = "/storage/rox/musics/3rox.mp3";
        newName = this.musicName3;
      } else {
        newSource = "/storage/rox/musics/1rox.mp3";
        newName = this.musicName1;
      }

      if (this.isPlaying) {
        this.toggleAudio();
      }

      this.audioSource = newSource;
      this.musicName = newName;
      if (audio) {
        audio.load();
        
        if (this.isPlaying) {
          audio.play();
        }
      }
    },
    prevMusic() {
      const audio = this.$refs.audioPlayer;
      const currentSource = this.audioSource;
      let newSource;
      let newName;

      if (currentSource === "/storage/rox/musics/1rox.mp3") {
        newSource = "/storage/rox/musics/3rox.mp3";
        newName = this.musicName3;
      } else if (currentSource === "/storage/rox/musics/2rox.mp3") {
        newSource = "/storage/rox/musics/1rox.mp3";
        newName = this.musicName1;
      } else {
        newSource = "/storage/rox/musics/2rox.mp3";
        newName = this.musicName2;
      }

      if (this.isPlaying) {
        this.toggleAudio();
      }

      this.audioSource = newSource;
      this.musicName = newName;
      if (audio) {
        audio.load();
        
        if (this.isPlaying) {
          audio.play();
        }
      }
    },
  },
  created() {
    this.getSetting();
    this.fetchEnvVariables();
  },
  mounted() {
    window.addEventListener("storage", (event) => {
      if (event.key === "visible") {
        this.visible = JSON.parse(event.newValue);
      }
    });

    const audio = this.$refs.audioPlayer;
    if (audio) {
      audio.volume = this.rangeValue / 100;
    }

    const rangeInput = this.$refs.rangeInput;
    if (rangeInput) {
      rangeInput.style.setProperty("--value", this.rangeValue);
    }

    window.addEventListener("resize", this.updateScreenWidth);
    
    this.updateCardImages();
    this.updateScreenWidth();
    this.fetchEnvVariables();
    this.getSetting();
    this.setupMutationObserver();
  },
  watch: {
    sidebarMenu(newVal) {
      this.sidebar = newVal;
    },
  },
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

.popup {
  position: absolute;
  z-index: 9999;
  left: 248px;
}

@media screen and (max-width: 480px) {
  .popup {
    left: 115%;
  }
}

.arrow_side_bar {
  width: 35px;
}

.animation {
  transition: width 0.28s;
}

.logo {
  height: 36px;
}

@media (min-width: 640px) {
  .sm-w-72 {
    /* width: 18rem; 288px */
    width: 280px;
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

.circle-1 {
  animation: moveCircle1 7s linear 0.35s infinite normal none running;
}

.circle-2 {
  animation: moveCircle2 7s linear 0.35s infinite normal none running;
}

.circle-3 {
  animation: moveCircle3 7s linear 0.35s infinite normal none running;
}

@keyframes moveCircle1 {
  0% {
    transform: translate(-20px, 60px);
  }
  33% {
    transform: translate(-20px, 60px);
  }
  66% {
    transform: translate(-40px, 58px);
  }
  100% {
    transform: translate(-20px, 60px);
  }
}

@keyframes moveCircle2 {
  0% {
    transform: translate(80px, 60px) translateZ(0);
  }
  33% {
    transform: translate(80px, 60px) translateZ(0);
  }
  66% {
    transform: translate(80px, 68px) translateZ(0);
  }
  100% {
    transform: translate(80px, 60px) translateZ(0);
  }
}

@keyframes moveCircle3 {
  0% {
    transform: translate(50px, 64px) translateZ(0);
  }
  33% {
    transform: translate(50px, 64px) translateZ(0);
  }
  66% {
    transform: translate(50px, 58px) translateZ(0);
  }
  100% {
    transform: translate(50px, 64px) translateZ(0);
  }
}
.inner_banner {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 240px;
  height: 80px;
  z-index: 1;
}

.circle {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(var(--blur, 8px));
  transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
}

.circle-1 {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
}

.circle-3 {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
}

.circle-2 {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
}

.banner__item {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
  background: #2d2941;
  border-radius: 8px;
}

.color-0 {
  background: rgba(255, 73, 171, 0.5) !important; /* Neon Pink com 80% opacidade */
}
.color-1 {
  background: rgba(57, 255, 20, 0.5) !important; /* Neon Green com 80% opacidade */
}
.color-2 {
  background: rgba(0, 245, 255, 0.5) !important; /* Neon Cyan com 80% opacidade */
}
.color-3 {
  background: rgba(255, 7, 58, 0.5) !important; /* Neon Red com 80% opacidade */
}
.color-4 {
  background: rgba(255, 204, 0, 0.5) !important; /* Neon Yellow com 80% opacidade */
}
.color-5 {
  background: rgba(138, 43, 226, 0.5) !important; /* Neon Purple com 80% opacidade */
}
.color-6 {
  background: rgba(255, 102, 0, 0.5) !important; /* Neon Orange com 80% opacidade */
}

.image-banner {
  height: 40px;
}

.activity {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  padding: 0 12px;
  background: #2d2941;
  border-radius: 8px;
}

.aside-style {
  z-index: 9999;
  top: 0px;
  height: 100vh;
}

.border-b {
  border-bottom: 1px solid rgba(85, 84, 103, 0.4);
}

.activity__header {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 216px;
  height: 52px;
  margin: 0 auto;
  font-style: italic;
  font-weight: 800;
  font-size: 16px;
  color: #fff;
}

.closed {
  transform: rotate(180deg);
}

.activity__header--icon {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 16px;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  width: 16px;
  height: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADXSURBVHgB7ZQxDoIwFIb/ZyKsHIEj6KgbK1tv4JG8gfEEjRMjI6McgSO4QiIVDS5aAn1tXHzfwNA2/b6ktIAgCP8OgUlRVKnpSQMmaTtkSu0aMGAFvOQGJQzScajhRjgHWOTwiVi5LP6SkzkPn3qcTuMIpdZV6rLn4gCbPM/3h7aLM5+IRUcwJX/Pa31N4qgthx9yMw4tPo7ZgDm5bwSFkPtEUCg5N4JCyjkR1ltg7jhx5U+U2t4+b0e07o+2tdaAHnThyicjCLXTBoXjg/KrvQRBEITgPABaRbXsCRDOPwAAAABJRU5ErkJggg==)
    center no-repeat;
  background-size: contain;
  transition: all 0.3s linear;
}

.activity__content {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  transition: 0.3s;
  grid-template-rows: 1fr;
}

.activity__list {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  min-height: 0;
  padding-top: 12px;
}

.activity__item {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-box-align: center;
  align-items: center;
}

.telegram {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background: linear-gradient(282.43deg, #362941 1.78%, #2b2b51 100%);
  border-radius: 8px;
}

.telegram--icon {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  margin: 0 9px 0 12px;
  background: url(data:image/png;base64,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)
    center no-repeat;
  background-size: contain;
}

.telegram--text {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.download {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  box-sizing: border-box;
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background: linear-gradient(282.43deg, #2d2941 1.78%, #2d2941 1.79%, #293741 100%);
  border-radius: 8px;
}
.download--icon {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  margin: 0 4px 0 8px;
  background: url(/storage/rox/icons/download-icon.png) center no-repeat;
  background-size: contain;
}
.download--text {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.download--circle {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  top: 22px;
  right: 14px;
  width: 12px;
  height: 12px;
  background: #ff1b51;
  box-shadow: 0 2px 6px rgba(255, 0, 0, 0.5);
  border-radius: 50%;
}
</style>
