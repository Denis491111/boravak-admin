<template>
  <a
    href="https://e-goran.com"
    target="_blank"
    class="logo"
    :class="{'logo_center': center}"
  >
    <img
      src="@/assets/icons/flag.svg"
      class="logo__flag"
    >
    <span class="logo__text">{{ appName }}</span>
  </a>
</template>

<style>
.logo {
  display: inline-block;
  vertical-align: middle;
}
.logo__text {
  color: var(--primary);
  font-size: 26px;
  font-weight: 900;
  display: inline-block;
  vertical-align: middle;
}
.logo__flag {
  max-width: 40px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
}
.logo_center {
  display: table;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 1000px) {
  .logo__flag {
    max-width: 32px;
    margin-right: 8px;
  }
  .logo__text {
    font-size: 22px;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { appName } from "@/common/const";

@Component
export default class Logo extends Vue {
  @Prop() center;
  appName = appName;
}
</script>
