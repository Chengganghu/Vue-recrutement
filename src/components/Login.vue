<template>
    <div id="add_product">
        name:<br>
        <input class="table-div" id="name_input" v-model="name_input" type="text" placeholder="name"/><br>
        number:<br>
        <input class="table-div" id="number_input" v-model="number_input" type="text" placeholder="number"/><br>
        price:<br>
        <input class="table-div" id="price_input" v-model="price_input" type="text"/><br>
        entrepost_id:<br>
        <input class="table-div" id="entrepot_id_input" v-model="entrepot_id_input" type="text"/><br>
        <button id="ajax_button" v-on:click="axios_post">Submit</button><br>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: function(){
            return{
                info:null,
                name_input:null,
                number_input:null,
                price_input:null,
                entrepot_id_input:null
            }
        },
        methods:{
            axios_post:function() {
                axios.post("http://localhost:8090/rest/products", {
                    name: this.name_input,
                    number: this.number_input,
                    price: this.price_input,
                    entrepotId: this.entrepot_id_input
                })
                    .then(function (response) {
                        alert(response.status)
                    })
                    .catch(function (error) {
                    });
            }
        }
    }
</script>

<style scoped>

</style>