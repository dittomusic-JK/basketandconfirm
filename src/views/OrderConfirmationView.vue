<template>
  <div class="confirm-view">
    <div class="confirm-view__container" v-if="order">
      <section class="confirm-view__hero">
        <div class="confirm-view__hero-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9.25l3.1 3.1L14 5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="confirm-view__hero-content">
          <p class="confirm-view__eyebrow">Thanks for your order</p>
          <h1 class="confirm-view__title">Order confirmed</h1>
          <p class="confirm-view__confirmation-number">Confirmation no. {{ order.orderId }}</p>
          <p class="confirm-view__subtitle">You’re all set. We’ll process your releases and upload them to stores. You’ll receive a receipt by email.</p>
        </div>
        <span class="confirm-view__paid-badge">Paid</span>
      </section>

      <div class="confirm-view__grid">
        <section class="confirm-view__card confirm-view__card--order">
          <h2 class="confirm-view__section-title">Order summary</h2>
          <div class="confirm-view__meta-grid">
            <div class="confirm-view__meta-item">
              <span class="confirm-view__meta-label">Date placed</span>
              <strong class="confirm-view__meta-value">{{ order.orderDate }}</strong>
            </div>
            <div class="confirm-view__meta-item">
              <span class="confirm-view__meta-label">Receipt email</span>
              <strong class="confirm-view__meta-value">{{ order.email }}</strong>
            </div>
          </div>

          <div class="confirm-view__table-wrap">
            <div class="confirm-view__table">
              <div class="confirm-view__table-header">
                <span>Item</span>
                <span>Description</span>
                <span class="confirm-view__table-header--right">Price</span>
              </div>

              <template v-for="basketItem in order.items" :key="basketItem.release.id">
                <div class="confirm-view__row">
                  <span class="confirm-view__item-type">Release</span>
                  <span class="confirm-view__item-desc">{{ basketItem.release.title }}</span>
                  <span class="confirm-view__item-price">Free</span>
                </div>

                <div v-for="svc in basketItem.services" :key="svc.id" class="confirm-view__row confirm-view__row--service">
                  <span class="confirm-view__item-type confirm-view__item-type--service">Service</span>
                  <span class="confirm-view__item-desc">{{ svc.name }}</span>
                  <span class="confirm-view__item-price">€{{ (svc.price * svc.quantity).toFixed(2) }}</span>
                </div>
              </template>

              <div v-if="order.discount" class="confirm-view__row">
                <span class="confirm-view__item-type">Discount</span>
                <span class="confirm-view__item-desc">Code: {{ order.discount.code }}</span>
                <span class="confirm-view__item-price confirm-view__item-price--green">-€{{ order.discount.amount.toFixed(2) }}</span>
              </div>

              <div v-if="order.creditUsed" class="confirm-view__row">
                <span class="confirm-view__item-type confirm-view__item-type--credit">Credit</span>
                <span class="confirm-view__item-desc">Account credit applied</span>
                <span class="confirm-view__item-price confirm-view__item-price--green">-€{{ order.creditUsed.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="confirm-view__totals">
            <div class="confirm-view__total-row">
              <span>Sub-total</span>
              <strong>€{{ order.subTotal.toFixed(2) }}</strong>
            </div>
            <div class="confirm-view__total-row confirm-view__total-row--total">
              <span>Total</span>
              <strong>€{{ order.totalPrice.toFixed(2) }}</strong>
            </div>
          </div>

          <div class="confirm-view__actions">
<a href="https://dashboard.dittomusic.com" class="confirm-view__primary-btn">Music Catalogue</a>
          </div>
        </section>

        <aside class="confirm-view__card confirm-view__card--next">
          <h2 class="confirm-view__next-title">What's next?</h2>

          <section v-for="item in order.items" :key="item.release.id" class="confirm-view__module">
            <h3 class="confirm-view__module-title">Share {{ item.release.title }}</h3>
            <div class="confirm-view__share-card">
              <img
                v-if="releaseArtworkById[item.release.id]"
                :src="releaseArtworkById[item.release.id]"
                :alt="item.release.title"
                class="confirm-view__share-card-art"
              />
              <p class="confirm-view__share-card-text">{{ releaseShareText(item) }}</p>
            </div>
            <div class="confirm-view__share-links">
              <a :href="releaseFacebookUrl(item)" target="_blank" rel="noreferrer" class="confirm-view__share-pill">
                <svg class="confirm-view__share-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V11H7.5v3h2.7v8h3.3Z" fill="currentColor"/>
                </svg>
                Share on Facebook
              </a>
              <a :href="releaseTwitterUrl(item)" target="_blank" rel="noreferrer" class="confirm-view__share-pill">
                <svg class="confirm-view__share-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h3.4l4.1 5.6L16.2 4H20l-6.6 7.5L20.4 20H17l-4.5-6.1L7.3 20H3.6l7-8L4 4Z" fill="currentColor"/>
                </svg>
                Post on X
              </a>
            </div>
          </section>

          <section class="confirm-view__module">
            <h3 class="confirm-view__module-title">Refer friends and earn cash.</h3>
            <p class="confirm-view__module-copy">Earn up to $50 by inviting friends to join Ditto. Get <strong>$10 cash</strong> for every friend who signs up.</p>
            <a :href="referFriendUrl" target="_blank" rel="noreferrer" class="confirm-view__module-link">Refer a friend</a>
          </section>

          <section class="confirm-view__module confirm-view__module--promo">
            <div class="confirm-view__promo-head">
              <img :src="promoLogoUrl" alt="Ditto Promo" class="confirm-view__promo-logo" />
            </div>
            <h3 class="confirm-view__module-title">Don’t go it alone</h3>
            <p class="confirm-view__module-copy">We can help you promote your release with targeted campaigns to reach new fans faster.</p>
            <a :href="promoUrl" target="_blank" rel="noreferrer" class="confirm-view__module-link confirm-view__module-link--primary">
              Discover Ditto Promo
            </a>
          </section>
        </aside>
      </div>
    </div>

    <div v-else class="confirm-view__no-order">
      <p>No order found. <router-link to="/basket" class="confirm-view__link">Return to basket</router-link></p>
    </div>

    <Toast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBasketStore } from '../composables/useBasketStore'
import Toast from '../components/ui/Toast.vue'

const route = useRoute()
const { order, toastMessage, toastType, toastVisible, showToast, loadPaidBasket, loadFreeBasket, checkout } = useBasketStore()

// Auto-generate an order from ?demo= param so the page renders standalone
onMounted(() => {
  if (!order.value) {
    const demo = route.query.demo as string | undefined
    if (demo === 'paid') {
      loadPaidBasket()
      checkout()
    } else if (demo === 'free') {
      loadFreeBasket()
      checkout()
    }
  }
})
const baseUrl = import.meta.env.BASE_URL

const promoUrl = 'https://dittomusic.com/promo'
const promoLogoUrl = `${baseUrl}img/promo-logo-pink.svg`
const referFriendUrl = 'https://dittomusic.com/refer-a-friend'
const releaseArtworkById: Record<string, string> = {
  'rel-1': `${baseUrl}img/image-1.png`,
  'rel-2': `${baseUrl}img/image-3.png`,
}

const dittoUrl = 'https://dittomusic.com/en'

function releaseShareText(item: { release: { title: string; releaseDate: string } }) {
  return `My new release ${item.release.title} drops on all major platforms on ${item.release.releaseDate}. Powered by @dittomusic. ${dittoUrl}`
}

function releaseTwitterUrl(item: { release: { title: string; releaseDate: string } }) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(releaseShareText(item))}`
}

function releaseFacebookUrl(_item: { release: { title: string; releaseDate: string } }) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dittoUrl)}&hashtag=${encodeURIComponent('#dittomusic')}`
}
</script>

<style lang="scss" scoped>
.confirm-view {
  padding: 1.5rem 1.5rem 2.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.25rem 1.5rem;
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
  }

  &__hero {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: start;
    gap: 0.8rem 1rem;
    margin-bottom: 1.25rem;

    @media (max-width: 520px) {
      grid-template-columns: auto minmax(0, 1fr);
    }
  }

  &__hero-icon {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 1px solid #97e2c4;
    background: #dbfff0;
    color: #136f4a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.15rem;
    flex-shrink: 0;
  }

  &__hero-content {
    min-width: 0;
  }

  &__eyebrow {
    font-size: 0.73rem;
    font-weight: 700;
    font-family: $font-satoshi;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #66667f;
    margin-bottom: 0.3rem;
  }

  &__title {
    font-size: 2.15rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    line-height: 1.08;
    margin-bottom: 0.25rem;
  }

  &__confirmation-number {
    font-size: 0.95rem;
    font-weight: 700;
    font-family: $font-satoshi;
    color: #3f3f5d;
    margin-bottom: 0.35rem;
  }

  &__subtitle {
    font-size: 0.92rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: #676781;
    line-height: 1.45;
  }

  &__paid-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0 0.8rem;
    border-radius: 999px;
    background: #e5fff4;
    border: 1px solid #9deac9;
    color: #136f4a;
    font-size: 0.74rem;
    font-weight: 700;
    font-family: $font-satoshi;
    flex-shrink: 0;
    margin-top: 0.25rem;

    @media (max-width: 520px) {
      grid-column: 2;
      justify-self: start;
      margin-top: 0;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 21.5rem;
    gap: 1.1rem;
    align-items: start;

    @media (max-width: $breakpoint-lg) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    background: #fff;
    border: 1px solid #e7e7f1;
    border-radius: 1rem;
    overflow: hidden;
  }

  &__card--order {
    padding: 1.35rem;
  }

  &__section-title {
    font-size: 1.1rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    margin-bottom: 0.95rem;
  }

  &__card--next {
    padding: 1rem;

    @media (min-width: $breakpoint-lg) {
      position: sticky;
      top: 1rem;
    }
  }

  &__meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }

  &__meta-item {
    padding: 0.8rem 0.85rem;
    border: 1px solid #ececf5;
    border-radius: 0.7rem;
    background: #fcfcff;
    min-height: 4.8rem;
  }

  &__meta-label {
    display: block;
    font-size: 0.69rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #7a7a90;
    font-weight: 700;
    font-family: $font-satoshi;
    margin-bottom: 0.2rem;
  }

  &__meta-value {
    display: block;
    font-size: 0.98rem;
    color: var(--blue);
    font-weight: 600;
    font-family: $font-satoshi;
    line-height: 1.35;
    word-break: break-word;
  }

  &__table-wrap {
    border: 1px solid #ececf5;
    border-radius: 0.8rem;
    overflow: hidden;
  }

  &__table-header {
    display: grid;
    grid-template-columns: 4.5rem 1fr 5.25rem;
    gap: 0.5rem;
    padding: 0.72rem 0.8rem;
    border-bottom: 1px solid #ececf5;
    font-size: 0.66rem;
    font-weight: 700;
    color: #7a7a90;
    font-family: $font-satoshi;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: #fff;

    &--right {
      text-align: right;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 4.5rem 1fr 5.25rem;
    gap: 0.5rem;
    align-items: center;
    padding: 0.65rem 0.8rem;
    border-bottom: 1px solid #f0f0f7;
    font-family: $font-satoshi;
    font-size: 0.8rem;

    &:last-child {
      border-bottom: 0;
    }
  }

  &__row--service {
    background: #fcfcff;
  }

  &__item-type {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.3rem;
    border-radius: 999px;
    border: 1px solid #dfdfec;
    color: #67677e;
    font-size: 0.66rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 0 0.4rem;

    &--service {
      background: #f4f7ff;
      border-color: #d9e3ff;
      color: #325ca9;
    }

    &--credit {
      background: #e5fff4;
      border-color: #9deac9;
      color: #136f4a;
    }
  }

  &__item-desc {
    color: var(--blue);
    font-weight: 500;
  }

  &__item-price {
    text-align: right;
    color: #44445e;
  }

  &__item-price {
    font-weight: 700;
    color: var(--blue);
  }

  &__item-price--green {
    color: #1b8f5f;
  }

  &__totals {
    margin-top: 0.9rem;
    border-top: 1px solid #ececf5;
    padding-top: 0.8rem;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.35rem 0;
    font-size: 0.85rem;
    font-family: $font-satoshi;
    color: #5f5f77;

    strong {
      font-size: 0.95rem;
      color: var(--blue);
    }
  }

  &__total-row--total {
    margin-top: 0.25rem;
    border-top: 1px solid #ececf5;
    padding-top: 0.6rem;

    span {
      font-weight: 700;
      color: var(--blue);
    }

    strong {
      font-size: 1.05rem;
    }
  }

  &__actions {
    margin-top: 0.85rem;
  }

  &__primary-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2.8rem;
    border-radius: 999px;
    border: 1px solid #111;
    background: #111;
    color: #fff;
    font-size: 0.84rem;
    font-weight: 700;
    font-family: $font-satoshi;
    text-decoration: none;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.95;
    }
  }

  &__next-title {
    font-size: 1.2rem;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    margin-bottom: 0.9rem;
  }

  &__module {
    border: 1px solid #ececf5;
    border-radius: 0.8rem;
    padding: 0.8rem;
    margin-bottom: 0.75rem;
    background: #fff;
  }

  &__module--promo {
    background: linear-gradient(160deg, #fff5fb 0%, #f8f8ff 80%);
    border-color: #f3cde7;
  }

  &__module-title {
    font-size: 0.85rem;
    font-weight: 700;
    font-family: $font-satoshi;
    color: var(--blue);
    margin-bottom: 0.35rem;
    line-height: 1.3;
  }

  &__module-copy {
    font-size: 0.75rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: #6f6f86;
    line-height: 1.45;
    margin-bottom: 0.6rem;

    strong {
      color: var(--blue);
      font-weight: 700;
    }
  }

  &__share-card {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.6rem;
    border: 1px solid #ececf5;
    border-radius: 0.6rem;
    background: #fbfbfe;
    margin-bottom: 0.65rem;
  }

  &__share-card-art {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.4rem;
    object-fit: cover;
    border: 1px solid #e4e4ef;
    flex-shrink: 0;
  }

  &__share-card-text {
    font-size: 0.72rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: #5a5a72;
    line-height: 1.45;
  }

  &__share-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  &__share-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.8rem;
    border: 1px solid #d8d8e8;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: #3f3f5d;
    background: #fff;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: #b8b8d0;
      background: #f8f8fc;
    }
  }

  &__share-icon {
    width: 0.82rem;
    height: 0.82rem;
    flex-shrink: 0;
  }

  &__promo-head {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.45rem;
  }

  &__promo-logo {
    width: 7rem;
    height: auto;
  }

  &__module-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0 0.85rem;
    border-radius: 999px;
    border: 1px solid #d8d8e8;
    background: #fff;
    color: #4b4b62;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: $font-satoshi;
  }

  &__module-link--primary {
    border-color: #111;
    background: #111;
    color: #fff;
  }

  &__no-order {
    text-align: center;
    padding: 4rem 1rem;
    font-size: $text-body;
    font-family: $font-satoshi;
    color: var(--ditto-grey);
  }

  &__link {
    color: var(--brand-primary);
    font-weight: 600;
    text-decoration: underline;
  }
}
</style>
