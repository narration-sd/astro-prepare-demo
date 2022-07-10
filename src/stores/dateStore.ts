import { defineStore } from "pinia";
// @ts-ignore
import piniaPersist from "pinia-plugin-persist"   //need this to type the extra persist config...
import parseISO from 'date-fns/fp/parseISO'

const useDateStore = defineStore('dateStore', {
    state: () => {
        return {
            date: new Date(),
            count: 0
        }
    },
    actions: {
        increment() {
            this.count++
        },
        setDate(newDate: Date) {
            this.date = newDate
            console.log('setDate new Date: ' + this.date)
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'astroblog',
                storage: localStorage,
            },
        ],
    }
})

export { useDateStore }