<template>
  <div>
    <div class="card shadow-lg p-4" style="width: 28rem;">
      <h1 class="text text-primary">fruitfact Search</h1>
      <form @submit.prevent="handleSubmit">
        <label for="fruitfactID_id" class="form-label">Fruit fact ID</label><br>
        <input
          type="number"
          class="form-control"
          v-model="fruitfactID"
          id="fruitfactID_id"
          placeholder="Enter a fruitfact ID"
          required
        /><br>
        <button class="btn btn-success mt-4 shadow-md">Fetch Fruit Facts</button>
      </form>

      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>

      <div v-if="fruitfact" class="card shadow-md mt-4">
        <h2 class="text text-primary">Result:</h2>
        <p class="mb-3"><strong>Fruit: </strong>{{ fruitfact.name }}</p>
        <p class="mb-3"><strong>fruitfact ID: </strong>{{ fruitfact.id }}</p>
        <p class="mb-3"><strong>Fruit fact: </strong>{{ fruitfact.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fruitfact = ref(null);
const fruitfactID = ref(null);
const loading = ref(false);
const error = ref(null);

async function handleSubmit() {
  if (!fruitfactID.value) {
    error.value = "Please enter a valid fruitfact ID.";
    return;
  }
  loading.value = true;
  error.value = null;
  fruitfact.value = null;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${fruitfactID.value}`
    );

    if (!response.ok) {
      throw new Error("fruitfact not found");
    }

    fruitfact.value = await response.json();

    if (!fruitfact.value || Object.keys(fruitfact.value).length === 0) {
      throw new Error("fruitfact not found");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

</script>
