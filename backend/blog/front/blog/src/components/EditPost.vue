<template>
    <PageContainer>
        <form>
            <h2>Edit post</h2>
            <label for="title">Title</label>
            <input class="form-control" type="text" id="title" v-model="title">
            <label for="content">Content</label>
            <textarea class="form-control" name="content" id="content" cols="60" rows="10" v-model="content">
            </textarea>
            <input class="btn btn-success" type="button" value="Save" @click="save">
        </form>
    </PageContainer>
</template>

<script>
import axios from 'axios'
import store from '../store/store'
import PageContainer from './PageContainer'

export default {
    components: {PageContainer},
    props: ['id'],
    data() {
        return {
            title: null,
            content: null
        }
    },
    methods: {
        save() {
            axios
                .put(
                    `http://localhost:8000/posts/${this.id}`,
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
    mounted() {
        axios
                .get(
                    `http://localhost:8000/posts/${this.id}`,
                    {
                        headers: { Authorization: `Bearer ${store.state.token}` }
                    }
                )
                .then((resp) => {
                    this.title = resp.data.title
                    this.content = resp.data.content
                })
                .catch(error => {
                    console.log(error)
                })
        }
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