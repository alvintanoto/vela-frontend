<script setup lang="ts">
import { separator } from '#build/ui'
import type { NavigationMenuItem } from '@nuxt/ui'


</script>

<template>
    <UHeader :ui="{ container: '!max-w-none' }" class="border-b-0" title="Vela" toggle-side="left" mode="modal" />
    <USeparator />

    <UMain>
        <slot></slot>
    </UMain>



</template>