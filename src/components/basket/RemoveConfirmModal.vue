<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('cancel')">
        <div class="modal">
          <h3 class="modal__title">Remove release?</h3>
          <p class="modal__body">
            Are you sure you want to remove <strong>{{ releaseTitle }}</strong> from basket?
          </p>
          <div class="modal__actions">
            <button class="btn btn-danger" @click="$emit('confirm')">Remove</button>
            <button class="btn btn-outline" @click="$emit('cancel')">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  releaseTitle: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  border-radius: $radius-card;
  padding: 2rem;
  max-width: 28rem;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &__title {
    font-size: $text-h4;
    font-weight: 700;
    font-family: $font-poppins;
    color: var(--blue);
    margin-bottom: 0.75rem;
  }

  &__body {
    font-size: $text-sm;
    font-family: $font-satoshi;
    color: var(--ditto-grey);
    line-height: 1.6;
    margin-bottom: 1.5rem;

    strong {
      color: var(--blue);
    }
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
