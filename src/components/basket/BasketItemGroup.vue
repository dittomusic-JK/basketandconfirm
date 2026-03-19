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
        <span class="basket-row__meta">{{ item.release.releaseType }}</span>
        <span class="basket-row__meta">{{ item.release.releaseDate }}</span>
      </div>
      <div class="basket-row__actions-cell">
        <button class="basket-row__icon-btn" title="Edit" @click="$emit('edit', item.release.id)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="basket-row__icon-btn basket-row__icon-btn--danger" title="Remove" @click="$emit('remove', item.release.id)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
      <div class="basket-row__total">Free</div>
    </div>

    <!-- Service rows -->
    <div v-for="svc in item.services" :key="svc.id" class="basket-row basket-row--service">
      <div class="basket-row__image">
        <span class="basket-row__arrow">→</span>
      </div>
      <div class="basket-row__details">
        <span class="basket-row__service-name">{{ svc.name }}</span>
      </div>
      <div class="basket-row__actions-cell"></div>
      <div class="basket-row__total">€{{ svc.price.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BasketItem } from '../../types'

defineProps<{
  item: BasketItem
}>()

defineEmits<{
  edit: [releaseId: string]
  remove: [releaseId: string]
}>()

const baseUrl = import.meta.env.BASE_URL
const releaseArtworkById: Record<string, string> = {
  'rel-1': `${baseUrl}img/image-1.png`,
  'rel-2': `${baseUrl}img/image-3.png`,
}

const releaseArtworkSrc = (releaseId: string): string => releaseArtworkById[releaseId] ?? ''
</script>

<style lang="scss" scoped>
.basket-group {
  & + & {
    border-top: 1px solid #ececf5;
  }
}

.basket-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr auto 5.5rem;
  align-items: center;
  padding: 0.85rem 1rem;
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
    align-items: center;
    justify-content: center;
    gap: 0.35rem;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
    }
  }

  &__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.85rem;
    height: 1.85rem;
    border: 1px solid #dcdceb;
    border-radius: 0.45rem;
    background: #fff;
    color: #6e6e84;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    padding: 0;

    &:hover {
      border-color: #c0c0d4;
      background: #f5f5fb;
      color: var(--blue);
    }

    &--danger:hover {
      border-color: #f0c0c0;
      background: #fef5f5;
      color: var(--error);
    }
  }

  &__total {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--blue);
    text-align: right;

    @media (max-width: 768px) {
      display: none;
    }
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
