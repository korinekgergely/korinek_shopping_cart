import React, { useReducer } from 'react'
import './App.css'
import CartDisplay from './components/CartDisplay'
import InputFields from './components/InputFields'
import { Product, CartAction } from './TS.types'

const initialState: Product[] = []

const reducer = (state: Product[], action: CartAction) => {
  switch (action.actionType) {
    case 'initState':
      return [...action.start]

    case 'incrementProduct':
      return state.map((product: Product) => {
        if (product.name === action.value) {
          const currVolume = product.volume
          return { ...product, volume: currVolume + 1 }
        }
        return product
      })

    case 'deleteProduct':
      return state.map((product: Product) => {
        if (product.name === action.value) {
          return { ...product, volume: 0 }
        }
        return product
      })

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getData = (startData: Product[]) => {
    dispatch({ actionType: 'initState', start: startData })
  }
  const addItem = (itemName: string) => {
    dispatch({ actionType: 'incrementProduct', value: itemName })
  }
  const removeItem = (itemName: string) => {
    dispatch({ actionType: 'deleteProduct', value: itemName })
  }
  return (
    <div className='App'>
      <div className='ramen'>
        <CartDisplay dataSource={state} removeItem={removeItem} />
      </div>
      <div className='ramen'>
        <InputFields getData={getData} addItem={addItem} />
      </div>
    </div>
  )
}

export default App
