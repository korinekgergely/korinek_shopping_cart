import React, { useState, useEffect } from 'react'
import { setUnique } from '../utils/ArrayUtils'
import { InputFieldsProps, Product } from './../TS.types'
import BasicInfo from './BasicInfo'
import { EVERY_SECOND, ELEMENT_MISSING } from './../Error.consts'

const InputFields: React.FC<InputFieldsProps> = (props) => {
  const { getData, addItem } = props
  const [filtered, setfiltered] = useState<Product[]>([])
  let dataSource = []
  const [errors, seterrors] = useState<string>('')

  useEffect(() => {
    getData(filtered)
  }, [filtered])

  const removeLastComma: (inputstring: string) => string = (
    inputstring: string
  ) => {
    if (inputstring.slice(-1) === ',') {
      return inputstring.slice(0, -1)
    } else {
      return inputstring
    }
  }

  const checkMissingElement: (inputArr: string[]) => void = (
    inputArr: string[]
  ) => {
    if (inputArr.length % 2 !== 0) {
      seterrors(ELEMENT_MISSING)
    }
  }

  const convertEverySecondToNum: (inputArr: string[]) => any[] = (
    inputArr: string[]
  ) => {
    return inputArr.map((item: any, index: number) => {
      if (index % 2 !== 0) {
        item = parseFloat(item)
        if (isNaN(item)) {
          seterrors(EVERY_SECOND)
        }
      }
      return item
    })
  }

  const convertArrToObj: (inputArr: any[] ) => void = (
    inputArr: any[] 
  ) => {
    const len = inputArr.length / 2
    dataSource = [] as Product[]
    for (let index = 0; index < len; index++) {
      const l = inputArr.splice(0, 2)
      dataSource.push({ name: l[0].trim(), price: l[1], volume: 0 })
    }
    setfiltered(setUnique(dataSource))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // start pharsing. reset errors
    seterrors('')

    // remove spaces from start and end of textarea string remove the last comma
    const valueOfTextarea: string = removeLastComma(
      event.currentTarget.inputProducts.value.trim()
    )

    //  convert to array
    const collectionOfProductsArr:string[] = valueOfTextarea.split(',')

    // check if right length and push error if not valid
    // no return value, thats whu not assigned as const
    checkMissingElement(collectionOfProductsArr)

    // converts every second value to num
    const convertedNumsArr = convertEverySecondToNum(collectionOfProductsArr)

    //convert final array to array of objects, save into state, no return value. This is our final datasource
    convertArrToObj(convertedNumsArr)
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

      {!errors && (
        <div className='productButtonContainer'>
          <p>Press the buttons below to add product to your chart.</p>
          {filtered.map((product: Product) => (
            <div className='productButton'>
              <button key={product.name} onClick={() => addItem(product.name)}>
                {product.name}
              </button>{' '}
              <div>
                <span>
                  price: <strong>{product.price}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default React.memo(InputFields)
