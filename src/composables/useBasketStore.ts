import { ref, computed } from 'vue'
import type { BasketItem, Discount, Credit, OrderSummary } from '../types'

// ── Mock data ──────────────────────────────────────────────
const defaultBasket: BasketItem[] = [
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
      { id: 'svc-3', releaseId: 'rel-1', name: 'Priority Distro', price: 50, quantity: 1, detail: 'Estimated Go-Live Time: Friday 16 January, 9:21 pm (GMT)' },
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

// ── Reactive state ─────────────────────────────────────────
const basket = ref<BasketItem[]>(JSON.parse(JSON.stringify(defaultBasket)))

// Pre-apply a demo discount so the applied state is visible on load
const initialSubTotal = defaultBasket.reduce((sum, item) =>
  sum + item.services.reduce((s, svc) => s + svc.price * svc.quantity, 0), 0)
const discount = ref<Discount | null>({
  code: 'DITTO20',
  percentage: 20,
  amount: Math.round(initialSubTotal * 20 / 100),
})
const credit = ref<Credit>({ balance: 20, applied: 0 })
const order = ref<OrderSummary | null>(null)

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

const discountAmount = computed(() => discount.value?.amount ?? 0)
const creditApplied = computed(() => credit.value.applied)

const totalPrice = computed(() => {
  return Math.max(0, subTotal.value - discountAmount.value - creditApplied.value)
})

const isFreeOrder = computed(() => totalPrice.value === 0)

// ── Actions ────────────────────────────────────────────────
function removeRelease(releaseId: string) {
  const idx = basket.value.findIndex(item => item.release.id === releaseId)
  if (idx !== -1) {
    basket.value.splice(idx, 1)
    // Recalculate discount if one is applied
    if (discount.value) {
      discount.value.amount = Math.round(subTotal.value * discount.value.percentage / 100)
    }
    showToast('The release has been removed from basket successfully')
  }
}

function applyDiscount(code: string): boolean {
  const pct = validDiscounts[code.toUpperCase()]
  if (pct !== undefined) {
    const amount = Math.round(subTotal.value * pct / 100)
    discount.value = { code: code.toUpperCase(), percentage: pct, amount }
    showToast(`Discount ${code.toUpperCase()} has been applied successfully`)
    return true
  }
  showToast(`Sorry! ${code} is not a valid discount code`, 'warning')
  return false
}

function removeDiscount() {
  discount.value = null
}

function applyCredit() {
  const maxCredit = Math.min(credit.value.balance, subTotal.value - discountAmount.value)
  credit.value.applied = Math.max(0, maxCredit)
}

function removeCredit() {
  credit.value.applied = 0
}

function checkout() {
  order.value = {
    orderId: String(Math.floor(100000 + Math.random() * 900000)),
    orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    amountPaid: totalPrice.value,
    name: 'Dave Burns',
    email: 'dave@dittomusic.com',
    items: JSON.parse(JSON.stringify(basket.value)),
    discount: discount.value ? { ...discount.value } : undefined,
    creditUsed: credit.value.applied > 0 ? credit.value.applied : undefined,
    totalPrice: totalPrice.value,
    paymentMade: totalPrice.value,
  }
  // Reset basket
  basket.value = []
  discount.value = null
  credit.value.applied = 0
  showToast('Your order was successful and is now being processed, please check your email for confirmation.')
}

// ── Export ──────────────────────────────────────────────────
export function useBasketStore() {
  return {
    basket,
    discount,
    credit,
    order,
    subTotal,
    discountAmount,
    creditApplied,
    totalPrice,
    isFreeOrder,
    removeRelease,
    applyDiscount,
    removeDiscount,
    applyCredit,
    removeCredit,
    checkout,
    toastMessage,
    toastType,
    toastVisible,
    showToast,
  }
}
