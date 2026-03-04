<script setup lang="ts">

</script>

<template>
    <UApp>
        <UHeader :ui="{ container: '!max-w-none' }" class="border-b-0" title="Vela" :toggle="false">
            <template #right>
                <UColorModeButton color="primary" class="cursor-pointer" />
            </template>
        </UHeader>
        <USeparator />

        <UMain>
            <slot></slot>
        </UMain>

    </UApp>


</template>