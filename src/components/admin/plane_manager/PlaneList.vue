<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Số hiệu</th>
                    <th scope="col">Mã hãng</th>
                    <th scope="col">Số ghế</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(plane, index) in planes" :key="plane._id" :class="{ active: index === activeIndex }"
                    @click="updateActiveIndex(index)">
                    <td>{{ plane.SoHieu }}</td>
                    <td>
                        <router-link :to="'/admin/ariline_manager/' + plane.AirlineId" class="nav-link">
                            <span class="link-info">
                                {{ plane.MaHang }}
                            </span>
                        </router-link>
                    </td>
                    <td>{{ plane.SoGhe }}</td>
                    <td>
                        <div class="btn-group d-flex justify-content-center" role="group">
                            <router-link :to="{ name: 'plane.edit', params: { id: plane._id }, }" class="nav-link">
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
        planes: { type: Array, default: [] },
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
