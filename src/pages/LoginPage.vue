<template>
  <q-page padding :class="Platform.is.mobile ? 'column justify-center q-gutter-y-xl bg-grey-3' : 'row q-gutter-x-xl bg-grey-3 items-center'">
    <div class="col">
      <q-img src="~assets/logo.png" alt="Batman Gallery Logo"/>
    </div>
    <div class="col column q-gutter-y-lg">
      <div class="column q-gutter-y-md items-center">
        <q-btn outline label="Continue with GitHub" size="lg" padding="10px 25px" no-caps icon="mdi-github" @click="signIn('github')"/>
        <q-btn outline label="Continue with Google" size="lg" padding="10px 25px" no-caps icon="mdi-google" @click="signIn('google')"/>
        <q-btn outline label="Continue with Facebook" size="lg" padding="10px 25px" no-caps icon="mdi-facebook" @click="signIn('facebook')"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { auth } from 'src/config/firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { Platform } from 'quasar';

defineComponent({
  name: 'LoginPage'
});

const userStore = useUserStore();
const router = useRouter()

const signIn = (options: string) => {
  console.log(options === 'google' ? 'google' : options === 'facebook' ? 'facebook' : 'github')
  const provider = options === 'google' ? new GoogleAuthProvider() : options === 'facebook' ? new FacebookAuthProvider() : new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userStore.initUser(user);
      router.push('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    })
}
</script>
