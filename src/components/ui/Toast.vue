<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" class="toast">
        <div class="toast__icon" :class="`toast__icon--${type}`">
          <svg v-if="type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else-if="type === 'info'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/>
            <path d="M8 5.5V5.51M8 7.5V10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg v-else-if="type === 'warning'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 6V8.5M8 10.5V10.51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M6.856 2.487L1.213 12.5C1.074 12.74 1 13.012 1 13.29C1 14.232 1.768 15 2.71 15H13.29C14.232 15 15 14.232 15 13.29C15 13.012 14.926 12.74 14.787 12.5L9.144 2.487C8.64 1.613 7.36 1.613 6.856 2.487Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="toast__message">{{ message }}</p>
        <button @click="$emit('close')" class="toast__close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  visible: boolean
  message: string
  type?: 'success' | 'info' | 'warning'
}>(), {
  type: 'success'
})

defineEmits<{
  close: []
}>()
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid var(--faded-grey);
  border-radius: $radius-lg;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  max-width: 90vw;

  &__icon {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--success {
      background: rgba($color-success, 0.1);
      color: var(--success);
    }

    &--warning {
      background: $color-amber-100;
      color: $color-amber-600;
    }

    &--info {
      background: rgba($color-brand-secondary, 0.1);
      color: var(--brand-secondary);
    }
  }

  &__message {
    font-size: $text-sm;
    font-weight: 500;
    color: var(--blue);
    font-family: $font-satoshi;
  }

  &__close {
    padding: 0.25rem;
    color: var(--ditto-grey);
    flex-shrink: 0;
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover {
      color: var(--blue);
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
