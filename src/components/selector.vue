<template>
<!--  <div-->
<!--    v-if="isMobile && !searchable"-->
<!--    class="mobile-selector"-->
<!--  >-->
<!--    <label class="selector__label">{{ label }}</label>-->
<!--    <div class="mobile-selector__box">-->
<!--      <p-->
<!--        v-if="!value"-->
<!--        class="mobile-selector__box-placeholder"-->
<!--      >-->
<!--        {{ placeholder || 'Не выбрано' }}-->
<!--      </p>-->
<!--      <select-->
<!--        class="mobile-selector__box-selector"-->
<!--        :value="value"-->
<!--        @input="select($event.target.value)"-->
<!--      >-->
<!--        <option-->
<!--          v-for="(item, key) in filteredVariants"-->
<!--          :key="key"-->
<!--          :value="item.id"-->
<!--        >-->
<!--          {{ item.name }}-->
<!--        </option>-->
<!--      </select>-->
<!--    </div>-->
<!--  </div>-->
  <div
    v-click-outside="() => {isOpened = false}"
    class="selector"
    :class="{'selector_opened': isOpened, 'selector_disabled': disabled}"
  >
    <label class="selector__label">{{ label }}</label>
    <div class="selector__content">
      <div
        class="selector__current"
        :class="{'selector__current_filled': !!value, 'selector__current_opened': isOpened}"
        @click="isOpened = !isOpened"
      >
        <template v-if="!value">
          {{ placeholder || 'Не выбрано' }}
        </template>
        <template v-else>
          {{ (items.find(item => item.id === value) || {}).name }}
        </template>
      </div>
      <transition name="fade">
        <ul
          v-if="(items || []).length && isOpened"
          class="selector__list"
        >
          <li
            v-if="searchable"
            class="search-box"
          >
            <Input
              v-model="searchText"
              :search="true"
              placeholder="Поиск"
            />
          </li>
          <li
            v-for="(item, key) in filteredVariants"
            :key="key"
            class="selector__list-item"
            :class="{'selector__list-item_active': value && (item.id === value)}"
            @click="select(item.id)"
          >
            {{ item.name }}
          </li>
          <li
            v-if="!filteredVariants.length"
            class="selector__list-item"
          >
            Ничего не найдено
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ClickOutside from "vue-click-outside";
import { State } from "vuex-class";

@Component({
  directives: {
    ClickOutside
  }
})
export default class Selector extends Vue {
  @State("isMobile") isMobile: boolean;
  @Prop() value;
  @Prop() items;
  @Prop() placeholder;
  @Prop() label;
  @Prop() searchable;
  @Prop() disabled: boolean;

  isOpened = false;
  searchText = "";

  select(id) {
    this.$emit("input", id);
    this.isOpened = false;
    this.searchText = "";
  }

  get filteredVariants() {
    if(!this.searchText) {
      return this.items;
    }
    return (this.items || []).filter(item => {
      return (item.name || "").toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || (item.ascii_name || "").toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase());
    });
  }
}
</script>

<style>
.selector {
  display: flex;
  flex-wrap: wrap;
}
.selector__current {
  height: 36px;
  background-color: #fff;
  border: 2px solid #ddd;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 13px;
  padding-right: 20px;
  line-height: 32px;
  font-size: 15px;
  position: relative;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.3s;
}
.mobile-selector__box {
  position: relative;
}
.mobile-selector__box-selector {
  appearance: none;
  height: 36px;
  background-color: #fff;
  border: 2px solid #ddd;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 13px;
  padding-right: 20px;
  line-height: 32px;
  font-size: 15px;
  position: relative;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.3s;
  width: 100%;
}
@media screen and (min-width: 1000px) {
  .selector__current:hover {
    border-color: #ccc;
  }
}
.selector__current_opened, .selector__current_opened:hover {
  border-color: var(--primary);
}
.selector__content {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
}
.selector__current:after {
  content: "";
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-image: url("~@/assets/icons/caret-down-black.svg");
  background-position: center;
  -webkit-background-size: 20px;
  background-size: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.mobile-selector__box:after {
  content: "";
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-image: url("~@/assets/icons/caret-down-black.svg");
  background-position: center;
  -webkit-background-size: 20px;
  background-size: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.mobile-selector__box-placeholder {
  font-size: 15px;
  color: #999;
  position: absolute;
  pointer-events: none;
  z-index: 1;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  max-width: calc(100% - 40px);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selector__current_filled {
  color: #111;
}
.selector_opened .selector__current:after {
  transform: translateY(-50%) rotate(180deg);
}
.selector__label {
  font-size: 15px;
  display: block;
  flex: 0 0 40%;
  max-width: 40%;
  color: rgba(10,37,64,0.7);
  padding-top: 8px;
}
.selector__label + .selector__content {
  flex: 0 0 60%;
  max-width: 60%;
}
.selector__list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  border-radius: 10px;
  padding: 10px 0;
  max-height: 200px;
  overflow-y: auto;
}
.selector__list::-webkit-scrollbar {
  -webkit-appearance: none;
}

.selector__list::-webkit-scrollbar:vertical {
  width: 11px;
}

.selector__list::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, .5);
}

.selector__list::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 8px;
}
.selector__list-item {
  padding: 10px 20px;
  font-size: 13px;
  cursor: pointer;
}
.selector__list-item:hover {
  color: var(--primary-dark)
}
.selector__list-item_active {
  color: var(--primary-dark);
}
.search-box {
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}
.selector_disabled {
  pointer-events: none;
  opacity: 0.5;
}
@media screen and (max-width: 1000px) {
  .selector__label {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .selector__label + .selector__content {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
