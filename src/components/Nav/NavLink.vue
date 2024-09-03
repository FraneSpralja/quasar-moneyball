<template>
  <q-item :to="{ name: navTo }">
    <q-item-section
      v-if="icon"
      class="text-white"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

import { EssentialLinkProps } from 'src/interfaces/models';

defineOptions({
  name: 'EssentialLink'
});

withDefaults(defineProps<EssentialLinkProps>(), {
  navTo: '#',
  icon: '',
});
</script>
