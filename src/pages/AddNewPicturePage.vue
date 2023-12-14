<template>
  <q-page padding>
    <div :class="Platform.is.mobile ? 'column q-gutter-y-sm' : 'row justify-center q-gutter-x-lg'">
      <q-input class="col-3" dense outlined label="Image Caption" v-model="caption" />
      <q-file class="col-3" dense outlined label="Select an image" v-model="file" @input="handleFileChange" accept="image/*"/>
      <q-btn color="grey-4" class="text-grey-10" no-caps label="Upload" @click="uploadImg" :loading="isLoading"/>
    </div>
    <img
      v-if="imageURL"
      class="q-mt-md rounded-borders"
      :src="imageURL"
      style="width: 100%"
    />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { Notify } from 'quasar';
import { useUserStore } from 'stores/user-store';
import { uploadImage } from 'src/handlers/uploadImageHandler';
import { Platform } from 'quasar';

defineComponent({
  name: 'AddNewPicture'
})
const file = ref(null);
const caption = ref('');
const resultImg = ref(null);
const isLoading = ref(false);
const imageURL = ref('');
const userStore = useUserStore();

const handleFileChange = () => {
  // Display a preview of the selected image
  imageURL.value = '';
  if (file.value) {
    const reader = new FileReader();
    reader.onload = () => {
      imageURL.value = reader.result;
    };
    reader.readAsDataURL(file.value);
  } else {
    imageURL.value = '';
  }
};

watch(file, handleFileChange);

const uploadImg = async () => {
  try {
    isLoading.value = true;
    if (file.value && caption.value !== '') {
      resultImg.value = await uploadImage(file.value);

      await addCaptionImage();
    } else {
      Notify.create({
        message: 'Please fill out the fields',
        position: 'top',
        timeout: 2500,
        progress: true,
        type: 'warning'
      })
    }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}

const addCaptionImage = async () => {
  try {
    await addDoc(collection(db, userStore.uid,), {
      caption: caption.value,
      imageURL: resultImg.value.result,
      storageUID: resultImg.value.storageUID
    });

    imageURL.value = '';
    caption.value = '';
    file.value = null;

    Notify.create({
      message: 'Image uploaded successfully',
      position: 'top',
      timeout: 2500,
      progress: true,
      type: 'positive'
    });
  } catch (error) {
    throw error;
  }
}

</script>
