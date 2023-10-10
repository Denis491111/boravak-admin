<template>
  <button
    v-if="bottomsheetName && isApplication"
    class="link"
    @click="openBasePopup(bottomsheetName)"
  >
    <slot />
  </button>
  <button
    v-else-if="isApplication && target === '_blank'"
    class="link"
    @click="openExternalLinkInApplication"
  >
    <slot />
  </button>
  <router-link
    v-else-if="to && target !== '_blank'"
    class="link"
    :to="to"
  >
    <slot />
  </router-link>
  <a
    v-else-if="to"
    class="link"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <span
    v-else
    class="link"
    @click="$emit('click')"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

@Component
export default class Link extends Vue {
  @State("isApplication") isApplication: boolean;
  @Prop() to;
  @Prop() target;
  @Prop() bottomsheetName: string;
  @Mutation("openBasePopup") openBasePopup;

  openExternalLinkInApplication() {
    window.open(`${process.env.VUE_APP_SERVER_URL}/v1/free/redirect?url=${this.to}`, "_blank");
  }
}
</script>

<style>
.link {
  color: #0077ff;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: none;
  text-align: left;
  padding: 0;
  line-height: inherit;
}
.link:hover {
  text-decoration: none;
  color: #0077ff;
}
@media screen and (min-width: 1000px) {
  .link:hover {
    text-decoration: none;
    color: rgba(10,37,64,0.6);
  }
}
</style>
