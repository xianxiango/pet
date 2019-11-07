<template>
  <li class="h-selector-option">
    <slot>{{value}}</slot>
  </li>
</template> <script>
export default {
  name: "hOption",
  props: { value: { type: [String, Number], required: true } }
};
</script>
