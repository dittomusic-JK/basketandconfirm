<template>
  <div class="payment">
    <h4 class="payment__title">Payment</h4>
    <div class="payment__buttons">
      <button class="payment__btn payment__btn--card" @click="$emit('pay', 'card')">
        Checkout
      </button>
      <button class="payment__btn payment__btn--paypal" @click="$emit('pay', 'paypal')">
        <img src="/img/paypal.svg" alt="PayPal" class="payment__paypal-icon" />
        PayPal
      </button>
    </div>
    <p class="payment__terms">
      By selecting one of the payment options, you confirm that you have read and agree to our
      <a href="#" class="payment__link">terms of use</a>.
    </p>
    <button class="payment__admin" @click="$emit('bypass')">
      Admin: bypass payment
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  pay: [method: 'card' | 'paypal']
  bypass: []
}>()
</script>

<style lang="scss" scoped>
.payment {
  padding: 0.95rem 1.2rem 1.2rem;

  &__title {
    font-size: 0.75rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--blue);
    letter-spacing: 0.01em;
    margin-bottom: 0.65rem;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    height: 2.85rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 700;
    font-family: $font-satoshi;
    cursor: pointer;
    width: 100%;
    transition: border-color 0.15s, background 0.15s, color 0.15s;

    &:hover { opacity: 0.96; }

    &--card {
      background: #111;
      color: #fff;
      border: 1px solid #111;
    }

    &--paypal {
      background: #fff;
      color: #1659c6;
      border: 1px solid #d9d9e8;
    }
  }

  &__paypal-icon {
    width: 18px;
    height: 18px;
  }

  &__terms {
    font-size: 0.6875rem;
    line-height: 1.45;
    color: #8a8aa0;
    font-family: $font-satoshi;
    margin-bottom: 0.8rem;
  }

  &__link {
    color: #61617a;
    text-decoration: underline;
  }

  &__admin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.35rem 0.5rem 0;
    border: 0;
    border-radius: 0;
    font-size: 0.6875rem;
    font-weight: 500;
    font-family: $font-satoshi;
    color: #8888a0;
    cursor: pointer;
    transition: color 0.15s;

    &:hover {
      color: #5f5f77;
    }
  }
}
</style>
