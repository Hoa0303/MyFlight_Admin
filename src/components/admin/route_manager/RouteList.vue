<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Mã tuyến</th>
                    <th scope="col">Mã tuyến bay</th>
                    <th scope="col">Mã hãng</th>
                    <th scope="col">Ngày khởi hành</th>
                    <th scope="col">Giờ khởi hành</th>
                    <th scope="col">Giờ đến</th>
                    <th scope="col">Số hiệu</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(route, index) in routes" :key="route._id"
                    :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                    <td>{{ route.MaTuyen }}</td>
                    <td>
                        <router-link :to="'/admin/flight_manager/' + route.TuyenBayId" class="nav-link">
                            <span class="link-info">
                                {{ route.MaTuyenBay }}
                            </span>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="'/admin/ariline_manager/' + route.AirlineId" class="nav-link">
                            <span class="link-info">
                                {{ route.MaHang }}
                            </span>
                        </router-link>
                    </td>
                    <td>{{ route.NgayKhoiHanh }}</td>
                    <td>{{ route.GioKhoiHanh }}</td>
                    <td>{{ route.GioDen }}</td>
                    <td>
                        <router-link :to="'/admin/plane_manager/' + route.PlaneId" class="nav-link">
                            <span class="link-info">
                                {{ route.SoHieu }}
                            </span>
                        </router-link>
                    </td>
                    <td>
                        <div class="btn-group d-flex justify-content-center" role="group">
                            <router-link :to="{ name: 'route.edit', params: { id: route._id }, }" class="nav-link">
                                <span class="btn btn-sm btn-success" style="white-space: nowrap;">
                                    <i class="fas fa-plus"></i> Hiệu chỉnh
                                </span>
                            </router-link>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        routes: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<style scoped>
.table {
    width: 100%;
}

.table th,
.table td {
    vertical-align: middle;
}

.table tbody tr:hover {
    background-color: #f2f2f2;
}

.active {
    background-color: #d3d3d3;
}
</style>
