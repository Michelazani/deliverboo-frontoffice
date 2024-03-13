<template >
    <div>
        <div class="container">
        <ul class="list-unstyled row">
            <li class="col-sm-6 col-md-3 d-flex justify-content-center p-3" v-for="(restaurant,index) in restaurants" :key="index"> 
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
                            {{ type.name_type}} 
                            <span v-if="index == restaurant.types.length - 1">
                                .  
                            </span>
                            <span v-else>
                                ,
                            </span>
                        </span>
                    </p>
                    <p>Indirizzo: {{ restaurant.address_restaurant}}</p>
                </article>
            </li>
            {{ console.log(store.restaurantsData) }}
        </ul>
        </div>
    </div>
</template>

@if ( $types[count($types) -1]->name_type == $type->name_type)
            .
            @else
            ,
            @endif 

<script>
import {store} from '../store.js';
import axios from 'axios';
export default {    
    name:'AppRestaurant',
    data(){
        return{
            restaurants:null,
            rest:null,
            store,
        }
    },
    methods:{
        getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/restaurants')
                .then((response) => {
                    // handle success
                    console.log(response.data.results);
                    this.restaurants = response.data.results;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
    },
    mounted(){
        this.getRestaurants();
    }
}
</script>

<style lang="scss">
</style>