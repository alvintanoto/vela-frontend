<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [{
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    required: true
}, {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
}, {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
}]

const providers = [{
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
        toast.add({ title: 'Google', description: 'Login with Google' })
    }
}]

const schema = z.object({
    username: z.string('Username is required').min(3, 'Must be at least 3 characters'),
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
}
</script>

<template>
    <NuxtLayout name="auth">
        <div class="flex flex-col items-center justify-center gap-4 p-4">
            <UPageCard class="w-full max-w-md">
                <UAuthForm :schema="schema" title="Vela Login"
                    description="Enter your credentials to access your account." icon="i-lucide-user" :fields="fields"
                    :providers="providers" @submit="onSubmit" />
            </UPageCard>
        </div>
    </NuxtLayout>
</template>
