<template>
  <input
    class="inputWrapper"
    ref="input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    v-model="innerValue"
  />
</template>

<script>
export default {
  data() {
    return {
      innerValue: '',
    };
  },
  props: {
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
    },
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
};
</script>

<style lang="scss">
.inputWrapper {
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: #c1593f;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  margin: 5px;
}
</style>
