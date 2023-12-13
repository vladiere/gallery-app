<template>
  <q-layout view="lHh LpR fFf">

    <q-header elevated class="bg-grey-4 text-dark" bordered>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/logo.png" height="100%" width="150px" />
        </q-toolbar-title>

        <span class="text-h6 text-weight-regular q-mx-md">Hi! Lance Phillip</span>
        <q-btn-dropdown flat rounded dropdown-icon="mdi-chevron-down" padding="2px">
          <q-list dense>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label class="text-red-5">Delete account</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Add new picture</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Logout account</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const onItemClick = () => {
  console.log('Testing')
}
</script>
