import { Dark } from "quasar"

export const useLightOrDark = (lightStr:string | boolean, darkStr:string | boolean) => {
    return !Dark.isActive ? lightStr : darkStr
}