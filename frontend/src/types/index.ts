export interface Product {
  product_number: string
  material: string
  form: string
  choice: string
  grade: string
  finish?: string
  surface?: string
  quantity: number
  weight: number
  length?: number
  width?: number
  height?: number
  thickness?: number
  outer_diameter?: number
  wall_thickness?: number
  web_thickness?: number
  flange_thickness?: number
  certificates?: string
  location: string
}

export enum PRODUCT_SORT_KEY {
  WEIGHT = 'weight',
  FORM_AND_CHOICE = 'form_and_choice'
}

export enum PRODUCT_SORT_DIR {
  ASC = 'asc',
  DESC = 'desc'
}
