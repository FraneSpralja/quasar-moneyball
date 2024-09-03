<template>
      <q-footer class="bg-transparent">
        <Transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
              <EntriesBalance v-if="entries.length"></EntriesBalance>
        </Transition>
        <EntriesForm></EntriesForm>
      </q-footer>
</template>

<script setup lang="ts">
import { Entries } from 'src/interfaces/models';
import EntriesBalance from './EntriesBalance.vue';
import EntriesForm from './EntriesForm.vue';
import { useEntriesStore } from 'src/stores/storeEntries';
import { storeToRefs } from 'pinia';

const { entries } = storeToRefs(useEntriesStore())

defineProps<{
      entries: Array<Entries>
}>()

</script>