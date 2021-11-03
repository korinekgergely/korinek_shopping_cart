import { Product } from './../TS.types'

const setUnique = (arr: Product[]) => {
  //Store the unique
  let uniques = []
  //Track the items added to the uniques
  let itemsFound: any ={} as Product
  for (let val of arr) {
    //If item is already added then move to the next item
    if (itemsFound[val.name]) {
      continue
    }
    //Else push it to the unique list
    uniques.push(val)
    //Mark it as added
    itemsFound[val.name] = true
  }
  //Return the uniques
  return uniques
}

export { setUnique }
