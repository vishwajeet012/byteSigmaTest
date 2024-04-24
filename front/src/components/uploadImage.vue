<template>
  <div>
    <div class="upload-section">
      <!-- Input for file selection -->
      <input type="file" @change="onFileChange">
      
      <!-- Display preview of selected image -->
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage" :style="{ filter: filter }" alt="Preview">
      </div>

      <!-- Filter options -->
      <div v-if="previewImage" class="filter-options">
        <button @click="applyGrayscaleFilter" class="filter-button grayscale">Grayscale</button>
        <button @click="applySepiaFilter" class="filter-button sepia">Sepia</button>
      </div>

      <!-- Button to trigger file upload -->
      <button @click="uploadFile" class="upload-button">Upload</button>
    </div>

    <!-- Button to switch to ImageList component -->
    <button @click="showList" class="list-button">Switch to List</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      file: null,
      previewImage: null,
      previewWidth: 200,
      previewHeight: 200,
      filter: null
    }
  },
  methods: {
    onFileChange(e) {
      // Update selected file
      this.file = e.target.files[0];

      // Display preview of selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        // Reset filter when a new image is selected
        this.filter = null;
      };
      reader.readAsDataURL(this.file);
    },
    applyGrayscaleFilter() {
      this.filter = 'grayscale(100%)';
    },
    applySepiaFilter() {
      this.filter = 'sepia(100%)';
    },
    uploadFile() {
  // Create FormData object
  const formData = new FormData();
 
  // Append the selected file and filter to the FormData object
  formData.append('image', this.file);
  formData.append('filter', this.filter); // Include the filter information

  // Make a POST request to your backend API endpoint to upload the image
  axios.post('http://localhost:3000/api/upload', formData)
    .then(() => {
      // Reset the file input and preview image
      this.file = null;
      this.previewImage = null;
      console.log('Image uploaded successfully');
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
},

    showList() {
      this.$emit('showList');
    }
  }
};
</script>

<style>
.upload-section {
  margin-bottom: 20px;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
}

.filter-options {
  margin-top: 10px;
}

.filter-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.grayscale {
  background-color: #6c757d;
  color: #fff;
}

.sepia {
  background-color: #d39e00;
  color: #fff;
}

.upload-button, .list-button { 
  padding: 10px 20px; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px; 
  cursor: pointer;
}

.upload-button:hover, .list-button:hover, .filter-button:hover {
  opacity: 0.8;
}
</style>
