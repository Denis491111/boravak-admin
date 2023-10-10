import { Component, Prop, Vue } from "vue-property-decorator";
import {REFRESH_TOKEN_KEY, request, TOKEN_KEY} from "@/common/const";
import { Mutation, State } from "vuex-class";
import ClickOutside from "vue-click-outside";
import Logo from "@/components/logo.vue";

@Component({
    directives: {
        ClickOutside
    },
    components: {
        Logo
    }
})
export default class Header extends Vue {
    @Prop() logo: boolean;
    @Mutation("setUser") setUser;
    @State("user") user: any;
    @State("isMobile") isMobile;
    @State("isApplication") isApplication: boolean;

    isOpenedPopup: boolean = false;
    isOpenedBurger: boolean = false;

    logout() {
        request("/auth/logout", "post", {refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)}).then(() => {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            this.setUser(null);
            this.$router.replace("/login");
        });
    }

    openHeaderTooltip() {
        if(this.isMobile) {
            this.$emit("openHeaderTooltip");
        }
    }

    get initials() {
        if(this.user && this.user.info.name && this.user.info.surname) {
            return `${this.user.info.name[0]}${this.user.info.surname[0]}`.toLocaleUpperCase();
        }
        return "";
    }

    get menuItems() {
        return [
            {
                name: "Пользователи",
                link: "/users"
            }
        ];
    }
}
