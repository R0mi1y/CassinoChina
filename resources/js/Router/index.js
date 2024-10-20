import {createWebHistory, createRouter} from "vue-router";
import HomePage from "@/Pages/Home/HomePage.vue";
import SportPage from "@/Pages/Sport/SportPage.vue";
import {useAuthStore} from "@/Stores/Auth.js";
import AffiliatePage from "@/Pages/Profile/AffiliatePage.vue";
import CassinoListPage from "@/Pages/Cassino/CassinoListPage.vue";
import CassinoSearch from "@/Pages/Cassino/CassinoSearch.vue";
import LoginPage from "@/Pages/Auth/LoginPage.vue";
import RegisterPage from "@/Pages/Auth/RegisterPage.vue";
import WalletPage from "@/Pages/Profile/WalletPage.vue";
import DepositPage from "@/Pages/Profile/DepositPage.vue";
import WithdrawPage from "@/Pages/Profile/WithdrawPage.vue";
import TransactionPage from "@/Pages/Profile/TransactionPage.vue";
import ConditionsReference from "@/Pages/Terms/ConditionsReference.vue";
import ServiceTerms from "@/Pages/Terms/ServiceTerms.vue";
import PrivacyPolicy from "@/Pages/Terms/PrivacyPolicy.vue";
import BonusTerms from "@/Pages/Terms/BonusTerms.vue";
import WelcomeBonus from "@/Pages/Terms/WelcomeBonus.vue";
import SupportPage from "@/Pages/Home/SupportPage.vue";
import PromotionPage from "@/Pages/Home/PromotionPage.vue";
import AgentsPage from "@/Pages/Home/AgentsPage.vue";
import AboutPage from "@/Pages/Home/AboutPage.vue";
import SupportCenterPage from "@/Pages/Home/SupportCenterPage.vue";
import DataPage from "@/Pages/ApiData/DataPage.vue";
import StripeSuccess from "@/Pages/Gateway/StripeSuccess.vue";
import StripeCancel from "@/Pages/Gateway/StripeCancel.vue";
import FavoritePage from "@/Pages/Profile/FavoritePage.vue";
import RecordPage from "@/Pages/Profile/RecordPage.vue";
import BonusPage from "@/Pages/Home/BonusPage.vue";
import VipPage from "@/Pages/Home/VipPage.vue";
import RecentsPage from "@/Pages/Profile/RecentsPage.vue";
import AwardsPage from "@/Pages/Home/AwardsPage.vue";
import EventsPage from "@/Pages/Home/EventsPage.vue";
import PendentesPage from "@/Pages/Home/PendentesPage.vue";
import LandingPage from "@/Pages/Landing/LandingPage.vue";
import CasinoPlayPage from "@/Pages/Cassino/CasinoPlayPage.vue";
import ForgotPassword from "@/Pages/Auth/ForgotPassword.vue";
import ResetPassword from "@/Pages/Auth/ResetPassword.vue";
import ProfilePage from "@/Pages/Profile/ProfilePage.vue";
import TigrinhoPage from "@/Pages/Cassino/Components/TigrinhoPage.vue";
import DoubleFortunePage from '@/Pages/Cassino/Components/DoubleFortunePage.vue';
import GaneshaGoldPage from '@/Pages/Cassino/Components/GaneshaGoldPage.vue';
import DragonTigerLuckPage from '@/Pages/Cassino/Components/DragonTigerLuckPage.vue';
import JungleDelightPage from '@/Pages/Cassino/Components/JungleDelightPage.vue';
import BikiniParadisePage from '@/Pages/Cassino/Components/BikiniParadisePage.vue';
import FortuneMousePage from '@/Pages/Cassino/Components/FortuneMousePage.vue';
import FortuneOXPage from '@/Pages/Cassino/Components/FortuneOXPage.vue';
import FortuneRabbitPage from '@/Pages/Cassino/Components/FortuneRabbitPage.vue';
import FortuneDragonPage from '@/Pages/Cassino/Components/FortuneDragonPage.vue';
import BigBassBonanzaPage from '@/Pages/Cassino/Components/BigBassBonanzaPage.vue';
import BigBassBonanzaKeepingitReelPage from '@/Pages/Cassino/Components/BigBassBonanzaKeepingitReelPage.vue';
import ChristmansBigBassBonanzaPage from '@/Pages/Cassino/Components/ChristmansBigBassBonanzaPage.vue';
import CowboysGoldPage from '@/Pages/Cassino/Components/CowboysGoldPage.vue';
import ReturnoftheDeadPage from '@/Pages/Cassino/Components/ReturnoftheDeadPage.vue';
import BigBassSplashPage from '@/Pages/Cassino/Components/BigBassSplashPage.vue';
import VampiresvsWolvesPage from '@/Pages/Cassino/Components/VampiresvsWolvesPage.vue';
import BiggerBassBonanzaPage from '@/Pages/Cassino/Components/BiggerBassBonanzaPage.vue';
import BiggerBassBlizzardChristmasCatchPage from '@/Pages/Cassino/Components/BiggerBassBlizzardChristmasCatchPage.vue';
import WildBeachPartyPage from '@/Pages/Cassino/Components/WildBeachPartyPage.vue';
import BonanzaGoldPage from '@/Pages/Cassino/Components/BonanzaGoldPage.vue';
import CandyVillagePage from '@/Pages/Cassino/Components/CandyVillagePage.vue';
import DayofDeadPage from '@/Pages/Cassino/Components/DayofDeadPage.vue';
import TheDogHousePage from '@/Pages/Cassino/Components/TheDogHousePage.vue';
import EgyptianFortunesPage from '@/Pages/Cassino/Components/EgyptianFortunesPage.vue';
import SweetBonanzaPage from '@/Pages/Cassino/Components/SweetBonanzaPage.vue';
import GatesofOlympusPage from '@/Pages/Cassino/Components/GatesofOlympusPage.vue';
import PyramidBonanzaPage from '@/Pages/Cassino/Components/PyramidBonanzaPage.vue';
import SweetBonanzaXmasPage from '@/Pages/Cassino/Components/SweetBonanzaXmasPage.vue';
import StarlightChristmasPage from '@/Pages/Cassino/Components/StarlightChristmasPage.vue';
import StarlightPrincessPage from '@/Pages/Cassino/Components/StarlightPrincessPage.vue';
import SuggarRushPage from '@/Pages/Cassino/Components/SuggarRushPage.vue';
import SuggarRush1000Page from '@/Pages/Cassino/Components/SuggarRush1000Page.vue';
import TheTweetyHousePage from '@/Pages/Cassino/Components/TheTweetyHousePage.vue';
import WildBoosterPage from '@/Pages/Cassino/Components/WildBoosterPage.vue';
import WildPixiesPage from '@/Pages/Cassino/Components/WildPixiesPage.vue';
import ChiliHeatPage from '@/Pages/Cassino/Components/ChiliHeatPage.vue';
import WildGladiatorsPage from '@/Pages/Cassino/Components/WildGladiatorsPage.vue';
import PyramidKingPage from '@/Pages/Cassino/Components/PyramidKingPage.vue';
import TheTigerWarriorPage from '@/Pages/Cassino/Components/TheTigerWarriorPage.vue';
import WolfGoldPage from '@/Pages/Cassino/Components/WolfGoldPage.vue';
import PirateGoldPage from '@/Pages/Cassino/Components/PirateGoldPage.vue';
import RiseofSamurai3Page from '@/Pages/Cassino/Components/RiseofSamurai3Page.vue';
import SpartanKingPage from '@/Pages/Cassino/Components/SpartanKingPage.vue';
import WildWestGoldPage from '@/Pages/Cassino/Components/WildWestGoldPage.vue';
import SafariKingPage from '@/Pages/Cassino/Components/SafariKingPage.vue';
import StrikingHot5Page from '@/Pages/Cassino/Components/StrikingHot5Page.vue';
import Super7sPage from '@/Pages/Cassino/Components/Super7sPage.vue';
import CashManiaPage from '@/Pages/Cassino/Components/CashManiaPage.vue';

export const routes = [
    {
        path: "/",
        redirect: "/home/game",
    },

    {
        path: "/profile/affiliate",
        redirect: "/home/affiliate",
    },
    {
        name: "home",
        path: "/home/game:action?",
        component: HomePage,
    },
    {
        name: "profile",
        path: "/home/me",
        component: ProfilePage,
    },
    {
        name: "login",
        path: "/home/login",
        component: HomePage,
    },
    {
        name: "agentsPage",
        path: "/home/m/agents",
        component: AgentsPage,
    },

    {
        name: "forgotPassword",
        path: "/forgot-password",
        component: ForgotPassword,
    },
    {
        name: "resetPassword",
        path: "/reset-password/:token",
        component: ResetPassword,
    },
    {
        name: "stripeSuccess",
        path: "/stripe/success",
        component: StripeSuccess,
    },
    {
        name: "stripeCancel",
        path: "/stripe/cancel",
        component: StripeCancel,
    },
    {
        name: "support",
        path: "/home/support",
        component: SupportPage,
    },
    {
        name: "promotion",
        path: "/promotion",
        component: PromotionPage,
    },

    {
        name: "sportsPage2",
        path: "/home/sports",
        component: SportPage,
    },
    {
        name: "supportCenter",
        path: "/support-center",
        component: SupportCenterPage,
    },
    {
        name: "register",
        path: "/register/:code?",
        component: HomePage,
    },
    {
        path: "/sports",
        component: {
            template: `<router-view></router-view>`,
        },
        children: [
            {
                name: "sports",
                path: "", // Rota vazia para exibir a página de esportes
                component: SportPage,
            },
        ],
    },
    {
        name: "profileAffiliate",
        path: "/home/agents",
        component: AffiliatePage,
        meta: {
            auth: true,
        },
    },
    {
        name: "favoritePage",
        path: "/profile/favorite777",
        component: FavoritePage,
        meta: {
            auth: true,
        },
    },
    {
        name: "casinos",
        path: "/casinos777",
        component: HomePage,
    },
    {
        name: "casinoPlayPage",
        path: "/games/play/:id/:slug",
        component: CasinoPlayPage,
    },
    {
        name: "TigrinhoPage",
        path: "/tigrinho",
        component: TigrinhoPage,
    },
    
    {
        name: "casinosAll",
        path: "/casino/provider/:provider?/category/:category?",
        component: CassinoListPage,
    },
    {
        name: "casinoSearch",
        path: "/games/search",
        component: CassinoSearch,
    },
    {
        name: "aboutPage",
        path: "/home/about",
        component: AboutPage,
    },
    {
        name: "profileWallet",
        path: "/profile/wallet",
        component: WalletPage,
        meta: {
            auth: true,
        },
    },
    {
        name: "recentsPage",
        path: "/profile/recents",
        component: RecentsPage,
        meta: {
            auth: true,
        },
    },
    {
        name: "profileDeposit",
        path: "/profile/deposit",
        component: HomePage,
        meta: {
            auth: true,
        },
    },
    {
        name: "profileWithdraw",
        path: "/profile/withdraw",
        component: WithdrawPage,
        meta: {
            auth: true,
        },
    },
    {
        name: "profileTransactions",
        path: "/profile/transactions",
        component: TransactionPage,
        meta: {
            auth: true,
        },
    },
    {
        name: "termsConditionsReference",
        path: "/terms/conditions-reference",
        component: ConditionsReference,
    },
    {
        name: "serviceTerms",
        path: "/terms/service",
        component: ServiceTerms,
    },
    {
        name: "privacyPolicy",
        path: "/terms/privacy-policy",
        component: PrivacyPolicy,
    },
    {
        name: "bonusTerms",
        path: "/terms/bonus",
        component: BonusTerms,
    },
    {
        name: "welcomeBonus",
        path: "/terms/bonus-welcome",
        component: WelcomeBonus,
    },
    {
        name: "dataPage",
        path: "/datapage",
        component: DataPage,
    },
    {
        name: "recordPage",
        path: "/records",
        component: RecordPage,
    },
    {
        name: "eventsPage",
        path: "/home/events",
        component: EventsPage,
    },
    {
        name: "pendentesPage",
        path: "/home/pendents",
        component: PendentesPage,
    },
    {
        name: "vipPage",
        path: "/vip",
        component: VipPage,
    },
    {
        name: "bonusPage",
        path: "/bonus",
        component: BonusPage,
    },
    {
        name: "awardsPage",
        path: "/awards",
        component: AwardsPage,
    },
    {
        name: "landingPage",
        path: "/landing/spin",
        component: LandingPage,
    },
    {
        name: 'DoubleFortunePage',
        path: '/doublefortune',
        component: DoubleFortunePage,
    },
    {
        name: 'GaneshaGoldPage',
        path: '/ganeshagold',
        component: GaneshaGoldPage,
    },
    {
        name: 'DragonTigerLuckPage',
        path: '/dragontigerluck',
        component: DragonTigerLuckPage,
    },
    {
        name: 'JungleDelightPage',
        path: '/jungledelight',
        component: JungleDelightPage,
    },
    {
        name: 'BikiniParadisePage',
        path: '/bikiniparadise',
        component: BikiniParadisePage,
    },
    {
        name: 'FortuneMousePage',
        path: '/fortunemouse',
        component: FortuneMousePage,
    },
    {
        name: 'FortuneOXPage',
        path: '/fortuneox',
        component: FortuneOXPage,
    },
    {
        name: 'FortuneRabbitPage',
        path: '/fortunerabbit',
        component: FortuneRabbitPage,
    },
    {
        name: 'FortuneDragonPage',
        path: '/fortunedragon',
        component: FortuneDragonPage,
    },
    {
        name: 'TigrinhoPage',
        path: '/tigrinho',
        component: TigrinhoPage,
    },
    {
        name: 'BigBassBonanzaPage',
        path: '/bigbassbonanza',
        component: BigBassBonanzaPage,
    },
    {
        name: 'BigBassBonanzaKeepingitReelPage',
        path: '/bigbassbonanzakeepingitreel',
        component: BigBassBonanzaKeepingitReelPage,
    },
    {
        name: 'ChristmansBigBassBonanzaPage',
        path: '/christmansbigbassbonanza',
        component: ChristmansBigBassBonanzaPage,
    },
    {
        name: 'CowboysGoldPage',
        path: '/cowboysgold',
        component: CowboysGoldPage,
    },
    {
        name: 'ReturnoftheDeadPage',
        path: '/returnofthedead',
        component: ReturnoftheDeadPage,
    },
    {
        name: 'BigBassSplashPage',
        path: '/bigbasssplash',
        component: BigBassSplashPage,
    },
    {
        name: 'VampiresvsWolvesPage',
        path: '/vampiresvswolves',
        component: VampiresvsWolvesPage,
    },
    {
        name: 'BiggerBassBonanzaPage',
        path: '/biggerbassbonanza',
        component: BiggerBassBonanzaPage,
    },
    {
        name: 'BiggerBassBlizzardChristmasCatchPage',
        path: '/biggerbassblizzardchristmascatch',
        component: BiggerBassBlizzardChristmasCatchPage,
    },
    {
        name: 'WildBeachPartyPage',
        path: '/wildbeachparty',
        component: WildBeachPartyPage,
    },
    {
        name: 'BonanzaGoldPage',
        path: '/bonanzagold',
        component: BonanzaGoldPage,
    },
    {
        name: 'CandyVillagePage',
        path: '/candyvillage',
        component: CandyVillagePage,
    },
    {
        name: 'DayofDeadPage',
        path: '/dayofdead',
        component: DayofDeadPage,
    },
    {
        name: 'TheDogHousePage',
        path: '/thedoghouse',
        component: TheDogHousePage,
    },
    {
        name: 'EgyptianFortunesPage',
        path: '/egyptianfortunes',
        component: EgyptianFortunesPage,
    },
    {
        name: 'SweetBonanzaPage',
        path: '/sweetbonanza',
        component: SweetBonanzaPage,
    },
    {
        name: 'GatesofOlympusPage',
        path: '/gatesofolympus',
        component: GatesofOlympusPage,
    },
    {
        name: 'PyramidBonanzaPage',
        path: '/pyramidbonanza',
        component: PyramidBonanzaPage,
    },
    {
        name: 'SweetBonanzaXmasPage',
        path: '/sweetbonanzaxmas',
        component: SweetBonanzaXmasPage,
    },
    {
        name: 'StarlightChristmasPage',
        path: '/starlightchristmas',
        component: StarlightChristmasPage,
    },
    {
        name: 'StarlightPrincessPage',
        path: '/starlightprincess',
        component: StarlightPrincessPage,
    },
    {
        name: 'SuggarRushPage',
        path: '/suggarrush',
        component: SuggarRushPage,
    },
    {
        name: 'SuggarRush1000Page',
        path: '/suggarrush1000',
        component: SuggarRush1000Page,
    },
    {
        name: 'TheTweetyHousePage',
        path: '/thetweetyhouse',
        component: TheTweetyHousePage,
    },
    {
        name: 'WildBoosterPage',
        path: '/wildbooster',
        component: WildBoosterPage,
    },
    {
        name: 'WildPixiesPage',
        path: '/wildpixies',
        component: WildPixiesPage,
    },
    {
        name: 'ChiliHeatPage',
        path: '/chiliheat',
        component: ChiliHeatPage,
    },
    {
        name: 'WildGladiatorsPage',
        path: '/wildgladiators',
        component: WildGladiatorsPage,
    },
    {
        name: 'PyramidKingPage',
        path: '/pyramidking',
        component: PyramidKingPage,
    },
    {
        name: 'TheTigerWarriorPage',
        path: '/thetigerwarrior',
        component: TheTigerWarriorPage,
    },
    {
        name: 'WolfGoldPage',
        path: '/wolfgold',
        component: WolfGoldPage,
    },
    {
        name: 'PirateGoldPage',
        path: '/pirategold',
        component: PirateGoldPage,
    },
    {
        name: 'RiseofSamurai3Page',
        path: '/riseofsamurai3',
        component: RiseofSamurai3Page,
    },
    {
        name: 'SpartanKingPage',
        path: '/spartanking',
        component: SpartanKingPage,
    },
    {
        name: 'WildWestGoldPage',
        path: '/wildwestgold',
        component: WildWestGoldPage,
    },
    {
        name: 'SafariKingPage',
        path: '/safariking',
        component: SafariKingPage,
    },
    {
        name: 'StrikingHot5Page',
        path: '/strikinghot5',
        component: StrikingHot5Page,
    },
    {
        name: 'Super7sPage',
        path: '/super7s',
        component: Super7sPage,
    },
    {
        name: 'CashManiaPage',
        path: '/cashmania',
        component: CashManiaPage,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    if(to.meta?.auth) {
        const auth = useAuthStore();
        auth.isAuth ? next() : next({ name: 'home' });
    }else{
        next();
    }
});

export default router;
