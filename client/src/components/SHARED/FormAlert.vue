<template>
    <!-- <v-alert type="error" v-model="alert" color="error" icon="warning"> -->
        <v-alert type="error" :value="true" dismissible transition="scale-transition">
        <h3>{{message}}</h3>
    </v-alert>
</template>



<script>
export default {
    props: ['message'],
    data(){
        return{
            alert: true
        }
    }
}
</script>