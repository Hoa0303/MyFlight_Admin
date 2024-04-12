<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh tuyến</h4>
        <div class="col-md-9 mx-auto">
            <RouteForm :product="product" @submit:product="updateRoute" @delete:product="deleteRoute" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import RouteForm from "@/components/admin/route_manager/RouteForm.vue";
import RouteService from "@/services/route.service";
export default {
    components: {
        RouteForm,
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
                this.product = await RouteService.get(id);
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
        async updateRoute(data) {
            try {
                await RouteService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "route_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteRoute() {
            if (confirm("Bạn muốn xóa tuyến bay này?")) {
                try {
                    await RouteService.delete(this.product._id);
                    this.$router.push({ name: "route_manager" });
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

<style scoped>
.page {
    text-align: left;
    max-width: 100px;
}
</style>