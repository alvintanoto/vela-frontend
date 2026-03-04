<script setup lang="ts">
import { separator } from '#build/ui'
import type { NavigationMenuItem } from '@nuxt/ui'


</script>

<template>
    <UApp>
        <UHeader :ui="{ container: '!max-w-none' }" class="border-b-0" title="Vela" :toggle="false" />
        <USeparator />

        <UMain>
            <slot></slot>
        </UMain>

    </UApp>


</template>