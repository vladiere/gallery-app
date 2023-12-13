<template>
  <q-page padding class="row justify-center q-gutter-md">
    <div class="window-height flex flex-center text-h3 text-grey-8" >
      No collection found!
    </div>
    <!-- <q-img v-for="index in 10" :key="index" :src="`https://picsum.photos/1220/900?random=${index}`" width="45%"> -->
    <!--   <div class="absolute-bottom column justify-center"> -->
    <!--     Title #{{ index }} -->
    <!--   </div> -->
    <!--   <div class="absolute-top-right bg-transparent"> -->
    <!--     <q-btn flat rounded color="red-5" icon="mdi-delete" padding="5px" > -->
    <!--       <q-tooltip class="bg-grey-10 text-grey-1" :delay="200">Delete this image</q-tooltip> -->
    <!--     </q-btn> -->
    <!--   </div> -->
    <!-- </q-img> -->
  </q-page>
</template>

<script setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'IndexPage'
})
</script>
