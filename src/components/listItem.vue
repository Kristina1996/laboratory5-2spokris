<template>
  <li>
    {{ todo.color }}
  </li>
</template>

<script>

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>