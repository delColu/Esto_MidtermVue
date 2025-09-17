<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <div class="card-header mb-3 align-items-center">
    <h1>Hello World</h1>
    <nav class="nav nav-pills">
      <router-link to="/"><button>Home</button></router-link>
      <router-link to="/about"><button>About</button></router-link>
      <router-link to="/fruitfacts"><button>Fruit facts</button></router-link>
    </nav>
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App",
};
</script>
