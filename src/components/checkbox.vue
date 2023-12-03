<template>
  <div
    class="checkbox"
    :class="{'checkbox_disabled': disabled, 'checkbox_wrap': !!error}"
    @click="$emit('input', !value)"
  >
    <span class="checkbox__text">
      <template v-if="label">{{label}}</template>
      <template v-else>
        <slot />
      </template>
    </span>
    <span
      class="checkbox__symbol"
      :class="{'checkbox__symbol_active': value}"
    />
    <p
      v-if="error"
      class="form-error-text checkbox__error"
    >
      Этот переключатель обязателен к выбору
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Checkbox extends Vue {
  @Prop() center;
  @Prop() value;
  @Prop() disabled;
  @Prop() error;
  @Prop() label;
}
</script>

<style>
.checkbox {
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.checkbox_wrap {
  flex-wrap: wrap;
}
.checkbox__error {
  flex: 0 0 100%;
  max-width: 100%;
}
.checkbox__symbol {
  width: 36px;
  height: 20px;
  background-color: #999;
  flex: 0 0 36px;
  max-width: 36px;
  border-radius: 10px;
  position: relative;
  transition: 0.3s;
}
@media screen and (min-width: 1000px) {
  .checkbox__symbol:hover {
    background-color: var(--primary-dark);
  }
}
.checkbox__symbol:after {
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.3s;
}
.checkbox__symbol_active {
  background-color: var(--primary);
}
.checkbox__symbol_active:after {
  left: 18px;
}
.checkbox__text {
  display: inline-block;
  vertical-align: middle;
  padding-right: 20px;
}
.checkbox_disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
