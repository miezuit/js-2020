<template>
    <PageContainer>
        <article v-for="post in posts" :key="post.id">
            <h3>{{post.title}}</h3>
            <h6>{{new Date(post.date).toLocaleDateString()}}</h6>
            <p>{{post.content}}</p>
            <div>
                <router-link :to="{path: '/posts/edit/' + post.id }">Edit</router-link>
                <a href="#" @click="del(post.id)">Delete</a>
            </div>
        </article>
    </PageContainer>
</template>

<script>

import axios from 'axios'
import PageContainer from './PageContainer'

export default {
    components: {
        PageContainer
    },
    data() {
        return {
            posts: []
        }
    },
    methods: {
        del(id) {
            axios.delete(
                `http://localhost:8000/posts/${id}`,
                {
                    headers: { Authorization: `Bearer ${this.$store.state.token}` }
                }
            ).then(() => this.getPosts())
            .catch(err => console.log(err))
        },
        getPosts() {
            axios.get(
            'http://localhost:8000/posts',
            {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
            }
            )
            .then(response => { this.posts = response.data; console.log(response.data) })
            .catch(err => console.log(err))
        }

    },
    mounted() {
        this.getPosts()
    }
}
</script>

<style scoped>
article {
    border: 1px solid #eeeeee;
    margin: 1em;
    border-radius: 10px;
    padding: 1em;
}
h3 {
    color: darkgreen;
}
h6 {
    color: lightcoral;
}
</style>