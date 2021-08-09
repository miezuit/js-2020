<template>
    <PageContainer>
        <form>
            <h2>Add a new post</h2>
            <label for="title">Title</label>
            <input class="form-control" type="text" id="title" v-model="title">
            <label for="content">Content</label>
            <textarea class="form-control" name="content" id="content" cols="60" rows="10" v-model="content">
            </textarea>
            <input class="btn btn-success" type="button" value="Add" @click="add">
        </form>
    </PageContainer>
</template>

<script>
import axios from 'axios'
import store from '../store/store'
import PageContainer from './PageContainer'

export default {
    components: {PageContainer},
    data() {
        return {
            title: null,
            content: null
        }
    },
    methods: {
        add() {
            axios
                .post(
                    'http://localhost:8000/posts',
                    {
                        title: this.title,
                        content: this.content
                    },
                    {
                        headers: { Authorization: `Bearer ${store.state.token}` }
                    }
                )
                .then(() => {
                    this.$router.push('/posts/view')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
}
</script>

<style scoped>
 form {
     border: 1px solid #cccccc;
     border-radius: 10px;
     padding: 1em;
 }
 input[type="button"] {
     margin-top: 1em;
 }
</style>