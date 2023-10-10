<template>
  <button
    class="button"
    :class="{
      'button_center': center,
      'button_small': small,
      'button_has-icon': iconRight || iconLeft,
      'button_disabled': disabled,
      'button_loading': loading,
      'button_wide': wide,
      'button_animated': animated && !disabled && !loading,
      'button_secondary': secondary,
    }"
    @click="click"
  >
    <img
      v-if="iconLeftUrl"
      :src="iconLeftUrl"
      class="button__icon button__icon_left"
    >
    <span class="button__text"><slot /></span>
    <img
      v-if="iconRightUrl"
      :src="iconRightUrl"
      class="button__icon button__icon_right"
    >
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Mutation, State} from "vuex-class";

@Component
export default class Button extends Vue {
  @State("isApplication") isApplication: boolean;
  @Mutation("openBasePopup") openBasePopup;
  @Prop() center;
  @Prop() small;
  @Prop() iconRight;
  @Prop() iconLeft;
  @Prop() disabled;
  @Prop() loading;
  @Prop() wide;
  @Prop() animated;
  @Prop() href;
  @Prop() bottomsheetLink;
  @Prop() target;
  @Prop() secondary;

  iconRightUrl = null;
  iconLeftUrl = null;

  beforeMount() {
    if(this.iconRight) {
      import(`@/assets/icons/${this.iconRight}.svg`).then(res => {
        this.iconRightUrl = res.default;
      });
    }
    if(this.iconLeft) {
      import(`@/assets/icons/${this.iconLeft}.svg`).then(res => {
        this.iconLeftUrl = res.default;
      });
    }
  }

  click() {
    if(this.href) {
      if(this.target === '_blank') {
        if(this.isApplication && !this.href.startsWith("/") && !this.href.includes("/static/")) {
          window.open(`${process.env.VUE_APP_SERVER_URL}/v1/free/redirect?url=${this.href}`, "_blank");
        } else if(this.isApplication && this.href.includes("/article/")) {
          this.openBasePopup(this.bottomsheetLink);
        } else {
          window.open(this.href, "_blank");
        }
        return;
      }
      if(!this.target) {
        this.$router.replace(this.href);
        return;
      }
    }
    this.$emit('click');
  }
}
</script>

<style>
.button {
  height: 32px;
  padding: 0 20px;
  background-color: var(--primary);
  border: none;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  -webkit-background-size: 30px;
  background-size: 30px;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  min-width: 150px;
  text-align: center;
}
.button_xl {
  height: 48px;
  line-height: 48px;
}
.button_animated:before {
  content: '';
  width: 100%;
  height: 200%;
  position: absolute;
  top: 0; left: 0;
  opacity: 0.5;
  filter: blur(2px);
  background: linear-gradient(to left, transparent 0%, #fff 40%, #fff 60%, transparent 100%);
  transform: translate(-100%, -25%) rotate(10deg);
  animation: blick 5s infinite;
}
@keyframes blick {
  0% {
    transform: translate(-100%, -25%) rotate(10deg);
  }
  20% {
    transform: translate(100%, -25%) rotate(10deg);
  }
  100% {
    transform: translate(100%, -25%) rotate(10deg);
  }
}
.button_center {
  margin-left: auto;
  margin-right: auto;
  display: table;
}
.button_small {
  height: 32px;
  line-height: 32px;
  padding-left: 14px;
  padding-right: 14px;
}
.button__icon {
  max-height: 20px;
  display: inline-block;
  vertical-align: middle;
  transform: translateY(-1px);
}
.button__icon_right {
  margin-left: 10px;
}
.button__icon_left {
  margin-right: 10px;
}
.button_disabled {
  opacity: 0.6;
  pointer-events: none;
}
.button_loading {
  color: transparent !important;
  pointer-events: none;
  background-image: url("~@/assets/icons/button-loader.svg");
}
.button_wide {
  display: block;
  width: 100%;
  text-align: center;
}
.button + .button {
  margin-left: 12px;
}
.button_wide + .button_wide {
  margin-left: 0px;
  margin-top: 6px;
}
.button_secondary {
  background-color: #fff;
  color: var(--primary-dark);
  border: 2px solid var(--primary-dark);
  line-height: 28px;
}
.button_small.button_secondary {
  line-height: 28px;
}
.button_secondary.button_loading {
  color: transparent;
  background-image: url("~@/assets/icons/button-loader-primary.svg");
}
@media screen and (min-width: 1000px) {
  .button:hover {
    background-color: var(--primary-dark);
    color: #fff;
  }
}
</style>
