<template>
    <div class="container">
        <h4 class="text-center">Thêm sản phẩm mới</h4>
        <div class="col-md-6 mx-auto">
            <AriLineForm :product="newProduct" @submit:product="addProduct" />
        </div>
    </div>
</template>

<script>
import AriLineForm from "@/components/admin/porduct_manager/AriLineForm.vue";
import BookService from "@/services/ariline.service";
export default {
    components: {
        AriLineForm,
    },
    data() {
        return {
            newProduct: {
                code: '',
                name: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await BookService.create(data);
                window.alert("Hãng đã thêm thành công")
                this.$router.push({ name: "book_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
