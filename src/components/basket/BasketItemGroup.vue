<template>
  <div class="basket-group">
    <!-- Release row -->
    <div class="basket-row basket-row--release">
      <div class="basket-row__image">
        <div class="basket-row__artwork">
          <img
            v-if="releaseArtworkSrc(item.release.id)"
            :src="releaseArtworkSrc(item.release.id)"
            :alt="`${item.release.title} artwork`"
            class="basket-row__artwork-image"
          />
          <svg v-else width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#efeffc"/>
            <path d="M16 10v8m0 0l-3-3m3 3l3-3" stroke="#626984" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="basket-row__details">
        <span class="basket-row__title">{{ item.release.title }}</span>
        <span class="basket-row__meta">Release Type: {{ item.release.releaseType }}</span>
        <span class="basket-row__meta">Release Date: {{ item.release.releaseDate }}</span>
        <span class="basket-row__subscription">Distribute your music with this annual subscription<br/>(Terms & Conditions apply)</span>
      </div>
      <div class="basket-row__actions-cell">
        <div class="basket-row__dropdown" @click="showActions = !showActions" v-click-outside="() => showActions = false">
          <button class="basket-row__action-btn">
            Actions
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <Transition name="dropdown">
            <div v-if="showActions" class="basket-row__dropdown-menu">
              <button class="basket-row__dropdown-item" @click="$emit('edit', item.release.id)">Edit</button>
              <button class="basket-row__dropdown-item basket-row__dropdown-item--danger" @click="$emit('remove', item.release.id)">Remove</button>
            </div>
          </Transition>
        </div>
      </div>
      <div class="basket-row__price">Free</div>
      <div class="basket-row__qty">1</div>
      <div class="basket-row__total">Free</div>
    </div>

    <!-- Service rows -->
    <div v-for="svc in item.services" :key="svc.id" class="basket-row basket-row--service">
      <div class="basket-row__image">
        <span class="basket-row__arrow">→</span>
      </div>
      <div class="basket-row__details">
        <span class="basket-row__service-name">{{ svc.name }}
          <template v-if="svc.detail"> <span class="basket-row__service-detail">{{ svc.detail }}</span></template>
        </span>
        <span class="basket-row__meta">(Attached to the above release)</span>
      </div>
      <div class="basket-row__actions-cell"></div>
      <div class="basket-row__price">€{{ svc.price.toFixed(2) }}</div>
      <div class="basket-row__qty">{{ svc.quantity }}</div>
      <div class="basket-row__total">€{{ (svc.price * svc.quantity).toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BasketItem } from '../../types'

defineProps<{
  item: BasketItem
}>()

defineEmits<{
  edit: [releaseId: string]
  remove: [releaseId: string]
}>()

const showActions = ref(false)
const baseUrl = import.meta.env.BASE_URL
const releaseArtworkById: Record<string, string> = {
  'rel-1': `${baseUrl}img/image-1.png`,
  'rel-2': `${baseUrl}img/image-3.png`,
}

const releaseArtworkSrc = (releaseId: string): string => releaseArtworkById[releaseId] ?? ''

// Simple click-outside directive (inline)
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const handler = (e: Event) => {
      if (!el.contains(e.target as Node)) binding.value()
    }
    ;(el as any).__clickOutside = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).__clickOutside)
  }
}
</script>

<style lang="scss" scoped>
.basket-group {
  & + & {
    border-top: 1px solid #ececf5;
  }
}

.basket-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr 6rem 4.5rem 3rem 4.5rem;
  align-items: start;
  padding: 1rem 1rem;
  border-bottom: 1px solid #ececf5;
  font-family: $font-satoshi;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 2.5rem 1fr;
    gap: 0.25rem;
  }

  &--release {
    background: #fff;
  }

  &--service {
    background: #fcfcff;
  }

  &__image {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0.125rem;
  }

  &__artwork {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid #ececf5;
  }

  &__artwork-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__arrow {
    color: #8a8aa0;
    font-size: $text-sm;
    font-weight: 500;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  &__title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--blue);
    line-height: 1.3;
  }

  &__meta {
    font-size: $text-xs;
    color: #77778e;
  }

  &__subscription {
    font-size: $text-xs;
    color: #8b8ba0;
    margin-top: 0.35rem;
    line-height: 1.4;
  }

  &__service-name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--blue);
  }

  &__service-detail {
    font-size: $text-xs;
    color: #8b8ba0;
    display: block;
    margin-top: 0.125rem;
  }

  &__actions-cell {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
    }
  }

  &__dropdown {
    position: relative;
  }

  &__action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.35rem 0.65rem;
    border: 1px solid #dcdceb;
    border-radius: 999px;
    font-size: $text-xs;
    font-weight: 500;
    color: #4a4a62;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;

    &:hover {
      border-color: #c8c8dd;
      background: #f8f8fc;
    }
  }

  &__dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 8rem;
    background: #fff;
    border: 1px solid #e3e3ef;
    border-radius: $radius-lg;
    box-shadow: 0 8px 20px rgba(17, 17, 17, 0.08);
    z-index: 50;
    overflow: hidden;
  }

  &__dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: $text-sm;
    font-family: $font-satoshi;
    color: var(--blue);
    text-align: left;
    cursor: pointer;
    transition: background 0.1s;

    &:hover {
      background: #f8f8fc;
    }

    &--danger {
      color: var(--error);

      &:hover {
        background: rgba($color-error, 0.05);
      }
    }
  }

  &__price, &__qty, &__total {
    font-size: 0.8125rem;
    color: var(--blue);
    text-align: right;
    padding-top: 0.2rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__total {
    font-weight: 700;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
