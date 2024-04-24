<template>
  <div>
    <h2>Uploaded Images</h2>
    <ul>
      <li v-for="image in images" :key="image.filename">
        <div>
          <img :src="getImageUrl(image.filename)" :alt="image.filename" width="100">
          <div>File Name: {{ image.filename }}</div>
          <div>Upload Date: {{ formatDate(image.uploadDate) }}</div>
          <div v-if="image.filter">Applied Filter: {{ image.filter }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageList',
  data() {
    return {
      images: []
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    fetchImages() {
    axios.get('http://localhost:3000/api/images')
      .then(response => {
        this.images = response.data.map(image => {
          // Apply filter if available
          if (image.filter) {
            image.imageUrl = `${image.imageUrl}?filter=${image.filter}`;
          }
          return image;
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  },
    getImageUrl(filename) {
      return `http://localhost:3000/uploads/${filename}`; // Update this URL with the correct base URL of your backend server
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
};
</script>
