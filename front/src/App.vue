<!-- App.vue -->
<template>
  <div id="app">
    <div v-if="showHelloWorld">
      <HelloWorld @showList="showImageList" />
    </div>
    <div v-else>
      <ImageList />
    </div>
  </div>
</template>


<script>
import HelloWorld from './components/uploadImage.vue';
import ImageList from './components/imageList.vue';

export default {
  components: {
    HelloWorld,
    ImageList
  },
  data() {
    return {
      showHelloWorld: true
    };
  },
  methods: {
    showImageList() {
      this.showHelloWorld = false;
    }
  }
};
</script>
