<template>
    <div class=" row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-route"></i> Tuyến
            </h4>
            <RouteList v-if="filteredRoutesCount > 0" :routes="filteredRoutes" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddRoute">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import RouteList from "@/components/admin/route_manager/RouteList.vue";
import RouteService from "@/services/route.service";
export default {
    components: {
        InputSearch,
        RouteList,
    },
    data() {
        return {
            Routes: [],
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
            return this.Routes.map((index) => {
                const { MaTuyen, MaTuyenBay, MaHang, NgayKhoiHanh, GioKhoiHanh, GioDen, SoHieu } = index;
                return [MaTuyen, MaTuyenBay, MaHang, NgayKhoiHanh, GioKhoiHanh, GioDen, SoHieu].join("");
            });
        },
        filteredRoutes() {
            if (!this.searchText) return this.Routes;
            return this.Routes.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeFlight() {
            if (this.activeIndex < 0) return null;
            return this.filteredRoutes[this.activeIndex];
        },
        filteredRoutesCount() {
            return this.filteredRoutes.length;
        },
    },
    methods: {
        async retrieveRoutes() {
            try {
                this.Routes = await RouteService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveRoutes();
            this.activeIndex = -1;
        },
        goToAddRoute() {
            this.$router.push({ name: "route.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>