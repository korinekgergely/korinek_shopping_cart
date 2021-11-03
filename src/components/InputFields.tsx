import React, { useState, useEffect } from 'react'
import { setUnique } from '../utils/ArrayUtils'
import { InputFieldsProps, Product } from './../TS.types'
import BasicInfo from './BasicInfo'
import {EVERY_SECOND, ELEMENT_MISSING} from './../Error.consts'

const InputFields: React.FC<InputFieldsProps> = (props) => {
  const { getData, addItem } = props
  const [filtered, setfiltered] = useState<Product[]>([])
  let dataSource = []
  const [errors, seterrors] = useState<string>('')

  useEffect(() => {
    getData(filtered)
  }, [filtered])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    seterrors('')
    const valueOfTextarea: string =
      event.currentTarget.inputProducts.value.trim()
    let valueOfTextareaTrimmed

    // removes the last char if that is a comma
    if (valueOfTextarea.slice(-1) === ',') {
      valueOfTextareaTrimmed = valueOfTextarea.slice(0, -1)
    } else {
      valueOfTextareaTrimmed = valueOfTextarea
    }

    // convert to array
    const collectionOfProductsArr = valueOfTextareaTrimmed.split(',')

    // check if right length
    if (collectionOfProductsArr.length % 2 !== 0) {
      seterrors(ELEMENT_MISSING)
    }

    // converts every second value to num
    const convertedNumsArr = collectionOfProductsArr.map(
      (item: any, index: number) => {
        if (index % 2 !== 0) {
          item = parseFloat(item)
          if (isNaN(item)) {
            seterrors(EVERY_SECOND)
          }
        }
        return item
      }
    )

    //convert final array to obj
    const len = convertedNumsArr.length / 2
    dataSource = [] as Product[]
    for (let index = 0; index < len; index++) {
      const l = convertedNumsArr.splice(0, 2)
      dataSource.push({ name: l[0].trim(), price: l[1], volume: 0 })
    }
    setfiltered(setUnique(dataSource))
  }

  return (
    <div className='inputArea'>
      <BasicInfo />
      <form onSubmit={handleSubmit}>
        <textarea
          id='inputProducts'
          name='inputProducts'
          className='mainInputTextarea'
        />
        <div>
          <button type='submit'>Pharse and Reset</button>
        </div>
      </form>
      {errors && <div className='errorField'>{errors}</div>}

      <p>Press the buttons below to add product to your chart.</p>

      <div className='productButtonContainer'>
        {filtered.map((product: Product) => (
          <div className='productButton'>
            <button key={product.name} onClick={() => addItem(product.name)}>
              {product.name}
            </button>{' '}
            <div>
              <span>price: <strong>{product.price}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(InputFields)
