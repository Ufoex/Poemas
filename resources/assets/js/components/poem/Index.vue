<template>
    <div>
        <div class="text-lg-right">
            <router-link class="btn btn-primary" :to="{path: '/poem/create'}">Nuevo</router-link>
        </div>
        <div class="form-group align-content-end">
            <input type="text" id="search" name="search" v-model="search" class="form-control col-md-5" placeholder="buscar...">
        </div>
        <div v-if="filteredPoems.length !== 0">
            <div class="card" v-for="poe in filteredPoems">
                <div class="card-header">
                    {{poe.autor}} - <b>creado el {{poe.created_at}}</b>
                </div>
                <div class="card-body text-justify">
                    {{poe.poem}}
                </div>
                <div class="card-footer">
                    <router-link class="btn btn-success" v-bind:to="{name: 'poem-edit', params: {id: poe.id}}">Editar</router-link>
                    <button class="btn btn-danger" v-on:click="onDelete(poe.id, poe)">Eliminar</button>
                </div>
            </div>
        </div>
        <strong v-else>No se encontraron registros</strong>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                poems: [],
                search: '',
            }
        },
        created(){
            axios.get('/poem').then((response) => { this.poems = response.data });
        },
        methods: {
            onDelete(id, element) {
                this.$swal(confirmDelete).then((result) => {
                    if (result.value) {
                        let url = '/poem/'.concat(id);
                        axios.delete(url).then(() => {
                            this.$swal(toastDelete);
                            this.poems.splice(this.poems.indexOf(element), 1);
                        });
                    }
                });
            }
        },
        computed: {
            filteredPoems(){
                return this.poems.filter((poe) => {
                    return poe.autor.match(this.search);
                });
            }
        }
    }
</script>
