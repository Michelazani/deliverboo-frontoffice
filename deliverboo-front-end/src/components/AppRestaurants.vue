<template >
    <div>
        <div class="container">
        <ul class="list-unstyled row">
            <li class="col-sm-6 col-md-3 d-flex justify-content-center p-3" v-for="(restaurant,index) in typesFilterFunc('ciao', restaurants)" :key="index"> 
                <article class="card text-center mx-auto p-3 w-100" >
                    <div class="h-50 d-flex justify-content-center align-items-center">
                        <h1>{{ restaurant.name_restaurant }}</h1>
                    </div>
                    <div class="card-image">
                            <!-- <img class="img-fluid mb-3 mt-3" style="height: 15rem; object-fit:contain" src="{{ asset('storage') . '/' . restaurant.image_restaurant }}" alt="restaurant Image"> -->
                    </div>
                    <p>
                        Tipo: 
                        <span v-for="(type, index) in restaurant.types" :key="index">
                            <span v-if="index == restaurant.types.length - 1">
                                {{ type.name_type}}.  
                            </span>
                            <span v-else>
                                {{ type.name_type}},
                            </span>
                        </span>
                    </p>
                    <p>Indirizzo: {{ restaurant.address_restaurant}}</p>
                </article>
                
            </li>
            {{ console.log(typesFilterFunc('ciao', restaurants)) }}
        </ul>
        </div>
    </div>
</template>

<script>
import { useState } from '@/state';
import {store} from '../store.js';
import axios from 'axios';
export default {    
    name:'AppRestaurant',
    data(){
        return{
            rest:null,
            store,
            useState,
        }
    },
    setup(){
        const[restaurants,setRestaurants] = useState([]);
        return{
            restaurants, setRestaurants
        };
    },
    methods:{
        getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/restaurants')
                .then((response) => {
                    // handle success
                    console.log(response.data.results);
                    this.setRestaurants(response.data.results);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },  
        typesFilterFunc(filterValue, ary){
            return ary.filter((element)=>{
                if(element.restaurant_id){
                    element.includes()
                }
            });
            
            
        }
    },
    watch:{
        'store.typeFilter': {
            handler(newValue, oldValue){
                console.log('paperella')
                this.getRestaurants();
            }, 
            deep: true,
        }
    },
    mounted(){
        this.getRestaurants();
    }
}
</script>

<style lang="scss">
</style>