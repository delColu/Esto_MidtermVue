# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


https://docs.google.com/document/d/1ce8Sbks0WKya3yNjO5d3KzGoBotaj2AXTdiA2EoQ73U/mobilebasic



https://github.com/Loyd-894562/ipt2025


https://docs.google.com/document/d/1d7pQhjx53nb3tNJ461g0mH6K217HfuFaLnE4f3l_kew/mobilebasic

Excellent — let’s tie everything together into a **small but realistic Vue 3 CRUD app example**, showing how all the topics you listed interact.

We'll walk through it in **layers**, so you can see the structure and how each concept fits.

---

## 🌱 Overview: "Vue Notes App"

We’ll build a **simple Notes Manager** that:

* Uses **forms** to add and edit notes
* Displays notes with **class binding** for styling
* Uses **emits** and **props** for parent-child communication
* Persists notes in **Local Storage**
* Optionally fetches starter data from an **API**
* Organized with **Composition API**
* Built using **Vite** and **Vue Router**
* Supports full **CRUD** operations

---

## ⚡ 1. Project Setup with Vite

```bash
npm create vite@latest vue-notes
cd vue-notes
npm install
npm run dev
```

Then choose **Vue** (and optionally **TypeScript**).

---

## 🗺️ 2. Router Setup

`src/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

---

## 🧠 3. Main Entry

`src/main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'

createApp(App).use(router).mount('#app')
```

---

## 🏠 4. Home View (Main CRUD Page)

`src/views/Home.vue`

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import NoteForm from '@/components/NoteForm.vue'
import NoteList from '@/components/NoteList.vue'

const notes = ref([])
const editingNote = ref(null)

// Load saved notes from local storage
onMounted(() => {
  const saved = localStorage.getItem('notes')
  if (saved) notes.value = JSON.parse(saved)
})

// Save to local storage whenever notes change
watch(notes, (newNotes) => {
  localStorage.setItem('notes', JSON.stringify(newNotes))
}, { deep: true })

// Create or update note
const saveNote = (note) => {
  if (editingNote.value) {
    // Update existing
    const index = notes.value.findIndex(n => n.id === editingNote.value.id)
    notes.value[index] = { ...note, id: editingNote.value.id }
    editingNote.value = null
  } else {
    // Create new
    notes.value.push({ ...note, id: Date.now() })
  }
}

// Delete note
const deleteNote = (id) => {
  notes.value = notes.value.filter(n => n.id !== id)
}

// Edit note
const editNote = (note) => {
  editingNote.value = { ...note }
}
</script>

<template>
  <div class="container">
    <h1>📝 Notes App</h1>

    <NoteForm :editingNote="editingNote" @save="saveNote" />

    <NoteList :notes="notes" @edit="editNote" @delete="deleteNote" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
```

---

## 🧾 5. Form Handling (NoteForm.vue)

`src/components/NoteForm.vue`

```vue
<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps(['editingNote'])
const emit = defineEmits(['save'])

const title = ref('')
const content = ref('')

// Load note data when editing
watch(() => props.editingNote, (note) => {
  if (note) {
    title.value = note.title
    content.value = note.content
  } else {
    title.value = ''
    content.value = ''
  }
})

const handleSubmit = () => {
  if (!title.value.trim()) return alert('Title cannot be empty!')
  emit('save', { title: title.value, content: content.value })
  title.value = ''
  content.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="note-form">
    <input v-model="title" placeholder="Note title" class="input" />
    <textarea v-model="content" placeholder="Write something..." class="textarea"></textarea>
    <button type="submit" class="btn">{{ props.editingNote ? 'Update' : 'Add' }}</button>
  </form>
</template>

<style scoped>
.note-form { display: flex; flex-direction: column; gap: 0.5rem; }
.input, .textarea { padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; }
.btn { padding: 0.6rem; border: none; border-radius: 8px; background: #42b883; color: white; cursor: pointer; }
.btn:hover { background: #36976d; }
</style>
```

**Topics covered here:**

* **Form Handling:** `v-model`, validation, submit event
* **Props + Emits:** Parent–child communication
* **Composition API:** Reactive state in `setup()`

---

## 🗂️ 6. Display Notes (NoteList.vue)

`src/components/NoteList.vue`

```vue
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['notes'])
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div v-if="!notes.length">No notes yet...</div>
  <ul>
    <li
      v-for="note in notes"
      :key="note.id"
      :class="{ important: note.title.toLowerCase().includes('important') }"
    >
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <button @click="$emit('edit', note)">Edit</button>
      <button @click="$emit('delete', note.id)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
li {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  list-style: none;
}
li.important {
  background: #ffe0e0;
  border-left: 5px solid red;
}
button {
  margin-right: 5px;
  padding: 0.4rem 0.6rem;
  border: none;
  background: #ccc;
  border-radius: 5px;
}
button:hover { background: #bbb; }
</style>
```

**Topics covered here:**

* **Class Binding:** highlight important notes dynamically
* **Event Emission:** edit & delete send data back to parent
* **Reactivity:** changes reflect immediately

---

## 🌐 7. Optional: Fetching from an API

You can preload notes from a fake API:

```js
onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  const data = await res.json()
  notes.value = data.map(p => ({ id: p.id, title: p.title, content: p.body }))
})
```

**This integrates API fetching with your reactive state and Local Storage.**

---

## ⚖️ 8. Composition API vs Options API

This whole project uses the **Composition API** — cleaner, with `ref`, `watch`, and `onMounted`.
If we rewrote it using **Options API**, we’d have `data()`, `methods`, and `mounted()` sections — more verbose for this use case.

---

## 💾 9. Local Storage

The app **automatically saves notes** when the `notes` array changes via the `watch()` function.
This makes the data persistent across page reloads.

---

## 🔁 10. CRUD Summary

Here’s how each CRUD operation appears in this example:

| Operation   | Example in App    | Implementation               |
| ----------- | ----------------- | ---------------------------- |
| **Create**  | Add note via form | `saveNote()` adds new note   |
| **Read**    | Display list      | `NoteList.vue` renders notes |
| **Update**  | Edit note         | `editingNote` updates values |
| **Delete**  | Remove note       | `deleteNote()` filters notes |
| **Persist** | Save locally      | `localStorage` + `watch()`   |

---

## 💡 Concept Map — How It All Connects

```
[NoteForm] ---> emits "save" ---> [Home]
                   ↑                    ↓
             props: editingNote     passes props to
                   ↓                    ↑
             [NoteList] <--- emits "edit"/"delete"
                   ↑
            Local Storage / API Sync
```

---

## ✅ What You Learned (Concept Integration)

| Concept                    | Used In                          |
| -------------------------- | -------------------------------- |
| Class & Object Binding     | Highlighting important notes     |
| Form Handling              | Adding/editing notes             |
| Emitting Events            | Child → Parent communication     |
| Parent-Child Communication | Props & Emits between components |
| Fetching From API          | Optional starter data            |
| Vite                       | Project setup                    |
| Route Configuration        | Multi-page SPA structure         |
| Composition API            | Reactive & modular logic         |
| Local Storage              | Data persistence                 |
| CRUD                       | Core of app’s functionality      |

---

Would you like me to **expand this example** further — for instance, adding **API-based CRUD (with Axios)** and **routing to a detail page for each note** so you can see dynamic routes and PUT/DELETE requests in action?

