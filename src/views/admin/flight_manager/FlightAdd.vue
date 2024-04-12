<template>
    <div class="container">
        <h4 class="text-center">Thêm tuyến bay mới</h4>
        <div class="col-md-6 mx-auto">
            <FlightForm :product="newProduct" @submit:product="addProduct" />
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
    data() {
        return {
            newProduct: {
                MaTuyen: '',
                GiaTuyen: '',
                SanBayDen: '',
                SanBayDi: '',
                derpartId: '',
                destinaId: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await FlightService.create(data);
                window.alert("Tuyến bay mới đã thêm thành công")
                this.$router.push({ name: "flight_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
