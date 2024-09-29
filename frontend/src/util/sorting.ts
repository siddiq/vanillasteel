import { Product, PRODUCT_SORT_DIR, PRODUCT_SORT_KEY } from '../types'

export const sortAndPaginate = (
  products: Product[],
  sortKey: PRODUCT_SORT_KEY,
  sortDirection: PRODUCT_SORT_DIR,
  offset: number,
  limit: number
) => {
  const sortedArray = [...products]

  if (sortKey === PRODUCT_SORT_KEY.WEIGHT) {
    if (sortDirection === PRODUCT_SORT_DIR.ASC) {
      sortedArray.sort((a, b) => a.weight - b.weight)
    } else {
      sortedArray.sort((a, b) => b.weight - a.weight)
    }
  } else if (sortKey === PRODUCT_SORT_KEY.FORM_AND_CHOICE) {
    if (sortDirection === PRODUCT_SORT_DIR.ASC) {
      sortedArray.sort((a, b) => {
        const formAndChoiceA = `${a.form} ${a.choice}`
        const formAndChoiceB = `${b.form} ${b.choice}`
        return formAndChoiceA.localeCompare(formAndChoiceB)
      })
    } else {
      sortedArray.sort((a, b) => {
        const formAndChoiceA = `${a.form} ${a.choice}`
        const formAndChoiceB = `${b.form} ${b.choice}`
        return formAndChoiceB.localeCompare(formAndChoiceA)
      })
    }
  }

  const sortedAndPagedArray = sortedArray.slice(offset, offset + limit)

  return sortedAndPagedArray
}
