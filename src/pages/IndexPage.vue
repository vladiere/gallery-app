<template>
  <q-page padding :class="Platform.is.mobile ? 'column q-gutter-y-sm q-pb-xl' : 'row justify-center q-gutter-md q-pb-xl'">
    <div v-if="userCollections.length === 0 && !isLoading" class="window-height flex flex-center text-h3 text-grey-8" >
      No collection found!
    </div>

    <div v-if="isLoading" :class="Platform.is.mobile ? 'column q-gutter-y-md q-mt-xs' : 'row justify-center q-gutter-md fit'">
      <q-skeleton :class="Platform.is.mobile ? '' : 'col-8'" v-for="index in 6" :key="index" :height="Platform.is.mobile ? '200px' : '350px'" :width="Platform.is.mobile ? '100%' : '45%'" animation="wave"/>
    </div>

    <q-img v-for="item in userCollections" :key="item.id" class="rounded-borders" :src="item.imageURL" :width="Platform.is.mobile ? '100%' : '45%'">
      <div class="absolute-bottom column justify-center">
        {{ item.caption.toUpperCase() }}
      </div>
      <div class="absolute-top-right bg-transparent">
        <q-btn flat rounded color="red-5" icon="mdi-delete" padding="5px" @click="handleImageID(item.id, item.storageUID)">
          <q-tooltip class="bg-grey-10 text-grey-1" :delay="200">Delete this image</q-tooltip>
        </q-btn>
      </div>
    </q-img>

    <q-dialog v-model="confirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-alert" color="warning" text-color="red-5" />
          <span class="q-ml-sm">Are you sure you want to delete this image?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="toDeleteImgID = ''"/>
          <q-btn flat label="Yes please." color="red-5" @click="deleteImageDocument" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue';
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { useUserStore } from 'stores/user-store';
import { Notify } from 'quasar';
import { deleteImage } from 'src/handlers/uploadImageHandler';
import { Platform } from 'quasar';

defineComponent({
  name: 'IndexPage'
});

const userStore = useUserStore();
const userCollections = ref([]);
const confirmDialog = ref(false);
const isLoading = ref(false);
const toDeleteImg = ref({
  imgID: '',
  storageUID: '',
});

const handleImageID = (imgID, storageUID) => {
  confirmDialog.value = true;
  toDeleteImg.value.imgID = imgID;
  toDeleteImg.value.storageUID = storageUID;
}

const getCollections = async () => {
  try {
    isLoading.value = true;
    const q = collection(db, userStore.uid);

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      userCollections.value.push({
        id: doc.id,
        ...doc.data()
      })
    });
  } catch (error) {
    throw error
  } finally {
    isLoading.value = false;
  }
}

const deleteImageDocument = async () => {
  try {
    isLoading.value = true;
    confirmDialog.value = false;

    await deleteDoc(doc(db, userStore.uid, toDeleteImg.value.imgID));

    await deleteImage(toDeleteImg.value.storageUID);

    userCollections.value = [];
    await getCollections();

    toDeleteImg.value.storageUID = '';
    toDeleteImg.value.imgID = '';

    Notify.create({
      message: 'Image deleted successfully',
      position: 'top',
      type: 'positive',
      timeout: 3100,
      progress: true
    })
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await getCollections();
})
</script>
