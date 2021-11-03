import { Product } from './../TS.types'

const calculateFullPrice: (dataSource:Product[]) => number = (dataSource:Product[]) => {
    return Object.values(dataSource).reduce((total: number, value: Product) => {
      return total + value.price * value.volume
    }, 0)
  }

  export {calculateFullPrice}