<template>
<div>
  <label :for="controlId"> {{ label }}</label>
  <input :type="elementType"
         :placeholder="placeholder"
         :id="controlId"
         :value="value"
         @input="$emit('input', $event.target.value)"
  >
</div>
</template>

<script>
export default {
  props: [
    'controlId','label', 'elementType', 'placeholder', 'value', 'validation', 'invalid', 'touched'
  ]
}
</script>

<style>

</style>