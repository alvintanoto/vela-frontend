<script setup lang="ts">
import { separator } from '#build/ui'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const collapseNavigation = ref(false)

const viewport = useViewport()
const checkViewport = () => {
    if (viewport.isLessThan('desktop')) {
        collapseNavigation.value = true
    } else {
        collapseNavigation.value = false
    }
}
checkViewport()

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
    console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
    checkViewport()
})

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Deep Space',
            to: '/',
            icon: 'i-lucide-telescope',
            active: route.path.startsWith("/"),
            class: "p-2 mb-1"
        },
        {
            label: 'Trending',
            to: '/trending',
            icon: 'i-lucide-trending-up',
            active: route.path.startsWith("/trending"),
            class: "p-2 mb-1"

        },
        {
            label: 'Explore',
            to: '/explore',
            icon: 'i-lucide-radar',
            active: route.path.startsWith("/explore"),
            class: "p-2 mb-4"

        },
    ]
])

</script>

<template>
    <UHeader :ui="{ container: '!max-w-none' }" class="border-b-0" title="Vela" toggle-side="left" mode="modal">
        <template #default>
            <div class="w-md">
                <UInput trailing-icon="i-lucide-search" size="md" placeholder="Search..." class="w-full" />
            </div>

        </template>

        <template #right>
            <UColorModeButton color="primary" class="cursor-pointer" />
            <UButton icon="i-lucide-rocket" size="md" color="primary" variant="solid" class="cursor-pointer">Login
            </UButton>

        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" />
        </template>
    </UHeader>

    <USeparator />

    <UMain>
        <div class="flex">
            <UNavigationMenu v-if="!collapseNavigation" orientation="vertical" :items="items" class="m-2 w-54">
            </UNavigationMenu>
            <USeparator v-if="!collapseNavigation" orientation="vertical" class="h-screen" />
            <div class="flex flex-row-reverse w-full p-4">
                <div class="w-6">
                    <slot name="content"></slot>
                </div>
                <div class="grow">
                    <slot name="content-right"></slot>
                </div>

            </div>

        </div>
    </UMain>



</template>