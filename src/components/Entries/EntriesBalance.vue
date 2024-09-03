<template>
    <div class="row q-px-md q-py-sm bg-white items-center"
        :class="useLightOrDark('shadow-up-3', 'bg-black')"
    >
        <div class="col">
            <p class="balance-text text-grey-7 text-h6">Balance:</p>
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <p class="balance-amount text-h6 text-right" :class="currencyColor(store.calculateBalance)">{{ amountIntoCurrency(store.calculateBalance)  }} </p>
                </div>
            </div>
            <div v-if="store.calculateBalancePaid" class="row">
                <div class="col">
                    <p class="balance-amount-paid text-caption text-right text-grey-6">
                        Paid: <span class="text-weight-bold" :class="currencyColor(store.calculateBalancePaid)">{{ amountIntoCurrency(store.calculateBalancePaid) }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useEntriesStore } from 'src/stores/storeEntries';
    import { useCurrencify } from 'src/composable/useCurrencify';
    import { useLightOrDark } from 'src/composable/useLightOrDark';

    const store = useEntriesStore()
    const { amountIntoCurrency, currencyColor } = useCurrencify();
</script>