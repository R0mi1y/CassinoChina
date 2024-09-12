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
          <button class="mr-5 ml-5 fa-solid items-center text-sm arrow_side_bar" @click="toggleMenu">
            <img :src="`/storage/rox/arrow_side_bar.png`" alt="Close Menu">
          </button>
          <img
            :src="`/storage/rox/logo.png`"
            alt="News"
            class="logo ml-5"
          />
          
        </div>
        
        <div v-if="!simple" class="flex items-center justify-end">
          <div v-if="!isAuthenticated" class="flex items-center ml-5 md:mr-10">
            <button
              @click.prevent="loginToggle"
              class="text-sm md:text-base md:w-25 rounded transform scale-60 md:scale-100 lg:transform-none px-3 sm:py-1 md:px-4 md:p-2 lg:px-3"
              style="
                background-color: var(--ci-gray-light) !important;
                border: 1px solid var(--ci-gray-light);
                color: var(--ci-gray-over);

                /* padding: 0 0.8rem !important; */
              "
            >
              Login
            </button>
            <button
              @click.prevent="registerToggle"
              class="ml-2 mr-2 text-sm md:text-base rounded md:w-25 transform scale-60 md:scale-100 lg:transform-none px-2 sm:py-1 md:px-3 md:p-2 lg:px-3"
              style="
                background: transparent !important;
                border: 1px solid var(--ci-gray-light);
                color: var(--ci-gray-light) !important;

                /* padding: 0 0.8rem !important; */
              "
            >
              Registro
            </button>
            <p @click="$router.push('/games/search')" class="block cursor-pointer ml-1">
              <i class="fa-solid fa-magnifying-glass"></i>
            </p>
          </div>

          <div
            v-if="isAuthenticated"
            class="flex items-center justify-left gap-0"
            style=""
          >
            <WalletBalance style="position: relative" />
            <MakeDeposit
              :showMobile="true"
              :title="'Depósito'"
              style="position: relative; padding-right: 1px; right: 8px"
            />

            <div
              class="block transform scale-[0.8] md:scale-[1] md:hidden relative right-5"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user2"
              style="
                background-color: var(--ci-primary-opacity-color);
                border-radius: 0 8px 8px 0;
                border: none;
                padding: 0.4rem;
              "
            >
              <i
                class="fa-solid fa-chevron-down"
                style="
                  padding-left: 8px;
                  border-left: 1px solid var(--ci-secundary-color);
                "
              ></i>
            </div>

            <div
              class="z-50 hidden my-6 mr-12 text-base list-none rounded-lg absolute left-12"
              id="dropdown-user2"
              style="
                background: var(--ci-primary-color);
                border: 1px solid var(--ci-secundary-color);
                color: var(--ci-gray-light);
                position: absolute;
                top: 80px !important;
                left: 50px !important;
                width: 120px;
                /* max-width: 100px; */
              "
            >
              <div class="" role="none">
                <div
                  class="w-full flex flex-col items-center justify-between gap-1 rounded-lg"
                >
                  <RouterLink
                    :to="{ name: 'profileWithdraw' }"
                    active-class="profile-menu-active"
                    class="block text-sm w-full"
                  >
                    <div
                      class="rounded-[8px] py-2"
                      style="
                        background-color: var(--ci-primary-color);
                        text-align: center;
                      "
                    >
                      <p
                        class="w-full font-semibold"
                        style="color: var(--ci-primary-opacity-color)"
                      >
                        Saque
                      </p>
                    </div>
                  </RouterLink>

                  <RouterLink
                    :to="{ name: 'profileAffiliate' }"
                    active-class="profile-menu-active"
                    class="block text-sm w-full"
                  >
                    <div
                      class="rounded-[8px] py-2"
                      style="
                        background-color: var(--ci-primary-color);
                        text-align: center;
                      "
                    >
                      <p
                        class="w-full font-semibold"
                        style="color: var(--ci-primary-opacity-color)"
                      >
                        Relatório
                      </p>
                    </div>
                  </RouterLink>

                  <!-- <a
                                            @click.prevent="logoutAccount"
                                            href="#"
                                            class="text-md"
                                            role="menuitem"
                                        >
                                            <span class="w-full text-center h-8 ">
                                                <i
                                                    class="fa-duotone fa-right-from-bracket"
                                                ></i>
                                            </span>
                                            Sair
                                        </a> -->
                </div>
              </div>
            </div>

            <div class="hidden items-center ml-3 md:flex">
              <div class="flex gap-2">
                <button
                  type="button"
                  class="flex text-sm"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <!-- <span class="sr-only">Open user menu</span> -->
                  <img
                    @mousedown.prevent
                    @contextmenu.prevent
                    @dragstart.prevent
                    class="w-14 h-12 rounded-[8px]"
                    :src="`/storage/rox/profile_pic_rox.png`"
                    alt=""
                  />
                </button>
                <div class="w-28">
                  <p
                    class="text-md font-semibold"
                    role="none"
                    style="color: var(--ci-primary-opacity-color)"
                  >
                    {{ truncatedName }}
                  </p>
                  <p class="flex text-sm gap-2 cursor-pointer" role="none">
                    ID: {{ userData?.id }}
                    <span
                      class="material-symbols-outlined"
                      style="color: var(--ci-primary-opacity-color)"
                      >content_copy</span
                    >
                  </p>
                </div>
              </div>
              <div
                class="z-50 hidden my-6 text-base list-none"
                id="dropdown-user"
                style="
                  background: var(--ci-primary-color);
                  border-left: 2px solid var(--ci-gray-light);
                  color: var(--ci-gray-light);
                  position: relative;
                  top: 50px !important;
                  width: 100%;
                  max-width: 500px;
                "
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

                  <!-- <p class="text-sm" role="none">
                                        ID: {{ userData?.id }}
                                    </p>
                                    <p class="text-sm font-medium" role="none">
                                        {{ userData?.email }}
                                    </p>
                                    <p class="text-sm font-medium" role="none">
                                        {{ userData?.phone }}
                                    </p> -->
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
                  <!-- <li>
                                        <RouterLink :to="{ name: 'home' }" active-class="link-active" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <span class="w-8 h-8 mr-3">
                                                <i class="fa-duotone fa-house"></i>
                                            </span>
                                            {{ $t('Dashboard') }}
                                        </RouterLink>
                                    </li> -->
                  <!-- <li>
                                        <RouterLink
                                            :to="{ name: 'profileAffiliate' }"
                                            active-class="profile-menu-active"
                                            class="block px-4 py-2 text-sm"
                                        >
                                            <span class="w-8 h-8 mr-3">
                                                <i
                                                    class="fa-duotone fa-people-group"
                                                ></i>
                                            </span>
                                            Indicações
                                        </RouterLink>
                                    </li> -->
                  <!-- <li>
                                        <RouterLink
                                            :to="{ name: 'profileDeposit' }"
                                            active-class="profile-menu-active"
                                            class="block px-4 py-2 text-sm"
                                        >
                                            <span class="w-8 h-8 mr-3">
                                                <i
                                                    class="fa-regular fa-money-bill-trend-up"
                                                ></i>
                                            </span>
                                            Depositar
                                        </RouterLink>
                                    </li> -->
                  <!-- <li>
                                        <RouterLink
                                            :to="{ name: 'profileWithdraw' }"
                                            active-class="profile-menu-active"
                                            class="block px-4 py-2 text-sm"
                                        >
                                            <span class="w-8 h-8 mr-3">
                                                <i
                                                    class="fa-light fa-money-bill-transfer"
                                                ></i>
                                            </span>
                                            {{ $t("Withdraw") }}
                                        </RouterLink>
                                    </li> -->
                  <!-- <li>
                                        <RouterLink :to="{ name: 'profileWallet' }" active-class="profile-menu-active" class="block px-4 py-2 text-sm ">
                                            <span class="w-8 h-8 mr-3">
                                              <i class="fa-duotone fa-wallet"></i>
                                            </span>
                                            {{ $t('My Wallet') }}
                                        </RouterLink>
                                    </li> -->
                  <!-- <li>
                                        <a href="#" @click.prevent="profileToggle" class="block px-4 py-2 text-sm " role="menuitem">
                                            <span class="w-8 h-8 mr-3">
                                               <i class="fa-regular fa-id-card-clip"></i>
                                            </span>
                                            {{ $t('My Profile') }}
                                        </a>
                                    </li> -->
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
                        <i class="fa-duotone fa-right-from-bracket"></i>
                      </span>
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <p
              @click="$router.push('/games/search')"
              class="block cursor-pointer ml-1 relative right-5"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </p>
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
        <!-- End searchbar action -->
      </div>
    </transition>
  </nav>

  <div
    id="modalElAuth"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-[calc(100%-1rem)] max-h-full ml-2 mr-2"
  >
    <div
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
                <i class="fa-solid fa-user-plus trasform scale-60 mr-1 text-sm"></i>
                <p>Inscrever-se</p>
              </h5>

              <h5
                class="text-sm w-full text-center flex justify-center items-center gap-1 text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)] pb-2"
              >
                <i
                  class="fa-solid fa-right-to-bracket trasform scale-60 mr-1 text-sm"
                ></i>
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
                ></i>
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
              <i class="fa-duotone fa-lock"></i> Senha do Login
            </p>
            <div
              class="relative mb-3 rounded-lg hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                ></i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
                <p class="mx-2 text-xs text-white">Login Rápido</p>
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
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
              <i class="fa-thin fa-circle-xmark"></i>
            </p>

            <p
              class="roxLoginButton hidden md:block"
              @click.prevent="loginToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark"></i>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div
    id="modalElRegister"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-[calc(100%-1rem)] max-h-full mr-2 ml-2"
  >
    <div
      class="relative w-full max-w-3xl max-h-full bg-[var(--background-base)] rounded-lg shadow-lg border border-[var(--ci-secundary-color)]"
    >
      <div class="flex md:justify-between h-full">
        <div class="w-full relative p-5 m-auto">
          <form @submit.prevent="registerSubmit" method="post" action="" class="">
            <div class="flex justify-between items-center mb-3">
              <h5
                class="text-sm w-full text-center flex justify-center items-center gap-1 text-[var(--sub-text-color)] border-b-2 border-[var(--sub-text-color)] pb-2"
              >
                <i class="fa-solid fa-user-plus trasform scale-60 mr-1 text-sm"></i>
                <p>Inscrever-se</p>
              </h5>

              <h5
                @click.prevent="hideLoginShowRegisterToggle"
                class="text-sm w-full text-center flex justify-center items-center gap-1 border-b-2 border-transparent pb-2"
              >
                <i
                  class="fa-solid fa-right-to-bracket trasform scale-60 mr-1 text-sm"
                ></i>
                <p>Acesso de membro</p>
              </h5>
            </div>

            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-user text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                ></i>
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
                autocomplete="phone"
                class="input2 rounded-lg placeholder:text-xs hover:border-[var(--ci-secundary-color)] focus:border-[var(--ci-secundary-color)]"
                @input="updateEmail"
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
              <i class="fa-duotone fa-lock"></i> Cadastro de senha
            </p>
            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                ></i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                ></span>
              </div>
            </div>

            <div class="relative mb-3 rounded-lg">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <i
                  class="fa-regular fa-lock text-success-emphasis text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                ></i>
                <i
                  v-if="typeInputPassword === 'text'"
                  class="fa-sharp fa-regular fa-eye-slash text-[var(--ci-primary-opacity-color)]"
                ></i>
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
                  ></label
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
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
                <p class="mx-2 text-xs text-white">Registro vinculativo</p>
                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
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

            <!-- <div class="w-full flex flex-col gap-2 items-center justify-center mt-3">
                            <div class="flex items-center w-full">
                                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
                                <p class="mx-2 text-white">Login Rápido</p>
                                <div class="flex-grow border-t border-[var(--ci-secundary-color)]"></div>
                            </div>
                            <img class="w-[40px] rounded-[50%]" :src="`/storage/rox/google-icon.png`" alt="Login com o Google"/>
                        </div> -->

            <p
              class="roxRegisterButtonMobile block md:hidden"
              @click.prevent="registerToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark"></i>
            </p>

            <p
              class="roxRegisterButton hidden md:block"
              @click.prevent="registerToggle"
              style="color: white; font-weight: 400; font-size: 1.6rem"
            >
              <i class="fa-thin fa-circle-xmark"></i>
            </p>
          </form>
        </div>
      </div>
    </div>
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
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- PROFILE BODY -->
        <div v-if="profileUser != null" class="flex flex-col w-full p-4">
          <!-- PROFILE INFO -->
          <div class="flex items-center self-center justify-between w-full">
            <button @click.prevent="like(profileUser.id)" type="button" class="heart">
              <i class="fa-solid fa-heart"></i>
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
                  <i class="fa-duotone fa-image"></i>
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
                <i v-if="!readonly" class="fa-sharp fa-light fa-pen"></i>
                <i v-if="readonly" class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div class="mt-3 shadow flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div class="flex justify-between px-4 pt-4">
              <h1>
                <span class="mr-2"><i class="fa-solid fa-chart-mixed"></i></span>
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
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto ml-4 mr-4"
  >
    <div class="relative w-full max-w-3xl max-h-full bg-base rounded-lg shadow-lg">
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
          <i class="fa-thin fa-circle-xmark"></i>
        </p>
        <p
          class="roxRegisterButtonMobile hidden md:block"
          @click.prevent="customToggle"
          style="color: white; font-weight: 400; font-size: 1.6rem"
        >
          <i class="fa-thin fa-circle-xmark"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
import { sidebarStore } from "@/Stores/SideBarStore.js";
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
    modelSidebar: Boolean,
    simple: Boolean,
    visible: {
      type: Boolean,
      required: true,
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
      return this.visible ? `calc(${this.barHeight} + 0px)` : "0px";
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
  unmounted() {},
  mounted() {
    /*
     * $targetEl: required
     * options: optional
     */
    
    this.$emit("update:visible", !this.visible);
    localStorage.setItem("visible", false);
    
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
      // Mostrar o modal se as condições forem atendidas
      console.log(`${showModal} e ${lastShownDate}`);
      this.showCustom = true;
    } else {
      this.showCustom = false;
      console.log(`${showModal} e ${lastShownDate}`);
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
  },
  methods: {
    toggleVisibility() {
      this.$emit("update:visible", !this.visible);
      localStorage.setItem("visible", false);
    },
    hideBar() {
      this.visible = false;
      document.body.style.paddingTop = "0"; // Remove o padding quando a barra é oculta
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
              console.log(value);
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
      this.isMenuOpen = this.sidebarMenuStore.getSidebarStatus();
      this.$emit('update:modelSidebar', !this.modelSidebar);
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
          console.log("Avatar atualizado com sucesso", response.data);
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
    visible(newVal) {
      if (newVal) {
        document.body.style.paddingTop = "0px"; // Ajusta o padding quando a barra é visível
      }
    },
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

  z-index: 9999;
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
  background-color: var(--ci-primary-opacity-color);
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
</style>
