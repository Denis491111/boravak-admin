<template>
  <div class="input">
    <label
      v-if="label"
      class="input__label"
    >{{ label }}</label>
    <div class="input-box">
      <div class="input-box__inner">
        <div
          v-if="type === 'tel'"
          class="input-tel-prefix"
        >
          <img
            class="input-tel-prefix-flag"
            src="@/assets/icons/flag.svg"
          >
          <span class="input-tel-prefix-text">+381</span>
        </div>
        <DatePicker
          v-if="type === 'datepicker'"
          :value="value"
          :placeholder="placeholder"
          input-class="input__field"
          lang="ru"
          :editable="false"
          type="date"
          :format="'DD.MM.YYYY'"
          :clearable="false"
          v-bind="datepickerProps"
          value-type="format"
          :disabled-date="datepickerProps && datepickerProps.disabledDate ? datepickerProps.disabledDate : disabledDate"
          @input="$emit('input', $event)"
        />
        <input
          v-else
          ref="input"
          v-mask="type === 'tel' ? '#########' : null"
          autocomplete="false"
          :value="value"
          :placeholder="placeholder"
          :type="numbers ? 'tel' : isShownPassword ? 'text' : (type || 'text')"
          class="input__field"
          :class="{'input__field_has-prefix': type === 'tel', 'input__field_search': search}"
          @input="onInput($event.target.value)"
          @focus="isOpenedVirtualKeyboard = true"
          @blur="onBlur"
        >
        <Tooltip
          v-if="tooltip"
          class="input__tooltip"
          :text="tooltip"
          :position="tooltipPosition"
        />
        <span
          v-if="type === 'password' && value"
          class="input__show-password"
          @click="isShownPassword = !isShownPassword"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";

@Component({
  components: {
    DatePicker
  }
})
export default class Input extends Vue {
  @Prop() label;
  @Prop() validation;
  @Prop() value;
  @Prop() modify;
  @Prop() type;
  @Prop() placeholder;
  @Prop() datepickerProps;
  @Prop() tooltip;
  @Prop() tooltipPosition;
  @Prop() search;
  @Prop() dates: "past";
  @Prop() serbian: boolean;
  @Prop() numbers: boolean;

  isShownPassword: boolean = false;
  isOpenedVirtualKeyboard: boolean = false;

  onInput(text) {
    if((this.validation || []).length) {
      if(this.validation.includes("latin")) {
        text = text.replace(/[\u0250-\ue007]/g, "");
        text = text.replace(/[0-9]/g, "");
      }
      if(this.validation.includes("latin-or-num")) {
        text = text.replace(/[\u0250-\ue007]/g, "");
      }
      if(this.validation.includes("number")) {
        text = text.replace(/[^\d.-]+/g, "");
      }
    }
    if((this.modify || []).length) {
      if(this.modify.includes("uppercase")) {
        text = text.toLocaleUpperCase();
      }
    }
    if(this.$refs.input) {
      (this.$refs.input as any).value = text;
    }
    this.$emit("input", text);
  }

  disabledDate(date) {
    if(this.dates === "past") {
      return new Date().getTime() <= new Date(date).getTime();
    }
    if(this.dates === "future") {
      return new Date().getTime() > new Date(date).getTime();
    }
    return false;
  }

  onBlur(e) {
    if(e.relatedTarget && e.relatedTarget._prevClass == "keyboard__items-element-btn") {
      return;
    } else {
      this.isOpenedVirtualKeyboard = false;
    }
  }
}
</script>

<style>
.input {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.input__field {
  width: 100%;
  height: 36px;
  border-radius: 8px;
  padding: 0 13px;
  color: #111;
  border: 2px solid #ddd;
  transition: 0.3s;
  font-size: 15px;
}
@media screen and (min-width: 1000px) {
  .input__field:hover {
    border-color: #ccc;
  }
}
.input__field:focus {
  border-color: var(--primary);
}
.input__field::placeholder {
  color: #999;
}
.input__label {
  font-size: 15px;
  display: block;
  flex: 0 0 40%;
  max-width: 40%;
  color: rgba(10,37,64,0.7);
  padding-top: 8px;
}
.input-box__inner {
  position: relative;
}
.input__tooltip {
  position: absolute !important;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
  margin-top: -2px;
}
.input__show-password {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  bottom: 8px;
  border: none;
  padding: 0;
  border-radius: 4px;
  background-image: url("~@/assets/icons/eye.svg");
  -webkit-background-size: 20px;
  background-size: 20px;
  background-position: center;
  background-color: transparent;
  cursor: pointer;
}
.input-box {
  position: relative;
  flex: 0 0 100%;
  max-width: 100%;
  z-index: 1;
}
.input__label + .input-box {
  flex: 0 0 60%;
  max-width: 60%;
}
.input-tel-prefix {
  position: absolute;
  left: 2px;
  top: 2px;
  background-color: #fff;
  z-index: 1;
  border-radius: 8px 0 0 8px;
  border-right: 2px solid #ddd;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  padding: 0 10px;
}
.input-tel-prefix-flag {
  max-width: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
.input-tel-prefix-text {
  display: inline-block;
  vertical-align: middle;
}
.input__field_has-prefix {
  padding-left: 80px;
  padding-top: 2px;
}
.input__field_search {
  padding-left: 40px;
  background-image: url("~@/assets/icons/search-gray.svg");
  background-position: 10px center;
  -webkit-background-size: 20px;
  background-size: 20px;
}
@media screen and (max-width: 1000px) {
  .input__label {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .input__label + .input-box {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
