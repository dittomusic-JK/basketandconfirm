<template>
  <div class="credit">
    <!-- Not applied state -->
    <div v-if="creditApplied === 0" class="credit__offer">
      <div class="credit__info">
        <h4 class="credit__title">Account credit</h4>
        <p class="credit__balance">You currently have <strong>€{{ balance.toFixed(2) }}</strong> credit on your account.</p>
      </div>
      <button class="credit__apply" @click="$emit('apply')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="display: inline; vertical-align: middle; margin-right: 4px;">
          <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
          <path d="M1 6h12" stroke="currentColor" stroke-width="1.2"/>
        </svg>
        Apply credit
      </button>
    </div>

    <!-- Applied state -->
    <div v-else class="credit__applied">
      <span class="credit__applied-label">Credit Reduction</span>
      <span class="credit__applied-amount">-€{{ creditApplied.toFixed(2) }}</span>
      <button class="credit__remove" @click="$emit('remove')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  balance: number
  creditApplied: number
}>()

defineEmits<{
  apply: []
  remove: []
}>()
</script>

<style lang="scss" scoped>
.credit {
  padding: 0.95rem 1.2rem;
  border-bottom: 1px solid #ececf5;

  &__offer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    @media (max-width: 580px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  &__title {
    font-size: 0.75rem;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--blue);
    letter-spacing: 0.01em;
  }

  &__balance {
    font-size: 0.75rem;
    color: #6f6f84;
    font-family: $font-satoshi;
    margin-top: 0.15rem;

    strong {
      color: var(--blue);
    }
  }

  &__apply {
    height: 2rem;
    padding: 0 0.85rem;
    border: 1px solid #d9d9e8;
    border-radius: 999px;
    background: #fff;
    color: #43435a;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: $font-satoshi;
    white-space: nowrap;
    transition: border-color 0.15s, background 0.15s;

    &:hover {
      border-color: #c9c9dc;
      background: #f8f8fc;
    }
  }

  &__applied {
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
