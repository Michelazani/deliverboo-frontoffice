<template >
    <div class="container position-relative">
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
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Vai al carrello</button>

        <ul class="list-unstyled row">
            <li v-for="(dish,index) in dishes" :key="index" class="col-sm-6 col-md-3 d-flex justify-content-center p-3 "> 
                <article class="card text-center mx-auto p-3 w-100 border border-secondary-subtle d-flex flex-row position-relative my_article">
                    
                        <div class="d-flex justify-content-center align-items-center flex-column me-4">
                            <h2 class="fs-4 text">{{ dish.name }}</h2>
                            <p>Prezzo: €{{ dish.price }}</p>
                            <p>Disponibilità: {{ dish.available ? 'Si' : 'No' }}</p>
                        </div>
                        <div class="card-image my_container_img mb-5">
                            <img class="img-fluid"  :src="'http://127.0.0.1:8000/storage/' + dish.img_dish" alt="Dish Image"> 
                        </div> 
                        <div class="position-absolute add-button-position">
                            <button type="button" :data-dish-id="dish.id" @click="addClickHandler(dish)" class="btn btn-info rounded-circle d-flex justify-content-center align-items-center my_btn">+</button>
                        </div>
                    </article>
            </li>
        </ul>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Carrello</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="list-group" v-if="dishesCartList.length == 0">
                    <li class="list-group-item">
                        <p class="text-muted">Il carrello è vuoto</p>
                    </li>
                </ul>
                <ul class="list-group" v-else">
                    <li v-for="(dishCart, index) in dishesCartList" :key="index" class="list-group-item">
                        <div class="d-flex">
                            <p class="me-2">{{ dishCart.name }}</p>
                            <div class="d-flex input-group my-5 text-center">
                                <button data-count-type="+" :data-dish-Cart-id="dishCart.id" class="input-group-text " @click="(e)=>dishQuantityHandler(e)">+</button>
                                <input data-count-type="input" type="text" :data-dish-Cart-id="dishCart.id" class="w-25" @input="(e)=>dishQuantityHandler(e)" :value=" dishCart.quantity" >
                                <button data-count-type="-" :data-dish-Cart-id="dishCart.id" class="input-group-text" @click="(e)=>dishQuantityHandler(e)">-</button>
                            </div>
                            <p class="me-2">{{ '€'+dishCart.price }}</p>
                            <button type="button"  :data-dish-id="dishCart.id" @click="(e)=>removeClickHandler(e)" class="btn btn-danger btn-sm my-5">X</button>
                        </div>
                    </li>
                </ul>
                <p class="mt-3">{{'Totale: €'+ pricesSumFunc() }}</p>
                <button :class="dishesCartList.length == 0?'d-none':'btn btn-success'"  @click="confCart()">Vai al pagamento</button>
            </div>
        </div>
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
        restaurantIdManager(element) {
            if(element == ''){
                return localStorage.getItem('restIdTarget')
            }
            return element
        },

        getDishes(id) {
            axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/dishes`)
                .then((response) => {
                    // handle success
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
        getRestaurant(id) {
            axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`)
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
        confCart(){
            localStorage.setItem('cart', JSON.stringify(this.dishesCartList));
            localStorage.setItem('totPrice', JSON.stringify(this.pricesSumFunc()));
            this.$router.push('/ordine')
        },
        addClickHandler(dish){
            // indexOf quando non trova elemento nell'array , mette -1
            const checkDish = this.dishesCartList.findIndex(element => element.id === dish.id);
            if(checkDish > -1){
                this.dishesCartList[checkDish].quantity = Number(this.dishesCartList[checkDish].quantity) + 1;
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
            return ; 
        },
        removeClickHandler(e){
            // indexOf quando non trova elemento nell'array , mette -1
            const dishId = e.target.dataset.dishCartId;
            this.dishesCartList.splice(dishId, 1);
        },
        dishQuantityHandler(e){
            const dishId = e.target.dataset.dishCartId;
            const countType = e.target.dataset.countType;
            const checkDish = this.dishesCartList.findIndex(element => element.id == dishId);
            if(countType == '+'){
                this.dishesCartList[checkDish].quantity = Number(this.dishesCartList[checkDish].quantity) + 1;
                // se metto il return nell'if, esce automaticamente e non c'è bisogno dell'else
                return ;
            }else if(countType == '-'){
                if(this.dishesCartList[checkDish].quantity == 1){
                    return;
                }
                this.dishesCartList[checkDish].quantity = Number(this.dishesCartList[checkDish].quantity) - 1;
                // se metto il return nell'if, esce automaticamente e non c'è bisogno dell'else
                return ;
            }
            else if(String(e.target.value).charCodeAt() < 48 || String(e.target.value).charCodeAt() > 57 ||e.target.value < 1){
                e.target.value = ''
                this.dishesCartList[checkDish].quantity = 1
                return;
            }
            this.dishesCartList[checkDish].quantity = e.target.value
        },
        pricesSumFunc(){
            if(this.dishesCartList.length == 0){
                return 0.00;
            }
            let result = 0;
            this.dishesCartList.forEach(item => result += Number((parseFloat(item.price) * parseInt(item.quantity))));
            return result.toFixed(2);
        }
    },
    watch: {
        dishesCartList: {
            handler(newValue, oldValue) {
                    console.log(newValue);
            },
            deep: true,
        }
    },
    mounted() {
        let restId = JSON.parse(localStorage.getItem('restIdTarget'))
        this.getRestaurant(restId);
        this.getDishes(restId);
        // this.postOrder();
    }
}
</script>

<style lang="scss" scoped>
    article.my_article:hover {
        background-color: rgb(202, 202, 202);
    }

    article button {
        height: 2rem;
        width: 2rem;
        text-align: center;
    }

    .add-button-position {
        top: 100px;
    }

    img {
        object-fit: cover;
        height: 10rem;
        width: 10rem;
    }
    button.my_btn {
        position: relative;
        top: 6rem;
        left: 15rem;
    }
    .my_container_img {
        border: 1px solid black;

    }
</style>