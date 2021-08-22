import Item from './Item'

interface Favorite extends Item {
  userId: string
  currency: string
}

export default Favorite
