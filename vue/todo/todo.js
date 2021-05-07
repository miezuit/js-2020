import "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"
import { TodoList, Task } from "./classes.js"

Vue.component('task', {
    props: ['task'],
    data() {
        return {
            editable: false,
            newTaskDescription: this.task.getDescription()
        }
    },
    template: `
    <li class="task" :class="{ done: task.isDone() }">
        <input v-if="editable" type="text" v-model="newTaskDescription" @keyup.enter="rename">
        <span 
            v-else 
            class="desc" 
            @click="switchDone"> 
            {{ task.getDescription() }} 
        </span>
        <span class="remove" @click="remove">🗑</span>
        <span class="edit" @click="edit">✎</span>
    </li>
    `,
    methods: {
        switchDone() {
            this.task.switchDone()
        },
        remove() {
            this.$emit('removed')
        },
        rename() {
            this.task.changeDescription(this.newTaskDescription)
            this.editable = false
        },
        edit() {
            this.editable = true
        }
    },
})

Vue.component('todo-list', {
    data() {
        return {
            list: new TodoList('Today'),
            newTaskDescription: ''
        }
    },
    template: `
    <div>
        <h2> {{ list.getName() }} </h2>
        <ul>
            <task v-for="(task, index) in list.getTasks()"
                :key="index"
                :task="task"
                @removed="remove(index)"
            ></task>
        </ul>
        <input 
           type="text" 
           v-model="newTaskDescription" 
           placeholder="Something to do"
           @keyup.enter="addTask"
        >
    </div>
    `,
    methods: {
        addTask() {
            this.list.add(new Task(this.newTaskDescription))
        },
        remove(index) {
            this.list.remove(index)
        }
    },
})

new Vue({
    el: '#app',
    template: `
    <todo-list></todo-list>
    `
})
