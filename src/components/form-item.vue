<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop() size;
}
</script>

<style>
.form-item {
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 20px;
  flex: 0 0 100%;
  max-width: 100%;
}
@media screen and (max-width: 1000px) {
  .form-item {
    margin-top: 12px;
  }
}
</style>
