<template>
  <q-page>
      <template v-if="entries.length > 0" >
        <Sortable 
          :list="entries" 
          item-key="id" 
          tag="div" 
          :options="{ handle: '.sort-handler' }"
          @end="updateSortEntries"
        >
          <template #item="{ element, index }">
            <EntriesInfo :entry="element" :index>
            </EntriesInfo>
          </template>
        </Sortable>
      </template>
      
      <Transition appear enter-active-class="animated jackInTheBox slower">
        <EntriesEmpty v-if="entries.length <= 0"></EntriesEmpty>
      </Transition>
    <EntriesFooter :entries="entries"></EntriesFooter>
  </q-page>
</template>

<script setup lang="ts">
import { Sortable } from 'sortablejs-vue3';
import EntriesEmpty from 'src/components/Entries/EntriesEmpty.vue';
import EntriesInfo from 'src/components/Entries/EntriesInfo.vue';
import EntriesFooter from 'src/components/Entries/EntriesFooter.vue';
import { useEntriesStore } from 'src/stores/storeEntries';
import { storeToRefs } from 'pinia';

const { entries } = storeToRefs(useEntriesStore())
const { updateSortEntries } = useEntriesStore()

</script>
