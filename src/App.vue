<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEntriesStore } from './stores/storeEntries';
import { useSettingsStore } from './stores/storeSettings';

defineOptions({
  name: 'App'
});

const { loadEntries } = useEntriesStore()
const { loadSettings } = useSettingsStore()

onMounted(() => {
  loadEntries()
  loadSettings()
})
</script>
