<template>
  <div class="app">
    <nav class="app__nav">
      <div class="app__nav-inner">
        <a href="#" class="app__logo">
          <svg width="100" height="28" viewBox="0 0 1953.2 1000" fill="none">
            <path fill="#121119" fill-rule="evenodd" d="M94.25,682.47v-365.88h5.17c38.5,0,77-.18,115.5.05,34.21.21,67.32,6.08,98.14,21.61,52.1,26.25,81.51,69.17,90.81,126.13,6.07,37.15,3.57,73.88-10.32,109.13-21.03,53.37-61.05,85.54-115.45,100.9-20.47,5.78-41.45,8.26-62.71,8.26-39,.01-78,.01-117,0-1.29.01-2.59-.12-4.14-.2ZM170.7,606.59c11.52,0,22.64-.11,33.76.03,15.86.2,31.64-.41,47.15-4.1,28.27-6.72,51.46-20.64,65.75-46.9,11.29-20.73,13.78-43.23,12.48-66.34-2.67-47.53-29.98-80.37-76.15-91.88-27.06-6.74-54.6-4.47-82.02-4.54-.25,0-.51.38-.98.75,0,70.59,0,141.35,0,212.98Z"/>
            <path fill="#121119" fill-rule="evenodd" d="M1674.41,316.56c102.42,0,184.57,81.96,184.53,184.12-.03,101.07-82.73,182.84-184.86,182.8-101.72-.04-184.09-82.22-184.06-183.63.03-101.31,82.5-183.29,184.39-183.29ZM1784.72,499.89c-.1-60.41-49.35-109.39-110.07-109.45-60.95-.06-110.42,49.13-110.32,109.69.1,60.64,49.58,109.62,110.56,109.45,60.69-.17,109.92-49.34,109.83-109.69Z"/>
            <path fill="#121119" fill-rule="evenodd" d="M774.27,536.85h-145.97v-75.84h145.78v-144.14h76.67v144.01h145.95v75.97h-145.85v145.23h-76.58c0-48.31,0-96.4,0-145.23Z"/>
            <path fill="#121119" fill-rule="evenodd" d="M1417.56,536.95h-145.88v145.17h-76.39v-145.09h-145.88v-75.97h145.61v-144.27h76.5v143.89h146.05c-.01,25.65-.01,50.67-.01,76.27Z"/>
            <path fill="#121119" fill-rule="evenodd" d="M556.38,682.32h-75.62v-365.46h75.62v365.46Z"/>
          </svg>
        </a>

        <div class="app__links">
          <a href="#" class="app__link">Artists</a>
          <a href="#" class="app__link">Music</a>
          <a href="#" class="app__link">Videos</a>
          <a href="#" class="app__link">Royalties</a>
          <a href="#" class="app__link">Analytics</a>

          <div ref="promoDropdownRef" class="app__dropdown">
            <button class="app__link app__link--dropdown" @click="promoOpen = !promoOpen">
              Promotion
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="app__chevron" :class="{ 'app__chevron--open': promoOpen }">
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="promoOpen" class="app__dropdown-menu">
              <a href="#" class="app__dropdown-item" @click.prevent="promoOpen = false">Promo Campaigns</a>
              <a href="#" class="app__dropdown-item" @click.prevent="promoOpen = false">Ad Launcher</a>
              <a href="#" class="app__dropdown-item" @click.prevent="promoOpen = false">Promo Cards</a>
              <a href="#" class="app__dropdown-item" @click.prevent="promoOpen = false">AI Artwork Generator</a>
            </div>
          </div>

          <div ref="rightsDropdownRef" class="app__dropdown">
            <button class="app__link app__link--dropdown" @click="rightsOpen = !rightsOpen">
              Rights Management
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" class="app__chevron" :class="{ 'app__chevron--open': rightsOpen }">
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="rightsOpen" class="app__dropdown-menu">
              <a href="#" class="app__dropdown-item" @click.prevent="rightsOpen = false">Music Publishing</a>
              <a href="#" class="app__dropdown-item" @click.prevent="rightsOpen = false">Apply for Sync</a>
              <a href="#" class="app__dropdown-item" @click.prevent="rightsOpen = false">Neighbouring Rights</a>
              <a href="#" class="app__dropdown-item" @click.prevent="rightsOpen = false">Report Live Performance</a>
            </div>
          </div>
        </div>

        <div class="app__actions">
          <button class="app__create-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <g clip-path="url(#create-clip)">
                <path d="M13.1689 0C14.1246 0 15.0586 0.279814 15.8532 0.803845C16.6477 1.32788 17.2669 2.07278 17.6326 2.94403C17.9982 3.81557 18.094 4.77434 17.9075 5.69957C17.721 6.62479 17.261 7.47445 16.5853 8.14145C15.9096 8.80845 15.0489 9.26275 14.1116 9.44657C13.1743 9.63068 12.203 9.53614 11.32 9.17521C10.4371 8.81428 9.6828 8.20301 9.15192 7.41872C8.62105 6.63442 8.33759 5.71241 8.33759 4.76909C8.33906 3.50482 8.84836 2.29249 9.75403 1.39849C10.66 0.50419 11.8879 0.00145888 13.1689 0ZM11.5583 5.16649H12.7661V6.35869C12.7661 6.46402 12.8086 6.56527 12.884 6.63967C12.9594 6.71408 13.0619 6.75609 13.1686 6.75609C13.2753 6.75609 13.3779 6.71408 13.4533 6.63967C13.5287 6.56527 13.5712 6.46402 13.5712 6.35869V5.16649H14.779C14.8857 5.16649 14.9883 5.12448 15.0636 5.05007C15.139 4.97567 15.1816 4.87442 15.1816 4.76909C15.1816 4.66376 15.139 4.56251 15.0636 4.48811C14.9883 4.41371 14.8857 4.37169 14.779 4.37169H13.5712V3.17949C13.5712 3.07416 13.5287 2.97291 13.4533 2.89851C13.3779 2.82411 13.2753 2.78209 13.1686 2.78209C13.0619 2.78209 12.9594 2.82411 12.884 2.89851C12.8086 2.97291 12.7661 3.07416 12.7661 3.17949V4.37169H11.5583C11.4516 4.37169 11.349 4.41371 11.2736 4.48811C11.1983 4.56251 11.1557 4.66376 11.1557 4.76909C11.1557 4.87442 11.1983 4.97567 11.2736 5.05007C11.349 5.12448 11.4516 5.16649 11.5583 5.16649Z" fill="currentColor"/>
                <path d="M7.68701 4.76888C7.68701 4.47915 7.71036 4.19467 7.7547 3.91748L6.35569 4.17629C4.86446 4.45202 3.7838 5.73729 3.7835 7.23498V13.3661C3.4019 13.142 2.9665 13.0227 2.52223 13.02C1.12914 13.02 0 14.1349 0 15.5098C0 16.8846 1.12943 17.9995 2.52223 17.9995C3.91504 17.9995 5.04447 16.8846 5.04447 15.5098V9.83034C5.04447 9.23103 5.47691 8.71692 6.0737 8.60662L8.84334 8.0931C8.11856 7.17575 7.68671 6.02177 7.68671 4.7683L7.68701 4.76888Z" fill="currentColor"/>
                <path d="M13.8727 10.136V11.5015C13.4911 11.2766 13.056 11.1564 12.6115 11.1529C11.2184 11.1529 10.0892 12.2677 10.0892 13.6426C10.0892 15.0174 11.2187 16.1323 12.6115 16.1323C14.0043 16.1323 15.1337 15.0177 15.1337 13.6426V9.82178C14.7338 9.9735 14.3114 10.0806 13.8724 10.136H13.8727Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="create-clip"><rect width="18" height="18" fill="white"/></clipPath>
              </defs>
            </svg>
            Create
          </button>

          <button class="app__icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9.53674e-07C5.37258 9.53674e-07 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C23.9928 5.37555 18.6244 0.00716496 12 9.53674e-07ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22Z" fill="#B1B1C3"/>
              <path d="M12.717 5.06287C11.5496 4.85016 10.3479 5.16678 9.43689 5.92717C8.52586 6.68756 7.99947 7.8132 8 8.99986C8 9.55215 8.44772 9.99987 9 9.99987C9.55229 9.99987 10 9.55215 10 8.99986C9.99949 8.40416 10.2646 7.83924 10.723 7.45889C11.1815 7.07855 11.7856 6.92236 12.371 7.03287C13.179 7.18972 13.8116 7.82031 13.971 8.62787C14.1324 9.47794 13.7289 10.3354 12.971 10.7529C11.7249 11.4748 10.9699 12.8171 11 14.2569V14.9999C11 15.5521 11.4477 15.9999 12 15.9999C12.5523 15.9999 13 15.5522 13 14.9999V14.2569C12.9745 13.5486 13.3291 12.8806 13.93 12.5049C15.4147 11.6894 16.2248 10.0272 15.9523 8.35539C15.6798 6.68357 14.3838 5.36464 12.717 5.06287Z" fill="#B1B1C3"/>
              <path d="M11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18Z" fill="#B1B1C3"/>
            </svg>
          </button>

          <button class="app__icon-btn app__icon-btn--cart" @click="$router.push('/basket')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23.2668 9.034C22.6976 8.377 21.8726 8 21.0028 8H20.9169C20.4185 3.506 16.6035 0 11.9846 0C7.36559 0 3.55058 3.506 3.05223 8H2.9963C2.12744 8 1.30351 8.377 0.733259 9.034C0.163005 9.691 -0.092661 10.562 0.0301784 11.425L1.08979 18.849C1.50925 21.786 4.05991 24 7.02204 24H16.978C19.9402 24 22.4908 21.785 22.9103 18.849L23.9699 11.425C24.0927 10.563 23.8361 9.692 23.2668 9.034ZM11.9846 2C15.5 2 18.4171 4.613 18.9035 8H5.0656C5.55196 4.613 8.46915 2 11.9846 2ZM21.9925 11.142L20.9329 18.566C20.6532 20.524 18.9534 22.001 16.978 22.001H7.02204C5.04562 22.001 3.34584 20.524 3.06721 18.566L2.00759 11.142C1.96565 10.851 2.04954 10.568 2.24129 10.345C2.43404 10.122 2.70169 10 2.9953 10H21.0028C21.2964 10 21.564 10.122 21.7578 10.345C21.9495 10.568 22.0344 10.851 21.9925 11.142ZM12.9832 13V19C12.9832 19.553 12.5368 20 11.9846 20C11.4323 20 10.9859 19.553 10.9859 19V13C10.9859 12.447 11.4323 12 11.9846 12C12.5368 12 12.9832 12.447 12.9832 13ZM17.9767 13V19C17.9767 19.553 17.5303 20 16.978 20C16.4257 20 15.9793 19.553 15.9793 19V13C15.9793 12.447 16.4257 12 16.978 12C17.5303 12 17.9767 12.447 17.9767 13ZM7.98977 13V19C7.98977 19.553 7.54336 20 6.99108 20C6.4388 20 5.99239 19.553 5.99239 19V13C5.99239 12.447 6.4388 12 6.99108 12C7.54336 12 7.98977 12.447 7.98977 13Z" fill="#B1B1C3"/>
            </svg>
            <span v-if="basketCount > 0" class="app__badge">{{ basketCount }}</span>
          </button>

          <div ref="avatarDropdownRef" class="app__dropdown app__dropdown--avatar">
            <button class="app__avatar" @click="avatarOpen = !avatarOpen">
              <img src="https://i.pravatar.cc/32?img=68" alt="User" class="app__avatar-img" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="avatarOpen" class="app__dropdown-menu app__dropdown-menu--right app__dropdown-menu--account">
              <div class="app__account-header">
                <img src="https://i.pravatar.cc/48?img=68" alt="User" class="app__account-avatar" />
                <div class="app__account-info">
                  <span class="app__account-name">James Keane</span>
                  <span class="app__account-badge">LABEL 5</span>
                </div>
              </div>
              <div class="app__dropdown-divider"></div>
              <a href="#" class="app__dropdown-item app__dropdown-item--icon" @click.prevent="avatarOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Account Settings
              </a>
              <a href="#" class="app__dropdown-item app__dropdown-item--icon" @click.prevent="avatarOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Order History
              </a>
              <a href="#" class="app__dropdown-item app__dropdown-item--icon" @click.prevent="avatarOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Perks
              </a>
              <div class="app__dropdown-divider"></div>
              <a href="#" class="app__dropdown-item app__dropdown-item--icon app__dropdown-item--logout" @click.prevent="avatarOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="app__main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBasketStore } from './composables/useBasketStore'

const { basket } = useBasketStore()
const basketCount = computed(() => basket.value.length)

const rightsOpen = ref(false)
const promoOpen = ref(false)
const avatarOpen = ref(false)
const rightsDropdownRef = ref<HTMLElement | null>(null)
const promoDropdownRef = ref<HTMLElement | null>(null)
const avatarDropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  if (rightsDropdownRef.value && !rightsDropdownRef.value.contains(target)) rightsOpen.value = false
  if (promoDropdownRef.value && !promoDropdownRef.value.contains(target)) promoOpen.value = false
  if (avatarDropdownRef.value && !avatarDropdownRef.value.contains(target)) avatarOpen.value = false
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.app {
  min-height: 100vh;
  background: var(--lighter-grey);
  &__nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 4rem;
    background: #fff;
    border-bottom: 1px solid var(--brand-border);
    padding: 0 2rem;
    z-index: 1040;
    display: flex;
    align-items: center;
  }
  &__nav-inner {
    max-width: 80rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.75rem;
    height: 4rem;
  }
  &__logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  &__links {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    flex: 1;
    @media (max-width: 768px) { display: none; }
  }
  &__link {
    padding: 0.5rem 0.75rem;
    font-size: $text-sm;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--blue);
    text-decoration: none;
    transition: color 0.15s;
    white-space: nowrap;
    background: none;
    border: none;
    cursor: pointer;
    &:hover { color: var(--brand-primary); }
    &--dropdown {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
  &__dropdown { position: relative; }
  &__chevron {
    transition: transform 0.2s;
    &--open { transform: rotate(180deg); }
  }
  &__dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    min-width: 14rem;
    background: #fff;
    border: 1px solid var(--faded-grey);
    border-radius: $radius-lg;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);
    padding: 0.375rem 0;
    z-index: 100;
  }
  &__dropdown-item {
    display: block;
    padding: 0.625rem 1rem;
    font-size: $text-sm;
    font-weight: 500;
    font-family: $font-satoshi;
    color: var(--blue);
    text-decoration: none;
    transition: background 0.1s, color 0.1s;
    &:hover {
      background: var(--lighter-grey);
      color: var(--brand-primary);
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
    flex-shrink: 0;
  }
  &__create-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: $text-sm;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--brand-primary);
    background: #fff;
    border: 1.5px solid var(--brand-primary);
    border-radius: 2rem;
    cursor: pointer;
    padding: 0.4rem 1rem 0.4rem 0.75rem;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    &:hover {
      background: var(--brand-primary);
      color: #fff;
    }
  }
  &__icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    color: var(--ditto-grey);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    transition: opacity 0.15s;
    padding: 0;
    position: relative;
    &:hover { opacity: 0.7; }
  }
  &__badge {
    position: absolute;
    top: -2px;
    right: -4px;
    background: var(--error);
    color: #fff;
    font-size: 0.625rem;
    font-weight: 700;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-satoshi;
  }
  &__avatar {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: var(--ditto-grey);
  }
  &__avatar-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--brand-primary);
  }
  &__dropdown-menu--right {
    left: auto;
    right: 0;
  }
  &__dropdown-menu--account {
    min-width: 16rem;
    padding: 0;
  }
  &__account-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
  }
  &__account-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--brand-primary);
  }
  &__account-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  &__account-name {
    font-size: $text-sm;
    font-weight: 600;
    font-family: $font-satoshi;
    color: var(--blue);
  }
  &__account-badge {
    display: inline-flex;
    align-items: center;
    font-size: 0.625rem;
    font-weight: 700;
    font-family: $font-satoshi;
    color: var(--brand-primary);
    background: rgba($color-brand-primary, 0.1);
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    letter-spacing: 0.03em;
    width: fit-content;
  }
  &__dropdown-divider {
    height: 1px;
    background: var(--faded-grey);
    margin: 0.25rem 0;
  }
  &__dropdown-item--icon {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.625rem 1rem;
    svg {
      flex-shrink: 0;
      color: #B1B1C3;
    }
  }
  &__dropdown-item--logout {
    color: #e74c3c;
    svg { color: #e74c3c; }
    &:hover {
      background: #fef2f2;
      color: #e74c3c;
    }
  }
  &__main {
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem;
    padding-top: calc(4rem + 2rem);
  }
}
</style>
