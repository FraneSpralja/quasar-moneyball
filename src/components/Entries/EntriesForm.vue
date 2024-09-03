<template>
    <div class="row q-col-gutter-sm q-pa-sm bg-primary">
        <div class="col">
            <q-input
                v-model="name" 
                placeholder="Name"
                :bg-color="useLightOrDark('white', 'black') as string"
                outlined
                dense
                ref="inputName"
            />
        </div>
        <div class="col">
            <q-input 
                v-model.number="amount"
                placeholder="Amount"
                :bg-color="useLightOrDark('white', 'black') as string"
                input-class="text-right"
                type="number"
                outlined
                dense
            />
        </div>
        <div class="col col-auto">
            <q-btn
                color="primary"
                icon="add"
                round
                @click="submitNewEntrie"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Entries } from 'src/interfaces/models';
import { uid } from 'quasar'
import { reactive, ref } from 'vue';
import type { Reactive, Ref } from 'vue';
import { useEntriesStore } from 'src/stores/storeEntries';
import { useLightOrDark } from 'src/composable/useLightOrDark';

const store = useEntriesStore()

const inputName: Ref<HTMLInputElement | undefined> = ref()
const name:Ref<string> = ref('')
const amount:Ref<number | any> = ref(null)
    
const newEntrie:Reactive<Entries> = reactive({
    id: '',
    name: '',
    amount: 0,
    paid: false,
})

const submitNewEntrie = () => {
    newEntrie.id = uid();
    newEntrie.name = name.value
    newEntrie.amount = amount.value

    store.addNewEntrie(newEntrie)

    name.value = ""
    amount.value = null

    inputName.value?.focus()
}

</script>