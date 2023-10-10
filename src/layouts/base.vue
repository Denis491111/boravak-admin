<template>
  <div class="base-layout">
    <Header />
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/header/header.vue";

@Component({
  components: {
    Header
  }
})
export default class BaseLayout extends Vue {

}
</script>

<style>
.main {
  padding-top: 50px;
  padding-bottom: 50px;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
