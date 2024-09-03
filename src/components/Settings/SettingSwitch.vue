<template>
    <div class="q-pa-md">
    <q-list bordered padding>
        <q-item-label header>Notifications</q-item-label>

        <q-item tag="label" v-ripple>
            <q-item-section>
                <q-item-label>Promt to Delete</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-toggle 
                    v-model="userSettings.promptToDelete"
                />
            </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
            <q-item-section>
                <q-item-label>Show Running Balance</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-toggle 
                    v-model="userSettings.showRunningBalance"
                />
            </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
            <q-item-section>
                <q-input outlined v-model="userSettings.currencySymbol" label="Currency Symbol" v-select-all />
            </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item-label header>Appearence</q-item-label>

        <q-item tag="label" v-ripple>
            <q-item-section avatar>
                <q-radio v-model="userSettings.darkMode" :val="true" color="teal" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Dark</q-item-label>
            </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
            <q-item-section avatar>
                <q-radio v-model="userSettings.darkMode" :val="false"/>
            </q-item-section>
            <q-item-section>
                <q-item-label>Light</q-item-label>
            </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
            <q-item-section avatar top>
                <q-radio v-model="userSettings.darkMode" val="auto"/>
            </q-item-section>
            <q-item-section>
                <q-item-label>Auto</q-item-label>
                <q-item-label caption>Follow the preference of your device</q-item-label>
            </q-item-section>
        </q-item>

    </q-list>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/storeSettings';
import vSelectAll from 'src/directives/directiveSelectAll'; 

const { userSettings } = storeToRefs(useSettingsStore())

</script>