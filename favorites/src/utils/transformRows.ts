import { convertObjectToCamelCase } from './transform'

export const convertRowsToCamelCase = <Row extends unknown>(
  rows: Object[]
): Row[] => {
  return rows.map(convertObjectToCamelCase) as Row[]
}
