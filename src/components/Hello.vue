<template>
  <div class="hello">
  
  </div>
</template>

<script>
console.clear();
import axios from "axios";
let api = "https://api.github.com/users/yiochen/repos";
axios.get(api)
  .then((response) => {
    console.log(response.data.map(item => item.name));
  })
  .catch((error) => console.log(error));

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
