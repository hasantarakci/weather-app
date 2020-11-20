<template>
  <footer>
    <h1>{{ footer }}</h1>
  </footer>
</template>

<script>
export default {
  props: {
    footer: {
      type: String,
      default: 'Footer',
    },
  },
};
</script>

<style lang="scss">
footer {
  width: 100%;
  background-color: #e96e50;
  border-radius: 4px;
  text-align: center;
  padding: 10px;
}
</style>
