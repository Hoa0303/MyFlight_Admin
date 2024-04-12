<template>
    <div class=" row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-up"></i> Tuyến bay
            </h4>
            <FlightList v-if="filteredFlightsCount > 0" :flights="filteredFlights" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddFlight">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import FlightList from "@/components/admin/flight_manager/FlightList.vue";
import FlightService from "@/services/flight.service";
export default {
    components: {
        InputSearch,
        FlightList,
    },
    data() {
        return {
            Flights: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        contactStrings() {
            return this.Flights.map((index) => {
                const { MaTuyen, GiaTuyen, SanBayDen, SanBayDi } = index;
                return [MaTuyen, GiaTuyen, SanBayDen, SanBayDi].join("");
            });
        },
        filteredFlights() {
            if (!this.searchText) return this.Flights;
            return this.Flights.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
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