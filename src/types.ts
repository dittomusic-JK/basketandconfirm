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

/** A pre-paid entitlement (from a purchased bundle) redeemable against one release's services */
export interface Voucher {
  id: string
  name: string
  /** Bundle the voucher came from, shown as secondary copy */
  bundle?: string
  /** Service-name prefixes this voucher covers */
  covers: string[]
}

/** A voucher resolved against a specific release: what it covers there and what it saves */
export interface VoucherOption {
  voucher: Voucher
  savings: number
  coveredNames: string[]
}

export interface VoucherUsed {
  name: string
  releaseTitle: string
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
  vouchersUsed?: VoucherUsed[]
  voucherSavings?: number
  subTotal: number
  totalPrice: number
  paymentMade: number
}
