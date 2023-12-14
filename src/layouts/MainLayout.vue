<template>
  <q-layout view="lHh LpR fFf">

    <q-header elevated class="bg-grey-4 text-dark" bordered>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/logo.png" height="100%" width="150px" />
        </q-toolbar-title>

        <q-btn flat dense rounded icon="mdi-menu" @click="rightDrawerOpen = !rightDrawerOpen" v-if="Platform.is.mobile"/>

        <q-btn-dropdown v-if="!Platform.is.mobile" flat no-caps label="Account" dropdown-icon="mdi-chevron-down" padding="2px 5px">

          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-btn :to="{ name: 'add_picture' }" flat no-caps square label="Add new Image" />
              <q-btn :to="{ name: 'home_page' }" flat no-caps square label="Goto Homepage" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="`${userStore.photoURL}`">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userStore.displayName }}</div>

              <q-btn
                color="primary"
                label="Logout"
                @click="logoutUser"
                :loading="isLoading"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="Platform.is.mobile" show-if-above v-model="rightDrawerOpen" side="right" bordered class="bg-grey-4" :width="240">
       <div class="column reverse">
          <div class="column q-ma-md">
            <div class="text-h6 q-mb-md">Settings</div>
            <q-btn :to="{ name: 'add_picture' }" flat no-caps square label="Add new Image" />
            <q-btn :to="{ name: 'home_page' }" flat no-caps square label="Goto Homepage" />
          </div>

          <q-separator horizontal inset class="q-my-lg" />

          <div class="column items-center q-mt-md">
            <q-avatar size="72px">
              <img :src="`${userStore.photoURL}`">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userStore.displayName }}</div>

            <q-btn
              color="primary"
              label="Logout"
              @click="logoutUser"
              :loading="isLoading"
              push
              size="sm"
              v-close-popup
            />
          </div>
       </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from 'stores/user-store';
import { debounce, Loading, Platform, QSpinnerFacebook } from 'quasar';
import { useRouter } from 'vue-router';

const rightDrawerOpen = ref(false)
const userStore = useUserStore();
const isLoading = ref(false);
const router = useRouter()

const handleLogout = debounce(() => {
  userStore.logoutUser();
  isLoading.value = false;
  router.push({ name: 'login' });
  Loading.hide();
}, 1500)

const logoutUser = () => {
  isLoading.value = true;
  Loading.show({
    message: 'Logging out please wait..',
    spinner: QSpinnerFacebook,
    spinnerColor: 'grey-1',
    backgroundColor: 'grey-10',
    messageColor: 'grey-1'
  })
  handleLogout();
}
</script>
