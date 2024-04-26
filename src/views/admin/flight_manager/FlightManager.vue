<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-up"></i> Tuyến bay
            </h4>

            <div class="row col-12">
                <div class="form-group mb-3 col-3">
                    <select class="form-select" id="maTuyenDropdown" v-model="selectedMaTuyen">
                        <option value="">Tất cả Mã Tuyến</option>
                        <option v-for="flight in uniqueMaTuyens" :value="flight">{{ flight }}</option>
                    </select>
                </div>
                <div class="form-group mb-3 col-3">
                    <select class="form-select" id="sortOrderDropdown" v-model="sortOrder">
                        <option value="">Sắp xếp</option>
                        <option value="increasing">Tăng dần</option>
                        <option value="decreasing">Giảm dần</option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddFlight">
                    <i class="fas fa-plus"></i> Thêm tuyến bay mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredFlightsCount }} tuyến bay.</span>
                </button>
            </div>

            <!-- Hiển thị danh sách tuyến bay -->
            <FlightList v-if="filteredFlightsCount > 0" :flights="filteredFlights" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
        </div>
    </div>
</template>

<script>
import FlightList from "@/components/admin/flight_manager/FlightList.vue";
import FlightService from "@/services/flight.service";

export default {
    components: {
        FlightList,
    },
    data() {
        return {
            Flights: [],
            activeIndex: -1,
            selectedMaTuyen: "",
            sortOrder: "",
        };
    },
    computed: {
        uniqueMaTuyens() {
            const maTuyens = new Set();
            this.Flights.forEach((flight) => {
                maTuyens.add(flight.MaTuyen);
            });
            return Array.from(maTuyens);
        },
        filteredFlights() {
            let filtered = this.selectedMaTuyen ? this.Flights.filter((flight) => flight.MaTuyen === this.selectedMaTuyen) : this.Flights;

            if (this.sortOrder === "increasing") {
                filtered.sort((a, b) => a.GiaTuyen - b.GiaTuyen);
            } else if (this.sortOrder === "decreasing") {
                filtered.sort((a, b) => b.GiaTuyen - a.GiaTuyen);
            }

            return filtered;
        },
        activeFlight() {
            if (this.activeIndex < 0) return null;
            return this.filteredFlights[this.activeIndex];
        },
        filteredFlightsCount() {
            return this.filteredFlights.length;
        },
    },
    methods: {
        async retrieveFlights() {
            try {
                this.Flights = await FlightService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFlights();
            this.activeIndex = -1;
        },
        goToAddFlight() {
            this.$router.push({ name: "flight.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>