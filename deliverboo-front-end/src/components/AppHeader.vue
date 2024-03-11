<template lang="">
<header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">DeliverBoo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Tipo
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark my-list-type" >
                            <li v-for="(type,index) in JSON.parse(types)" :key="index" @click="()=>console.log('ciao')">
                                {{ type.name_type }}
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="container-fluid d-flex justify-content-end">
                    <form class="d-flex w-25" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
        </nav>

</header>
</template>

<script>
import axios from 'axios';

export default {
    name:'AppHeader',
    data(){
        return{
            types:null,
        }
    },
    methods:{
        getTypes(){
            axios.get('http://127.0.0.1:8000/api/types', {
                params: {
                }
            })
            .then((response) => {
                // console.log(response.data.results);
                // mi serve il this. per poter accedere ai data
                this.types=JSON.stringify(response.data);
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
ul.my-list-type{
    li{
        cursor: pointer;
    }
}
</style>