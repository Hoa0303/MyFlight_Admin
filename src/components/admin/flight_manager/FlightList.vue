<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Mã tuyến</th>
                    <th scope="col">Giá tuyến</th>
                    <th scope="col">Khởi hành</th>
                    <th scope="col">Điểm đến</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(flight, index) in flights" :key="flight._id"
                    :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                    <td>{{ flight.MaTuyen }}</td>
                    <td>{{ flight.GiaTuyen }}VNĐ</td>
                    <td>
                        <router-link :to="'/admin/ariport_manager/' + flight.derpartId" class="nav-link">
                            <span class="link-info">
                                {{ flight.SanBayDi }}
                            </span>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="'/admin/ariport_manager/' + flight.destinaId" class="nav-link">
                            <span class="link-info">
                                {{ flight.SanBayDen }}
                            </span>
                        </router-link>
                    </td>
                    <td>
                        <div class="btn-group d-flex justify-content-center" role="group">
                            <router-link :to="{ name: 'flight.edit', params: { id: flight._id }, }" class="nav-link">
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
        flights: { type: Array, default: [] },
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
