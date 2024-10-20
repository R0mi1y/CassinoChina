<template>
  <div class="item-game-container">
    <RouterLink
      :to="getRedirectRoute()"
      class="item-game text-gray-700 w-full h-auto mr-4 cursor-pointer"
      @mouseover="showIcon = true"
      @mouseleave="showIcon = false"
    >
      <div class="relative w-full h-full">
        <img
          :src="game.distribution === 'kagaming' ? game.cover : `/storage/` + game.cover"
          alt=""
          class="w-full"
          style="border-radius: 15px"
        />
        <div v-if="showIcon" class="bdc">
          <i class="fa-solid fa-circle-play"></i>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: ['index', 'game'],
  components: { RouterLink },
    data() {
        return {
        showIcon: false
        }
    },
    methods: {
        getRedirectRoute() {
            const componentMap = {
                1: {slug: '48', component: 'DoubleFortunePage'},
                2: {slug: '42', component: 'GaneshaGoldPage'},
                3: {slug: '63', component: 'DragonTigerLuckPage'},
                4: {slug: '40', component: 'JungleDelightPage'},
                5: {slug: '69', component: 'BikiniParadisePage'},
                6: {slug: '68', component: 'FortuneMousePage'},
                7: {slug: '98', component: 'FortuneOXPage'},
                51: {slug: '1543462', component: 'FortuneRabbitPage'},
                9: {slug: '1695365', component: 'FortuneDragonPage'},
                50: {slug: '126', component: 'TigrinhoPage'},
                11: {slug: 'vs10bbbonanza', component: 'BigBassBonanzaPage'},
                12: {slug: 'vs10bbkir', component: 'BigBassBonanzaKeepingitReelPage'},
                13: {slug: 'vs10bxmasbnza', component: 'ChristmansBigBassBonanzaPage'},
                14: {slug: 'vs10cowgold', component: 'CowboysGoldPage'},
                15: {slug: 'vs10returndead', component: 'ReturnoftheDeadPage'},
                16: {slug: 'vs10txbigbass', component: 'BigBassSplashPage'},
                17: {slug: 'vs10vampwolf', component: 'VampiresvsWolvesPage'},
                18: {slug: 'vs12bbb', component: 'BiggerBassBonanzaPage'},
                19: {slug: 'vs12bbbxmas', component: 'BiggerBassBlizzardChristmasCatchPage'},
                20: {slug: 'vs20bchprty', component: 'WildBeachPartyPage'},
                21: {slug: 'vs20bonzgold', component: 'BonanzaGoldPage'},
                22: {slug: 'vs20candvil', component: 'CandyVillagePage'},
                23: {slug: 'vs20daydead', component: 'DayofDeadPage'},
                24: {slug: 'vs20doghouse', component: 'TheDogHousePage'},
                25: {slug: 'vs20egypt', component: 'EgyptianFortunesPage'},
                26: {slug: 'vs20fruitsw', component: 'SweetBonanzaPage'},
                27: {slug: 'vs20olympgate', component: 'GatesofOlympusPage'},
                28: {slug: 'vs20pbonanza', component: 'PyramidBonanzaPage'},
                29: {slug: 'vs20sbxmas', component: 'SweetBonanzaXmasPage'},
                30: {slug: 'vs20schristmas', component: 'StarlightChristmasPage'},
                31: {slug: 'vs20starlight', component: 'StarlightPrincessPage'},
                32: {slug: 'vs20sugarrush', component: 'SuggarRushPage'},
                33: {slug: 'vs20sugarrushx', component: 'SuggarRush1000Page'},
                34: {slug: 'vs20tweethouse', component: 'TheTweetyHousePage'},
                35: {slug: 'vs20wildboost', component: 'WildBoosterPage'},
                36: {slug: 'vs20wildpix', component: 'WildPixiesPage'},
                37: {slug: 'vs25chilli', component: 'ChiliHeatPage'},
                38: {slug: 'vs25gladiator', component: 'WildGladiatorsPage'},
                39: {slug: 'vs25pyramid', component: 'PyramidKingPage'},
                40: {slug: 'vs25tigerwar', component: 'TheTigerWarriorPage'},
                41: {slug: 'vs25wolfgold', component: 'WolfGoldPage'},
                42: {slug: 'vs40pirate', component: 'PirateGoldPage'},
                43: {slug: 'vs40samurai3', component: 'RiseofSamurai3Page'},
                44: {slug: 'vs40spartaking', component: 'SpartanKingPage'},
                45: {slug: 'vs40wildwest', component: 'WildWestGoldPage'},
                46: {slug: 'vs50safariking', component: 'SafariKingPage'},
                47: {slug: 'vs5strh', component: 'StrikingHot5Page'},
                48: {slug: 'vs5super7', component: 'Super7sPage'},
                49: {slug: '1682240', component: 'CashManiaPage'}
            };

            const match = componentMap[this.game.id];

            console.log(this.game.id, this.game.game_code);

            if (match && String(match.slug) === String(this.game.game_code)) {
                return { name: match.component };
            }

            return { name: 'casinoPlayPage', params: { id: this.game.id, slug: this.game.game_code } };
        }
    },

    mounted() {}
};
</script>

<style scoped>
.item-game-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-game {
  position: relative;
  border-radius: 15px !important;
  background-color: var(--ci-primary-color) !important;
}

.bdc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45); /* Fundo semitransparente */
  border-radius: 15px; /* Mesma borda arredondada que o card */
  display: flex;
  align-items: center;
  justify-content: center;
}

.bdc i {
  font-size: 3rem; /* Ajuste o tamanho conforme necessário */
  color: var(--ci-primary-color);
  z-index: 1; /* Garante que o ícone esteja acima do backdrop */
}

.item-game img {
  display: block;
  border-radius: 15px;
}
</style>

<!-- <template>
  <div class="item-game-container">
    <RouterLink :to="{ name: 'casinoPlayPage', params: { id: game.id, slug: game.game_code }}" class="item-game text-gray-700 w-full h-auto mr-4 cursor-pointer" @mouseover="showIcon = true" @mouseleave="showIcon = false">
      <div class="relative w-full h-full">
        <img :src="game.distribution === 'kagaming' ? game.cover : `/storage/`+game.cover" alt="" class="w-full" style="border-radius: 15px;">
        <div v-if="showIcon" class="bdc">
          <i class="fa-solid fa-circle-play"></i>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: ['index', 'game'],
  components: { RouterLink },
  data() {
    return {
      showIcon: false
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.item-game-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-game {
  position: relative;
  border-radius: 15px !important;
  background-color: var(--ci-primary-color) !important;
}

.bdc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45); /* Fundo semitransparente */
  border-radius: 15px; /* Mesma borda arredondada que o card */
  display: flex;
  align-items: center;
  justify-content: center;
}

.bdc i {
  font-size: 3rem; /* Ajuste o tamanho conforme necessário */
  color: var(--ci-primary-color);
  z-index: 1; /* Garante que o ícone esteja acima do backdrop */
}

.item-game img {
  display: block;
  border-radius: 15px;
}
</style> -->
