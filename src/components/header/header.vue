<template>
  <header
    class="header"
  >
    <div
      class="header__inner"
    >
      <div class="header__left">
        <Logo  />
        <ul
          v-if="user"
          class="header__left-menu"
          :class="{'header__left-menu_active-on-mobile': isOpenedBurger}"
        >
          <li
            v-for="(item, key) in menuItems"
            :key="key"
            class="header__left-menu-item"
            @click="isOpenedBurger = false"
          >
            <router-link
              class="header__left-menu-item-link"
              :to="item.link"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div
        v-if="user"
        v-click-outside="() => {isOpenedPopup = false}"
        class="header__right"
        @click="isOpenedPopup = true"
      >
        <span
          class="header__right-round"
          :class="{'header__right-round_empty': !initials}"
        >{{ initials }}</span>
        <span class="header__right-round-name">{{ ((user || {}).info || {}).name || 'Пользователь' }}</span>
        <transition name="fade">
          <div
            v-if="isOpenedPopup"
            class="header__right-popup"
          >
            <ul class="header__right-popup-list">
              <li class="header__right-popup-list-item">
                <button
                  class="header__right-popup-list-item-button header__right-popup-list-item-button_exit"
                  @click="logout"
                >
                  Выйти
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script lang="ts" src="./header.ts"></script>
<style lang="css" src="./header.css"></style>
