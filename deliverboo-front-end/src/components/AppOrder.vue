<template lang="">
    <div class="container">
    <div class="row justify-content-center ">
        <div class="col-7">
            <!-- <form action='' methods="POST"> -->

                <h2 class="m-4">Ordine</h2>
                <div class="mb-3 input-group">
                    <label for="customer_name" class="input-group-text">Nome <span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_name" id="customer_name">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_surname" class="input-group-text">Cognome<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_surname" id="customer_surname">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_address" class="input-group-text">Indirizzo<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_address" id="customer_address">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_email" class="input-group-text">Email<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_email" id="customer_email">
                </div>
                <div class="mb-3 input-group">
                    <label for="customer_phone" class="input-group-text">Numero di telefono<span style="color: red">*</span>:</label>
                    <input class="form-control" type="text" name="customer_phone" id="customer_phone">
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
export default {
    name:'AppOrder',
    methods: {
        clickHAndler() {
            this.$router.push('/pagamento')
        }
    },
}

</script>
<style lang="">

</style>