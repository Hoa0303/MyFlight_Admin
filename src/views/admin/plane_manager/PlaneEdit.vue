<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh máy bay</h4>
        <div class="col-md-9 mx-auto">
            <PlaneList :product="product" @submit:product="updatePlane" @delete:product="deletePlane" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import PlaneList from "@/components/admin/plane_manager/PlaneForm.vue";
import PlaneService from "@/services/plane.service";
export default {
    components: {
        PlaneList,
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
                this.product = await PlaneService.get(id);
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
        async updatePlane(data) {
            try {
                await PlaneService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "plane_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deletePlane() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await PlaneService.delete(this.product._id);
                    this.$router.push({ name: "plane_manager" });
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