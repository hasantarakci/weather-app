<template>
  <button @click="click" type="submit" class="buttonWrapper">
    {{ buttonTitle }}
  </button>
</template>

<script>
export default {
  props: {
    buttonTitle: {
      type: String,
      default: "Button"
    }
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="scss">
.buttonWrapper {
  background-color: #e96e50;
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: #c1593f;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  width: 100px;
}
</style>
