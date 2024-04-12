<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Mã vé</th>
                    <th scope="col">Mã tuyến</th>
                    <th scope="col">Mã loại</th>
                    <th scope="col">Mã đặt vé</th>
                    <th scope="col">Chỗ ngồi</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="(ticket, index) in tickets" :key="ticket._id"
                    :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                    <td>{{ ticket.MaVe }}</td>
                    <td>
                        <router-link :to="'/admin/route_manager/' + ticket.IdTuyen" class="nav-link">
                            <span class="link-info">
                                {{ ticket.MaTuyen }}
                            </span>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="'/admin/type_manager/' + ticket.IdLoai" class="nav-link">
                            <span class="link-info">
                                {{ ticket.MaLoai }}
                            </span>
                        </router-link>
                    </td>
                    <td>{{ ticket.MaDatVe }}</td>
                    <td>{{ ticket.ChoNgoi }}</td>
                    <td>
                        <div class="btn-group d-flex justify-content-center" role="group">
                            <router-link :to="{ name: 'ticket.edit', params: { id: ticket._id }, }" class="nav-link">
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
        tickets: { type: Array, default: [] },
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
