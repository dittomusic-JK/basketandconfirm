<template>
  <div class="discount">
    <!-- Input mode -->
    <div v-if="!appliedDiscount" class="discount__input-row">
      <label class="discount__label">Do you have a Promo Code?</label>
      <div class="discount__field">
        <div class="discount__controls">
          <input
            v-model="code"
            type="text"
            class="discount__input"
            placeholder="Enter promo code"
            @keyup.enter="handleValidate"
          />
          <button class="discount__validate-btn" @click="handleValidate">
            Apply
          </button>
        </div>
      </div>
    </div>

    <!-- Applied mode -->
    <div v-else class="discount__applied-row">
      <span class="discount__applied-label">Discount ({{ appliedDiscount.code }}, {{ appliedDiscount.percentage }}%)</span>
      <span class="discount__applied-amount">-€{{ appliedDiscount.amount.toFixed(2) }}</span>
      <button class="discount__remove" @click="$emit('remove')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Discount } from '../../types'

defineProps<{
  appliedDiscount: Discount | null
}>()

const emit = defineEmits<{
  apply: [code: string]
  remove: []
}>()

const code = ref('')

function handleValidate() {
  if (code.value.trim()) {
    emit('apply', code.value.trim())
    code.value = ''
  }
}
</script>

<style lang="scss" scoped>
.discount {
  padding: 0.95rem 1.2rem;
  border-bottom: 1px solid #ececf5;

  &__input-row {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--blue);
    font-family: $font-satoshi;
    letter-spacing: 0.01em;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__controls {
    display: flex;
    gap: 0.45rem;
    align-items: center;
  }

  &__input {
    height: 2.2rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid #d9d9e8;
    border-radius: 0.55rem;
    font-size: 0.8125rem;
    font-family: $font-satoshi;
    color: var(--blue);
    flex: 1;
    min-width: 0;
    transition: border-color 0.15s, background 0.15s;

    &::placeholder {
      color: #a1a1b8;
    }

    &:focus {
      border-color: #b8b8cf;
      background: #fff;
    }
  }

  &__validate-btn {
    height: 2.2rem;
    padding: 0 0.95rem;
    border: 1px solid #d9d9e8;
    background: #f8f8fc;
    color: #3f3f55;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: $font-satoshi;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: #c9c9dc;
      background: #f2f2f9;
    }
  }

  &__applied-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    padding: 0.2rem 0;
  }

  &__applied-label {
    font-size: 0.75rem;
    color: #6e6e84;
    font-family: $font-satoshi;
    font-weight: 500;
    flex: 1;
  }

  &__applied-amount {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #1b8f5f;
    font-family: $font-satoshi;
  }

  &__remove {
    color: #8f8fa4;
    cursor: pointer;
    padding: 0.15rem;
    transition: color 0.15s;
    flex-shrink: 0;

    &:hover { color: var(--error); }
  }
}
</style>
