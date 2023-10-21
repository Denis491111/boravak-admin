<template>
  <div class="users">
    <h1 class="users__title">
      Пользователи
    </h1>
    <Loader v-if="isLoading" />
    <ul
      v-else
      class="users__list"
    >
      <li
        v-for="(user, key) in users"
        :key="key"
        class="users__list-item"
      >
        <UserCard
          :user="user"
          :referer="users.find(el => el.id === user.referer_id)"
          :cities="cities"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { request } from "@/common/const";
import UserCard from "@/views/users/user-card.vue";

@Component({
  components: {
    UserCard
  }
})
export default class UsersPage extends Vue {
  isLoading: boolean = true;
  users: any = [];
  cities: any = [];

  beforeMount() {
    request("/dictionary/cities").then(cities => {
      this.cities = cities;
      request("/users?limit=200").then(res => {
        this.users = res.results.filter(el => el.role === "user").reverse();
        this.isLoading = false;
      });
    })
  }
}
</script>

<style>
.users__title {
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
}
.users__list-item:not(:last-child) {
  margin-bottom: 20px;
}
</style>
