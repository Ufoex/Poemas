<template>
    <div>
        <div class="card">
            <div class="card-header">Editar poema</div>
            <div class="card-body">
                <form method="POST" v-on:submit.prevent="onUpdate">
                    <div class="form-group">
                        <label for="poem" class="">Poema</label>
                        <textarea type="text" id="poem" name="poem" class="form-control col-md-12" rows="5" placeholder="Escribe..."
                                  :class="{'is-invalid': errors.has('poem')}"
                                  v-validate="'required'"
                                  v-model="form.poem"></textarea>
                        <small class="text-danger">{{ errors.first('poem') }}</small>
                    </div>
                    <div class="form-group">
                        <label for="autor" class="">Autor</label>
                        <input type="text" id="autor" name="autor" class="form-control col-md-12" placeholder="Nombre"
                               :class="{'is-invalid': errors.has('autor')}"
                               v-validate="'required'"
                               v-model="form.autor">
                        <small class="text-danger">{{ errors.first('autor') }}</small>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-info" type="submit">Guardar</button>
                        <router-link class="btn btn-danger" :to="{path: '/poem'}">Cancelar</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    poem:'',
                    autor:''
                }
            }
        },
        created() {
            let url = '/poem/'.concat(this.$route.params.id).concat('/edit');
            axios.get(url).then((response) => { this.form = response.data; });
        },
        methods: {
            onUpdate() {
                this.$validator.validateAll().then((result) => {
                    if (result){
                        let url = '/poem/'.concat(this.$route.params.id);
                        axios.patch(url, this.form).then(() => {
                            this.$swal(toastSuccess);
                            this.$router.push({name:'poem-index'});
                        });
                    } else
                        this.$swal(toastError);
                });
            }
        }
    }
</script>

