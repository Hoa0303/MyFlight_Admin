<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh sân bay</h4>
        <div class="col-md-9 mx-auto">
            <AriPortForm :product="product" @submit:product="updateAriPort" @delete:product="deleteAriPort" />
            <p class="text-center">{{ message }}</p>
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
                this.product = await AriPortService.get(id);
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
                await AriPortService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "ariport_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteAriPort() {
            if (confirm("Bạn muốn xóa sân bay này?")) {
                try {
                    await AriPortService.delete(this.product._id);
                    this.$router.push({ name: "ariport_manager" });
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