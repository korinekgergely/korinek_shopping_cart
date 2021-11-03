type CartDisplayProps = {
  removeItem: (param: string) => void
  dataSource: Product[]
}

type InputFieldsProps = {
  getData: (startData: Product[]) => void 
  addItem: (itemName: string)=> void
}

type Product = {
  name: string
  price: number
  volume: number
}

type CartAction = 
| {
  actionType:  'initState'
  start: Product[]
}
| {
  actionType: 'incrementProduct' | 'deleteProduct' 
  value: string
}

export type { CartDisplayProps, InputFieldsProps, Product, CartAction }
