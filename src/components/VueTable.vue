<template>
  <table>
    <tr v-for="(item, key, index) in data" :key="index">
      <td>{{ key }}</td>
      <td>{{ item }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
table,
td {
  border: 1px solid #b4b4b4;
  border-collapse: collapse;
}
table {
  width: 100%;
  tr {
    &:nth-child(2n) {
      background-color: #ddd;
    }
    td {
      padding: 3px 10px;
      vertical-align: middle;
      &:first-child {
        font-weight: bold;
      }
    }
  }
}
</style>
