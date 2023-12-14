import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: '',
    authenticated: false,
    photoURL: '',
    displayName: '',
    email: '',
    uid: ''
  }),

  getters: {
    isAuthenticated: (state) => state.authenticated,
  },

  actions: {
    initUser (data) {
      this.accessToken = data.accessToken;
      this.photoURL = data.photoURL;
      this.displayName = data.displayName;
      this.email = data.email;
      this.uid = data.uid;
      this.authenticated = true;
    },
    logoutUser () {
      this.accessToken = '';
      this.photoURL = '';
      this.displayName = '';
      this.email = '';
      this.uid = '';
      this.authenticated = false;
    }
  },
  persist: {
    storage: sessionStorage
  }
});
