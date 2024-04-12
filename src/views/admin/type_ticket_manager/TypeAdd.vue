<template>
    <div class="container">
        <h4 class="text-center">Thêm loại vé mới</h4>
        <div class="col-md-6 mx-auto">
            <TypeForm :product="newProduct" @submit:product="addProduct" />
        </div>
    </div>
</template>

<script>
import TypeForm from "@/components/admin/type_ticket_manager/TypeForm.vue";
import TypeService from "@/services/type.service";
export default {
    components: {
        TypeForm,
    },
    data() {
        return {
            newProduct: {
                MaLoai: '',
                name: '',
                Gia: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await TypeService.create(data);
                window.alert("Loại vé mới đã thêm thành công")
                this.$router.push({ name: "type_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
