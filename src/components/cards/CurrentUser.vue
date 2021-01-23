<template>
  <q-card class="bg-transparent no-shadow no-border q-pt-sm">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div class="col-md-3 col-sm-12 col-xs-12">
          <q-item class="q-pa-none q-ml-xs" style="background-color: red">
            <q-item-section class="q-pa-md q-ml-none text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder"
                >User Profil</q-item-label
              >
              <q-item-label>Uid: {{ isUser }}</q-item-label>
              <q-item-label>Hallo {{ salutation }}</q-item-label>
            </q-item-section>
            <q-item-section side class="q-mr-md text-white">
              <q-icon name="person" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalStorage } from "quasar";
export default {
  name: "CurrentUser",
  props: {
    icon_position: {
      required: false,
      default: "left",
      color2: "#3e51b5",
    },
  },
  mounted() {
    //
    // Reload profile if user
    //
    if (this.isUser) {
      this.$store.dispatch("auth/fetchUserProfile", {
        uid: this.isUser,
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["salutation", "userProfile"]),

    isUser: function () {
      const user = this.$q.localStorage.getItem("uid");
      return user;
    },
    salutation: function () {
      let ret = "Unbekannter";
      if (this.userProfile) {
        console.log("User: ", this.userProfile);
        ret = this.userProfile.nickname;
      }
      return ret;
    },
    items: function () {
      return this.icon_position === "left"
        ? [
            {
              title: "Loggedin User",
              icon: "person",
              value: "200",
              color1: "#5064b5",
              color2: "#3e51b5",
            },
          ]
        : [
            {
              title: "Current User",
              icon: "fas fa-dollar-sign",
              value: "$ 20k",
              color1: "#546bfa",
              color2: "#3e51b5",
            },

            {
              title: "Active Users",
              icon: "person",
              value: "82",
              color1: "#f88c2b",
              color2: "#3e51b5",
            },
          ];
    },
  },
};
</script>
