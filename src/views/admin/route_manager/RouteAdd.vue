<template>
    <div class="container">
        <h4 class="text-center">Thêm tuyến mới</h4>
        <div class="col-md-6 mx-auto">
            <RouteForm :product="newProduct" @submit:product="addProduct" />
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
    data() {
        return {
            newProduct: {
                MaTuyen: '',
                MaTuyenBay: '',
                MaHang: '',
                NgayKhoiHanh: '',
                GioKhoiHanh: '',
                GioDen: '',
                SoHieu: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await RouteService.create(data);
                window.alert("Tuyến mới đã thêm thành công")
                this.$router.push({ name: "route_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
