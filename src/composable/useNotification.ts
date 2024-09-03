import { Notify } from 'quasar'
import { Entries } from 'src/interfaces/models'
import { useCurrencify } from './useCurrencify'

export const useNotification = () => {

    const { amountIntoCurrency } = useCurrencify()

    const createNotification = (msg: string, color: string) => {

        Notify.create({
            message: msg,
            color: color,
            html: true,
            position: 'top-right'
        })
    }

    const showNotification = (type: string, entry: Entries) => {
        let message;
        let notifyClass;
        if(type.includes('added')) {
          message = `
            <div class="text-weight-bold"> New entry added: <span class="text-weight-regular">${entry.name}: ${amountIntoCurrency(entry.amount)}</span></div>
            `
          notifyClass = "positive"
          createNotification(message, notifyClass)
        } else if(type.includes('delete')) {
          message = `
              <div class="text-weight-bold"> Entry deleted: <span class="text-weight-regular">${entry.name}: ${amountIntoCurrency(entry.amount)}</span></div>
            `
          notifyClass = "negative"
          createNotification(message, notifyClass)
        }
    }

    return {
        createNotification,
        showNotification
    }

}