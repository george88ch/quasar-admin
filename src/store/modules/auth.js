// auth
import * as fb from "src/boot/firebase.js";
import router from "src/router/index";

// state
const state = () => ({
  uid: null,
  salutation: null,
  userProfile: {}
});

// getters
const getters = {
  salutation: state => {
    return state.userProfile.nickname;
  },
  userProfile: state => {
    return state.userProfile;
  },

  isUserLoggedIn: state => {
    let ret = true;
    if (Object.keys(state.userProfile).length === 0) {
      ret = false;
    }

    return ret;
  }
};

// mutations
const mutations = {
  setUserProfile(state, val) {
    state.userProfile = val;
  }
};

// actions
const actions = {
  async login({ dispatch }, form) {
    // sign user in
    const { user } = await fb.auth.signInWithEmailAndPassword(
      form.email,
      form.password
    );

    // fetch user profile and set in state
    dispatch("fetchUserProfile", user);
  },
  async signup({ dispatch }, form) {
    // sign user up
    const { user } = await fb.auth.createUserWithEmailAndPassword(
      form.email,
      form.password
    );
    // create user object in userCollections
    await fb.usersCollection.doc(user.uid).set({
      nickname: form.nickname,
      email: form.email
    });

    // fetch user profile and set in state
    dispatch("fetchUserProfile", user);
  },
  async fetchUserProfile({ commit }, user) {
    // fetch user profile
    console.log("fetchUser: ", user.uid);
    const userProfile = await fb.usersCollection.doc(user.uid).get();

    // set user profile in state
    commit("setUserProfile", userProfile.data());

    // change route to dashboard
    if (router.currentRoute.path === "/login") {
      router.push("/dashboard");
    }
  },
  async logout({ commit }) {
    // log user out
    await fb.auth.signOut();

    // clear user data from state
    commit("setUserProfile", {});

    // redirect to login view
    router.push("/login");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
