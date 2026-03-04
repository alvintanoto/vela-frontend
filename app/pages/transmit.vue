<script setup lang="ts">
import { editorToolbar } from '#build/ui';
import type { Post } from '../stores/post';
import type { EditorToolbarItem } from '@nuxt/ui';
import z from 'zod';

const postStore = usePostStore()

const postTargets = [{
    label: 'v/Username',
    avatar: { src: 'https://picsum.photos/200/200?random=1' }
},]

const selectedPostTarget = ref(postTargets[0])

const postTitle = ref("")
const postValue = ref("")

const editorTools: EditorToolbarItem[][] = [
    // History controls
    [{
        kind: 'undo',
        icon: 'i-lucide-undo',
        tooltip: { text: 'Undo' }
    }, {
        kind: 'redo',
        icon: 'i-lucide-redo',
        tooltip: { text: 'Redo' }
    }],
    // Block types
    [{
        icon: 'i-lucide-heading',
        tooltip: { text: 'Headings' },
        content: {
            align: 'start'
        },
        items: [{
            kind: 'heading',
            level: 1,
            icon: 'i-lucide-heading-1',
            label: 'Heading 1'
        }, {
            kind: 'heading',
            level: 2,
            icon: 'i-lucide-heading-2',
            label: 'Heading 2'
        }, {
            kind: 'heading',
            level: 3,
            icon: 'i-lucide-heading-3',
            label: 'Heading 3'
        }, {
            kind: 'heading',
            level: 4,
            icon: 'i-lucide-heading-4',
            label: 'Heading 4'
        }]
    }, {
        icon: 'i-lucide-list',
        tooltip: { text: 'Lists' },
        content: {
            align: 'start'
        },
        items: [{
            kind: 'bulletList',
            icon: 'i-lucide-list',
            label: 'Bullet List'
        }, {
            kind: 'orderedList',
            icon: 'i-lucide-list-ordered',
            label: 'Ordered List'
        }]
    }, {
        kind: 'blockquote',
        icon: 'i-lucide-text-quote',
        tooltip: { text: 'Blockquote' }
    }, {
        kind: 'codeBlock',
        icon: 'i-lucide-square-code',
        tooltip: { text: 'Code Block' }
    }, {
        kind: 'horizontalRule',
        icon: 'i-lucide-separator-horizontal',
        tooltip: { text: 'Horizontal Rule' }
    }],
    // Text formatting
    [{
        kind: 'mark',
        mark: 'bold',
        icon: 'i-lucide-bold',
        tooltip: { text: 'Bold' }
    }, {
        kind: 'mark',
        mark: 'italic',
        icon: 'i-lucide-italic',
        tooltip: { text: 'Italic' }
    }, {
        kind: 'mark',
        mark: 'underline',
        icon: 'i-lucide-underline',
        tooltip: { text: 'Underline' }
    }, {
        kind: 'mark',
        mark: 'strike',
        icon: 'i-lucide-strikethrough',
        tooltip: { text: 'Strikethrough' }
    }, {
        kind: 'mark',
        mark: 'code',
        icon: 'i-lucide-code',
        tooltip: { text: 'Code' }
    }],
    // Link
    [{
        kind: 'link',
        icon: 'i-lucide-link',
        tooltip: { text: 'Link' }
    }],
    // Text alignment
    [{
        icon: 'i-lucide-align-justify',
        tooltip: { text: 'Text Align' },
        content: {
            align: 'end'
        },
        items: [{
            kind: 'textAlign',
            align: 'left',
            icon: 'i-lucide-align-left',
            label: 'Align Left'
        }, {
            kind: 'textAlign',
            align: 'center',
            icon: 'i-lucide-align-center',
            label: 'Align Center'
        }, {
            kind: 'textAlign',
            align: 'right',
            icon: 'i-lucide-align-right',
            label: 'Align Right'
        }, {
            kind: 'textAlign',
            align: 'justify',
            icon: 'i-lucide-align-justify',
            label: 'Align Justify'
        }]
    }]
]

const formSchema = z.object({
    title: z.string().min(3, 'Title length cannot less than 5 word'),
    value: z.string().trim().min(1, "Markdown cannot be empty")
})
const onTransmit = () => {
    const dataToValidate = {
        target: selectedPostTarget.value?.label,
        title: postTitle.value,
        value: postValue.value
    }

    const result = formSchema.safeParse(dataToValidate)

    if (result.success) {
        postStore.addPost({
            target: dataToValidate.target,
            title: dataToValidate.title,
            value: dataToValidate.value,
        } as Post)
        navigateTo("/")
    } else {
        // TODO: Handle Error
    }
}
</script>

<template>
    <NuxtLayout>
        <template #content>
            <div class="text-2xl font-bold mb-4">Create Transmission</div>
            <USelectMenu class="rounded-full px-2 py-3 min-w-64 mb-8" variant="soft" v-model="selectedPostTarget"
                option-attribute="label" :items="postTargets" :avatar="{
                    src: selectedPostTarget?.avatar.src,
                    loading: 'lazy'
                }">

                <template #item="{ item }">
                    <UUser :name="item.label" :avatar="{
                        src: item.avatar.src,
                        loading: 'lazy',
                    }" />
                </template>
            </USelectMenu>

            <div>
                <UInput size="xl" placeholder="Title" class="w-full mb-4" v-model="postTitle" />
                <div>
                    <UEditor ref="editorRef" v-slot="{ editor }" v-model="postValue" content-type="markdown"
                        :ui="{ base: 'p-4 sm:px-8' }" class="w-full min-h-96 border border-muted rounded-sm"
                        placeholder="Start writing here...">
                        <UEditorToolbar :editor="editor" :items="editorTools"
                            class="border-b border-muted py-2 px-4 sm:px-8 overflow-x-auto" />
                    </UEditor>
                </div>
                <div class="my-4 float-right">
                    <UButton class="font-bold rounded-full px-3 py-2 mx-2 cursor-pointer" variant="soft">Save as draft
                    </UButton>
                    <UButton @click="onTransmit" class="font-bold rounded-full  px-3 py-2 cursor-pointer">Transmit
                    </UButton>
                </div>
            </div>
        </template>


    </NuxtLayout>
</template>