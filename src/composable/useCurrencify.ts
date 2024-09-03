import { useSettingsStore } from "src/stores/storeSettings"

export const useCurrencify = () => {

    const { userSettings } = useSettingsStore()

    const amountIntoCurrency = (number: number): string => {
        const cantidad = number < 0 ? number * -1 : number
        const pesos = new Intl.NumberFormat('en-DE')
        return `${number < 0 ? '- ' : '+ '} ${ userSettings.currencySymbol } ${pesos.format(cantidad)}`;
    }

    const currencyColor = (number: number): string => number < 0 ? 'text-negative' : 'text-positive';

    return {
        amountIntoCurrency,
        currencyColor
    }

}