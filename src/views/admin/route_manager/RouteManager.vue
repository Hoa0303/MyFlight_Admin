<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-route"></i> Tuyến
            </h4>

            <div class="row mb-3">
                <!-- Dropdown list for filtering MaTuyenBay -->
                <div class="form-group col-2">
                    <select class="form-select" id="maTuyenBayFilter" v-model="selectedMaTuyenBay">
                        <option value="">Tất cả mã tuyến bay</option>
                        <option v-for="maTuyenBay in uniqueMaTuyenBays" :value="maTuyenBay">{{ maTuyenBay }}</option>
                    </select>
                </div>
                <!-- Dropdown list for filtering MaHang -->
                <div class="form-group col-2">
                    <select class="form-select" id="maHangFilter" v-model="selectedMaHang">
                        <option value="">Tất cả mã hãng</option>
                        <option v-for="maHang in uniqueMaHangs" :value="maHang">{{ maHang }}</option>
                    </select>
                </div>
                <!-- Input date for filtering NgayKhoiHanh -->
                <div class="form-group col-3">
                    <input type="date" class="form-control" id="ngayKhoiHanhFilter" v-model="selectedNgayKhoiHanh">
                </div>
            </div>

            <div class="form-group mb-3">
                <!-- Radio buttons for sorting GiaTuyenBay -->
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="sortDesc" value="desc" v-model="sortDirection">
                    <label class="form-check-label" for="sortDesc">Giảm dần</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="sortAsc" value="asc" v-model="sortDirection">
                    <label class="form-check-label" for="sortAsc">Tăng dần</label>
                </div>
            </div>

            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddRoute">
                    <i class="fas fa-plus"></i> Thêm tuyến mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredRoutesCount }} tuyến.</span>
                </button>
            </div>

            <!-- Display RouteList component -->
            <RouteList v-if="filteredRoutesCount > 0" :routes="filteredRoutes" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>

        </div>
    </div>
</template>

<script>
import RouteList from "@/components/admin/route_manager/RouteList.vue";
import RouteService from "@/services/route.service";

export default {
    components: {
        RouteList,
    },
    data() {
        return {
            Routes: [],
            selectedMaTuyenBay: "", // Selected MaTuyenBay for filtering
            selectedMaHang: "", // Selected MaHang for filtering
            selectedNgayKhoiHanh: "", // Selected NgayKhoiHanh for filtering
            sortDirection: "desc", // Default sorting direction
        };
    },
    computed: {
        // Compute unique MaTuyenBay values from Routes
        uniqueMaTuyenBays() {
            const maTuyenBays = new Set();
            this.Routes.forEach(route => {
                maTuyenBays.add(route.MaTuyenBay);
            });
            return Array.from(maTuyenBays);
        },
        // Compute unique MaHang values from Routes
        uniqueMaHangs() {
            const maHangs = new Set();
            this.Routes.forEach(route => {
                maHangs.add(route.MaHang);
            });
            return Array.from(maHangs);
        },
        // Filtered routes based on selected MaTuyenBay, MaHang, and NgayKhoiHanh
        filteredRoutes() {
            let routes = this.Routes;
            if (this.selectedMaTuyenBay) {
                routes = routes.filter(route => route.MaTuyenBay === this.selectedMaTuyenBay);
            }
            if (this.selectedMaHang) {
                routes = routes.filter(route => route.MaHang === this.selectedMaHang);
            }
            if (this.selectedNgayKhoiHanh) {
                routes = routes.filter(route => route.NgayKhoiHanh === this.selectedNgayKhoiHanh);
            }
            // Sort the routes based on sort direction
            if (this.sortDirection === "desc") {
                routes.sort((a, b) => b.GiaTuyenBay - a.GiaTuyenBay);
            } else {
                routes.sort((a, b) => a.GiaTuyenBay - b.GiaTuyenBay);
            }
            return routes;
        },
        // Count of filtered routes
        filteredRoutesCount() {
            return this.filteredRoutes.length;
        },
    },
    methods: {
        // Method to retrieve routes from RouteService
        async retrieveRoutes() {
            try {
                this.Routes = await RouteService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        // Refresh the route list
        refreshList() {
            this.retrieveRoutes();
            this.activeIndex = -1;
        },
        // Navigate to add route page
        goToAddRoute() {
            this.$router.push({ name: "route.add" });
        },
    },
    mounted() {
        // Load routes on component mount
        this.refreshList();
    },
};
</script>
