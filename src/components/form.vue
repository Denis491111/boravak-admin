<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Form extends Vue {}
</script>

<style>
.form {
  display: flex;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
  margin-top: -20px;
}
@media screen and (max-width: 1000px) {
  .form {
    margin-top: -12px;
  }
}
</style>
