<template>
    <div class="q-pa-md">
        <q-list bordered separator>
            <q-slide-item 
                @right="onRight"
                @left="onLeft"
                @click="open_modal = true"
                right-color="negative"
                left-color="positive"
                :class="entry.paid ? useLightOrDark('bg-grey-2', 'bg-grey-10') : useLightOrDark('bg-white', 'bg-black')"
            >
                <template v-slot:right>
                    <q-icon name="delete" />
                </template>

                <template v-slot:left>
                    <q-icon name="done" />
                </template>
                <q-item>
                    <q-item-section>
                        <q-item-label 
                            class="text-weight-bold" 
                            :class="[ 
                                currencyColor(entry.amount),
                                { 'text-strike': entry.paid },    
                            ]"
                        >{{ entry.name }}</q-item-label>
                    </q-item-section>
                    
                    <q-item-section side>
                        <q-item-label 
                            class="text-weight-bold relative-position"
                            :class="currencyColor(entry.amount)"
                            caption
                        >
                            <span :class="{ 'text-strike': entry.paid }">{{ amountIntoCurrency(entry.amount) }}</span>
                            <q-chip
                                v-if="userSettings.showRunningBalance"
                                class="running-balance absolute-bottom-right"
                                :class="currencyColor(store.runningBalances[index])" 
                                outline 
                                size="9px"
                                dense
                            >
                                {{ amountIntoCurrency(store.runningBalances[index]) }}
                            </q-chip>
                        </q-item-label>
                    </q-item-section>
                    <q-item-section v-if="store.options.sort" side>
                        <q-icon name="reorder" color="primary" class="sort-handler"/>
                    </q-item-section>
                </q-item>
            </q-slide-item>
        </q-list>
    </div>

    <Transition name="modal-overlay">
        <div v-if="open_modal" class="modal-overlay" @click="open_modal = false"></div>
    </Transition>
    <Transition name="modal-bottom">
        <EntriesEditInfo v-if="open_modal" :entry="entry" @close-modal="open_modal = false"/>
    </Transition>
</template>

<script setup lang="ts">
import EntriesEditInfo from './EntriesEditInfo.vue';
import { Entries } from '../../interfaces/models';
import { useQuasar  } from 'quasar'
import { useCurrencify } from 'src/composable/useCurrencify';
import { useLightOrDark } from 'src/composable/useLightOrDark';
import { useEntriesStore } from 'src/stores/storeEntries';
import { useSettingsStore } from 'src/stores/storeSettings';
import { ref } from 'vue';
import type { Ref } from 'vue';

interface Props {
    entry: Entries,
    index: number,
}

const store = useEntriesStore()
const { userSettings } = useSettingsStore()
const $q = useQuasar()
const emits = defineEmits([ "delete-item" ])
const props = defineProps<Props>()

const { amountIntoCurrency, currencyColor } = useCurrencify()

const open_modal:Ref<boolean> = ref(false)

const onRight = ({ reset }) => {
    if(userSettings.promptToDelete) {
        $q.dialog({
            title: 'Delete Entry',
            message: `Delete this entry?
            <p class="text-weight-bold ${currencyColor(props.entry.amount)}">${props.entry.name}: ${amountIntoCurrency(props.entry.amount)}</p>`,
            persistent: true,
            html: true,
            ok: {
                label: "Delete",
                color: "negative",
                noCaps: true,
            },
            cancel: {
                color: "primary",
                noCaps: true
            }
        })
        .onOk(() => deleteItem(props.entry.id))
        .onCancel(() => reset())
    } else if(!userSettings.promptToDelete) {
        deleteItem(props.entry.id)
    }
}

const onLeft = ( { reset } ) => {
    const paidEntry:Entries = props.entry
    paidEntry.paid = !paidEntry.paid
    store.editEntryById(paidEntry)

    reset()
}

const deleteItem = (id:string) => store.deleteItemFromList(props.entry)

</script>