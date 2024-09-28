<template>
    <div
        v-if="!icon"
    >
        <button v-if="wallet?.total_balance === undefined || isLoadingWallet" disabled type="button" class="flex justify-center items-center mr-3 pt-1">
            
        </button>
        <button v-else type="button" class="flex justify-center items-center mr-0 md:mr-3 max-h-8 md:max-h-none wallet-money walletButton ">
            <div class="mr-1">
                <img class="flag" :src="`/storage/rox/brazilian_rox.webp`" alt="BRL" >
            </div>
            <div>
                <strong class="text-lg md:text-lg underline" style="color: var(--ci-primary-opacity-color); " >{{ formatCurrency(wallet?.total_balance) }}</strong>
            </div>
        <div class="ml-2 text-md flex items-center">
            <i @click="refreshBalance" :class="{ 'refreshing': isRefreshing }" style="color: var(--ci-primary-opacity-color);" class="fa-solid fa-arrows-rotate refresh-icon"></i>
            </div>
        </button>
    </div>
    <div class="flex" v-else>
        <button v-if="wallet?.total_balance === undefined || isLoadingWallet" disabled type="button" class="flex justify-center items-center mr-3 pt-1">
        </button>
        <span class="account-money">
            R$ <span>{{ formatCurrency(wallet?.total_balance) }}</span>
        </span>
        <span @click="refreshBalance" class="min-info__refresh">
            <img
                :class="{ 'refreshing': isRefreshing }"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM9SURBVHgB7ZrPSxtBFMffzG5+mB8ibS/2Yk72Ek8RVChUKbRWK6IFD/0j/GP8JwRv4s9KQYViazG9dC+x0HrSQk2hxPza3ZnpvNhNo5hNZ3dpWtwPhJ3Nzhvm7Xsz830hAF1gaWkzBv8CKytGFEJCQkJCQkK8Q8AnGxuHg0SIcarra5OTw2fwl9HBByglKJRzQrYJYzl5WV9dfZOOx2MDpsnTALyheQghJcsSxb6+9PnERPYCAsRXBLa2DscEE0POveBQJBTuutkIQk41TcsHFS3PDuzuGqlq+eIleIXSQk9PIu83IhQ8UquUZ9o90zRS1ymcyLVxjB8Q4gy/u9KJ8wc4Br4I8ICjhD1FYH39XU56nrvpGQFSL1WSywsLWfP6M1zwaCeESDf7y/URTyTXvEZCOQL4xtpNHhEgYr29texNz6anR46fTY8sawD5Zn/pDEbCa21BVQ1rtfJQpz7CZkNu4z59Ppq/7kQ7pzuhnEK4Tep6pF/XadSy2GVpaPOYzPHGhJ3rk6nRnU5jba69nZE51H85kfap54byOTA7+7AkLyUIAIuzvXg0Ms+YiGHqJRLVQfm1oTKG510oCPBlcMa+OvcRwjOgSFcdQDjRvjTbwv0QvImuO2DbVvNExjTCNaZg3n0H/PLfO6C8C+H+nkyWM/U6FOfnR4rgnysp82uX+2OUI5BKVcZQ/8ej4sX29lE/+CQajQw4bQL0HBRRTyHGep2madodT+WOcMg4TVuKPlBE2QEu9bzTlooz4ycKKApbhR3nltIhZhhYUCmSyaQ+tkpjwdi4F0l8cGDcaRWFKLtV8z+bzZrKDqARB77v3DtqUsUJjFrpx+96Al+IyVkePNAQcxgKnJiK4WtZTpot5STqei4VJkrmdja4g6XTsoZusUNkmbnnZueGr5p4Z/P9I1tWVlcGlI5g3SsaVZhWqlYtKdL0lFzw96I6HUDh1to/putHjyeHP4BHfP+s8kouROZS4LQD06ZS4/tzc2Mn4APfDiCoXyJUG3e0vRuNDYAJo/D5u7G4OFUHnwTigAM6omn6IBXiPqE0hQscJ8w5mBoRRaFpp4XCt09BTDwkJCQkJCQkCG79P1d+AhE3aU4XplvUAAAAAElFTkSuQmCC" />
        </span>
    </div>
</template>

<script>
    import HttpApi from "@/Services/HttpApi.js";
    import {onMounted, ref, watch, watchEffect} from "vue";
    import {useRoute} from "vue-router";

    export default {
        props: {
            wallet: {
            type: Object,
                default: () => ({})
            },
            icon: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        data() {
            return {
                isLoadingWallet: true,
                wallet: null,
                processInterval: null,
                isRefreshing: false
            }
        },
        setup(props) {
            const route = useRoute();
            const isCasinoPlayPage = ref(false);

            watchEffect(() => {
                checkRoute();
            });

            onMounted(() => {
                checkRoute();
            });

            function checkRoute() {
                // Verifique se a rota atual é 'casinoPlayPage'
                isCasinoPlayPage.value = route.name === 'casinoPlayPage';
            }

            return {
                isCasinoPlayPage
            };
        },
        computed: {

        },
        beforeUnmount() {
            clearInterval(this.processInterval);
        },
        mounted() {

        },
        methods: {
            async refreshBalance() {
                this.isRefreshing = true;
                await this.getWallet();
                setTimeout(() => {
                    this.isRefreshing = false;
                }, 1000); 
            },
            formatCurrency(value) {
      if (value == null) return '';
      return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
            getWallet: async function() {
                const _this = this;

                await HttpApi.get('profile/wallet')
                    .then(response => {
                        _this.wallet = response.data.wallet;
                        _this.isLoadingWallet = false;
                    })
                    .catch(error => {
                        Object.entries(JSON.parse(error.request.responseText)).forEach(([key, value]) => {
                            if(value == 'unauthenticated') {
                                localStorage. clear();
                                clearInterval(this.processInterval);
                            }
                        });

                        _this.isLoadingWallet = false;
                    });
            },
        },
        async created() {
            if(this.isCasinoPlayPage) {
                this.processInterval = setInterval(async  () => {
                    await this.getWallet(); // Substitua 'seuMetodo' pelo nome do seu método
                }, 5000);
            }

            await this.getWallet(); // Substitua 'seuMetodo' pelo nome do seu método
        },
        watch: {

        },
    };
</script>

<style scoped>
.refreshing{
    animation: spinrefresh 1s infinite;
}

@keyframes spinrefresh {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.walletButton{
    transform: scale(0.99) !important;

}

@media screen and (max-width: 450px){
    .walletButton{
    transform: scale(0.8) !important;

}
}
.flag{
    width:25%;
    min-width: 20px !important;
    max-width: 30px;
}

.account-money {
  font-style: italic;
  font-weight: 700;
  font-size: 16px;
  color: #03ffee;
}

.min-info__refresh {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-left: 8px;
}


</style>
