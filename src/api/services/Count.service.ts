import { EnumCountGetObject } from '@/types/Count.enum'
import api from '../Interceptor'

enum EnumCountRoute {
    getCount = '/count/',
}

class Count {
    async count(object: EnumCountGetObject): Promise<number> {
        return (await api.get(EnumCountRoute.getCount + object)).data
    }
}

export default new Count()
