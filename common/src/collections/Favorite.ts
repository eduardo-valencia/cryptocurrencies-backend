import Item from './Item'

interface Favorite extends Item {
  user: string
  currency: string
}

export default Favorite
