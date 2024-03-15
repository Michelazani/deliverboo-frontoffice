<template >
    <div class="container">
        <article v-for="(rest,index) in restaurant" :key="index" class="card w-25 text-center mx-auto p-4 m-4" >
            <h1>
                {{ rest.name_restaurant }}
            </h1>
            <div class="card-image">
                <img class="img-thumbnail" :src="'http://127.0.0.1:8000/storage/' + rest.image_restaurant" alt="Dish Image">
            </div>
                <p>
                    Tipo: 
                    <span v-for="(type, index) in rest.types" :key="index">
                        <span v-if="index == rest.types.length - 1">
                            {{ type.name_type}}.  
                        </span>
                        <span v-else>
                            {{ type.name_type}},
                        </span>
                    </span>
                </p>
                <p>Indirizzo: {{ rest.address_restaurant}}</p>
        </article>
        <ul class="list-unstyled row">
            <li v-for="(dish,index) in dishes" :key="index" class="col-sm-6 col-md-3 d-flex justify-content-center p-3"> 
                <article class="card text-center mx-auto p-3 w-100" >
                    <div class="h-50 d-flex justify-content-center align-items-center">
                        <h2>{{ dish.name }}</h2>
                    </div>
                    <div class="card-image">
                        <img class="img-fluid mb-3 mt-3" style="height: 15rem; object-fit:contain"  :src="'http://127.0.0.1:8000/storage/' + dish.img_dish" alt="Dish Image"> 
                    </div>
                    <p>Prezzo: €{{ dish.price }}</p>
                    <p>Disponibilità: {{ dish.available ? 'Si' : 'No' }}</p>  
                    <button type="button" :data-dish-id="dish.id" @click="addClickHandler(dish)" class="btn btn-info">+</button>
                </article>
            </li>
        </ul>

    </div>
</template>

<script>
import { useState } from '@/state';
import { store } from '../store.js';
import axios from 'axios';


export default {
    
    name: 'AppDishes',
    data(){
        return{
            dishes:null,
            store,
            useState,
            restaurant:null,
            dishesCartList:[],
        };
    },
    // setup() {
    //     const [restaurants, setRestaurants] = useState([]);
    //     return {
    //         restaurants, setRestaurants
    //     };
    // },
    methods: {
        getDishes() {
            axios.get(`http://127.0.0.1:8000/api/restaurants/${this.store.restaurantTargetId}/dishes`)
                .then((response) => {
                    // handle success
                    console.log(response.data.results);
                    this.dishes=response.data.results;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
        getRestaurant() {
            axios.get(`http://127.0.0.1:8000/api/restaurants/${this.store.restaurantTargetId}`)
            .then((response) => {
                // handle success
                // console.log(response.data.results);
                this.restaurant=response.data.results;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        addClickHandler(dish){
            // indexOf quando non trova elemento nell'array , mette -1
            const checkDish = this.dishesCartList.findIndex(element => element.id === dish.id);
            {{ console.log(checkDish) }}
            if(checkDish > -1){
                this.dishesCartList[checkDish].quantity += 1;
                // se metto il return nell'if, esce automaticamente e non c'è bisogno dell'else
                {{ console.log(this.dishesCartList) }}
                return ;
            }
            this.dishesCartList.push({
                'id' : dish.id,
                'name': dish.name,
                'price': dish.price,
                'quantity': 1
            });
            {{ console.log(this.dishesCartList) }}
            return ; 

        }
    },
    // watch: {
    //     'store.typeFilter': {
    //         handler(newValue, oldValue) {
        //             console.log('paperella');
    //             this.getRestaurants();
    //         },
    //         deep: true,
    //     }
    // },
    mounted() {
        this.getRestaurant();
        this.getDishes();
    }
}
</script>

<style lang="scss">
</style>