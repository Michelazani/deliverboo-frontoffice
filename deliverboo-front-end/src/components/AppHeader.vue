<template lang="">
    <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">DeliverBoo</a>
            </div>
            </nav>
                <div class="container mt-3 mb-3" id="">
                    <h4>Seleziona la tipologia del ristorante:</h4>
                        <div class="form-check form-check-inline" v-for="(type,index) in types" :key="index">
                            <input class="form-check-input" type="checkbox" id="type" value="{{store.newTypeFilter=type.NameType}}">
                            <label class="form-check-label" for="type">{{ type.name_type }}</label>
                        </div>
                </div>
    </header>
</template>

<script>
import { store } from '@/store';
import axios from 'axios';

export default {
    name:'AppHeader',
    data(){
        return{
            types:null,
            store,
        }
    },
    methods:{
        getTypes(){
            axios.get('http://127.0.0.1:8000/api/types', {
                params: {
                }
            })
            .then((response) => {
                console.log(response.data.results);
                // mi serve il this. per poter accedere ai data
                this.types=response.data.results;
                // console.log(response.data);
            })
            .catch(function (error) {
                console.warn(error);
            })
        },
    },
    mounted(){
        this.getTypes();
    }
}
</script>

<style lang="scss">

</style>