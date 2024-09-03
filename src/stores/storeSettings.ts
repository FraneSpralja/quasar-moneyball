import { defineStore } from "pinia";
import { Settings } from "src/interfaces/models";
import { Dark, LocalStorage } from "quasar";
import { reactive, watch } from "vue";
import type { Reactive } from "vue";

export const useSettingsStore = defineStore('settings', () => {

    // STATE
    const userSettings:Reactive<Settings> = reactive({
        promptToDelete: true,
        showRunningBalance: false,
        currencySymbol: '$',
        darkMode: 'auto', // false | true | 'auto'
    })

    // watch dark-mode
    watch(() => userSettings.darkMode, (value) => Dark.set(value), {
        immediate: true,
    })

    // watch settings
    watch(userSettings, () => {
        saveSettings()
    })
    // GETTERS

    // ACTIONS
    const saveSettings = () => {
        LocalStorage.set('settings', userSettings)
    }

    const loadSettings = () => {
        const savedSettings = { ...LocalStorage.getItem('settings') } as Settings;

        if(savedSettings) Object.assign(userSettings, savedSettings)
    }

    return {
        // state
        userSettings,

        // getters

        // actions
        loadSettings,
    }
})