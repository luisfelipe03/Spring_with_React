import { toast, TypeOptions } from 'react-toastify'

export const useNotification = () => {
    function notify(message: string, level: TypeOptions | undefined) {
        toast(message, {
            type: level
        })
    }

    return {
        notify
    }
}