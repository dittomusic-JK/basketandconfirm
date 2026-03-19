<template>
  <div class="basket-view">
    <div class="basket-view__container">
      <h1 class="basket-view__title">Basket</h1>
      <p class="basket-view__subtitle">You're almost there! Checkout to confirm your releases.</p>

      <!-- Empty state -->
      <div v-if="basket.length === 0" class="basket-view__empty">
        <div class="basket-view__empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M23.27 9.03c-.57-.66-1.39-1.03-2.27-1.03h-.09C20.42 3.51 16.6 0 11.98 0 7.37 0 3.55 3.51 3.05 8H3c-.87 0-1.69.38-2.26 1.03-.57.66-.83 1.53-.7 2.4l1.06 7.42A5.01 5.01 0 007.02 24h9.96a5.01 5.01 0 004.93-5.15l1.06-7.42c.12-.86-.14-1.73-.7-2.4z" fill="#e3e3ef"/>
          </svg>
        </div>
        <p class="basket-view__empty-title">Your basket is empty</p>
        <p class="basket-view__empty-sub">Add releases and services to get started.</p>
        <button class="basket-view__empty-btn" @click="$router.push('/')">
          Browse releases
        </button>
      </div>

      <!-- Two-column layout -->
      <div v-else class="basket-view__grid">
        <!-- Left: items table -->
        <div class="basket-view__main">
          <div class="basket-view__table">
            <div class="basket-view__header">
              <span></span>
              <span>Details</span>
              <span></span>
              <span class="basket-view__header--right">Price</span>
            </div>

            <BasketItemGroup
              v-for="item in basket"
              :key="item.release.id"
              :item="item"
              @edit="handleEdit"
              @remove="handleRemoveClick"
            />
          </div>
        </div>

        <!-- Right: order summary sidebar -->
        <aside class="basket-view__sidebar">
          <div class="basket-view__summary">
            <h3 class="basket-view__summary-title">Summary</h3>
            <p class="basket-view__summary-meta">{{ basket.length }} releases · {{ serviceCount }} services</p>

            <!-- Discount code -->
            <DiscountCode
              v-if="subTotal > 0 || discount"
              :applied-discount="discount"
              @apply="applyDiscount"
              @remove="removeDiscount"
            />

            <!-- Account credit -->
            <AccountCredit
              v-if="credit.balance > 0 && subTotal > 0"
              :balance="credit.balance"
              :credit-applied="creditApplied"
              @apply="applyCredit"
              @remove="removeCredit"
            />

            <!-- Totals -->
            <div class="basket-view__totals">
              <div class="basket-view__total-row">
                <span>Sub Total</span>
                <span class="basket-view__total-value">€{{ subTotal.toFixed(2) }}</span>
              </div>
              <div v-if="discount" class="basket-view__total-row">
                <span>Discount ({{ discount.code }})</span>
                <span class="basket-view__total-value basket-view__total-value--green">-€{{ discountAmount.toFixed(2) }}</span>
              </div>
              <div v-if="creditApplied > 0" class="basket-view__total-row">
                <span>Credit Reduction</span>
                <span class="basket-view__total-value basket-view__total-value--green">-€{{ creditApplied.toFixed(2) }}</span>
              </div>
              <div class="basket-view__total-row basket-view__total-row--final">
                <span>Total</span>
                <span class="basket-view__total-value basket-view__total-value--bold">€{{ totalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Payment -->
            <div class="basket-view__payment-section">
              <PaymentOptions
                v-if="!isFreeOrder"
                @pay="handlePay"
                @bypass="handleCheckout"
              />
              <div v-else class="basket-view__free-checkout">
                <button class="btn btn-primary btn-block" @click="handleCheckout">Confirm Order</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Remove confirmation modal -->
    <RemoveConfirmModal
      :visible="removeModal.visible"
      :release-title="removeModal.title"
      @confirm="confirmRemove"
      @cancel="removeModal.visible = false"
    />

    <!-- Toast -->
    <Toast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBasketStore } from '../composables/useBasketStore'
import BasketItemGroup from '../components/basket/BasketItemGroup.vue'
import DiscountCode from '../components/basket/DiscountCode.vue'
import AccountCredit from '../components/basket/AccountCredit.vue'
import PaymentOptions from '../components/basket/PaymentOptions.vue'
import RemoveConfirmModal from '../components/basket/RemoveConfirmModal.vue'
import Toast from '../components/ui/Toast.vue'

const router = useRouter()
const {
  basket, discount, credit, subTotal, discountAmount, creditApplied,
  totalPrice, isFreeOrder, removeRelease, applyDiscount, removeDiscount,
  applyCredit, removeCredit, checkout,
  toastMessage, toastType, toastVisible, showToast
} = useBasketStore()

const serviceCount = computed(() =>
  basket.value.reduce((sum, basketItem) => sum + basketItem.services.length, 0)
)

const removeModal = reactive({
  visible: false,
  releaseId: '',
  title: '',
})

function handleEdit(releaseId: string) {
  showToast(`Navigating to Release Builder for release ${releaseId}…`, 'info')
}

function handleRemoveClick(releaseId: string) {
  const item = basket.value.find(i => i.release.id === releaseId)
  if (item) {
    removeModal.releaseId = releaseId
    removeModal.title = item.release.title
    removeModal.visible = true
  }
}

function confirmRemove() {
  removeRelease(removeModal.releaseId)
  removeModal.visible = false
}

function handlePay(_method: 'card' | 'paypal') {
  // Simulate payment → checkout
  handleCheckout()
}

function handleCheckout() {
  checkout()
  router.push('/order-confirmation')
}
</script>

<style lang="scss" scoped>
.basket-view {
  padding: 1.5rem 1.5rem 2.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.25rem 1.5rem;
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
  }

  &__title {
    font-size: 1.95rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    line-height: 1.15;
    margin-bottom: 0.25rem;
  }

  &__subtitle {
    font-size: 0.8125rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--ditto-grey);
    margin-bottom: 1.25rem;
  }

  &__empty {
    text-align: center;
    padding: 3.5rem 1.5rem;
    background: #fff;
    border-radius: $radius-card;
    border: 1px solid var(--light-grey);
    box-shadow: $shadow-card;
    max-width: 28rem;
    margin: 0 auto;
  }

  &__empty-icon {
    margin-bottom: 1rem;
    opacity: 0.6;
  }

  &__empty-title {
    font-size: 1.1rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    margin-bottom: 0.3rem;
  }

  &__empty-sub {
    font-size: 0.82rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--ditto-grey);
    margin-bottom: 1.25rem;
  }

  &__empty-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: 999px;
    border: 1px solid #111;
    background: #111;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: $font-satoshi;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover { opacity: 0.9; }
  }

  // Two-column grid
  &__grid {
    display: grid;
    grid-template-columns: 1fr 22.5rem;
    gap: 1.25rem;
    align-items: start;

    @media (max-width: $breakpoint-lg) {
      grid-template-columns: 1fr;
    }
  }

  &__main {
    min-width: 0; // prevent grid blowout
  }

  &__table {
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #e7e7f1;
    overflow: hidden;
  }

  &__header {
    display: grid;
    grid-template-columns: 3.5rem 1fr auto 5.5rem;
    padding: 0.8rem 1rem;
    background: #fff;
    border-bottom: 1px solid #ececf5;
    font-size: 0.6875rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: #7c7c92;
    letter-spacing: 0.03em;
    gap: 0.5rem;

    @media (max-width: 768px) {
      display: none;
    }

    &--right {
      text-align: right;
    }
  }

  // Sidebar
  &__sidebar {
    @media (min-width: $breakpoint-lg) {
      position: sticky;
      top: 1rem;
    }
  }

  &__summary {
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #e7e7f1;
    overflow: hidden;
  }

  &__summary-title {
    font-size: 1.25rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--blue);
    padding: 1.2rem 1.2rem 0.2rem;
  }

  &__summary-meta {
    padding: 0 1.2rem 0.9rem;
    font-size: 0.75rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--ditto-grey);
    border-bottom: 1px solid #ececf5;
  }

  &__totals {
    padding: 0.9rem 1.2rem 1.1rem;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.4rem 0;
    font-size: 0.8125rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--ditto-grey);

    &--final {
      border-top: 1px solid #ececf5;
      margin-top: 0.65rem;
      padding-top: 0.85rem;
    }
  }

  &__total-value {
    font-weight: 500;
    color: var(--blue);

    &--green {
      color: #1b8f5f;
    }

    &--bold {
      font-weight: 700;
      font-size: 1.125rem;
    }
  }

  &__payment-section {
    border-top: 1px solid #ececf5;
  }

  &__free-checkout {
    padding: 1rem 1.2rem 1.2rem;

    .btn {
      border-radius: 999px;
      height: 2.9rem;
      font-size: 0.875rem;
      font-weight: 700;
      background: #111;
      border-color: #111;
    }
  }
}
</style>
