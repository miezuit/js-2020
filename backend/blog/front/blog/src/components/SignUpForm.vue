<template>
    <div>
        <form>
            <h2>Sign Up</h2>
            <label for="email">Email address</label>
            <input class="form-control" type="text" id="email" v-model="email">
            <label for="name">Name</label>
            <input class="form-control" type="text" id="name" v-model="name">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" v-model="password">
            <input class="btn btn-primary" type="button" value="Submit" @click="signup">
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: null,
            name: null,
            password: null
        }
    },
    methods: {
        signup() {
            console.log('Signed up')
            axios
                .post(
                    'http://localhost:8000/user',
                    {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    }
                )
                .then(this.$router.push('/signup/success'))
                .catch(error => console.log(error));
        }
    },
}
</script>

<style scoped>
 div {
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
 }
 form {
     border: 1px solid #cccccc;
     border-radius: 10px;
     padding: 1em;
 }
 input[type="button"] {
     margin-top: 1em;
 }
</style>