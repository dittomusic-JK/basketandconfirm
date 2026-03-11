export type ReleaseType = 'Single' | 'EP' | 'Album'

export type ServiceName =
  | 'Priority Distro'
  | 'Fast-track your release'
  | 'Beatport Label Setup'
  | 'Charts Registration UK / Ireland'
  | 'Charts Registration US / Canada'
  | 'Charts Registration Australia'
  | 'Charts Registration Worldwide'
  | 'Pre-release Downloads'

export interface BasketRelease {
  id: string
  title: string
  releaseType: ReleaseType
  releaseDate: string
  artwork?: string
  isFree: boolean
}

export interface BasketService {
  id: string
  releaseId: string
  name: ServiceName | string
  price: number
  quantity: number
  /** Additional context, e.g. label name or pre-release date */
  detail?: string
}

export interface BasketItem {
  release: BasketRelease
  services: BasketService[]
}

export interface Discount {
  code: string
  percentage: number
  amount: number
}

export interface Credit {
  balance: number
  applied: number
}

export interface OrderSummary {
  orderId: string
  orderDate: string
  amountPaid: number
  name: string
  email: string
  items: BasketItem[]
  discount?: Discount
  creditUsed?: number
  totalPrice: number
  paymentMade: number
}
