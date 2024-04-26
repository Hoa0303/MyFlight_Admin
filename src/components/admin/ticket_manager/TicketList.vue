<template>
    <div>
        <template v-for="(chunk, index) in chunkedTickets" :key="index">
            <div v-if="selectedTable === index" class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr class="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Mã vé</th>
                            <th scope="col">Mã tuyến</th>
                            <th scope="col">Mã loại</th>
                            <th scope="col">Giá vé</th>
                            <th scope="col">Mã đặt vé</th>
                            <th scope="col">Chỗ ngồi</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(ticket, subIndex) in chunk" :key="subIndex"
                            :class="{ active: (index * 10 + subIndex) === activeIndex }"
                            @click="updateActiveIndex(index * 10 + subIndex)">
                            <td>{{ index * 10 + subIndex + 1 }}</td>
                            <td>{{ ticket.MaVe }}</td>
                            <td>
                                <router-link :to="'/admin/route_manager/' + ticket.IdTuyen" class="nav-link">
                                    <span class="link-info">{{ ticket.MaTuyen }}</span>
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="'/admin/type_manager/' + ticket.IdLoai" class="nav-link">
                                    <span class="link-info">{{ ticket.MaLoai }}</span>
                                </router-link>
                            </td>
                            <td>{{ ticket.Gia }}</td>
                            <td>
                                <router-link :to="'/admin/Status/' + ticket.MaDatVe" class="nav-link">
                                    <span class="link-info">{{ ticket.MaDatVe }}</span>
                                </router-link>
                            </td>
                            <td>{{ ticket.ChoNgoi }}</td>
                            <td>
                                <div class="btn-group d-flex justify-content-center" role="group">
                                    <router-link :to="{ name: 'ticket.edit', params: { id: ticket._id } }"
                                        class="nav-link">
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
        <div class="text-center">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-for="(group, pageIndex) in Math.ceil(tickets.length / 10)" :key="pageIndex">
                        <a class="page-link" href="#" @click.prevent="changePage(pageIndex)">{{ group }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedTable: 0
        };
    },
    props: {
        tickets: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        chunkArray(arr, size) {
            const chunkedArr = [];
            let index = 0;
            while (index < arr.length) {
                chunkedArr.push(arr.slice(index, size + index));
                index += size;
            }
            return chunkedArr;
        },
        changePage(pageIndex) {
            this.selectedTable = pageIndex;
            const scrollToIndex = pageIndex * 10;
            window.scrollTo(0, scrollToIndex * 50);
        },
    },
    computed: {
        chunkedTickets() {
            return this.chunkArray(this.tickets, 10);
        },
    },
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