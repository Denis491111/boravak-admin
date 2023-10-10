<template>
  <article class="user-card">
    <div class="user-card__header">
      <div class="user-card__header-name">
        <span class="user-card__header-name-initials">{{ initials }}</span>
        <span class="user-card__header-name-full">{{ user.info.name }} {{ user.info.surname }}</span>
      </div>
      <ul class="user-card__header-params">
        <li
          class="user-card__header-params-item"
          :class="{'user-card__header-params-item_error': !user.is_email_verified}"
        >
          #{{ user.id }}
        </li>
        <li class="user-card__header-params-item">
          {{ user.email }}
        </li>
        <li
          v-if="user.info.birthdate"
          class="user-card__header-params-item"
        >
          {{ user.info.birthdate }}
        </li>
      </ul>
    </div>
    <p class="user-card__subtitle">
      Основная информация
    </p>
    <ul class="user-card__main-params">
      <li
        v-for="(el, key) in mainParams"
        :key="key"
        class="user-card__main-params-item"
      >
        <div
          class="user-card__main-params-item-inner"
          :class="{'user-card__main-params-item-inner_success': el.success}"
        >
          <p class="user-card__main-params-item-title">
            {{ el.name }}
          </p>
          <p class="user-card__main-params-item-value">
            {{ el.value }}
          </p>
        </div>
      </li>
    </ul>
    <p class="user-card__subtitle">
      Контактная информация
    </p>
    <ul class="user-card__main-params">
      <li
        v-for="(el, key) in contactParams"
        :key="key"
        class="user-card__main-params-item"
      >
        <div
          class="user-card__main-params-item-inner"
          :class="{'user-card__main-params-item-inner_success': el.success, 'user-card__main-params-item-inner_error': el.error}"
        >
          <p class="user-card__main-params-item-title">
            {{ el.name }}
          </p>
          <p class="user-card__main-params-item-value">
            {{ el.value }}
          </p>
        </div>
      </li>
    </ul>
    <div class="user-card__buttons">
      <Button @click="shownBlock = 'json'">
        JSON
      </Button>
      <Button
        v-if="user.family.length"
        @click="shownBlock = 'family'"
      >
        Семья
      </Button>
      <Button
        v-if="Object.keys(user.profile_documents).length"
        @click="shownBlock = 'documents'"
      >
        Документы
      </Button>
      <Button
        v-if="(user.info.legal_address || {}).is_contract_checking"
        :secondary="true"
        @click="acceptContractOffice"
      >
        Одобрить договор
      </Button>
      <Button
        v-if="(user.info.legal_address || {}).is_contract_checking"
        :secondary="true"
        @click="declineContractOffice"
      >
        Отказать по договору
      </Button>
      <Button
        v-if="shownBlock"
        :secondary="true"
        @click="shownBlock = ''"
      >
        Скрыть
      </Button>
    </div>
    <div class="user-card__inner">
      <div
        v-if="shownBlock === 'json'"
        class="user-card__json"
      >
        <pre v-html="user" />
      </div>
      <ul
        v-if="shownBlock === 'family'"
        class="user-card__family"
      >
        <li
          v-for="(member, memberKey) in user.family"
          :key="memberKey"
          class="user-card__family-item"
        >
          <div class="user-card__family-item-el">
            {{ member.name }} {{ member.surname }}
          </div>
          <div class="user-card__family-item-el">
            {{ member.birthdate }}
          </div>
          <div class="user-card__family-item-el">
            {{ REASONS_ADULT_LIST.find(el => el.id === member.reason).name }}
          </div>
          <div
            class="user-card__family-item-el"
            :style="{textAlign: 'right'}"
          >
            <Button
              v-if="member.profile_documents && Object.keys(member.profile_documents).length"
              :small="true"
              @click="openedMemberDocuments = member.id"
            >
              Документы
            </Button>
          </div>
          <ul
            v-if="openedMemberDocuments === member.id"
            class="user-card__documents"
          >
            <li
              v-for="(item, key) in member.profile_documents"
              :key="key"
              class="user-card__documents-item"
            >
              <span class="user-card__documents-item-title">{{ documentsNames[item] || item }}</span>
              <a
                v-if="typeof member.profile_documents[item] === 'string'"
                :href="member.profile_documents[item]"
                target="_blank"
                class="user-card__documents-item-link"
              >{{ member.profile_documents[item] }}</a>
              <div v-else>
                <div
                  v-for="(item2, key2) in member.profile_documents[item]"
                  :key="key2"
                >
                  <a
                    :href="item2"
                    target="_blank"
                    class="user-card__documents-item-link"
                  >{{ item2 }}</a>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul
        v-if="shownBlock === 'documents'"
        class="user-card__documents"
      >
        <li
          v-for="(item, key) in Object.keys(user.profile_documents)"
          :key="key"
          class="user-card__documents-item"
        >
          <span class="user-card__documents-item-title">{{ documentsNames[item] || item }}</span>
          <a
            v-if="typeof user.profile_documents[item] === 'string'"
            :href="user.profile_documents[item]"
            target="_blank"
            class="user-card__documents-item-link"
          >{{ user.profile_documents[item] }}</a>
          <div v-else>
            <div
              v-for="(item2, key2) in user.profile_documents[item]"
              :key="key2"
            >
              <a
                :href="item2"
                target="_blank"
                class="user-card__documents-item-link"
              >{{ item2 }}</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  entranceEnum,
  userState,
  ROADMAP_NAMES,
  familyModeEnum,
  REASONS_ADULT_LIST,
  documentsNames
} from "@/common/dictionaries";
import {request} from "@/common/const";

@Component
export default class UserCard extends Vue {
  @Prop() user;
  @Prop() referer;
  @Prop() cities;

  shownBlock: string = "";
  openedMemberDocuments: string = "";
  documentsNames = documentsNames;
  REASONS_ADULT_LIST = REASONS_ADULT_LIST;

  get initials() {
    if(this.user && (this.user.info.name || this.user.info.surname)) {
      return `${this.user.info.name[0]}${this.user.info.surname[0]}`.toLocaleUpperCase();
    }
    return "";
  }

  get mainParams() {
    return [
      {
        name: "Текущая секция",
        value: userState[this.user.current_state.type],
        success: this.user.current_state.type === 2
      },
      {
        name: "Статус оплаты",
        value: this.user.yokassa_payment_id ? "Оплата прошла" : "Не происходило оплаты",
        success: this.user.yokassa_payment_id
      },
      {
        name: "Текущий этап",
        value: this.user.current_state.type === 1 ? entranceEnum(this.user.current_state.step) : ROADMAP_NAMES[this.user.current_state.step] || "—"
      },
      {
        name: "Случай",
        value: (REASONS_ADULT_LIST.find(el => el.id === this.user.info.reason) || {}).name || "—"
      },
      {
        name: "Режим",
        value: familyModeEnum[this.user.package_mode] || "—"
      },
      {
        name: "Реферал",
        value: this.referer || "—"
      }
    ];
  }

  get contactParams() {
    return [
      {
        name: "Номер телефона",
        value: this.user.info.phone ? `0${this.user.info.phone}` : "—"
      },
      {
        name: "Город",
        value: this.user.info.home_address && this.user.info.home_address.city ? this.cities.find(el => el.id === this.user.info.home_address.city).name : "—",
        error: this.user.info.home_address && this.user.info.home_address.city !== "8ec9c5945b591c0b61436fb122cdfa0a1cbaed40"
      }
    ];
  }

  acceptContractOffice() {
    request("/sender/simple", "post", {
      address: this.user.email,
      theme: "Ваш контракт на виртуальный адрес успешно обработан",
      message: `<h1>Добрый день, ${this.user.info.name}!</h1><p>E-Goran рад сообщить, что партнер подтвердил получение платежа за первый месяц пользования услугой "Виртуальный офис", а также убедился, что с договором - полный порядок!</p><p>Мы напоминаем, что после регистрации ИП, менеджер партнера свяжется с Вами дополнительно для дозаполнения договора.</p><p>Спасибо, что выбрали нас. Хорошего дня!</p>`
    }).then(() => {
      request(`/users/${this.user.id}`, "patch", {
        info: {
          ...this.user.info,
          legal_address: {
            ...this.user.info.legal_address,
            is_contract_checking: false,
            signing_stage: 6
          }
        }
      }).then(() => {
        this.$notification({type: "success", text: "Пользователь обновлен, письмо отправлено"});
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    })
  }

  declineContractOffice() {
    const step = prompt("На какой шаг отправляем пользователя? (1 - Формирование договора, 2 - Загрузка договора, 3 - Формирование квитанции и оплата за первый месяц, 4 - Проверка договора и оплаты, 5 - Процесс проверки, 6 - Вы заключили договор)");
    const reason = prompt("Опишите причину отказа");
    request("/sender/simple", "post", {
      address: this.user.email,
      theme: "Контракт не прошел проверку",
      message: `<h1>Добрый день, ${this.user.info.name}!</h1><p>К сожалению, заключение контракта пока невозможно. Мы обнаружили следующие проблемы:</p><p>${reason}</p><p>Пожалуйста, вернитесь в интерфейс приложения и исправьте указанные недочеты. Если Вы не хотите продолжать процедуру заключения договора, пожалуйста, свяжитесь с технической поддержкой через интерфейс приложения.</p><p>Благодарим за понимание и желаем хорошего дня!</p>`
    }).then(() => {
      request(`/users/${this.user.id}`, "patch", {
        info: {
          ...this.user.info,
          legal_address: {
            ...this.user.info.legal_address,
            is_contract_checking: false,
            signing_stage: Number(step)
          }
        }
      }).then(() => {
        this.$notification({type: "success", text: "Пользователь обновлен, письмо отправлено"});
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    })
  }
}
</script>

<style>
.user-card {
  padding: 20px;
  border: var(--border);
  border-radius: 10px;
}
.user-card__main-params {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
}
.user-card__header {
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.user-card__header-params {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
}
.user-card__header-params-item:not(:last-child) {
  margin-right: 20px;
}
.user-card__header-name {
  display: flex;
  align-items: center;
}
.user-card__header-name-initials {
  width: 40px;
  height: 40px;
  display: inline-block;
  color: #fff;
  background-color: var(--primary);
  border-radius: 50%;
  margin-right: 12px;
  line-height: 40px;
  text-align: center;
}
.user-card__header-name-full {
  font-size: 15px;
  font-weight: 900;
}
.user-card__subtitle {
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 900;
  color: #333;
  text-transform: uppercase;
}
.user-card__main-params {
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
}
.user-card__main-params-item {
  flex: 0 0 25%;
  max-width: 25%;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.user-card__main-params-item-inner {
  padding: 10px;
  border-radius: 4px;
  border: var(--border);
  min-height: 100%;
  overflow: hidden;
}
.user-card__main-params-item-title {
  color: var(--text-secondary);
  font-size: 12px;
  margin-bottom: 4px;
}
.user-card__main-params-item-inner_success {
  background: green;
  border-color: green;
  color: #fff;
}
.user-card__main-params-item-inner_success .user-card__main-params-item-title {
  color: rgba(255,255,255,0.7)
}
.user-card__main-params {
  margin-bottom: 20px;
}
.user-card__header-params-item_error {
  color: red;
}
.user-card__main-params-item-inner_error {
  background: red;
  border-color: red;
  color: #fff;
}
.user-card__documents {
  padding: 20px;
  border: var(--border);
  border-radius: 10px;
  margin-top: 20px;
}
.user-card__documents-empty {
  margin-top: 20px;
  font-size: 14px;
  color: red;
}
.user-card__documents-item:not(:last-child) {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: var(--border);
}
.user-card__documents-item {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-card__documents-item-title {
  color: var(--text-secondary);
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: 20px;
}
.user-card__documents-item-link {
  color: blue;
  flex: 0 0 50%;
  max-width: 50%;
}
.user-card__json {
  padding: 20px;
  border-radius: 10px;
  border: var(--border);
  margin-top: 20px;
  overflow-x: auto;
}
.user-card__family {
  padding: 20px;
  border-radius: 10px;
  border: var(--border);
  margin-top: 20px;
}
.user-card__family-item:not(:last-child) {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: var(--border);
}
.user-card__family-item {
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.user-card__family-item-el {
  flex: 0 0 25%;
  max-width: 25%;
}
.user-card__family-item .user-card__documents {
  flex: 0 0 100%;
  max-width: 100%;
}
</style>
