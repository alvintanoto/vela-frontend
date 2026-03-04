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
            label: 'Your Space',
            to: '/',
            icon: 'i-lucide-telescope',
            active: route.path == "/",
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
    <UApp>
        <UHeader :ui="{ container: '!max-w-none' }" class="border-b-0" title="Vela" toggle-side="left" mode="modal">
            <template #default>
                <div class="w-md">
                    <UInput trailing-icon="i-lucide-search" size="md" placeholder="Search..." class="w-full" />
                </div>

            </template>

            <template #right>
                <UColorModeButton color="primary" class="cursor-pointer" />
                <NuxtLink to="/login">
                    <UButton icon="i-lucide-rocket" size="md" color="primary" variant="solid" class="cursor-pointer">
                        Login
                    </UButton>
                </NuxtLink>

            </template>

            <template #body>
                <UNavigationMenu :items="items" orientation="vertical" />
            </template>
        </UHeader>

        <USeparator />

        <UMain>

            <div class="flex flex-row min-h-[calc(100vh-var(--ui-header-height))]">
                <UNavigationMenu v-if="!collapseNavigation" orientation="vertical" :items="items" class="m-2 w-54" />
                <USeparator v-if="!collapseNavigation" orientation="vertical" class="h-auto" />

                <div class="w-full flex justify-center">
                    <div class="flex flex-row w-full m-4 max-w-7xl">
                        <div class="grow p-2">
                            <slot name="content"></slot>
                        </div>

                        <div v-if="!collapseNavigation" class=" w-64 p-2">
                            <slot name="content-right">
                            </slot>
                        </div>

                    </div>
                </div>
            </div>
        </UMain>
    </UApp>
</template>