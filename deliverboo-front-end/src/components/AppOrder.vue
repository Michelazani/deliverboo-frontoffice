<template lang="">
    <div class="container">
    <div class="row justify-content-center ">
        <div class="col-7">
            <!-- <form action='' methods="POST"> -->

                <h2 class="m-4">Ordine</h2>
                <div class="mb-3 input-group">
                    <label for="customer_name" class="input-group-text">Nome <span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_name" id="customer_name" v-model="customer_name">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_surname" class="input-group-text">Cognome<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_surname" id="customer_surname" v-model="customer_surname">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_address" class="input-group-text">Indirizzo<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_address" id="customer_address" v-model="customer_address">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_email" class="input-group-text">Email<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_email" id="customer_email" v-model="customer_email">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_phone" class="input-group-text">Numero di telefono<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_phone" id="customer_phone" v-model="customer_phone">
                </div>

                <div class="mb-3 input-group">
                    <button type="submit" class="btn btn-primary m-2" @click="(e)=>clickHandler(e)">
                        Conferma il tuo ordine
                    </button>
                </div>

            <!-- </form> -->
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
    name:'AppOrder',
    data(){
        return {
            total_price: null,
            customer_address: null,
            customer_name: null,
            customer_surname: null,
            customer_phone: null,
            customer_email: null,
            date_and_time: null,
        }
    },
    methods: {
        clickHandler() {

            const newDate = new Date();
            const currentDate = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDay()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
            
            console.log(currentDate)

            const order = 
                { 
                    "restaurant_id": JSON.parse(localStorage.getItem('restIdTarget')),
                    "total_price": JSON.parse(localStorage.getItem('totPrice')),
                    "customer_address" :  this.customer_address, 
                    "customer_name" :  this.customer_name, 
                    "customer_surname" :  this.customer_surname, 
                    "date_and_time" :  currentDate, 
                    "customer_phone" :  this.customer_phone, 
                    "customer_email" :  this.customer_email,
                    "order_dishes" : JSON.parse(localStorage.getItem('cart')),
                };

                localStorage.setItem('fullOrder', JSON.stringify(order));

                // console.log(order);
                // axios.post(`http://127.0.0.1:8000/api/order`, order)
                // .then((response) => {
                //     // handle success
                //     console.log(response.config.data);
                // })
                // .catch(function (error) {
                //     // handle error
                //     console.log(error);
                // })
                // .finally(function () {
                //     // always executed
                // });
            this.$router.push('/pagamento')
        }
    },
}

</script>
<style lang="">

</style>