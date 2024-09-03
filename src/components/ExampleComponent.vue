<template>
 {{  content  }}
</template>

<script setup lang="ts">

interface Props {
  content: string;
};

const props = withDefaults(defineProps<Props>(), {
  content: "",
});
</script>
