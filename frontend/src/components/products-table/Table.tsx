import { Product, PRODUCT_SORT_DIR, PRODUCT_SORT_KEY } from '../../types'

const formatDimensions = (product: Product) => {
  const dimensions: string[] = []

  if (product.length) dimensions.push(`L = ${product.length}mm`)
  if (product.width) dimensions.push(`W = ${product.width}mm`)
  if (product.height) dimensions.push(`H = ${product.height}mm`)
  if (product.thickness) dimensions.push(`T = ${product.thickness}mm`)
  if (product.outer_diameter)
    dimensions.push(`OD = ${product.outer_diameter}mm`)
  if (product.wall_thickness)
    dimensions.push(`Wt = ${product.wall_thickness}mm`)
  if (product.web_thickness) dimensions.push(`Tw = ${product.web_thickness}mm`)
  if (product.flange_thickness)
    dimensions.push(`Tf = ${product.flange_thickness}mm`)

  return dimensions.join(', ')
}

interface TableComponentProps {
  products: Product[]
  sortedBy: PRODUCT_SORT_KEY
  sortedByDir: PRODUCT_SORT_DIR
  resort: (key: PRODUCT_SORT_KEY, dir: PRODUCT_SORT_DIR) => void
}

export const TableComponent = ({
  products,
  sortedBy,
  sortedByDir,
  resort
}: TableComponentProps) => {
  const arrowUp = <span className="material-icons">arrow_upward</span>
  const arrowDown = <span className="material-icons">arrow_downward</span>
  const formAndChoiceDir =
    sortedBy === PRODUCT_SORT_KEY.FORM_AND_CHOICE
      ? sortedByDir === PRODUCT_SORT_DIR.ASC
        ? arrowDown
        : arrowUp
      : null

  const weightDir =
    sortedBy === PRODUCT_SORT_KEY.WEIGHT
      ? sortedByDir === PRODUCT_SORT_DIR.ASC
        ? arrowDown
        : arrowUp
      : null

  const handleSortByWeight = () => {
    if (sortedBy !== PRODUCT_SORT_KEY.WEIGHT) {
      resort(PRODUCT_SORT_KEY.WEIGHT, PRODUCT_SORT_DIR.ASC)
    } else {
      resort(
        PRODUCT_SORT_KEY.WEIGHT,
        sortedByDir === PRODUCT_SORT_DIR.ASC
          ? PRODUCT_SORT_DIR.DESC
          : PRODUCT_SORT_DIR.ASC
      )
    }
  }

  const handleSortByFormAndChoice = () => {
    if (sortedBy !== PRODUCT_SORT_KEY.FORM_AND_CHOICE) {
      resort(PRODUCT_SORT_KEY.FORM_AND_CHOICE, PRODUCT_SORT_DIR.ASC)
    } else {
      resort(
        PRODUCT_SORT_KEY.FORM_AND_CHOICE,
        sortedByDir === PRODUCT_SORT_DIR.ASC
          ? PRODUCT_SORT_DIR.DESC
          : PRODUCT_SORT_DIR.ASC
      )
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th className="form-and-choice" onClick={handleSortByFormAndChoice}>
            Form & Choice{formAndChoiceDir}
          </th>
          <th>Grade & Surface</th>
          <th>Finish</th>
          <th>Dimensions (mm)</th>
          <th>Quantity</th>
          <th className="weight" onClick={handleSortByWeight}>
            Weight (t) {weightDir}
          </th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_number}>
            <td>{product.product_number}</td>
            <td>
              {product.form} {product.choice}
            </td>
            <td>
              {product.grade} {product.surface ? product.surface : ''}
            </td>
            <td>{product.finish ? product.finish : 'N/A'}</td>
            <td>{formatDimensions(product)}</td>
            <td>{product.quantity}</td>
            <td>{product.weight.toFixed(2)} t</td>
            <td>{product.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
