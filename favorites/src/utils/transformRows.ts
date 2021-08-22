import { convertObjectToCamelCase } from './transform'

export const convertRowsToCamelCase = (rows: Object[]): Object[] => {
  return rows.map(convertObjectToCamelCase)
}
