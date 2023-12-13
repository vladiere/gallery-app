<template>
  <q-page padding class="row q-gutter-x-xl bg-grey-3 items-center">
    <div class="col">
      <q-img src="~assets/logo.png" alt="Batman Gallery Logo"/>
    </div>
    <div class="col column q-gutter-y-lg">
      <div class="row q-gutter-x-md items-center">
        <q-btn outlined label="Login with Facebook" size="lg" no-caps color="primary" icon="mdi-facebook" @click="signIn('facebook')"/>
        <q-btn outlined label="Login with Google" size="lg" no-caps color="grey-8" icon="mdi-google" @click="signIn('google')"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { app } from 'src/config/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

defineComponent({
  name: 'LoginPage'
});

const auth = getAuth(app);

const signIn = (options: string) => {
  const provider = options === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const credential = options === 'google' ? GoogleAuthProvider.credentialFromResult(result) : FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token, user);
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
