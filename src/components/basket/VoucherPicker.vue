<template>
  <div class="voucher-strip" :class="{ 'voucher-strip--applied': applied }">
    <svg class="voucher-strip__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3h8l10 10-8 8L3 11z"/>
      <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none"/>
    </svg>

    <!-- Applied state -->
    <template v-if="applied">
      <p class="voucher-strip__text">
        <strong>{{ applied.voucher.name }}</strong> applied — you saved €{{ applied.savings.toFixed(2) }}
      </p>
      <button class="voucher-strip__remove" title="Remove voucher" @click="$emit('remove')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </template>

    <!-- Single voucher: one-click apply -->
    <template v-else-if="options.length === 1">
      <p class="voucher-strip__text">
        <strong>{{ options[0].voucher.name }}</strong> voucher available — covers {{ formatCovered(options[0].coveredNames) }}
      </p>
      <button class="voucher-strip__apply" @click="$emit('apply', options[0].voucher.id)">
        Apply voucher
      </button>
    </template>

    <!-- Multiple vouchers: dropdown picker -->
    <template v-else>
      <p class="voucher-strip__text">
        <strong>{{ options.length }} vouchers</strong> available for this release
      </p>
      <div ref="pickerEl" class="voucher-strip__picker">
        <button class="voucher-strip__apply" @click="toggleDropdown">
          Choose voucher
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" :style="dropdownOpen ? 'transform: rotate(180deg)' : ''">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <transition name="dropdown">
          <div v-if="dropdownOpen" class="voucher-strip__dropdown" :class="{ 'voucher-strip__dropdown--up': openUp }">
            <button
              v-for="option in options"
              :key="option.voucher.id"
              class="voucher-strip__option"
              @click="selectVoucher(option.voucher.id)"
            >
              <span class="voucher-strip__option-head">
                <span class="voucher-strip__option-name">{{ option.voucher.name }}</span>
                <span class="voucher-strip__option-savings">saves €{{ option.savings.toFixed(2) }}</span>
              </span>
              <span class="voucher-strip__option-covers">{{ formatCovered(option.coveredNames) }}</span>
            </button>
          </div>
        </transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { VoucherOption } from '../../types'

const props = defineProps<{
  options: VoucherOption[]
  applied: VoucherOption | null
}>()

const emit = defineEmits<{
  apply: [voucherId: string]
  remove: []
}>()

const dropdownOpen = ref(false)
const openUp = ref(false)
const pickerEl = ref<HTMLElement | null>(null)

// The basket table clips overflow for its rounded corners, so a dropdown
// opening downward from the last release is cut off — flip up when the
// nearest clipping ancestor (or viewport) leaves too little room below.
function toggleDropdown() {
  if (!dropdownOpen.value && pickerEl.value) {
    const rect = pickerEl.value.getBoundingClientRect()
    let clipBottom = window.innerHeight
    let node = pickerEl.value.parentElement
    while (node) {
      const style = getComputedStyle(node)
      if (style.overflowY !== 'visible' || style.overflow !== 'visible') {
        clipBottom = Math.min(clipBottom, node.getBoundingClientRect().bottom)
        break
      }
      node = node.parentElement
    }
    const estimatedHeight = props.options.length * 56 + 12
    openUp.value = clipBottom - rect.bottom < estimatedHeight
  }
  dropdownOpen.value = !dropdownOpen.value
}

function selectVoucher(voucherId: string) {
  dropdownOpen.value = false
  emit('apply', voucherId)
}

function formatCovered(names: string[]): string {
  return names.join(' + ')
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownOpen.value && pickerEl.value && !pickerEl.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style lang="scss" scoped>
.voucher-strip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem 0.7rem 1.15rem;
  background: #f6f3ff;
  border-bottom: 1px solid #ececf5;
  font-family: $font-satoshi;
  color: var(--brand-primary);

  &--applied {
    background: #f6f3ff;
  }

  &__icon {
    flex-shrink: 0;
  }

  &__text {
    flex: 1;
    min-width: 0;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.4;

    strong {
      font-weight: 700;
    }
  }

  &__apply {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    height: 2rem;
    padding: 0 0.85rem;
    border: 1px solid #d5c9ff;
    border-radius: 999px;
    background: #fff;
    color: var(--brand-primary);
    font-size: 0.75rem;
    font-weight: 600;
    font-family: $font-satoshi;
    white-space: nowrap;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;

    svg {
      transition: transform 0.15s;
    }

    &:hover {
      border-color: var(--brand-primary);
      background: #faf8ff;
    }
  }

  &__picker {
    position: relative;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 0.35rem);
    right: 0;
    width: 17rem;
    background: #fff;
    border: 1px solid #e3e3f0;
    border-radius: 0.65rem;
    box-shadow: 0 12px 28px rgba(16, 31, 60, 0.14);
    overflow: hidden;
    z-index: 20;

    &--up {
      top: auto;
      bottom: calc(100% + 0.35rem);
      box-shadow: 0 -12px 28px rgba(16, 31, 60, 0.14);
    }
  }

  &__option {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.15rem;
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: none;
    background: #fff;
    text-align: left;
    font-family: $font-satoshi;
    cursor: pointer;
    transition: background 0.15s;

    & + & {
      border-top: 1px solid #f0f0f7;
    }

    &:hover {
      background: #f6f3ff;
    }
  }

  &__option-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__option-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--blue);
  }

  &__option-savings {
    font-size: 0.75rem;
    font-weight: 700;
    color: #1b8f5f;
    white-space: nowrap;
  }

  &__option-covers {
    font-size: 0.7rem;
    color: #77778e;
    line-height: 1.35;
  }

  &__remove {
    color: #8f8fa4;
    cursor: pointer;
    padding: 0.15rem;
    border: none;
    background: none;
    transition: color 0.15s;
    flex-shrink: 0;

    &:hover { color: var(--error); }
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
