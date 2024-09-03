<template>
    <div class="entries-edit-info-modal">
        <div class="entries-edit-info-modal__box">
            <input type="text" class="entries-edit-info-modal__input" v-select-all  v-model="editedEntry.name">
        </div>
        <div class="entries-edit-info-modal__box">
            <input type="number" class="entries-edit-info-modal__input" v-model="editedEntry.amount">
        </div>
        <div class="entries-edit-info-modal__box">
            <button class="entries-edit-info-modal__btn entries-edit-info-modal__btn--edit" @click="submitEditEntry">Edit Entry</button>
            <button class="entries-edit-info-modal__btn entries-edit-info-modal__btn--cancel" @click="emits('close-modal')">Cancel</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEntriesStore } from 'src/stores/storeEntries';
import { useLightOrDark } from 'src/composable/useLightOrDark';
import { Entries } from 'src/interfaces/models';
import { reactive } from 'vue';
import type { Reactive } from 'vue';
import vSelectAll from 'src/directives/directiveSelectAll';

interface Props {
    entry: Entries
}

const store = useEntriesStore()
const emits = defineEmits(['close-modal'])
const props = defineProps<Props>()
const editedEntry:Reactive<Entries> = reactive( { ...props.entry  })

const submitEditEntry = () => {
    store.editEntryById(editedEntry)
    emits("close-modal")
}

</script>