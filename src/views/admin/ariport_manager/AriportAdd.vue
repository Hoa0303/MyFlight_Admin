<template>
    <div class="container">
        <h4 class="text-center">Thêm sân bay mới</h4>
        <div class="col-md-6 mx-auto">
            <AriPortForm :product="newProduct" @submit:product="addProduct" />
        </div>
    </div>
</template>

<script>
import AriPortForm from "@/components/admin/ariport_manager/AriPortForm.vue";
import AriPortService from "@/services/ariport.service";
export default {
    components: {
        AriPortForm,
    },
    data() {
        return {
            newProduct: {
                code: '',
                name: '',
                local: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await AriPortService.create(data);
                window.alert("Sân bay đã thêm thành công")
                this.$router.push({ name: "ariport_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
