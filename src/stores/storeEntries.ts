import { defineStore } from "pinia";
import { Entries } from "src/interfaces/models";
import { LocalStorage } from "quasar";
import { useNotification } from "src/composable/useNotification";
import { computed, ref, reactive, watch } from "vue";
import type { Ref } from "vue";

export const useEntriesStore = defineStore('entries', () => {

    const { showNotification } = useNotification()

    // STATE
    const entries: Ref <Entries[]> = ref([
        // {
        //     id: 'id1',
        //     name: 'Salary',
        //     amount: 1400000,
        //     paid: true,
        // },
        // {
        //     id: 'id2',
        //     name: 'School',
        //     amount: -496000,
        //     paid: false,
        // },
        // {
        //     id: 'id3',
        //     name: 'Rent',
        //     amount: -550000,
        //     paid: false,
        // },
        // {
        //     id: 'id4',
        //     name: 'Depto',
        //     amount: 380000,
        //     paid: false,
        // },
        // {
        //     id: 'id5',
        //     name: 'New Gasto',
        //     amount: -400000,
        //     paid: false,
        // },
    ])

    const options = reactive({
        sort: false
    })

    watch(entries, (newEntries) => {
        console.log(newEntries)
        saveEntries(newEntries)
    })

    // GETTERS
    const getEntries = computed(() => entries.value)
    
    const calculateBalance = computed(() => entries.value.reduce((a, b) => a += b.amount, 0))
    
    const calculateBalancePaid = computed(() => entries.value.reduce((a, b) => b.paid ? a += b.amount : a , 0))

    const runningBalances = computed(() => {
        let runningBalances:number[] = [],
            currentRunningBalance = 0;
        
        if(entries.value.length) {
            entries.value.forEach((entry) => {
                let entryAmount = entry.amount ? entry.amount : 0;
                currentRunningBalance = currentRunningBalance + entryAmount

                runningBalances.push(currentRunningBalance)
            })
        }

        return runningBalances;
    })
    // ACTIONS
    const addNewEntrie = (entry: Entries) => {
        const totalEntries: Entries[] = [  ...entries.value ]
        const newEntry: Entries = { ...entry }
    
        totalEntries.push(newEntry)
    
        entries.value = [ ...totalEntries ]
    
        showNotification("added", entry)
    }

    const deleteItemFromList = (entry:Entries) => {
        const totalEntries:Entries[] = [ ...entries.value ]
        const cleanEntries: Entries[] = totalEntries.filter(item => item.id !== entry.id)
      
        entries.value = [ ...cleanEntries ]
        showNotification("delete", entry)
    }

    const editEntryById = ( entry:Entries ) => {
        const { id } = entry
        const cloneEntries:Entries[] = [ ...entries.value ]
        const index:number = cloneEntries.findIndex( item => item.id === id )
        let editedEntry:Entries = cloneEntries.find( item => item.id === id ) as Entries
        editedEntry = { ...entry }
        
        const newEntries:Entries[] = cloneEntries.filter( item => item.id !== id)
        newEntries.splice(index, 0, editedEntry)

        entries.value = [ ...newEntries ]
    }

    const updateSortEntries = ( { newIndex, oldIndex }:number | any ) => {
        const cloneEntries:Entries[] = [ ...entries.value ]
        const entry:Entries = cloneEntries.splice(oldIndex, 1)[0]
        cloneEntries.splice(newIndex, 0, entry)

        entries.value = [ ...cloneEntries ]
    }

    const saveEntries = (data:Entries[]) => {
        LocalStorage.set('entries', data)
    }

    const loadEntries = () => {
        const savedEntries =  LocalStorage.getItem('entries') as Entries[]

        if(savedEntries) Object.assign(entries.value, savedEntries)
    }

    return {
        /* State */ 
        entries, 
        options, 
        /* Getters */
        getEntries, 
        calculateBalance, 
        calculateBalancePaid,
        runningBalances, 
        /* Actions */
        addNewEntrie, 
        deleteItemFromList, 
        editEntryById, 
        updateSortEntries,
        loadEntries,
    }
})