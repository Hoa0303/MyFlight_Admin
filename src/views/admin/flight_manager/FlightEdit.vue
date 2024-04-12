<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh tuyến bay</h4>
        <div class="col-md-9 mx-auto">
            <FlightForm :product="product" @submit:product="updateAriLine" @delete:product="deleteAriLine" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import FlightForm from "@/components/admin/flight_manager/FlightForm.vue";
import FlightService from "@/services/flight.service";
export default {
    components: {
        FlightForm,
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
                this.product = await FlightService.get(id);
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
        async updateAriLine(data) {
            try {
                await FlightService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "flight_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteAriLine() {
            if (confirm("Bạn muốn xóa tuyến bay này?")) {
                try {
                    await FlightService.delete(this.product._id);
                    this.$router.push({ name: "flight_manager" });
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