import { ref, computed } from 'vue'
import type { BasketItem, Discount, Credit, OrderSummary, Voucher, VoucherOption } from '../types'

// ── Mock data ──────────────────────────────────────────────
const freeBasket: BasketItem[] = [
  {
    release: {
      id: 'rel-1',
      title: 'Release 4',
      releaseType: 'Single',
      releaseDate: 'January 30th, 2026',
      isFree: true,
    },
    services: [],
  },
]

const paidBasket: BasketItem[] = [
  {
    release: {
      id: 'rel-1',
      title: 'Release 4',
      releaseType: 'Single',
      releaseDate: 'January 30th, 2026',
      isFree: true,
    },
    services: [
      { id: 'svc-1', releaseId: 'rel-1', name: 'Charts Registration UK / Ireland', price: 35, quantity: 1 },
      { id: 'svc-2', releaseId: 'rel-1', name: 'Pre-release Downloads', price: 50, quantity: 1 },
      { id: 'svc-3', releaseId: 'rel-1', name: 'Priority Distro', price: 50, quantity: 1 },
    ],
  },
  {
    release: {
      id: 'rel-2',
      title: 'Release 3',
      releaseType: 'EP',
      releaseDate: 'February 14th, 2026',
      isFree: true,
    },
    services: [
      { id: 'svc-4', releaseId: 'rel-2', name: 'Pre-release Downloads', price: 50, quantity: 1 },
      { id: 'svc-5', releaseId: 'rel-2', name: 'Charts Registration Australia', price: 35, quantity: 1 },
      { id: 'svc-6', releaseId: 'rel-2', name: 'Fast-track your release', price: 50, quantity: 1 },
    ],
  },
]

// ── Valid demo discount codes ──────────────────────────────
const validDiscounts: Record<string, number> = {
  RECORD10: 10,
  DITTO20: 20,
  SAVE50: 50,
}

// ── Demo voucher wallet (entitlements from purchased bundles) ──
const voucherWallet: Voucher[] = [
  {
    id: 'vch-1',
    name: 'Chartbreaker',
    bundle: 'Chartbreaker bundle',
    covers: ['Charts Registration', 'Pre-release Downloads'],
  },
  {
    id: 'vch-2',
    name: 'Launch Pack',
    bundle: 'Launch Pack bundle',
    covers: ['Priority Distro', 'Fast-track your release'],
  },
]

// ── Reactive state ─────────────────────────────────────────
const basket = ref<BasketItem[]>(JSON.parse(JSON.stringify(freeBasket)))
const discount = ref<Discount | null>(null)
const credit = ref<Credit>({ balance: 20, applied: 0 })
const order = ref<OrderSummary | null>(null)
const vouchers = ref<Voucher[]>([])
const appliedVouchers = ref<Record<string, string>>({}) // releaseId → voucherId

// Toast state
const toastMessage = ref('')
const toastType = ref<'success' | 'info' | 'warning'>('success')
const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(message: string, type: 'success' | 'info' | 'warning' = 'success') {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  toastTimer = setTimeout(() => { toastVisible.value = false }, 4000)
}

// ── Computed ───────────────────────────────────────────────
const subTotal = computed(() => {
  return basket.value.reduce((sum, item) => {
    return sum + item.services.reduce((s, svc) => s + svc.price * svc.quantity, 0)
  }, 0)
})

// ── Voucher helpers ────────────────────────────────────────
function voucherCovers(voucher: Voucher, serviceName: string): boolean {
  return voucher.covers.some(prefix => serviceName.startsWith(prefix))
}

function voucherOption(item: BasketItem, voucher: Voucher): VoucherOption {
  const covered = item.services.filter(svc => voucherCovers(voucher, svc.name))
  return {
    voucher,
    savings: covered.reduce((s, svc) => s + svc.price * svc.quantity, 0),
    coveredNames: covered.map(svc => svc.name),
  }
}

function appliedVoucherOptionFor(item: BasketItem): VoucherOption | null {
  const voucherId = appliedVouchers.value[item.release.id]
  const voucher = vouchers.value.find(v => v.id === voucherId)
  return voucher ? voucherOption(item, voucher) : null
}

// Vouchers are single-use per basket: once redeemed on a release they are
// no longer offered on others. Only vouchers covering ≥1 service qualify.
function eligibleVouchersFor(item: BasketItem): VoucherOption[] {
  if (appliedVouchers.value[item.release.id]) return []
  const usedIds = new Set(Object.values(appliedVouchers.value))
  return vouchers.value
    .filter(v => !usedIds.has(v.id))
    .map(v => voucherOption(item, v))
    .filter(option => option.savings > 0)
}

function freedServiceIdsFor(item: BasketItem): string[] {
  const applied = appliedVoucherOptionFor(item)
  if (!applied) return []
  return item.services
    .filter(svc => voucherCovers(applied.voucher, svc.name))
    .map(svc => svc.id)
}

const voucherSavings = computed(() => {
  return basket.value.reduce((sum, item) => sum + (appliedVoucherOptionFor(item)?.savings ?? 0), 0)
})

const discountAmount = computed(() => discount.value?.amount ?? 0)
const creditApplied = computed(() => credit.value.applied)

// Pricing order: vouchers zero their services first, then the discount code
// percentage applies to the reduced subtotal, then credit.
const totalPrice = computed(() => {
  return Math.max(0, subTotal.value - voucherSavings.value - discountAmount.value - creditApplied.value)
})

const isFreeOrder = computed(() => totalPrice.value === 0)

// ── Actions ────────────────────────────────────────────────
function recalcDiscount() {
  if (discount.value) {
    discount.value.amount = Math.round((subTotal.value - voucherSavings.value) * discount.value.percentage / 100)
  }
}

function removeRelease(releaseId: string) {
  const idx = basket.value.findIndex(item => item.release.id === releaseId)
  if (idx !== -1) {
    basket.value.splice(idx, 1)
    delete appliedVouchers.value[releaseId]
    recalcDiscount()
    showToast('The release has been removed from basket successfully')
  }
}

function applyDiscount(code: string): boolean {
  const pct = validDiscounts[code.toUpperCase()]
  if (pct !== undefined) {
    const amount = Math.round((subTotal.value - voucherSavings.value) * pct / 100)
    discount.value = { code: code.toUpperCase(), percentage: pct, amount }
    showToast(`Discount ${code.toUpperCase()} has been applied successfully`)
    return true
  }
  showToast(`Sorry! ${code} is not a valid discount code`, 'warning')
  return false
}

function applyVoucher(releaseId: string, voucherId: string) {
  const voucher = vouchers.value.find(v => v.id === voucherId)
  if (!voucher) return
  appliedVouchers.value = { ...appliedVouchers.value, [releaseId]: voucherId }
  recalcDiscount()
  const item = basket.value.find(i => i.release.id === releaseId)
  showToast(`${voucher.name} voucher applied to ${item?.release.title ?? 'your release'}`)
}

function removeVoucher(releaseId: string) {
  const { [releaseId]: _removed, ...rest } = appliedVouchers.value
  appliedVouchers.value = rest
  recalcDiscount()
  showToast('Voucher removed', 'info')
}

function removeDiscount() {
  discount.value = null
}

function applyCredit() {
  const maxCredit = Math.min(credit.value.balance, subTotal.value - voucherSavings.value - discountAmount.value)
  credit.value.applied = Math.max(0, maxCredit)
}

function removeCredit() {
  credit.value.applied = 0
}

function loadPaidBasket() {
  basket.value = JSON.parse(JSON.stringify(paidBasket))
  vouchers.value = []
  appliedVouchers.value = {}
  // Pre-apply a discount so the applied state is visible
  const sub = paidBasket.reduce((sum, item) =>
    sum + item.services.reduce((s, svc) => s + svc.price * svc.quantity, 0), 0)
  discount.value = { code: 'DITTO20', percentage: 20, amount: Math.round(sub * 20 / 100) }
  credit.value.applied = 0
}

function loadFreeBasket() {
  basket.value = JSON.parse(JSON.stringify(freeBasket))
  vouchers.value = []
  appliedVouchers.value = {}
  discount.value = null
  credit.value.applied = 0
}

// Paid basket plus a voucher wallet; DITTO20 pre-applied so the
// voucher → discount stacking recalculation is visible in the demo.
function loadVoucherBasket(voucherCount: 1 | 2 = 1) {
  basket.value = JSON.parse(JSON.stringify(paidBasket))
  vouchers.value = JSON.parse(JSON.stringify(voucherWallet.slice(0, voucherCount)))
  appliedVouchers.value = {}
  const sub = paidBasket.reduce((sum, item) =>
    sum + item.services.reduce((s, svc) => s + svc.price * svc.quantity, 0), 0)
  discount.value = { code: 'DITTO20', percentage: 20, amount: Math.round(sub * 20 / 100) }
  credit.value.applied = 0
}

function checkout() {
  const vouchersUsed = Object.entries(appliedVouchers.value).flatMap(([releaseId, voucherId]) => {
    const item = basket.value.find(i => i.release.id === releaseId)
    const voucher = vouchers.value.find(v => v.id === voucherId)
    if (!item || !voucher) return []
    return [{
      name: voucher.name,
      releaseTitle: item.release.title,
      amount: voucherOption(item, voucher).savings,
    }]
  })

  order.value = {
    orderId: String(Math.floor(100000 + Math.random() * 900000)),
    orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    amountPaid: totalPrice.value,
    name: 'Dave Burns',
    email: 'dave@dittomusic.com',
    items: JSON.parse(JSON.stringify(basket.value)),
    discount: discount.value ? { ...discount.value } : undefined,
    creditUsed: credit.value.applied > 0 ? credit.value.applied : undefined,
    vouchersUsed: vouchersUsed.length > 0 ? vouchersUsed : undefined,
    voucherSavings: voucherSavings.value > 0 ? voucherSavings.value : undefined,
    subTotal: subTotal.value,
    totalPrice: totalPrice.value,
    paymentMade: totalPrice.value,
  }
  // Reset basket
  basket.value = []
  discount.value = null
  credit.value.applied = 0
  appliedVouchers.value = {}
  vouchers.value = []
  showToast('Your order was successful and is now being processed, please check your email for confirmation.')
}

// ── Export ──────────────────────────────────────────────────
export function useBasketStore() {
  return {
    basket,
    discount,
    credit,
    order,
    vouchers,
    subTotal,
    discountAmount,
    creditApplied,
    voucherSavings,
    totalPrice,
    isFreeOrder,
    removeRelease,
    applyDiscount,
    removeDiscount,
    applyCredit,
    removeCredit,
    applyVoucher,
    removeVoucher,
    eligibleVouchersFor,
    appliedVoucherOptionFor,
    freedServiceIdsFor,
    loadPaidBasket,
    loadFreeBasket,
    loadVoucherBasket,
    checkout,
    toastMessage,
    toastType,
    toastVisible,
    showToast,
  }
}
