<template>
  <Teleport to="body">
    <Transition name="mini-basket-backdrop">
      <div v-if="open" class="mini-basket-backdrop" @click="$emit('close')" />
    </Transition>
    <Transition name="mini-basket-panel">
      <aside v-if="open" class="mini-basket">
        <div class="mini-basket__header">
          <h3 class="mini-basket__title">Your Basket</h3>
          <span class="mini-basket__count">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</span>
          <button class="mini-basket__close" @click="$emit('close')" aria-label="Close basket">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div v-if="basket.length === 0" class="mini-basket__empty">
          <p>Your basket is empty</p>
        </div>

        <div v-else class="mini-basket__items">
          <div v-for="item in basket" :key="item.release.id" class="mini-basket__item">
            <div class="mini-basket__artwork">
              <img
                v-if="releaseArtworkSrc(item.release.id)"
                :src="releaseArtworkSrc(item.release.id)"
                :alt="item.release.title"
                class="mini-basket__artwork-img"
              />
              <div v-else class="mini-basket__artwork-placeholder">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="4" fill="#efeffc"/>
                  <path d="M16 10v8m0 0l-3-3m3 3l3-3" stroke="#626984" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="mini-basket__item-info">
              <span class="mini-basket__item-title">{{ item.release.title }}</span>
              <span class="mini-basket__item-meta">{{ item.release.releaseType }} · {{ item.services.length }} {{ item.services.length === 1 ? 'service' : 'services' }}</span>
            </div>
            <span class="mini-basket__item-price">€{{ itemTotal(item).toFixed(2) }}</span>
          </div>
        </div>

        <div v-if="basket.length > 0" class="mini-basket__footer">
          <div class="mini-basket__total-row">
            <span>Subtotal</span>
            <strong>€{{ subTotal.toFixed(2) }}</strong>
          </div>
          <div class="mini-basket__actions">
            <button class="mini-basket__btn mini-basket__btn--secondary" @click="goToBasket">View Basket</button>
            <button class="mini-basket__btn mini-basket__btn--primary" @click="goToCheckout">Checkout</button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBasketStore } from '../../composables/useBasketStore'
import type { BasketItem } from '../../types'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const { basket, subTotal } = useBasketStore()
const baseUrl = import.meta.env.BASE_URL

const releaseArtworkById: Record<string, string> = {
  'rel-1': `${baseUrl}img/image-1.png`,
  'rel-2': `${baseUrl}img/image-3.png`,
}

const releaseArtworkSrc = (id: string) => releaseArtworkById[id] ?? ''

const itemCount = computed(() =>
  basket.value.reduce((sum, item) => sum + item.services.length, 0)
)

function itemTotal(item: BasketItem) {
  return item.services.reduce((sum, svc) => sum + svc.price * svc.quantity, 0)
}

function goToBasket() {
  emit('close')
  router.push('/basket')
}

function goToCheckout() {
  emit('close')
  router.push('/basket')
}
</script>

<style lang="scss" scoped>
.mini-basket-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1050;
}

.mini-basket-backdrop-enter-active,
.mini-basket-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.mini-basket-backdrop-enter-from,
.mini-basket-backdrop-leave-to {
  opacity: 0;
}

.mini-basket-panel-enter-active,
.mini-basket-panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.mini-basket-panel-enter-from,
.mini-basket-panel-leave-to {
  transform: translateX(100%);
}

.mini-basket {
  position: fixed;
  top: 0;
  right: 0;
  width: 22rem;
  max-width: 90vw;
  height: 100vh;
  background: #fff;
  z-index: 1060;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.1);

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.1rem 1.15rem;
    border-bottom: 1px solid #ececf5;
  }

  &__title {
    font-size: 1.05rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
  }

  &__count {
    font-size: 0.72rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: #8a8aa0;
    background: #f3f3fa;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
  }

  &__close {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: none;
    color: #8a8aa0;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f3f3fa;
      color: var(--blue);
    }
  }

  &__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    p {
      font-size: 0.85rem;
      color: #8a8aa0;
      font-family: $font-satoshi;
    }
  }

  &__items {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 0;
  }

  &__item {
    display: grid;
    grid-template-columns: 3rem 1fr auto;
    gap: 0.65rem;
    align-items: center;
    padding: 0.7rem 1.15rem;
    transition: background 0.1s;

    &:hover {
      background: #fafaff;
    }
  }

  &__artwork {
    width: 3rem;
    height: 3rem;
    border-radius: 0.45rem;
    overflow: hidden;
    border: 1px solid #ececf5;
    background: #f5f5fa;
  }

  &__artwork-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__artwork-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  &__item-title {
    font-size: 0.84rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--blue);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-meta {
    font-size: 0.7rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: #8a8aa0;
  }

  &__item-price {
    font-size: 0.84rem;
    font-weight: 700;
    font-family: $font-satoshi;
    color: var(--blue);
    white-space: nowrap;
  }

  &__footer {
    border-top: 1px solid #ececf5;
    padding: 1rem 1.15rem 1.15rem;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
    font-size: 0.84rem;
    font-family: $font-satoshi;
    color: #6f6f86;

    strong {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--blue);
    }
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__btn {
    flex: 1;
    height: 2.65rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: $font-satoshi;
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s, border-color 0.15s;

    &:hover { opacity: 0.92; }

    &--primary {
      background: #111;
      color: #fff;
      border: 1px solid #111;
    }

    &--secondary {
      background: #fff;
      color: var(--blue);
      border: 1px solid #d8d8e8;
    }
  }
}
</style>
