<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh loại vé</h4>
        <div class="col-md-9 mx-auto">
            <TypeForm :product="product" @submit:product="updateAriPort" @delete:product="deleteAriPort" />
            <p class="text-center">{{ message }}</p>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await TypeService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateAriPort(data) {
            try {
                await TypeService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "type_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteAriPort() {
            if (confirm("Bạn muốn xóa loại này?")) {
                try {
                    await TypeService.delete(this.product._id);
                    this.$router.push({ name: "type_manager" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>