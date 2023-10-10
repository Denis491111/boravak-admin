<template>
  <div class="login-page">
    <div class="login-page__inner">
      <h1 class="login-page__title">
        Панель управления {{ appName }}
      </h1>
      <Form>
        <FormItem>
          <Input
            v-model="formData.email"
            type="email"
            placeholder="Адрес электронной почты"
          />
        </FormItem>
        <FormItem>
          <Input
            v-model="formData.password"
            type="password"
            placeholder="Пароль"
          />
        </FormItem>
        <FormItem>
          <Button
            :center="true"
            :loading="isLoadingLogin"
            :disabled="!isFormValid"
            :animated="true"
            @click="auth"
          >
            Войти
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import {appName, REFRESH_TOKEN_KEY, request, TOKEN_KEY} from "@/common/const";
import axios from "axios";

@Component
export default class Login extends Vue {
  @Mutation("setUser") setUser;

  formData = {
    email: "",
    password: ""
  }
  isLoadingLogin = false;
  appName = appName;

  beforeMount() {
    if(this.$route.query.verified) {
      this.$notification({ type: "success", text: "Адрес электронной почты успешно подтвержден" });
    }
  }

  get isFormValid() {
    return !!this.formData.password && !!this.formData.email && !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email);
  }

  auth() {
    if(this.isFormValid) {
      this.isLoadingLogin = true;
      request("/auth/login", "post", this.formData).then(response => {
        this.setUser(response.user);
        localStorage.setItem(TOKEN_KEY, response.tokens.access.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.tokens.refresh.token);
        this.$router.replace("/users");
      }).catch(err => {
        this.$notification({ type: "error", text: err.message });
      }).finally(() => {
        this.isLoadingLogin = false;
      });
    }
  }
}
</script>

<style>
.login-page__title {
  font-size: 26px;
  line-height: 38px;
  font-weight: 900;
  margin-bottom: 40px;
}
</style>
