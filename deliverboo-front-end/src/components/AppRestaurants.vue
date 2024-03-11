<template >
    <div>
        <div class="container">
        <ul class="list-unstyled row">
            <li class="col-sm-6 col-md-3 d-flex justify-content-center p-3" v-for="(restaurant,index) in JSON.parse(restaurants)" :key="index"> 
                <article class="card text-center mx-auto p-3 w-100" >
                    <div class="h-50 d-flex justify-content-center align-items-center">
                        <h1>{{ restaurant.name_restaurant }}</h1>
                    </div>
                    <div class="card-image">
                        <!-- <img class="img-fluid mb-3 mt-3" style="height: 15rem; object-fit:contain" src="{{ asset('storage') . '/' . restaurant.image_restaurant }}" alt="restaurant Image"> -->
                    </div>
                    <p>Tipo: {{ restaurant.name_type}}</p>
                    <p>Indirizzo: {{ restaurant.address_restaurant}}</p>
                </article>
            </li>
        </ul>
</div>

    </div>
</template>
<script>
import axios from 'axios';
export default {    
    name:'Apprestaurant',
    data(){
        return{
            restaurants:null,
        }
    },
    methods:{
        getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/restaurants', {
                params: {
                }
            })
            .then((response) => {
                // console.log(response.data.results);
                // mi serve il this. per poter accedere ai data
                this.restaurants=JSON.stringify(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.warn(error);
            })
        },
    },
    mounted(){
        this.getRestaurants();
    }
}
</script>

<style lang="scss">
</style>