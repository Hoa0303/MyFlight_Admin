<template>
    <div class="container">
        <h4 class="text-center">Thêm máy bay mới</h4>
        <div class="col-md-6 mx-auto">
            <PlaneForm :product="newPlane" @submit:product="addPlane" />
        </div>
    </div>
</template>

<script>
import PlaneForm from "@/components/admin/plane_manager/PlaneForm.vue";
import PlaneService from "@/services/plane.service";
export default {
    components: {
        PlaneForm,
    },
    data() {
        return {
            newPlane: {
                SoHieu: '',
                MaHang: '',
                SoGhe: '',
            },
        };
    },
    methods: {
        async addPlane(data) {
            try {
                await PlaneService.create(data);
                window.alert("Máy bay đã thêm thành công")
                this.$router.push({ name: "plane_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
