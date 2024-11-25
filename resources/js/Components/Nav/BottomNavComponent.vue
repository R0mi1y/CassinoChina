<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
  <div
    v-show="showScrollButton"
    class="w-[60px] flex items-center justify-center cursor-pointer flex-col min-h-[60px] p-[4px] bg-[var(--ci-primary-color)] border border-solid border-[var(--ci-secundary-color)] rounded-xl fixed bottom-20 right-4"
    @click="scrollToTop"
  >
    <div
      class="flex items-center justify-center w-[30px] h-[30px] mb-[2px] text-[12px] text-white rounded-full bg-[var(--ci-primary-color)]"
    >
      <i
        class="flex items-center justify-center text-[var(--ci-secundary-color)] rounded-[50%] bg-[var(--ci-primary-opacity-color)] p-1"
      >
        <span class="material-symbols-sharp"> rocket </span>
      </i>
    </div>
    <div
      class="w-full text-white [word-wrap:break-word] text-[12px] overflow-hidden text-center overflow-ellipsis align-middle font-medium"
    >
      Topo
    </div>
  </div>

  <span class="hidden material-symbols-sharp" style="display: none">rocket</span>

  <div class="flex sm:hidden">
    <div
      class="fixed z-40 w-full h-16 max-w-lg -translate-x-1/2 bottom-0 left-1/2 navBtn"
      style="background-color: var(--ci-primary-color); color: var(--ci-gray-light)"
    >
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          @click="$router.push('/home/game')"
          data-tooltip-target="tooltip-home"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-l-full group"
        >
          <!-- <img 
                  :src="`/storage/rox/icons/home.png`"
                  class="w-[25px]"/> -->
          <!-- <span class="text-[12px]">Início</span> -->

          <img
            v-if="path == '/home/game'"
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARcSURBVHgB7VpdUtswEF7Z6QyPCe075gSkJyDcgJ4AOAHtCQgnoD0B4QTQEyQ9AekJcN8Bu50+dIbY6q5lD9JaduIQG4fJN2OQLCnelfbnk2yADTbYYIO3BEcGl658lHiNQQZdeEtA5c5S5ZKrIx+GUDMcaAio3KkAOWS338YKbsnAwxUL9NXD6w5N1IOaIaBmkHJPIMdY9PT7EYhdED0fakbtJorKXQBTzgH5pQnlagcPKk0FlkbgyvvjvHKPt9AwavHB1O9ImS572FQChJYhoQQxiUXvG6wYtSiIq3eIBnoN1XETie1PsELUEmQEuCEsh8NVs5taFJyJ3gST+srNbRnUmgc7MhjY7scAfaHSBxNGns/E+yGsM1wZHFlYTW3pY+EVRMEwcMhTLPbh9Tkk+fgUbeEqEh9GZR3nKkghfwbyWirF2gj/HYiDfwXMqFTBonzWQoQOKvkkelPeUBhFNZK8DluaboxWVinF2Hgk+uFlUWRsEu9k0Hflw+hFgYr2a20nySjTV6ZkwPtYfZBmKFa+lyFECtWDtgFN0gV5B5oboS9+1H3R6oMxRJ5eF0lIbiFEj9LFxLwZGdHeqqAAwVKC/AktBbKfX3oddyWeXrcqiJ32zB8BH1oKCXJq1p0dvV6UJrpsUDtNFJKdi2/W5XwTBcZaZm31QUhk8/W6zJ3/cKhkqa9gmDrzQlBHFffH0BQURdPl625px5E5BTts9apEUKWYc0nXskoSkaBjfW3HMZ73WzxGzLRVdPKdY0NBXPLfsCAw+nq28qIg9iQVPRzAsxUNaMKorWicZFFeaGnOyXc2bViwKFUXaJUsR/u6HMMimihyfvic5jq8MzbumPXyCKoEE146dl/7nf2M3uEM+/P2bTjXR9pTryJwPmMBmUo0zNrwd2gVJ5CTWfo6KdNzYY6q0dmlvvfj1Icrp3xuEcQnZUqSv2Vl41hf0bGMY1opo4Va4oRu7yr5GfjG9qk0ybuwOOb2DW3lLTOiW7dDFhm9rGCYaDoT5kNLUkQkerhlCSgweVRPTXSQNtPJ2g913/GpL5Rjmo11Ib5AWc5RufAPwFlmZsJinqoBZZSPvq4YpYrcLj8N0fpR+xgqgHxu2e0Vf7b9Co6LxmP7Net7SPcNE+UpokmSnZ6lnhe1U1uZFXDS7aRWZSiYTxHVSDaZoq28KNSZqDjRTDEUiamLg3nnpVzWGJxkw9AxBTR3EVVJduaTWRmWQDpuBBURs1SB0ifRludBTtMqv2NYVrGXIgJ36poBMlksIw/quSgZJLZrf8W9Stjkb+wri9cCV9DXK204IlwUFll9+sMUVIk5Q0xvgNbga6Quyoh8lFFGMaG/LA86I7MOfXTc27auJClGsv21fKaCsl+l/00ggR6ZzH4dIUYYzU+SUq4NZ8XBGRHtfZtUCjqBmCExyDh0PopiQ0wdcE8GawZ6ba4rp+6Vgb4xg3iIVGmvze8HUbHvuFY3xGdhgw3WC/8Brxt1mo0VALYAAAAASUVORK5CYII="
          />
          <img
            v-else
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU9SURBVHgB7VpNchpHFH6vwYjsyAk8OYHljUtKFhYblQVWlTiB5BMYn0DoBFJOIHQCnDiASxuRRUTsjcgJMrkBWSgFiJmX1wPDTPfM8KMwo0kVX5XEdNPd9Ee//t7r1wBssMEGG8QIhITRbnYvCeCEP7kzHOYrlcrLPsQIAQmi3f5y6pCTINjL5f6pQsxIjODnz7+/J9uuqbVYgJiRCMF2u2vYlk4OTCHwAmJG7HtQkiMbbvjRUD5YwHcHB7smxIzYVxCJzkEjB0QfkiAnEStBKSo24ZG/jvfhWent97GbpovYTJTdwQkr5qW/jgB75fLOS0gQsRCc7Du6C6ok9QAxxO9hXwjovHmz8yOsGbEQbP18ewQZbMCqQPxYKu1UYI2IZQ9i6CotAaKjRuNurb4xFoIHh7sdNtG1m9tjEKsfbH/q7oXVE+I2+4/zQD0rbPnwhxqsEckH2+0vx2RbF7oAxUFOYmmCrRYLB+B73ifbScSQ80F93ug9Irgql3fr81ouJOjEkTY2ECSxVMLksK8YFRnNJRjtz9IG7GdBFPfLr3r6O5Eq6gXJaScnQYUxWI0wF5ON7iSOAWzDX4OAdbDpSroBeEJcN3/bHpOo8oSOfdXG9ABd87eNNNFWs/sn+E4Bcancf0Hz0+0FCha+GbBfKu98628TaqLN5lcpKIa/Y9rISYzGw5qjqDNQ4fr6qyKGoQTRGhtqBfUghahUiuwuRMdf9/BgLSZIGVQaEdEfkFIQ2X9pVYa/EL6CiC/UMpiQUgg+Y2rl52o5FKTILVqYShN1YKtfPoG92EQn4ZiHwTifXoJZ3bqEoZT09o3GTUF17thfJfssUxVN/oOEMAnRVCWVQYpbCjj6fD6/zRGMhxUU1M3DSOfKJGFRIBw6Rru7x0H06Syo5xT/oqCa3zdZJzyrGztCY8pHEWysmien/f6GJWGrCmbAinBS+zI85LT+zIr4mb+wSyZ+GtWPnb2i8rbwPjuEoDoxG5IRGGf1A6l9D0y8FnmAJn0feosUMFFE8Vz28MrzTVROzF05NpPXQG4/eM1mWps2MxeZK8m4kmYzvho+fFPN5wcFsqjGgzkxJ2VArmJH78urZJJaNiCKIH+LBvvBWTmbzZowh5y75yad/QM5prXnFhfuSfLaYgZrlbeOsPVZ9KpbufwkqCYMPZPakOkhWL6hPD8eMFFEdZD7+2cmJAJPCQeD/OyZRc+n6BR6dBuN7k2tynAflNOEDLL5m7jzaoLRuY4QE92bjizV79dps4Um2mp1b9y+bAh1TgSfSaL53OB8dqfIY5ZKu8XQ/trpx73cUUxUCKuwqos48E1c7jnXLCU5JlWDJYEWnJGY9OUxWHDgZCs3UK2e3UX0ACyGRIbX1hEaUzFR3UUkGWRPcqlwFvW+cx6d6wvDg26NoHaHt2KQLUBpb8KKKB/uSgt4J01xOqO+fEYbiovOo/pckYQjNFm1EauPzyZWDbKlufKelA7/UVGMOwa/1GFVjJlgxl9hO9qhuolJeDQrZrYyS8eg2gQTBz7jPKlPP1xXobkJNYO2v/8qvacIDSF5UUP+S/RnJE8BnaDpL0TFfmmEPIVoVab8pxLEmWN2YAs8X/d9XRyQc+T9p1yXcw63I18Vguxs62oj2mZnexfy7aQCkpicWy43DPxMRSao5Usg8dv65bbuRu//V8gM/EF55518DojM8GFYJUhnHnQZyF9yDEZbH9xygKBMpo5GwyLMi/tSCnltPhptFf05pMXXZxbUCOkFL3tq7wd51X4SNn186kuhDTZ4BP4FTItH2y764r4AAAAASUVORK5CYII="
          />
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip"
        >
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          @click="$router.push('/home/events')"
          data-tooltip-target="tooltip-casino"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 group"
        >
          <!-- <img :src="`/storage/rox/icons/promotion.png`" class="w-[26px]" /> -->
          <!-- <span class="text-[12px]">Promoção</span> -->
          <img
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMbSURBVHgB7ZrhcdowFMf/suGu3wrpAs4GyQRNJ0i7AZ2gzQSUCUgngE5AOgFsEDpBPECI+di7YKtP2NdID2EbcyW2q9+dwRbPkp709J70DsDhcLSKnox6noyGvnya0yWzi+4fB6jAGxkFHbkae/LpIasr8uVq0pXRBV4D1SH/pTO260HJlK2PButLqpS9PjWYqIDAESgl6CsoEAu7EB9+i36YJ6QUEJDfUADJjDbiXaGc+U5FUnP0JiXFcxVVM0idv0U51jHEOUR/XVIeHirjGaZDnfxOjfe3HYD8wYSDZ0jrgChztii49iBvVH2CBkc9a7/1ukgG+OeQs+HrBWztkfO43V1Tq6+8KsuajsCcTJfeYzJ3OIBKM9kBjE6QzS/BTJHWjVJoYcqJoRqgv42njiQwaxc3VNdSL5Hwlqy9tziASkpuaI3B6ITd+ZC5fQYzNR/JWN1kZjow3xDTWPSnvB6JuIcjqLYm01kzOt+R0ZVNTkKMWOFAyT4j4bMYxsAI9gavzWf5C6fAl9GMx0TdFHUosN+ba9N8Tq9oYG/nccBlrQOaQ+UQohoibzPXy8hsl4nyhsy922QZYSzOzve0MaPbXpFsHpVDyEb0Fyps6GU0Yhc+5D3f5ShZMCdkInbMVMXObGAM64jTkHJa7KanrtVEV1bNyr6tn15fJje3yXYtIagMR23rtqgNOo24YGFFE5jSUPwkkwmT1PQC/VcV9OlzQU7nmizjioquYO3o4du5l3dzyNbEcF/DNYP8gLzrwhvx7eNeJcmrfaQRnqF5UCgSl7rzy3E83hjNJOggMdauXcnUYQRoLOK9/tSxiVBhIPVXyP1vxNnpXXdJiuLwEUet5uCUbAtOybZg9a7qUOxrz+Rpt/tO1BSJ/K7ZZ3L3UNwwzEN1jrluUxdNJNzAM7J/e5WkXAtlxMQnkXsOrBXrLC16iYJEthV+FuzQeQ+vyKH9cSGkLTgl24JTsi04JduCU7ItOCXbglOyLTgl28L/m63j1C17V5Sd45Sbydpn7/L/8nKAudY2e7eTneOUVrKG2bvjsnOOBvIHPSEKGBpOt2sAAAAASUVORK5CYII="
            v-if="path == '/home/events'"
          />
          <img
            v-else
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOHSURBVHgB7ZpBUtswFIbfc9zEu6Y3CDeATaeBRWHDDA4UuEF6gpATEE4QOAHhBKHthLBLNiVlBb2Bj5BVC6X2q2QnraXISex0iuPqm2EG2fKzfunp6flNADQaTZpAWJB2+65oWQ81ItgE/hdY7bP2RaVSbkFMut1BiQhrQHTAmiUAGiLgZe5F7mx7+/U9JGAhkf6APOgFg1HioAFbOztlB+bg+vpLzXO9BhtWUXWf2WowWycQEwMWYIZAjj8JfDJgBt3u7bHn0mmUwNH7Gp3O5wbEJLHIbmdQhekCx8wUyleQPL6Cs0HI1fgWgRgkFkkAx0Lbo7PHH9Yr5lIr7OaF1J3tMzhX2eHigxUUrA3Znqz79jzY8tt/7hULhe9ViEEike12j89kSTBk4unh4dqQ7z97t1zlooWHWFC6uro5km2NXD58ZWgCbdm764G9vXKfLZ+wD3Ec4OYkkUjLslbFK3QvB5fK3voRj7JiN+M47Gp8H4I0WQRY365sCFEUEYU2Ib6EGCR1V0cyU1J1QoT3sqtZ+Ycm/y+IzF5V6A/YUh079ESx9qBMIpHBqomD734abCr7kSG4GtvLVb+vB/IqOmCQ8njAHO4LNoi+QgySHyFo9MNNMuBcFfXs3TenxNw5fM0zsMnFCs8DnKjOUx7F5b6Gh5cQg8Qi0ZUCC1uVfP6xpxLKBlUXngWS9jQ4KjdlLr3JJqgp9/WDUQwSi+QvkiMoH3wh/3Ann4mjCNmPssVXUb4WnJ088orJAc+gICYL566dzs0dCxirCsMtNoW/XZDvQ+bSPYUJx66UV8YNf/WI7VfVMcHOTn60QEz+QoLeK+bzhZ5K6OgFLULjg2mi8/PJbYOcJSHVTdPsu667LyT5EiwSn1T2NhqQgKkip85q6gi+VsLeMyZS5NXH2wPIeW1YPhyWDq7xbGl8ITrw5LwmLCcsyn8T0kelyFF0LMGSgmi8DbfNiH4l8Sno23Y5duj+V/ixw1NGbp+FPpqXBS0yK2iRWSEqujpCi5cuOgOClMIi61SUKzn5UbxcyB/V0e7q8tLFUuIYBgpfKpEi7Xfrl+DS4bTvwHRBQ1YE42XRtbkT9DATGcUzZ0Bxx6OPkKygRWYFLTIraJFZQYvMClpkVtAis4IWmRX+62qdjCO0nrl6N6s6JzPXSqa9ejfrJy/zu2t6q3cT1TmZuUWmr3oXXZ3TZJVfEvqROodtwnsAAAAASUVORK5CYII="
          />
        </button>
        <div
          id="tooltip-casino"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip"
        >
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          v-if="isAuthenticated"
          @click="$router.push('/home/agents')"
          data-tooltip-target="tooltip-sport"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-r-full group"
        >
          <!-- <img :src="`/storage/rox/icons/agent.png`" class="w-[25px]" /> -->
          <!-- <span class="text-[12px]">Agente</span> -->
          <img
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMjSURBVHgB7ZntUdtAEIbftc2PzBgCHcgFxDgVxO4gqQBRAVABdgVABTEdkAogFUQmDTgV4EB+Gl92LWRLQt/odGJGz4zHo8+5V3u3tx9AQ0ODSQg1YaAe9lfonBDUKQ9rH/lxVlBXv2lv6j9ZG4GH6ukX/w3wRhRWZ/f08dI7roXAT+rRboG+oxwWhGXPoYOFHLRQA/grD1EePL3bQ++ggxrCa+k4vJaS6KvHKYGOvOPntUiXWlhQJ43A9472Nbjd39aOZIiK0SqQxVkK7VsWZ8EQWqeoiONNwIJBtAmUzdu0OEGbQI5MTvzHHGNeE7oHM9ql8E/xNWgi1xrsq7+ntB44WTwBJRS6ITxPOCyaR9weiit3xg7RAhWT2YJ99XROaF1sp51E/GTLOhNnkva8Qx/mMEAmga44jKOvkpVVpAlSp2iyOI+NyFHMdM2FZBacPhXOLtqg+fZdCcSI43SEPr92DMUtyYO4Q6ksHd+7o0kQx1bqOve0Z5cl0nEzBwclwGOeeLmgECkwTZx3Ikkkcg9sOVLAFXzTKw88jp+8FX1zaHccfG+IrOKCzwTzsShkv4MBAhYsIk6ItmQ92HxVifoVOg+h66ni/CRZ0rgFl68rWrnECXW05EYgb4jhMErqGofIgXhPNtMX1IiNQHatYqmASLbGdKD+HWV5kZf71SGD8BNwMuxmj8M3ZBFZV3FCQCBvuDd5RdZZnBDp2QacrKqISjM7HZudzvX2vmhxkvupkDdN86K6ehORkYyETmmWTBLHz9vICW9Rt+4eXEjcekgSpEvOisB4kp6IsSQ3OCbufkdW8GVbcZwNKP+1JAsa603EWZIT3/OyLOc+a7A3ISLZklAJX/gt4qKovDcRZ0mhbHFlk7km44rs9NjR/OBv/MdNT+gsqzjxkjBArqraS+Hoa8bb7+BbWwo7FyxyUkZJIw/aSvfsadnCraHvDHvkjs3eFVWisfC7uiyanZc7Dk3IPkRoj0yL1Np8kTU7o27P9cBqBgNU0qN/qZpN465nqekUpWlhv3eaHr0JKutNVIWR3kSVVN6bMIGu3kRDQ4NZ/gNjSoRfxAAztQAAAABJRU5ErkJggg=="
            v-if="path == '/home/agents'"
          />
          <img
            v-else
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANLSURBVHgB7ZldUtpQFIDPCQy2M31gCbiC4ks76EPhUeI4ZQXFFWhXIK7AugLpCrBTgo/qgzI+le7A7sC3AiM5PVeaGCAJSebe3DiT74n8Mflyf8695wDk5OToBCEj9Hq/yqXS+BCBjvi1yhATIhyBPTsz93e63vMGZIRSaXLFX7uTRE6ASFUsGOf9/t3RwnnIAJZ120YwzkECBPQ4nb7dbLW2HsVxJloQCesgCeQesFH4W3eOi5BBaGYfLI+lMAb9uy730S/u80BuN8/MGFRFLvjaUT4G3fhGUOcZoA4po1Tw8nJYIRpf8aiv6ApISrsoEczlNKJMUARv3XICZV0UoXAoItLLCfo+mbw9clYYXpbjmExiCYp1noHILy5ahh4J8GI6hZNWq/awejdVvUeTCXb85FQTuYta1v0xy50CON0OyzxvtDdKcNXrDSvrnvf/COqJJCjkEOxOwOVKVEkdrO2ia+QcHMmGjJYS256BNUy8uzDQfnB/h93oLyfGnr0lJo2l2xO3JCFeg0TGT+9Gzu9AwWA5apjmzqjZ3G7LkjTNWpfbbQQS4I9/4p3MfAXXyTlnwiQhJpPpRoP//4zjywMkgm6eZkaL36/jPbuygIoq52Uw4DhG4XGsada0LNYWWjCJnCCgJTOBKyhW/UnkHLIq6QoWi+Pq4qXocg5ZlHQFDaOwtIzCMlHxPcRAbI/4uU+QIVxB0/wwEq22cBHtbr9/H2kRPN/76d8eLbMYJmZwsHJDBMmsygkWBJv72xe8wYklmWU5gW9ssqwhZ5phZS1ok9He2/voTiKBcmKiWYqL6+JgqrUJsXRa15Jhcs+zaUxU1SYC16JhktbP245MuXltgqogAUQ4Fr3BOQ7dTQRJomEcy5KbP6qxNiEkeUyC35h8+dfkcn6kXpsIaslnJMvJJnJORkiiAZu8Xv3B3+iP2J7YRF+jynnHRZrEyqrt7j6nIz5HuhnhGuglVc8h4JQ3widpJ5+U5UVpBjfc4nXn+H8Grs25FkgTZZnt6dObb8l35/JQJijyIhyTGrollRZfxJhtNmubYgbmhcFv0EAqNfp51gy6QddV1ibyEvZrJ6/R6yC12kRaaKlNpEnqtQkdqKpN5OTk6OUfCvbLB6bD2wEAAAAASUVORK5CYII="
          />
        </button>

        <!-- <button
          v-else
          @click="checkAuthAndRedirect('/home/agents')"
          data-tooltip-target="tooltip-sport"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-r-full group"
        >
          <img :src="`/storage/rox/icons/wallet.png`" class="w-[25px]" />
        </button> -->

        <button
          @click="$router.push('/home/support')"
          data-tooltip-target="tooltip-sport"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-r-full group"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIfSURBVHgB1ZiLccIwDIYVrgNkg3oD2IB0A0agE8AGZAPoBFwn6HUC0gkKE8SdADZQpTq+M8YJsQIJ/e50JLEt/ViJXwkIQMSUfjKyKZkim5CllVl0ZSeyL7IiSZI93BMSlpF9kB1RRkm2IlNwS8jhhGyHt2XdRmjSQtyCfjY1xZqsIPuprhlOqU23IhuDeR3q2r9S6guIhYSlaNLpw+nNybJIf7Maf8wqxpcV9x1wtEHzgYjhtGL4dWkvMvBPy9geaxEjD4ictWm4CohTcAfI79yLdWyMVXV/L+KcmEsv5q6pculVnkAPBF6pLFTJ7+4ceqLK3LGxF73e4+tOX6tAZF7bi2imMJc59AyaoS2cQbrZeoUKBgDPx8fSLSidgi0MBF5+0couBFxmMBB4OczNR3A5kd93zdYALRo0mMWGZcIClfNgX1UaEu1cKxY4dh6cYHgOzvWz34MHGB63k1IWmNYUDoWrQfkCH46Rd6/hwXjy7sc09qzBDD3+FpKHn7euX3k1Sy1qYuhQg1ji9g/nsVYYiUSgSKREHJP8qZTx0na7iCatJQgYgZyYOVv8WnQROI2oq0BIF4Ex46cCIV0E9sK/EKhBho6oK11jahb4CTLeI+pKV0lFaE/ahhIjNlZodmySQ09lHSwjGnGg6BMHNHufGJFL3wGf35VXGu2ww3EImmxdi8HlmW2TBJxwoT0Ut/Aici86CQ0LZf9Zmxi/a/voP9rbf34AAAAASUVORK5CYII="
          />
          <!-- <img :src="`/storage/rox/icons/support.png`" class="w-[25px]" /> -->
          <!-- <span class="text-[12px]">Suporte</span> -->
        </button>
        <div
          id="tooltip-sport"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip"
        >
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          @click="checkAuthAndRedirect('/home/me')"
          data-tooltip-target="tooltip-wallet"
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 group"
        >
          <!-- <img :src="`/storage/rox/icons/profile.png`" class="w-[25px]" /> -->
          <!-- <span class="text-[12px]">Perfil</span> -->
          <img
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPMSURBVHgB7ZrhcdpAEIXfCZjJv5gkBZAOSAXGFSSpwHTguAKbCuxUYLsCkwogFdgdWPkfLJJMZjID0mYXgUc6TpiTTpac8M14jAQ67t2ddveeAHbs2LHjiVEomSYFvQjYV6AuAV3+ws7qPT6+5WMfiL600Bj/UW0fJVCaSBFHoBN+2bO4bNiCOnYt1rnIFxR0ZqAL2InToMsWvIErsU5FLmfvml/uoTg+z+qBC6EeHNGg4JAFjmAQyCM5Jl6G3Om3IVQ7VK+U/FcsQs7z+7eGJmVFjGRloA60KOg26J70vybdj7BlJ2UV8DV3hnbuKhcqHTB1rkmTU+SArzs3CB2hSho0udA71aLJJxRABkhv0yvYZm6Ws+hkBnVk9rS2A176LgKabUfWZvEOrogHMEi3/72PHBSMrqqnHQ/gCk4dXCV9Tp/0DpGD3HlSImoEukmcmnJqaMMlErX17+A0xAMwhQW5ZzJC2NFOfYVrVFvyp584s9dK1L7bklskJ/Ju+phuUQ5au2EXluQWSdqIskgfpUA/UBBnZV2dKbBcU/cKz6zqoBTUy+RRhIZV0BEKLNf08iTtHnWIdu/j6UR6aOiBZt91RSJpCtq9P1ftMSzJLXIWh/fkqO41EH6AQyJER8lj2bIhB4UCj6EiOYEj4u2V6ifP8S1xhSfHXKCfwQHc1nVpdbEt5v3fz1w15gqPgpP1NoM+KoODjWnTLB2FJXvcFl93ZnQYqmZpfwTroz+5eGFhf7CYG5P9gYL2hzO3Ll5OCyvSxFAMZEk7y6i8mLXfnB5CRD2ug9/DbGH6vOs4QEHHzqklyUI5hZAEng6K40Sg4LR2DVV7uOgY1BAFkNTE7bxDleayLLVfAM9atM+5q6fczNwmprzrEaeAn514V7ZVj7VIjn5H/GWncOOS58XnAR6E6s3lNh/eWqREyTk/AiCtYK4WugzhHT9mh2wlcvkQR3JVBzVDHv9FcYDKFPqoyA0Cp3Ht6o3nYlFYmktWcAxo8goiRH3usqmaGrOJdoC8mBxyThXXlRi9guPHEquHMG4ac8mi/FurjvI57AarvrqdgE5cMwfbTEBmMbCsOXvpD6uPqAscA/T9LOfsI9NHM0XONH9THpSu6s66MId3Ds2dMG0IMkWqNWOK3DvkRYkjemrgZ4Y8nily3TxOW5D1gb4ljzyEa8HHokCn8vJgyewc9H+F/0JkM+sNFe/hHojgSXmXZW/UBtOzkg0z6RXa3VdFaPjhU6bI5e57jGcEV0ADk2Wy8Z6U7cviwtrmyAd8D3Q8V69PsWPH8+YvdbCp3wvW00wAAAAASUVORK5CYII="
            v-if="path == '/home/me'"
          />
          <img
            v-else
            class="tabbar-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARjSURBVHgB7ZpPchpXEMa7Bwmo8iLKDcY3wJtU4SwEG1dZlBJzAtsnkHQCSyewfQLJJ0CJC1BlI7KIlGRj3SCTG5BNAiOYTvcI2/Pmj8S890ZM2fw2MAPzmG/6TXfP9wBYs2bNmnsGoWCGw8sWv2wTYQOIGvze/fgZAV4hgkdEPzkOjJ4+bXpQAIWJFHFE8IqVtJY+CPEUkQ5si7UuksW5LO44l7gYfFIn4MCRLbFWRYbRC6jHw26BOR460LYh1AFLDId/PKcAzlMFIoyApyGf9MOpX/92p9NEecUA2rKfgK5ShnRlPJkZYIiVSP7S/60xA+dDyugjTiwvl4nG8D3PAoeneSQxLTCOqLHI8B4MI6ieHAXBUWf3+0PISf/9xRt0cE/ZyRdrZ6fZBk3Mp2vAGTR+9YkOdAQKnd3H+3zRjtTxoDUYXOyDJkaRXETxr+g+3QjGGQwuz9UMjeOpX3vY7T4aQ07MInkTxSieDYGC3Mt8ySKCaKtanTwDDYxEEqi1kLePwBKSaLgjehvdx8KfgwbaIvv9P5UWTaZTp9M8AatUTpVNbg17vQ+5a7C2SJzPXGUbgl/BMp3Od1I/vc97aOvBg2sXcqItkirYiG4H3GxDEaA67vX1vAE50Y8kJos2FAL9A4ZYa+vKjP50pUTkXCgE/EbZQrq/OunEpqcDlPteWQpSx8U53p/IACpKQiBwtnXS+20kyxTXz93mCHKiLfImvdvpSLJwYJ5o1EEDw44n1pFAos3TJuyLAV4ov0fwDjQwEsnm00lsl3s2uHgNFkCi+DiebkdlJDLsLwNSohkQ7otLAAbw8a94HGXqm/TFxg/Nvd75Vq1aF1fAVQZ24JAvQq4Tk8RVq03Z4aP92FkaPTRbtD8w4e/kcd3EBAsCfI3JUrR6++Mjw/7lC55Sx+m/gqdiIG9uVq6ePAmb7jBq0mzPZrMWf+HHDAvTimNn1ZIc/HzxDCooCcMFc8pnSQo7Pzw+lROTyIEBkszYsny0UnNZplr9pvBvL9wBFwqFxtxReY74sw68Y/GjPEfnFnl29vteMA8OLbnkunhSUpatm0uLlA6Es18Pi2rENZDsPfHrB3c5eEuJzDKQy4As//l+rX2b0I27BskWyPdJgG85c40ms/qVjh+6LGEO2Jg0CLmXjTl2MrNqtQkvMkFms3BnJLn+HccbZYez53/T2ssihWWeT9ayBLCp3Un3fPGOAVuLAT8PZskhN0FayWq1do4QNdOyHfZb62S4UqzirVqg0O22x74/bSefZ/9NXS/JFBmuC8ZarY3NShdKgghNPs9W9tK+mymSruOlgj71nWXB9ydv4tFMW7TNFhkzjzn5WHfITZFoxs1nomQdzxQZN4/lryhQTv6ObhAlO7GlG3Q++N7LhS3WDvqXwlchMrN35Sw1xkhDxO+OB9ziQdkgdTNtrSQzkk5g9nS/KhCT66SZIsM1B01bflVIX51mmdx6T4rXufhPjQflxjP579CaNSXifzzG5qKD09ACAAAAAElFTkSuQmCC"
          />
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip"
        >
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
      path: window.location.pathname,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuth;
    },
  },
  methods: {
    checkAuthAndRedirect(route) {
      if (this.isAuthenticated) {
        this.$router.push(route);
      } else {
        this.$router.push("/");
      }
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 400;
    },
    redirectToLink() {
      window.location.href = "https://t.me/ROX_BR";
    },
    scrollToTop() {
      const topElement = document.getElementById("顶部");
      if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 60px;
  right: 8px;
}
.material-symbols-sharp {
  font-variation-settings: "FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24;
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
  background-image: url("/storage/rox/icon_btm_jr.webp"),
    url("/storage/rox/icon_btm_jr2.webp");
  background-repeat: no-repeat;
  background-size: auto 100%; /* Mantém a proporção das imagens preenchendo a altura do elemento */
  background-position: left center, right center; /* Posiciona a primeira imagem à esquerda e a segunda à direita */
  pointer-events: none; /* Garante que o pseudo-elemento não interfira com a interação dos botões */
  z-index: 9999; /* Coloca o pseudo-elemento atrás do conteúdo */
}
</style>
