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
                            <input class="form-check-input" type="checkbox" id="type" @click="setTypes(type.name_type)">
                            <label class="form-check-label" for="type">{{ type.name_type }}</label>
                        </div>
                </div>
         
    </header>
</template>

<script>
import { useState } from '@/state';
import { store } from '@/store';
import axios from 'axios';

export default {
    name:'AppHeader',
    data(){
        return{
            types:null,
            store,
            useState,
        }
    },
    setup(){
        const[targetType,setTargetType] = useState([]);
        return{
            targetType, setTargetType
        };
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
        setTypes(type){
            const indexType=this.targetType.indexOf(type)
            if (indexType == -1 ){
                this.setTargetType([...this.targetType,type])
                this.store.typeFilter=this.targetType;
            }else{
                const newTypes = this.targetType.filter((element, index) => index !== indexType);
                this.setTargetType([...newTypes])
                this.store.typeFilter=this.targetType;
            }
            
        }
    },
    mounted(){
        this.getTypes();
    }
}
</script>

<style lang="scss">

</style>