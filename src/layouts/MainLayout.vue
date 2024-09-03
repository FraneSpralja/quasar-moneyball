<template>
  <q-layout view="lHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" /> 
            Moneyballs
          </div>
        </q-toolbar-title>
        <q-btn
        v-if="!$route.fullPath.includes('settings')"
          @click="options.sort = !options.sort" 
          :label="options.sort ? 'Done' : 'Sort'"
          flat
          no-caps
          dense
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :breakpoint="768"
      :width="250"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="text-white"
          header
        >
          Essential Links
        </q-item-label>

        <NavLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavLink from 'components/Nav/NavLink.vue';
import { EssentialLinkProps } from 'src/interfaces/models';
import { useEntriesStore } from 'src/stores/storeEntries';
import { useLightOrDark } from 'src/composable/useLightOrDark';

defineOptions({
  name: 'MainLayout'
});

const { options } = useEntriesStore()

const linksList: EssentialLinkProps[] = [
  {
    title: 'Entries',
    icon: 'savings',
    navTo: 'entries'
  },
  {
    title: 'Settings',
    icon: 'settings',
    navTo: 'settings'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

