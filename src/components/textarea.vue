<template>
  <div class="textarea">
    <label
      v-if="label"
      class="textarea__label"
    >{{ label }}</label>
    <textarea
      class="textarea__field"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop() label;
  @Prop() value;
  @Prop() placeholder;
}
</script>

<style>
.textarea {
  display: flex;
  flex-wrap: wrap;
}
.textarea__label {
  font-size: 15px;
  display: block;
  flex: 0 0 40%;
  max-width: 40%;
  color: rgba(10,37,64,0.7);
  padding-top: 8px;
}
.textarea__field {
  width: 100%;
  height: 136px;
  border-radius: 8px;
  padding: 13px;
  color: #111;
  border: 2px solid #ddd;
  transition: 0.3s;
  font-size: 15px;
  resize: none;
}
.textarea__label + .textarea__field {
  max-width: 60%;
  flex: 0 0 60%;
}
@media screen and (min-width: 1000px) {
  .textarea__field:hover {
    border-color: #ccc;
  }
}
.textarea__field:focus {
  border-color: var(--primary);
}
.textarea__field::placeholder {
  color: #999;
}
@media screen and (max-width: 1000px) {
  .textarea__label {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .textarea__label + .textarea__field {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>
