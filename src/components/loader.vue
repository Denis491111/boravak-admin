<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  min-height: 400px;
  background-image: url("~@/assets/icons/loader-primary.svg");
  background-position: center;
  background-size: 80px;
}
@media screen and (max-width: 1000px) {
  .loader {
    min-height: 200px;
  }
}
</style>
