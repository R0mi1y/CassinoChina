<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
  <nav
    :style="{ top: navTop }"
    class="fixed top-0 z-50 w-full navtop-color header__rox h-14 flex items-center"
  >
    <div class="px-3 lg:px-5 lg:pl-3 nav-menu flex w-full items-center">
      <div class="flex items-center justify-between w-full">
        <div class="ml-4 flex items-center justify-between" style="">
          <button
            class="mr-5 ml-5 fa-solid items-center text-sm arrow_side_bar"
            @click="toggleMenu"
          >
            <img :src="`/storage/rox/arrow_side_bar.png`" alt="Close Menu" />
          </button>
          <img
            v-show="!widthLessThan450"
            :src="`/storage/rox/logo.png`"
            alt="News"
            class="logo ml-5"
          />
        </div>

        <div v-if="!simple" class="flex items-center justify-end">
          <div v-if="!isAuthenticated" class="flex items-center ml-5 md:mr-10">
            <button @click.prevent="loginToggle" class="sign-in-up btn">
              Autenticar-se
            </button>
            <button
              @click.prevent="registerToggle"
              class="sign-in-up btn in-up-2 mr-2 ml-2"
            >
              Criar conta
            </button>
          </div>

          <div v-if="isAuthenticated" class="min-info">
            <span class="money-data userinfo-item">
              <WalletBalance :icon="true" />
              <MakeDeposit :icon="true" />
            </span>
            <span class="user-line"> </span>
            <button
              type="button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user2"
            >
              <span
                class="user-name userinfo-item el-tooltip__trigger el-tooltip__trigger"
              >
                <img
                  @mousedown.prevent
                  @contextmenu.prevent
                  @dragstart.prevent
                  :src="`/storage/rox/profile_pic_rox.png`"
                  class="user-avatar"
                  alt=""
                />
                <span class="level">{{ truncatedName }}</span>
                <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em">
                  <path
                    fill="currentColor"
                    d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"
                  ></path>
                </svg>
              </span>
            </button>
            <span
              @click="$router.push('/games/search')"
              class="msg-icon el-tooltip__trigger el-tooltip__trigger ml-3"
            >
              <i class="fa-solid fa-magnifying-glass"> </i>
            </span>

            <div
              id="dropdown-user2"
              class="dropdown-user-div-2 hidden"
              style="
                z-index: 2015;
                width: 375px;
                position: absolute;
                inset: 56px auto auto 1148px;
              "
            >
              <div class="content" style="--3e1a5ab8: #03ffee">
                <header>
                  <div class="card">
                    <div class="flex">
                      <div class="avatar">
                        <span class="el-avatar el-avatar--circle">
                          <img
                            :src="`/storage/rox/profile_pic_rox.png`"
                            style="object-fit: cover"
                          />
                        </span>
                      </div>
                      <div>
                        <h2 class="flex items-center justify-between">{{ truncatedName }} <i class="icon-copy" @click="copyToClipboard(truncatedName)"></i></h2>
                        <div class="phone">
                          <div>
                            <span class="img"> </span>
                            <span>Vinculado</span>
                          </div>
                          <div>
                            <span>{{ userData?.phone }}</span>
                          </div>
                        </div>
                        <div class="icons flex items-center justify-left">
                          <div class="flex items-center mr-4">
                            <img
                              class="vip"
                              :src="`/storage/rox/vip_light_icon0.png`"
                            />
                            <span class="level">ID: {{ userData?.id }}</span>
                          </div>
                          <i class="icon-copy" @click="copyToClipboard(userData?.id)"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="info_wrap"></div>
                </header>
                <div class="list-wrap">
                  <div class="el-collapse list">
                    <RouterLink
                      :to="{ name: 'profileWithdraw' }">
                      <div class="el-collapse-item list-item">
                        <div>
                          <div class="el-collapse-item__header">
                            <div class="title-profile-option">Saque</div>
                            <i class="el-icon el-collapse-item__arrow">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024"
                              >
                                <path
                                  fill="currentColor"
                                  d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                                ></path>
                              </svg>
                            </i>
                          </div>
                        </div>
                        <div
                          class="el-collapse-item__wrap"
                          style="display: none"
                        >
                          <div class="el-collapse-item__content">
                            <div class="content" style="display: none">
                              <i> </i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RouterLink>
                    
                    <RouterLink
                      :to="{ name: 'profileAffiliate' }"
                    >
                      <div class="el-collapse-item list-item">
                        <div>
                          <div
                            class="el-collapse-item__header"
                            role="button"
                            tabindex="0"
                          >
                            <div class="title-profile-option">Relatório</div>
                            <i class="el-icon el-collapse-item__arrow">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024"
                              >
                                <path
                                  fill="currentColor"
                                  d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                                ></path>
                              </svg>
                            </i>
                          </div>
                        </div>
                        <div
                          id="el-collapse-content-496"
                          class="el-collapse-item__wrap"
                          role="tabpanel"
                          aria-hidden="true"
                          aria-labelledby="el-collapse-head-496"
                          style="display: none"
                        >
                          <div class="el-collapse-item__content">
                            <div class="content" style="display: none">
                              <i> </i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RouterLink>
                    
                    <RouterLink
                      :to="{ name: 'profile' }">
                      <div class="el-collapse-item list-item">
                        <div>
                          <div
                            class="el-collapse-item__header"
                          >
                            <div class="title-profile-option">Histórico de retiradas</div>
                            <i class="el-icon el-collapse-item__arrow">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024"
                              >
                                <path
                                  fill="currentColor"
                                  d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                                ></path>
                              </svg>
                            </i>
                          </div>
                        </div>
                      </div>
                    </RouterLink>
                  </div>
                  <div class="el-overlay" style="z-index: 2014; display: none">
                    <div
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="el-id-3966-21"
                      aria-describedby="el-id-3966-22"
                      class="el-overlay-dialog"
                      style="display: flex"
                    ></div>
                  </div>
                </div>
                <footer>
                  <div @click.prevent="logoutAccount">Sair</div>
                </footer>
              </div>
              <span class="el-popper__arrow" style="position: absolute; left: 253.6px">
              </span>
            </div>



            <div
              class="z-50 hidden my-6 text-base list-none dropdown-user-div"
              id="dropdown-user222"
            >
              <div class="px-8 py-6" role="none">
                <div class="w-full flex items-center justify-between py-6">
                  <RouterLink
                    :to="{ name: 'profileWithdraw' }"
                    active-class="profile-menu-active"
                    class="block text-sm w-full"
                  >
                    <div
                      class="rounded-[15px] py-5"
                      style="
                        width: 33%;
                        min-width: 95px;
                        background-color: var(--ci-secundary-color);
                        text-align: center;
                      "
                    >
                      <p class="w-full">Saque</p>
                    </div>
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'profileAffiliate' }"
                    active-class="profile-menu-active"
                    class="block text-sm w-full"
                  >
                    <div
                      class="rounded-[15px] py-5"
                      style="
                        width: 33%;
                        min-width: 95px;
                        background-color: var(--ci-secundary-color);
                        text-align: center;
                      "
                    >
                      <p class="w-full">Relatório</p>
                    </div>
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'profile' }"
                    active-class="profile-menu-active"
                    class="block text-sm w-full"
                  >
                    <div
                      class="rounded-[15px] py-5"
                      style="
                        width: 33%;
                        min-width: 95px;
                        background-color: var(--ci-secundary-color);
                        text-align: center;
                      "
                    >
                      <p class="w-full">Perfil</p>
                    </div>
                  </RouterLink>
                </div>
              </div>
              <ul
                class="py-1 w-full"
                role="none"
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: right;
                "
              >
                <li
                  class="w-full"
                  style="
                    width: 100%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: right;
                    padding: 2rem;
                    text-align: right;
                  "
                >
                  <a
                    @click.prevent="logoutAccount"
                    href="#"
                    class="text-md self-end"
                    role="menuitem"
                  >
                    <span class="w-8 h-8 mr-3">
                      <i class="fa-duotone fa-right-from-bracket"> </i>
                    </span>
                    Sair
                  </a>
                </li>
              </ul>
            </div>
            
            
            
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="showSearchMenu"
        class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      >
        <div
          @click="toggleSearch"
          class="absolute inset-0 carousel_banners opacity-50 cursor-pointer"
        ></div>

        <!-- Start searchbar action -->
        <div class="search-menu p-4 sm:ml-64">
          <div class="mb-5 w-full">
            <div class="md:w-4/6 2xl:w-4/6 mx-auto">
              <div class="flex flex-col">
                <div class="relative w-full">
                  <input
                    type="search"
                    v-model.lazy="searchTerm"
                    class="block dark:focus:border-green-500 p-2.5 w-full z-20 text-sm text-gray-900 input-color-primary rounded-e-lg border-none focus:outline-none dark:border-s-gray-800 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Busque por jogos ou provedores"
                    required
                  />

                  <button
                    v-if="searchTerm.length > 0"
                    @click.prevent="clearData"
                    type="button"
                    class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white rounded-e-lg dark:bg-[#1C1E22]"
                  >
                    <span class="">Recusar</span>
                  </button>
                </div>
                <div class="text-center mt-4">
                  <p>A pesquisa requer pelo menos 3 caracteres</p>
                </div>
              </div>

              <div
                v-if="!isLoadingSearch"
                class="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 py-5"
              >
                <CassinoGameCard
                  v-if="games"
                  v-for="(game, index) in games?.data"
                  :index="index"
                  :title="game.game_name"
                  :cover="game.cover"
                  :gamecode="game.game_code"
                  :type="game.distribution"
                  :game="game"
                />
              </div>
              <div
                v-else
                class="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20"
                >
                  Noteworthy technology acquisitions 2021
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 opacity-20">
                  Here are the biggest enterprise technology acquisitions of 2021 so far,
                  in reverse chronological order.
                </p>
                <div
                  role="status"
                  class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>

  <div
    id="modalElAuth"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-[calc(100%-1rem)] max-h-full ml-2 mr-2"
  >
    <div v-if="true" class="el-dialog-div bg-[var(--background-base)]" tabindex="-1">
      <p
        class="roxLoginButtonMobile block"
        @click.prevent="loginToggle"
        style="color: white; font-weight: 400; font-size: 1.6rem"
      >
        <i class="fa-thin fa-circle-xmark"> </i>
      </p>
      <header class="el-dialog__header">
        <span class="el-dialog__title"> </span>
      </header>
      <div class="el-dialog__body">
        <i class="close-icon"> </i>
        <img class="bg" src="https://pixrico.com/public/png/bg-dfc0da3a.png" alt="" />
        <div class="tab-content">
          <div class="tab active">Autenticar-se</div>
          <div @click.prevent="hideLoginShowRegisterToggle" class="tab">Criar conta</div>
        </div>
        <div class="content-wrap">
          <div>
            <form class="el-form" @submit.prevent="loginSubmit">
              <div class="el-form-item is-success is-required asterisk-left">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        required
                        type="text"
                        v-model="loginForm.phone"
                        autocomplete="phone"
                        name="phone"
                        v-maska
                        data-maska="[
                          '(##) ####-####',
                          '(##) #####-####'
                        ]"
                        class="el-input__inner"
                        placeholder="Por favor, insira Número do Celular"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="el-form-item is-success is-required asterisk-left">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        class="el-input__inner"
                        required
                        :type="typeInputPassword"
                        v-model="loginForm.password"
                        name="password"
                        autocomplete="current-password"
                        placeholder="Digite sua senha de acesso"
                      />
                      <button
                        type="button"
                        @click.prevent="togglePassword"
                        class="absolute inset-y-0 right-0 flex items-center pr-3.5"
                      >
                        <i
                          v-if="typeInputPassword === 'password'"
                          class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                        <i
                          v-if="typeInputPassword === 'text'"
                          class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#topo" class="forget">
                <span>Esqueceu a senha ?</span>
              </a>
              <button
                class="el-button el-button--primary el-button--large submit-button my-btn submit-button"
                aria-disabled="false"
                type="submit"
                style=""
              >
                <span class="">Autenticar-se</span>
              </button>
              <p class="to-sign">
                não tenho conta,
                <span @click.prevent="hideLoginShowRegisterToggle">Criar conta</span>
                <i>&gt;&gt;</i>
              </p>
            </form>
            <div class="el-overlay" style="z-index: 2016; display: none">
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Esqueceu sua senha"
                aria-describedby="el-id-8026-33"
                class="el-overlay-dialog"
                style="display: flex"
              ></div>
            </div>
          </div>
          <!---->
        </div>
        <div class="easy-login">
          <!---->
          <!---->
        </div>
      </div>
      <!--v-if-->
    </div>

    <!-- <div
      v-if="false"
      class="relative w-full max-w-3xl max-h-full bg-[var(--background-base)] rounded-lg shadow-lg border border-[var(--ci-secundary-color)]"
    >
      <div class="flex md:justify-between">
        <div class="w-full relative p-5">
          <form @submit.prevent="loginSubmit" method="post" action="" class="">
            <div class="flex justify-between items-center mb-3">
              <h5
                @click.prevent="hideLoginShowRegisterToggle"
                class="text-sm w-full text-center flex justify-center items-center gap-1 border-b-2 border-transparent pb-2"
              >
                <i class="fa-solid fa-user-plus trasform scale-60 mr-1 text-sm">
                </i>
                <p>Inscrever-se</p>
              </h5>

              <h5
                class="text-sm w-full text-center flex justify-center items-center gap-1 text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)] pb-2"
              >
                <i
                  class="fa-solid fa-right-to-bracket trasform scale-60 mr-1 text-sm"
                >
                </i>
                <p>Acesso de membro</p>
              </h5>
            </div>

            <p class="text-xs text-white">Suporte Número do Celular/Login</p>
            <div
              class="relative mb-3 rounded-lg hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-solid fa-mobile-screen-button text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                required
                type="text"
                v-model="loginForm.phone"
                autocomplete="phone"
                name="phone"
                v-maska
                data-maska="[
                                            '(##) ####-####',
                                            '(##) #####-####'
                                          ]"
                class="input2 rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Por favor, insira Número do Celular"
              />
            </div>
            <p class="text-xs text-[var(--sub-text-color)]">
              <i class="fa-duotone fa-lock">
              </i> Senha do Login
            </p>
            <div
              class="relative mb-3 rounded-lg hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                required
                :type="typeInputPassword"
                v-model="loginForm.password"
                name="password"
                autocomplete="current-password"
                class="input2 pr-[40px] rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Senha"
              />
              <button
                type="button"
                @click.prevent="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5"
              >
                <i
                  v-if="typeInputPassword === 'password'"
                  class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                >
                </i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </button>
            </div>

            <p class="text-xs text-white">
              <input
                type="checkbox"
                value="true"
                class="text-green-500 mr-2"
                checked
              />Lembre-se da senha da conta
            </p>

            <div class="mt-3 w-full rounded-lg">
              <button type="submit" class="ui-button-form rounded-lg w-full mb-3">
                Login
              </button>
            </div>

            <div class="flex w-full justify-between items-center">
              <a href="/home/support" class="text-[var(--sub-text-color)] text-xs"
                >Suporte ao cliente</a
              >
              <a href="#" class="text-[var(--sub-text-color)] text-xs">Jogar Grátis</a>
              <a href="#topo" class="text-[var(--sub-text-color)] text-xs"
                >Esqueceu a Senha</a
              >
            </div>

            <div class="w-full flex flex-col gap-2 items-center justify-center mt-3">
              <div class="flex items-center w-full">
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]">
                </div>
                <p class="mx-2 text-xs text-white">Login Rápido</p>
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]">
                </div>
              </div>
              <div class="flex row gap-2 justify-center items-center">
                <img
                  class="w-[30px] rounded-[50%]"
                  :src="`/storage/rox/google-icon.png`"
                  alt="Login com o Google"
                />
                <img
                  class="w-[30px] rounded-[50%]"
                  :src="`/storage/rox/facebook-icon.png`"
                  alt="Login com o Facebook"
                />
              </div>
            </div>

            <p
              class="roxLoginButtonMobile block md:hidden"
              @click.prevent="loginToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark">
              </i>
            </p>

            <p
              class="roxLoginButton hidden md:block"
              @click.prevent="loginToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark">
              </i>
            </p>
          </form>
        </div>
      </div>
    </div> -->
  </div>

  <div
    id="modalElRegister"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-[calc(100%-1rem)] max-h-full mr-2 ml-2"
  >
    <div v-if="true" class="el-dialog-div bg-[var(--background-base)]" tabindex="-1">
      <p
        class="roxLoginButtonMobile block"
        @click.prevent="registerToggle"
        style="color: white; font-weight: 400; font-size: 1.6rem"
      >
        <i class="fa-thin fa-circle-xmark"> </i>
      </p>
      <header class="el-dialog__header">
        <span class="el-dialog__title"> </span>
      </header>
      <div class="el-dialog__body">
        <i class="close-icon"> </i>
        <img class="bg" src="https://pixrico.com/public/png/bg-dfc0da3a.png" alt="" />
        <div class="tab-content">
          <div @click.prevent="hideLoginShowRegisterToggle" class="tab">
            Autenticar-se
          </div>
          <div class="tab active">Criar conta</div>
        </div>
        <div class="content-wrap">
          <div>
            <form
              class="el-form"
              @submit.prevent="registerSubmit"
              method="post"
              action=""
            >
              <input type="hidden" v-model="registerForm.email" value="" />
              <input type="hidden" v-model="registerForm.agreement" value="true" />
              <div class="el-form-item is-success is-required asterisk-left">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        required
                        type="text"
                        v-model="registerForm.phone"
                        @input="updateEmail"
                        autocomplete="phone"
                        name="phone"
                        v-maska
                        data-maska="[
                          '(##) ####-####',
                          '(##) #####-####'
                        ]"
                        class="el-input__inner"
                        placeholder="Por favor, insira Número do Celular"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="el-form-item is-success is-required asterisk-left">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        required
                        type="text"
                        name="name"
                        v-model="registerForm.name"
                        autocomplete="username"
                        class="el-input__inner"
                        placeholder="Digite seu nome/usuário"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="el-form-item is-success is-required asterisk-left">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        class="el-input__inner"
                        required
                        :type="typeInputPassword"
                        name="password"
                        autocomplete="current-password"
                        v-model="password"
                        @input="evaluatePasswordStrength"
                        placeholder="Digite sua senha de acesso"
                      />
                      <button
                        type="button"
                        @click.prevent="togglePassword"
                        class="absolute inset-y-0 right-0 flex items-center pr-3.5"
                      >
                        <i
                          v-if="typeInputPassword === 'password'"
                          class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                        <i
                          v-if="typeInputPassword === 'text'"
                          class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="strength flex gap-2 items-center">
                <p class="text-xs text-white">Força</p>
                <div>
                  <span
                    v-for="(spanClass, index) in spanClasses"
                    :key="index"
                    :class="spanClass"
                    class="strength-bar"
                  >
                  </span>
                </div>
              </div>

              <div class="el-form-item">
                <div class="el-form-item__content">
                  <div class="el-input el-input--suffix">
                    <div class="el-input__wrapper">
                      <input
                        :type="typeInputPassword"
                        name="password_confirmation"
                        autocomplete="current-password"
                        v-model="registerForm.password_confirmation"
                        class="el-input__inner"
                        required
                        placeholder="Confirme a senha novamente, o mesmo que a senha"
                      />
                      <button
                        type="button"
                        @click.prevent="togglePassword"
                        class="absolute inset-y-0 right-0 flex items-center pr-3.5"
                      >
                        <i
                          v-if="typeInputPassword === 'password'"
                          class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                        <i
                          v-if="typeInputPassword === 'text'"
                          class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                        >
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3 mt-4">
                <div class="flex">
                  <input
                    id="link-checkbox"
                    v-model="registerForm.term_a"
                    name="term_a"
                    required
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-200 dark:border-gray-100"
                  />
                  <label
                    for="link-checkbox"
                    class="ml-2 text-xs text-gray-900 dark:text-gray-300"
                    >Tenho mais de 18 anos, li e aceito o<span
                      class="text-[var(--sub-text-color)]"
                      >⟪Acordo de Usuário⟫</span
                    >
                  </label>
                </div>
              </div>

              <a href="#topo" class="forget">
                <span>Esqueceu a senha ?</span>
              </a>
              <button class="el-button" aria-disabled="false" type="submit" style="">
                <span class="">Registro</span>
              </button>
            </form>
            <div class="el-overlay" style="z-index: 2016; display: none">
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Esqueceu sua senha"
                aria-describedby="el-id-8026-33"
                class="el-overlay-dialog"
                style="display: flex"
              ></div>
            </div>
          </div>
        </div>
        <div class="easy-login"></div>
      </div>
    </div>

    <!-- <div
      v-if="false"
      class="relative w-full max-w-3xl max-h-full bg-[var(--background-base)] rounded-lg shadow-lg border border-[var(--ci-secundary-color)]"
    >
      <div class="flex md:justify-between h-full">
        <div class="w-full relative p-5 m-auto">
          <form @submit.prevent="registerSubmit" method="post" action="" class="">
            <div class="flex justify-between items-center mb-3">
              <h5
                class="text-sm w-full text-center flex justify-center items-center gap-1 text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)] pb-2"
              >
                <i class="fa-solid fa-user-plus trasform scale-60 mr-1 text-sm">
                </i>
                <p>Inscrever-se</p>
              </h5>

              <h5
                @click.prevent="hideLoginShowRegisterToggle"
                class="text-sm w-full text-center flex justify-center items-center gap-1 border-b-2 border-transparent pb-2"
              >
                <i
                  class="fa-solid fa-right-to-bracket trasform scale-60 mr-1 text-sm"
                >
                </i>
                <p>Acesso de membro</p>
              </h5>
            </div>

            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-user text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                type="text"
                name="name"
                v-model="registerForm.name"
                autocomplete="username"
                class="input2 rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Digite seu nome/usuário"
                required
              />
            </div>

            <p class="text-xs text-white">Suporte Número do Celular/ContaRegistro</p>
            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-solid fa-mobile-screen-button text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                type="text"
                name="phone"
                v-maska
                data-maska="[
                                    '(##) ####-####',
                                    '(##) #####-####'
                                  ]"
                v-model="registerForm.phone"
                @input="updateEmail"
                autocomplete="phone"
                class="input2 rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Por favor, insira Número do Celular"
                required
              />
            </div>

            <input type="hidden" v-model="registerForm.email" value="" />
            <input type="hidden" v-model="registerForm.agreement" value="true" />
            <p class="text-xs text-[var(--sub-text-color)]">
              <i class="fa-duotone fa-lock">
              </i> Cadastro de senha
            </p>
            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                :type="typeInputPassword"
                name="password"
                autocomplete="current-password"
                v-model="password"
                @input="evaluatePasswordStrength"
                class="input2 pr-[40px] rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Senha"
                required
              />
              <button
                type="button"
                @click.prevent="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5"
              >
                <i
                  v-if="typeInputPassword === 'password'"
                  class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                >
                </i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </button>
            </div>

            <div class="strength flex gap-2 items-center">
              <p class="text-xs text-white">Força</p>
              <div>
                <span
                  v-for="(spanClass, index) in spanClasses"
                  :key="index"
                  :class="spanClass"
                  class="strength-bar"
                >
                </span>
              </div>
            </div>

            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </div>
              <input
                :type="typeInputPassword"
                name="password_confirmation"
                autocomplete="current-password"
                v-model="registerForm.password_confirmation"
                class="input2 pr-[40px] rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                style="
                  background: transparent;
                  color: var(--ci-gray-dark);
                  border: 1px solid var(--ci-secundary-color);
                  padding-left: 2.5rem;
                "
                placeholder="Confirme a senha novamente, o mesmo que a senha"
                required
              />
              <button
                type="button"
                @click.prevent="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5"
              >
                <i
                  v-if="typeInputPassword === 'password'"
                  class="fa-regular fa-eye text-[var(--ci-primary-opacity-color)]"
                >
                </i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                >
                </i>
              </button>
            </div>

            <div class="mb-3 mt-4">
              <div class="flex">
                <input
                  id="link-checkbox"
                  v-model="registerForm.term_a"
                  name="term_a"
                  required
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-200 dark:border-gray-100"
                />
                <label
                  for="link-checkbox"
                  class="ml-2 text-xs text-gray-900 dark:text-gray-300"
                  >Tenho mais de 18 anos, li e aceito o<span
                    class="text-[var(--sub-text-color)]"
                    >⟪Acordo de Usuário⟫</span
                  >
                  </label
                >
              </div>
            </div>

            <div class="mt-3 w-full rounded-lg">
              <button type="submit" class="ui-button-form rounded w-full mb-3">
                Registro
              </button>
            </div>

            <div class="flex w-full justify-between items-center">
              <a href="/home/support" class="text-[var(--sub-text-color)] text-xs"
                >Suporte ao cliente</a
              >
              <a href="#" class="text-[var(--sub-text-color)] text-xs">Jogar Grátis</a>
            </div>

            <div class="w-full flex flex-col gap-2 items-center justify-center mt-3">
              <div class="flex items-center w-full">
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]">
                </div>
                <p class="mx-2 text-xs text-white">Registro vinculativo</p>
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]">
                </div>
              </div>
              <div class="flex row gap-2 justify-center items-center">
                <img
                  class="w-[30px] rounded-[50%]"
                  :src="`/storage/rox/google-icon.png`"
                  alt="Registro com o Google"
                />
                <img
                  class="w-[30px] rounded-[50%]"
                  :src="`/storage/rox/facebook-icon.png`"
                  alt="Registro com o Facebook"
                />
              </div>
            </div>


            <p
              class="roxRegisterButtonMobile block md:hidden"
              @click.prevent="registerToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark">
              </i>
            </p>

            <p
              class="roxRegisterButton hidden md:block"
              @click.prevent="registerToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark">
              </i>
            </p>
          </form>
        </div>
      </div>
    </div> -->
  </div>

  <div
    id="modalProfileEl"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-[calc(100%-1rem)] max-h-full"
  >
    <div
      class="relative w-full max-w-2xl md:max-w-lg max-h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
      <div v-if="!isLoadingProfile" class="flex flex-col">
        <!-- PROFILE HEADER -->
        <div class="flex justify-between w-full p-4">
          <h1 class="text-2xl font-bold">{{ $t("User data") }}</h1>
          <button @click.prevent="profileToggle" type="button" class="text-2xl">
            <i class="fa-solid fa-xmark"> </i>
          </button>
        </div>

        <!-- PROFILE BODY -->
        <div v-if="profileUser != null" class="flex flex-col w-full p-4">
          <!-- PROFILE INFO -->
          <div class="flex items-center self-center justify-between w-full">
            <button @click.prevent="like(profileUser.id)" type="button" class="heart">
              <i class="fa-solid fa-heart"> </i>
              <span class="ml-2">{{ profileUser.totalLikes }}</span>
            </button>
            <div
              class="text-center flex flex-col justify-center self-center items-center"
            >
              <div class="relative">
                <img
                  class="w-24 h-246 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  :src="avatarUrl"
                  alt=""
                />
                <input
                  ref="fileInput"
                  type="file"
                  style="display: none"
                  @change="handleFileChange"
                />
                <button
                  @click="openFileInput"
                  type="button"
                  class="absolute bottom-0 right-0 text-3xl"
                >
                  <i class="fa-duotone fa-image"> </i>
                </button>
              </div>
              <div class="relative">
                <input
                  @change.prevent="updateName"
                  v-model="profileName"
                  type="text"
                  :readonly="!readonly"
                  class="mt-4 appearance-none border border-gray-300 rounded-md p-2 bg-transparent border-none text-center"
                  :placeholder="profileName"
                />
              </div>
            </div>
            <div class="">
              <button
                @click.prevent="readonly = !readonly"
                type="button"
                class="bg-gray-200 hover:bg-gray-400 dark:bg-gray-600 hover:dark:bg-gray-700 w-10 h-10 rounded"
              >
                <i v-if="!readonly" class="fa-sharp fa-light fa-pen"> </i>
                <i v-if="readonly" class="fa-solid fa-xmark"> </i>
              </button>
            </div>
          </div>

          <div class="mt-3 shadow flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div class="flex justify-between px-4 pt-4">
              <h1>
                <span class="mr-2">
                  <i class="fa-solid fa-chart-mixed"> </i>
                </span>
                {{ $t("Statistics") }}
              </h1>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-gray-200 dark:bg-gray-700 text-center p-4">
                  <p class="text-[12px]">
                    {{ $t("Total winnings") }}
                  </p>
                  <p class="text-2xl font-bold">
                    {{ totalEarnings }}
                  </p>
                </div>
                <div class="bg-gray-200 dark:bg-gray-700 text-center p-4">
                  <p class="text-[12px]">
                    {{ $t("Total bets") }}
                  </p>
                  <p class="text-2xl font-bold">
                    {{ totalBets }}
                  </p>
                </div>
                <div class="bg-gray-200 dark:bg-gray-700 text-center p-4">
                  <p class="text-[12px]">
                    {{ $t("Total bet") }}
                  </p>
                  <p class="text-2xl font-bold">
                    {{ sumBets }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="py-3 text-center">
            <p>ingressou em {{ profileUser.dateHumanReadable }}</p>
          </div>
        </div>
      </div>
      <div v-if="isLoadingProfile" class="flex flex-col w-full h-full">
        <div
          role="status"
          class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">{{ $t("Loading") }}...</span>
        </div>
      </div>
    </div>
  </div>

  <div
    id="modalCustom"
    v-if="showCustom"
    tabindex="-1"
    aria-hidden="false"
    class="fixed inset-0 z-999 flex items-center justify-center overflow-x-hidden overflow-y-auto ml-4 mr-4"
    style="z-index: 9999;"
  >
    <div @click.prevent="customToggle" class="w-full h-full bg-[rgba(0,0,0,0.5)] absolute z-1"></div>
    <div class="relative max-w-3xl max-h-full bg-base rounded-lg shadow-lg popup-start z-10">
      <div class="flex md:justify-between">
        <div class="w-full relative p-5" v-html="customContent"></div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <label class="flex items-center justify-center w-full p-2">
          <input
            id="dontShowToday"
            type="checkbox"
            class="mr-2"
            v-model="dontShowToday"
          />
          Não exibir novamente hoje
        </label>
        <p
          class="roxRegisterButtonMobile block md:hidden"
          @click.prevent="customToggle"
          style="color: white; font-weight: 400; font-size: 1.6rem"
        >
          <i class="fa-thin fa-circle-xmark"> </i>
        </p>
        <p
          class="roxRegisterButtonMobile hidden md:block"
          @click.prevent="customToggle"
          style="color: white; font-weight: 400; font-size: 1.6rem"
        >
          <i class="fa-thin fa-circle-xmark"> </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
import SidebarStore from '@/stores/sidebarStore';
import { Modal } from "flowbite";
import { useAuthStore } from "@/Stores/Auth.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

import DropdownDarkLight from "@/Components/UI/DropdownDarkLight.vue";
import LanguageSelector from "@/Components/UI/LanguageSelector.vue";
import WalletBalance from "@/Components/UI/WalletBalance.vue";
import HttpApi from "@/Services/HttpApi.js";
import MakeDeposit from "@/Components/UI/MakeDeposit.vue";
import { useSettingStore } from "@/Stores/SettingStore.js";
import { searchGameStore } from "@/Stores/SearchGameStore.js";
import CassinoGameCard from "@/Pages/Cassino/Components/CassinoGameCard.vue";

export default {
  props: {
    simple: Boolean,
    visible: {
      type: Boolean,
      required: true,
    },
    widthLessThan450: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    CassinoGameCard,
    MakeDeposit,
    WalletBalance,
    LanguageSelector,
    DropdownDarkLight,
    RouterLink,
  },
  data() {
    return {
      password: "",
      barHeight: "28px",
      spanClasses: ["bg-gray-300", "bg-gray-300", "bg-gray-300", "bg-gray-300"],
      customContent: "",
      dontShowToday: false,
      isLoadingLogin: false,
      isLoadingRegister: false,
      isReferral: false,
      modalAuth: null,
      modalCustom: null,
      modalRegister: null,
      modalProfile: null,
      showCustom: null,
      typeInputPassword: "password",
      readonly: false,
      profileUser: null,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        reference_code: "",
        term_a: true,
        agreement: true,
      },
      avatarUrl: "/assets/images/profile.jpg",
      isLoadingProfile: false,
      profileName: "",
      sumBets: 0,
      totalBets: 0,
      totalEarnings: 0,
      showSearchMenu: false,
      games: null,
      searchTerm: "",
      isLoadingSearch: true,
      isMenuOpen: false,
      currentDate: new Date(),
    };
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  computed: {
    navTop() {
      // return this.visible ? `calc(${this.barHeight} + 0px)` : "0px";
    },
    searchGameDataStore() {
      return searchGameStore();
    },
    searchGameMenu() {
      const search = searchGameStore();
      return search.getSearchGameStatus;
    },
    sidebarMenuStore() {
      return sidebarStore();
    },
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuth;
    },
    userData() {
      const authStore = useAuthStore();
      return authStore.user;
    },
    setting() {
      const authStore = useSettingStore();
      return authStore.setting;
    },
    formattedDate() {
      return this.currentDate.toLocaleString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
    formattedUTC() {
      const offset = -3; // UTC -03:00
      const hours = Math.abs(offset).toString().padStart(2, "0");
      const sign = offset < 0 ? "-" : "+";
      return `UTC ${sign}${hours}:00`;
    },
    truncatedName() {
      if (!this.userData || !this.userData.name) return "";
      const name = this.userData.name;
      return name.length > 10 ? name.substr(0, 10) + "..." : name;
    },
  },
  unmounted() {
  },
  mounted() {
    /*
     * $targetEl: required
     * options: optional
     */
    const customData = JSON.parse(localStorage.getItem("customData"));
    if (customData && customData.custom_js) {
      this.customContent = customData.custom_js;
    }

    this.timer = setInterval(this.updateDate, 1000);

    const referralCode = localStorage.getItem("code");
    if (referralCode) {
      this.registerForm.reference_code = referralCode;
    }

    this.modalProfile = new Modal(document.getElementById("modalProfileEl"), {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
      closable: false,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    });

    /*
     * $targetEl: required
     * options: optional
     */
    this.modalAuth = new Modal(document.getElementById("modalElAuth"), {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
      closable: false,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    });

    // Verificar se o modal deve ser mostrado ao montar o componente
    const showModal = localStorage.getItem("showModal");
    const lastShownDate = localStorage.getItem("lastShownDate");
    const today = new Date().toISOString().split("T")[0];

    if (showModal !== "false" && lastShownDate !== today) {
      this.showCustom = true;
    } else {
      this.showCustom = false;
    }

    /*
     * $targetEl: required
     * options: optional
     */
    this.modalRegister = new Modal(document.getElementById("modalElRegister"), {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
      closable: false,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    });

    if (window.location.href.includes("register")) {
      this.registerToggle();
    }
    
    if (this.$route.params.action && this.$route.params.action === 'openlogin' || window.location.href.includes('/home/login')) {
      this.loginToggle();
    }
  },
  methods: {
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Falha ao copiar texto: ', err);
      }
    },
    evaluatePasswordStrength() {
      const password = this.password;
      let strength = 0;

      if (password.length >= 3) strength++;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      this.spanClasses = ["bg-gray-300", "bg-gray-300", "bg-gray-300", "bg-gray-300"];

      if (strength === 1) {
        this.spanClasses[0] = "bg-orange-500";
      } else if (strength === 2) {
        this.spanClasses[0] = "bg-yellow-500";
        this.spanClasses[1] = "bg-yellow-500";
      } else if (strength === 3) {
        this.spanClasses[0] = "bg-green-500";
        this.spanClasses[1] = "bg-green-500";
        this.spanClasses[2] = "bg-green-500";
      } else if (strength > 3) {
        for (let i = 0; i < strength; i++) {
          this.spanClasses[i] = "bg-green-500";
        }
      }
    },
    fetchReferCode() {
      const code = this.route.query.code; // para query params
      // const code = this.route.params.code; // se você estiver usando params
      if (code) {
        this.refer_code = code;
        localStorage.setItem("code", code); // Salva o valor no localStorage
      }
    },
    updateEmail() {
      this.registerForm.email = `${this.registerForm.phone.replace(/\D/g, "")}@gmail.com`;
    },
    toggleSearch: function () {
      this.searchGameDataStore.setSearchGameToogle();
    },
    redirectSocialTo: function () {
      return "/auth/redirect/google";
    },
    like: async function (id) {
      const _this = this;
      const _toast = useToast();
      await HttpApi.post("/profile/like/" + id, {})
        .then((response) => {
          _this.getProfile();
          _toast.success(_this.$t(response.data.message));
        })
        .catch((error) => {
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              _toast.error(`${value}`);
            }
          );
        });
    },
    updateName: async function (event) {
      const _this = this;
      _this.isLoadingProfile = true;

      await HttpApi.post("/profile/updateName", {
        name: _this.profileName,
      })
        .then((response) => {
          _this.isLoadingProfile = false;
        })
        .catch((error) => {
          const _this = this;
          Object.entries(
            JSON.parse(error.request.responseText)
          ).forEach(([key, value]) => {});
          _this.isLoadingProfile = false;
        });
    },
    togglePassword: function () {
      if (this.typeInputPassword === "password") {
        this.typeInputPassword = "text";
      } else {
        this.typeInputPassword = "password";
      }
    },
    loginSubmit: function (event) {
      const _this = this;
      const _toast = useToast();
      _this.isLoadingLogin = true;
      const authStore = useAuthStore();

      _this.loginForm.email = `${_this.loginForm.phone.replace(/[^0-9]/g, "")}@gmail.com`;

      HttpApi.post("auth/login", _this.loginForm)
        .then(async (response) => {
          await new Promise((r) => {
            setTimeout(() => {
              authStore.setToken(response.data.access_token);
              authStore.setUser(response.data.user);
              authStore.setIsAuth(true);

              _this.loginForm = {
                email: "",
                password: "",
              };

              _this.modalAuth.toggle();
              // _toast.success(
              //     _this.$t(
              //         "You have been authenticated, welcome!"
              //     )
              // );

              _this.isLoadingLogin = false;
            }, 1000);
          });
        })
        .catch((error) => {
          const _this = this;
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              _toast.error(`${value}`);
            }
          );
          _this.isLoadingLogin = false;
        });
    },
    registerSubmit: async function (event) {
      const _this = this;
      const _toast = useToast();
      _this.isLoadingRegister = true;

      const code = localStorage.getItem("code");
      if (code) {
        _this.registerForm.reference_code = code;
      }

      const authStore = useAuthStore();
      await HttpApi.post("auth/register", _this.registerForm)
        .then((response) => {
          if (response.data.access_token !== undefined) {
            authStore.setToken(response.data.access_token);
            authStore.setUser(response.data.user);
            authStore.setIsAuth(true);

            _this.registerForm = {
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
              reference_code: "",
              term_a: false,
              agreement: false,
            };

            _this.modalRegister.toggle();
            _this.router.push("/home/game");
            // _toast.success(
            //     _this.$t(
            //         "Your account has been created successfully"
            //     )
            // );
          }

          _this.isLoadingRegister = false;
        })
        .catch((error) => {
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              _toast.error(`${value}`);
            }
          );
          _this.isLoadingRegister = false;
        });
    },
    logoutAccount: function () {
      const authStore = useAuthStore();
      const _toast = useToast();

      HttpApi.post("auth/logout", {})
        .then((response) => {
          authStore.logout();
          this.router.push("/home/game");

          // _toast.success(
          //     this.$t("You have been successfully disconnected")
          // );
        })
        .catch((error) => {
          Object.entries(JSON.parse(error.request.responseText)).forEach(
            ([key, value]) => {
              // console.log(value);
              //_toast.error(`${value}`);
            }
          );
        });
    },
    hideLoginShowRegisterToggle: function () {
      this.showCustom = false;
      this.modalAuth.toggle();
      this.modalRegister.toggle();
    },
    toggleMenu() {
      this.sidebarMenuStore.setSidebarToogle();
      this.$emit("update:visible", !this.visible);
    },
    loginToggle: function () {
      this.showCustom = false;
      this.modalAuth.toggle();
    },
    registerToggle: function () {
      this.showCustom = false;
      this.modalRegister.toggle();
    },
    customToggle() {
      this.showCustom = false;

      if (this.dontShowToday) {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("showModal", "false");
        localStorage.setItem("lastShownDate", today);
      }
    },
    profileToggle: function () {
      this.modalProfile.toggle();
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    updateDate() {
      this.currentDate = new Date();
    },
    mounted() {
      this.timer = setInterval(this.updateDate, 1000);
    },

    beforeDestroy() {
      clearInterval(this.timer);
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);

      await HttpApi.post("/profile/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          // console.log("Avatar atualizado com sucesso", response.data);
        })
        .catch((error) => {
          console.error("Erro ao atualizar avatar", error);
        });
    },
    getProfile: async function () {
      const _this = this;
      _this.isLoadingProfile = true;

      await HttpApi.get("/profile/")
        .then((response) => {
          _this.sumBets = response.data.sumBets;
          _this.totalBets = response.data.totalBets;
          _this.totalEarnings = response.data.totalEarnings;

          const user = response.data.user;

          if (user?.avatar != null) {
            _this.avatarUrl = "/storage/" + user.avatar;
          }

          _this.profileName = user.name;
          _this.profileUser = user;
          _this.isLoadingProfile = false;
        })
        .catch((error) => {
          const _this = this;
          Object.entries(
            JSON.parse(error.request.responseText)
          ).forEach(([key, value]) => {});
          _this.isLoadingProfile = false;
        });
    },
    getSearch: async function () {
      const _this = this;

      await HttpApi.get("/search/games?searchTerm=" + this.searchTerm)
        .then((response) => {
          _this.games = response.data.games;
          _this.isLoadingSearch = false;
        })
        .catch((error) => {
          const _this = this;
          Object.entries(
            JSON.parse(error.request.responseText)
          ).forEach(([key, value]) => {});
          _this.isLoadingSearch = false;
        });
    },
    clearData: async function () {
      this.searchTerm = "";
      await this.getSearch();
    },
  },
  async created() {
    if (this.isAuthenticated) {
      await this.getProfile();
    }
  },
  watch: {
    visible(newVal) {},
    searchTerm(newValue, oldValue) {
      this.getSearch();
    },
    async searchGameMenu(newValue, oldValue) {
      await this.getSearch();
      this.showSearchMenu = !this.showSearchMenu;
    },
    password(newVal) {
      this.registerForm.password = newVal; // Atualiza o valor no registerForm
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

.header__rox {
  background-color: var(--navtop-color);
  background-image: url("/storage/rox/2-0-80.png");
  background-repeat: repeat;
  background-size: auto;

  z-index: 100;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.material-symbols-outlined {
  transition: transform 0.3s ease;
}

.flipped {
  transform: scaleX(-1);
}

.roxRegisterButton {
  position: absolute;
  top: -50px;
  right: 0;
}

.roxRegisterButtonMobile {
  position: absolute;
  bottom: -50px;
  right: 50%;
  transform: translateX(50%);
}

.roxLoginButton {
  position: absolute;
  top: -50px;
  right: 0;
}

.roxLoginButtonMobile {
  position: absolute;
  bottom: -50px;
  right: 50%;
  transform: translateX(50%);
}

.strength div > span {
  display: inline-block;
  width: 35px;
  height: 6px;
  margin-right: 5px;
  margin-bottom: 2px;
}

.fixed-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 10000;
  padding: 3px;
}

@media screen and (max-width: 480px) {
  .header__rox::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("/storage/rox/h5_zs_jr.png"), url("/storage/rox/h5_zs_jr2.webp");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: left center, right center;
    pointer-events: none;
    z-index: 9999;
  }
}

.arrow_side_bar {
  width: 35px;
  /* margin-right: 20px; */
  transform: scaleX(-1);
}

.logo {
  height: 36px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in-up {
  color: #03ffee;
  padding: 0 8px;
  height: 28px;
  border: 0.5px solid #03ffee;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

.in-up-2 {
  margin-left: 8px;
  background: #03ffee;
  color: #000;
}

.el-dialog__header {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  user-select: none;
  text-align: center;
  color: #b6b5c7;
  box-sizing: border-box;
  margin-right: 16px;
  padding-top: 12px;
  padding-bottom: 24px;
  display: none;
}

.el-dialog__title {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: center;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #b6b5c7;
}

.el-dialog__body {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  box-sizing: border-box;
  text-align: initial;
  padding: 0;
  max-height: 80vh;
  overflow-y: overlay;
}

.tab-content {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: initial;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 327px;
  padding: 4px;
  height: 40px;
  margin: 28px auto 20px;
  background: #201d2e;
  border-radius: 8px;
}

.tab {
  cursor: pointer;
  width: 50%;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: #555467;
  transition: all 0.3s linear;
}

.active {
  background: #2d2941;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #b6b5c7;
}

.el-dialog-div {
  width: 380px;
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  user-select: none;
  position: relative;
  border-radius: 30px;
  box-sizing: border-box;
  text-align: center;
  margin: auto;
  color: #b6b5c7;
  padding: 0 !important;
}

.content-wrap {
  padding: 0 32px 24px;
}

.el-form {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: initial;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.el-form-item {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: initial;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 12px;
}

.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: 14px;
  min-width: 0;
}

.el-input {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: initial;
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  vertical-align: middle;
  width: 100%;
  height: 49px;
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.el-input__wrapper {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  text-align: initial;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  box-sizing: border-box;
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-image: none;
  transform: translateZ(0);
  background-color: #201d2e;
  padding: 1px 16px;
  box-shadow: none;
}

.el-input__inner {
  color-scheme: light;
  user-select: none;
  margin: 0;
  font-weight: inherit;
  font-style: inherit;
  width: 100%;
  flex-grow: 1;
  font-size: inherit;
  padding: 0;
  outline: 0;
  border: none;
  background: 0 0;
  box-sizing: border-box;
}

.forget {
  font-size: 14px;
  text-align: center;
  color: #03ffee;
  margin-bottom: 12px;
  cursor: pointer;
}

.el-button {
  margin: 0;
  font-style: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  transition: 0.1s;
  user-select: none;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
  padding: 12px 19px;
  border-color: rgb(6, 208, 194);
  background-color: rgb(6, 208, 194);
  outline: 0;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #15131e;
  margin-top: 12px;
}

.el-button:hover {
  border-color: rgb(79, 255, 243);
  background-color: rgb(79, 255, 243);
}

.to-sign {
  margin-top: 24px;
  font-weight: 300;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.to-sign span {
  margin-left: 2px;
  margin-right: 3px;
  background: linear-gradient(75.2deg, #2d4df5 3.72%, #00ff7c 166.62%);
  border-radius: 2px;
  cursor: pointer;
  padding: 0 4px;
}

.to-sign i {
  font-size: 12px;
}

.min-info {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

.money-data {
  cursor: pointer;
}

.userinfo-item {
  display: flex;
  align-items: center;
  background: #15131e;
  padding: 4px 8px;
  border-radius: 8px;
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

.user-line {
  margin: 0 16px;
  width: 2px;
  height: 13px;
  background: rgba(85, 84, 103, 0.4);
}

.user-name {
  cursor: pointer;
}
.userinfo-item {
  display: flex;
  align-items: center;
  background: #15131e;
  padding: 4px 8px;
  border-radius: 8px;
}
.msg-icon {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.level {
  padding: 0 2px;
  font-style: italic;
  font-weight: 600;
  font-size: 14px;
  color: #e9af7e;
  margin-left: 8px;
  margin-right: 4px;
}

.dropdown-user-div {
  position: absolute;
  top: 80px !important;
  left: 50px !important;
  width: 500px;
}

.dropdown-user-div-2 {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  word-wrap: break-word;
  visibility: visible;
  min-width: 150px;
  line-height: 1.4;
  text-align: justify;
  word-break: break-all;
  box-sizing: border-box;
  color: #ffffff;
  padding: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #201d2e;
  box-shadow: 0 15px 35px #222441;
  border-radius: 16px;
  border: none;
  z-index: 2017;
  width: 375px;
  position: absolute;
  inset: 56px auto auto 1148px;
}

.content {
  overflow: overlay;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 24px;
  background: #1a1725;
}

.el-popper__arrow {
  top: -5px;
}

.card {
  width: 319px;
  padding: 16px 20px;
  background-image: url(/storage/rox/vip-bg.png);
  background-size: 100% auto;
  background-repeat: no-repeat;
}

.info_wrap {
  position: relative;
  width: 343px;
  margin-top: -8px;
  padding: 16px 18px;
  background-image: url(/storage/rox/subtract.png);
  background-size: 100% auto;
  background-repeat: no-repeat;
}

.card .avatar {
  margin-right: 12px;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  cursor: pointer;
}

.card .avatar .el-avatar--circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.el-avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
  background: #c0c4cc;
  width: 40px;
  height: 40px;
  font-size: 14px;
}

header .card .phone {
  width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #b6b5c7;
  margin-top: 0.2em;
}

.icons {
  display: flex;
  align-items: center;
  margin-top: 0.2em;
}

.el-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  width: fit-content;
}

.el-badge__content {
  color-scheme: light;
  font-family: Montserrat-Medium, Montserrat-Bold, Helvetica, Arial, sans-serif;
  user-select: none;
  word-wrap: break-word;
  visibility: visible;
  line-height: 1.4;
  text-align: justify;
  word-break: break-all;
  cursor: pointer;
  box-sizing: border-box;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  white-space: nowrap;
  border: 1px solid #ffffff;
  background-color: #f56c6c;
  position: absolute;
  top: 0;
  transform: translateY(-50%) translate(100%);
  height: 8px;
  width: 8px;
  padding: 0;
  border-radius: 50%;
  right: 5px;
}

header .card .phone .img {
  display: inline-block;
  width: 1em;
  height: 1.1em;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAdCAYAAABIWle8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD1SURBVHgB7ZVPzsFAGMafp183X2LRI9QJxFJsat1IOAGO4AS4gRtwAzZYigW2bqBH6Ja08xol4l9KaWLT32rmzTu/vDOLeYAU4X1hNFrbphnYeJMgyG3q9aJ/I5vN1raEGOiKg0SIL2DfdUs9XkSCOQQ2PkSJtI1ooZTzjegIiU4ko9DBlxC0DKSIeb0RpXputdxFAqL3Vtge16lOlskyWSbLZD+U3XyO/GNhMlk2kYAwFMsgH2UQ1vRfXnt+THQ20rqv8ip5jZMDPmLQedra7f/zOjW8uL5z1HEc16QYeHiJLC5DTqeroR6xEdP89JpnvN0elQPhyU1St96BbAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: contain;
}

header .card .icons .level {
  width: 36px;
  height: 16px;
  font-style: italic;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #2d2941;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAgCAYAAACxSj5wAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFkSURBVHgB7drBUcMwEAXQvyvOmZRgHzhwIlRAUgGtpANIBYROoALTgX2GYZwOCBwZx4tkB2NZcgXad8hYlk5/5HUkmTCjFn5sQVskQSqAqh+cdleEw7iHYsPfBWuGKZAk2n+j2d0Qjq7FsSEMXiFZsl2Ai1KwdC2OD6JbJI1WC1zcd1ex7g/h0g1C4mwN3pjpzdpOLQHvoSz5Ch6xBkh+5vwh0F0QUNoFOpAFAYm9CTWIvMXoGmoQBERagzxeQG/ShbOEGrDfMBmUZ/KIyRrKMwlIC/SUF5AW6NAQUN2vXrVATwwB6RIjjv8vdIkRM6pBqe8BxY0Ckgwq0G2YuQLdwnxCBboZpAV6Hvc/WqDndAHpHtC8c5HWJUacVF1AusSYQxW5PSADU0IFGKecdQ8oTkBPuT2nZ90DipHKoHlwV2zfYEeogZs5jHaTnz9eoP5fNBdpHzXLwZ4mv9jJ8nxJzeu45xe80lF78lyV2QAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: contain;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: inherit;
  font-size: inherit;
}

.vip {
  width: 22.06px;
  margin-right: 4px;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 52px;
  line-height: 52px;
  background-color: #15131e;
  color: #b6b5c7;
  cursor: pointer;
  border-bottom: 1px solid none;
  font-size: 16px;
  font-weight: 500;
  transition: border-bottom-color .3s;
  outline: 0;
  padding: 0 16px;
  width: 100%;
  justify-content: space-between;
}

footer>div {
  cursor: pointer;
  border: 1px solid #555467;
  border-radius: 1em;
  padding: 0 16px;
}

footer {
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
  font-size: 14px;
  color: #555467;
}

.list-wrap {
    padding-bottom: 16px;
    width: 100%;
}

.title-profile-option {
  font-size: 16px;
  font-style: normal;
  font-weight: 1000;
}

header .card h2 {
    margin-top: 4px;
    font-style: italic;
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    color: #fff;
}

.icon-copy {
    cursor: pointer;
    display: inline-block;
    margin-left: 4px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHHSURBVHgBxZZNTsJAFIDfmxIkwUWP0BuIK8MK2KJEewM8gXgCuIE3EDhBiRVZSmKEJXiDcgJx4aL8zPMNBBINpUML+G0Gpm/mY4a+eYMQAccZmMnktyUlmUExQuB4Mkl7tn0+XvUh7IDrvuUNI1EFgrz2IISu78OtbWc9bdnLU+8GDHQgInM5KwjtaAMfIAaGSNS1ZK7bz3NjQTwsLZmBlIE9kNAJEihIAnkbHlmwAzu9jZtQW8wrLwNiLkweW7ai0+mrvHMQMKMlWwyYUYX3LYdAFj82t8zv8WiP20axmG2qDsd5NU+SqQEErHAtW+YR1EMEQT+5y8LCYp7nXoW3dGOaiNWKlnkUQaTgE6XtvtfUR3/qN4LCFjIp53mImUcoxJ1qbbswJqJhoAwhcQ3xMR2Hd2gxH3wEygAp2vb9IZ00ts6jfzZq4Ev/eLJtEKeI1nG1B1N3Mk3dH0RGhB4itfhAHUnAVqmU7ar+g8guS9napv6j/Wf/JJM0gj0wm50OIVQGsDVIk1/XtkDZ8vCkT4gBSdkMi1mXmHa7X+YvjxCloHIeFa+WJUZLplClhuZU5Ww/Q8SQSw59AeGQr75cPC9CV3V0fgC2TpgWGlQu1wAAAABJRU5ErkJggg==);
    background-size: contain;
    background-repeat: no-repeat;
}

header .card .phone > div:last-child {
  color: #03ffee;
  border: 1px solid #03ffee;
  padding: 0 10px;
  border-radius: 1em;
  cursor: pointer;
}

.popup-start {
  width: 420px;
}

</style>

<style>
.fa-circle-xmark:hover {
  transform: rotate(180deg) !important;
}
.fa-circle-xmark {
  cursor: pointer;
  color: rgb(81, 158, 209) !important;
  background-color: #0000004f !important;
  border-radius: 50% !important;
}
</style>