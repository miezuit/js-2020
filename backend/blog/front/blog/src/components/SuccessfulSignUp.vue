<template>
    <div>
        <h1>You have successfully signed up!</h1>
        <router-link to="/login">
            <input class="btn btn-info" type="button" value="Press here to log in">
        </router-link>
    </div>
</template>

<style scoped>
 div {
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
 }
</style>