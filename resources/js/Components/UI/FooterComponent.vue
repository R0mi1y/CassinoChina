<template>
    <div class="footer md:pb-5 mt-5 sm:mb-5 p-4 md:p-8 bg-[var(--ci-primary-color)] w-[90%] my-4 mb-[4rem] flex flex-col gap-[4rem] rounded-2xl text-[var(--ci-gray-medium)]" >

        <div class="footer__first">
             <div class="footer__left">
            <div>
                <h2>Cassino</h2>
                <a href="/home/events" ><p>Eventos</p></a>
                <a href="/home/events" ><p>Missão</p></a>
                <a href="/home/agents" ><p>Rebate</p></a>
                <a href="#" ><p>Bônus</p></a>
                <a href="#" ><p>VIP</p></a>
            </div>

            <div>
                <h2>Jogos</h2>
                <a href="#cartas" ><p>Cartas</p></a>
                <a href="#pescaria" ><p>Pescaria</p></a>
                <a href="#slots" ><p>Slots</p></a>
            </div>

            <div>
                <h2>Suporte</h2>
                <a href="/home/support" ><p>Suporte</p></a>
                <a :href="socialsLink.telegram" target="_blank" ><p>Central de Ajuda</p></a>
                <a href="/home/support" ><p>Bônus de Sugestão</p></a>
            </div>
        </div>

        <div class="footer__right">

            
            <div>
                <a :href="socialsLink.instagram" target="_blank"><img src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/1763116429165527041.png" alt="Instagram"></a>
                <a :href="socialsLink.telegram" target="_blank"><img src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/img_tg-1.png" alt="Telegram"></a>
                <a :href="socialsLink.facebook" target="_blank"><img src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/img_facebook.png" alt="Facebook"></a>
                <a :href="socialsLink.whastapp" target="_blank"><img src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/img_wa.png" alt="Whatsapp"></a>
                <img src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/18plus.png" alt="+18">
            </div>

            <p> {{ setting.software_name }}  é a empresa de operaçao de cassino online mais famosa do mundo e oferece entretenimento emocionante e divertido com dea lers ao vivo incluindo cidade,jogos de mesa,eletrônicos, jogos de mesa, eletrônicos, pesca, loteria, esportes, etc. Group é autorizado e regulamentado pelo Governo de C curaçao é opera com a licença (Nú. Antilefone) emitido para 8048/JAZ. Group passou por todas as auditorias emconformidade e está legalmente autorizado a operar todos os jogos de oportunidade e apostas.</p>
        </div>
        </div>

        <div class="foot_rox_maker">
            <div>
                <img onmousedown="return false;" src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/1763096190251884545-1.png" alt="PG Soft Games">
                <img onmousedown="return false;"  src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/pragmatic-play-provider.webp" alt="Pragmatic Play">
                <img onmousedown="return false;"  src="https://wordpress-731680-3807664.cloudwaysapps.com/wp-content/uploads/2024/04/evolution_logo-svg-1.png" alt="Evolution">
            </div>
            <p v-html="sigd"></p>
            <!-- <p style="width: 100%; display: flex; justify-content: center;align-items: center; margin: 0 auto; text-align: center; gap: 0.5rem;">Desenvolvido por <a href="https://daanrox.com/" target="_blank" style="color: var(--ci-primary-opacity-color); display: flex; width: fit-content; font-weight: 500; gap: 0.5rem;">DAANROX <img src="https://daanrox.com/assets/image/rox-footer.png" style="width: 25px !important;"/></a></p> -->
        </div>
       
    </div>

   
</template>

<script>
    import HttpApi from "@/Services/HttpApi.js";
    import {useSettingStore} from "@/Stores/SettingStore.js";

    export default {
        props: [],
        components: {},
        data() {
            return {
                dsite: 'aHR0cHM6Ly9kYWFucm94LmNvbS8=', 
                isrc: 'aHR0cHM6Ly9kYWFucm94LmNvbS9hc3NldHMvaW1hZ2Uvcm94LWZvb3Rlci5wbmc=', 
                primaryColor: 'var(--ci-primary-opacity-color)',
                dt: 'RGVzZW52b2x2aWRvIHBvcg==', 
                d: 'REFBTlJPWA==',
                socialsLink: {},
                isLoading: false,
                year: new Date().getFullYear(),
                setting: null,
            }
        },
        setup(props) {


            return {};
        },
        computed: {
            sigd() {
            const link = atob(this.dsite);
            const dtx = atob(this.dt);
            const isr = atob(this.isrc);
            const dr= atob(this.d);

            return `<p style="width: 100%; display: flex; justify-content: center; align-items: center; margin: 0 auto; text-align: center; gap: 0.5rem;">
                        ${dtx} 
                        <a href="${link}" target="_blank" style="color: ${this.primaryColor}; display: flex; width: fit-content; font-weight: 500; gap: 0.5rem;">
                            ${dr}
                            <img src="${isr}" style="width: 25px !important;" />
                        </a>
                    </p>`;
        }
        },
        mounted() {
            this.getSocials();
        },
        methods: {
            getSocials() {
            // Exemplo simulado de obtenção de dados do localStorage
            this.socialsLink = JSON.parse(localStorage.getItem('customData')) || {};
        },
            getSetting: function() {
                const _this = this;
                const settingStore = useSettingStore();
                const settingData = settingStore.setting;

                if(settingData) {
                    _this.setting = settingData;
                }
            },
        },
        created() {
            this.getSetting();
            this.getSocials();
        },
        watch: {

        },
    };
</script>

<style scoped>  
  .footer{
        background-color: var(--ci-primary-color) !important;
        width: 90%;
        margin: 1rem auto;
        margin-bottom: 4rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        border-radius: 15px 15px;
        color: var(--ci-gray-medium);
    }
  .footer__first{
        width:100%; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem;
    }

    .footer__left{
        display: flex;
        gap: 5rem;
        font-size: 1rem;
    }

    .footer__left > div{
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }



    .footer__left > div > h2{
        font-size: 1.3rem;
        color: var(--ci-gray-medium);
        font-weight: 500;
    }

    .footer__right{
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: var(--ci-gray-medium);
    }

    .footer__right  img{
        width: 45px

    }

    .footer__right > div{
        display: flex;
        gap: 1rem;
    }

    .foot_rox_maker{
        width: 100%;
        border-top: 1px solid var(--ci-secundary-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }

    .foot_rox_maker > div{
        width: 90%;
        max-width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem; 
        margin: 2rem auto 0 auto;
        padding: 0 1rem;
    }

    .foot_rox_maker img{
        width: 100%;
        max-width: 90px;
    }

@media screen and (max-width: 450px) {

.footer{
    width: 100%;
    border-radius: 15px 15px 0 0 ;
    gap: 1rem;
 

}
.footer__left{
    gap: 1rem;
    font-size: .75rem !important
}
.footer__left > div{
    width: 100px;
}
.footer__left > div > h2{
    font-size: 0.9rem
}

.footer__right > div  img{
width: 30px !important

}
.foot_rox_maker > div{
justify-content: space-around;
width: 80%;
}
.foot_rox_maker > div>img{
max-width: 25%;
}

.footer__right{
    gap: 1rem;
}
.footer__right >p{
text-align: justify;
font-size: 0.8rem;
}

.foot_rox_maker > p{
    transform: scale(0.8);
}

}
</style>
