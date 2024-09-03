<template>
    <div class="text-center q-pt-xl">
        <q-icon 
            name="savings"
            size="100px"
            :color="useLightOrDark('grey-4', 'grey-8') as string"
        />
        <p class="text-grey-5">No Entries Yet</p>
    </div>
</template>

<script setup lang="ts">
import { useLightOrDark } from 'src/composable/useLightOrDark';
</script>