<template>
  <div class="users">
    <h1 class="users__title">
      Пользователи <template v-if="usersFiltered.length">({{usersFiltered.length}})</template>
    </h1>
    <Loader v-if="isLoading" />
    <template v-else>
      <div class="users__controls">
        <Checkbox v-model="filter.paidOnly">Показать только оплаченных</Checkbox>
      </div>
      <ul
        class="users__list"
      >
        <li
          v-for="(user, key) in usersFiltered"
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
    </template>
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
    });
  }

  get usersFiltered() {
    let { users } = this;
    if(this.filter.paidOnly) {
      users = users.filter(el => {
        return el.yokassa_payment_id && el.current_state.type === 2;
      });
    }
    return users;
  }

  filter = {
    paidOnly: true
  }
}
</script>

<style>
.users__title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}
.users__list-item:not(:last-child) {
  margin-bottom: 20px;
}
.users__controls {
  margin-bottom: 40px;
}
</style>
