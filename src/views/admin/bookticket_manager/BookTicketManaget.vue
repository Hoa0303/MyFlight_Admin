<template>
    <div class="container">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-clipboard mr-2"></i> Tình trạng vé
            </h4>
            <div class="row">
                <!-- Dropdown chứa tên người dùng -->
                <div class="dropdown mb-3 col-2">
                    <button class="btn dropdown-toggle border-black" type="button" id="userDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Chọn người dùng
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                        <li>
                            <button class="dropdown-item" @click="filterOrdersByUser(null)">Tất cả</button>
                        </li>
                        <li v-for="(user, index) in users" :key="index">
                            <button class="dropdown-item" @click="filterOrdersByUser(user)">{{ user.name }}</button>
                        </li>
                    </ul>
                </div>
                <!-- Dropdown chứa trạng thái -->
                <div class="dropdown mb-3 col-2">
                    <button class="btn dropdown-toggle border-black" type="button" id="statusDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Chọn trạng thái
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="statusDropdown">
                        <li>
                            <button class="dropdown-item" @click="filterOrdersByStatus(null)">Tất cả trạng thái</button>
                        </li>
                        <li v-for="(status, index) in statusList" :key="index">
                            <button class="dropdown-item" @click="filterOrdersByStatus(status)">{{ status }}</button>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Hiển thị danh sách -->
            <BookTicketList v-if="filteredBookTicketCount > 0" :orders="filteredBookTicket"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có đơn nào.</p>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/bookticket.service';
import AuthService from '@/services/auth.service';
import BookTicketList from '@/components/admin/bookticket_manager/BookTicketList.vue';

export default {
    components: {
        BookTicketList,
    },
    data() {
        return {
            orders: [],
            users: [],
            activeIndex: -1,
            searchText: "",
            selectedUser: null,
            selectedStatus: null,
            statusList: ['Đang đợi duyệt', 'Đã duyệt', 'Đã hủy', 'Yêu cầu hủy vé']
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        filteredBookTicket() {
            let filteredOrders = this.orders;
            if (this.selectedUser) {
                filteredOrders = filteredOrders.filter(order => order.UserId === this.selectedUser._id);
            }
            if (this.selectedStatus) {
                filteredOrders = filteredOrders.filter(order => order.status === this.selectedStatus);
            }
            return filteredOrders;
        },
        filteredBookTicketCount() {
            return this.filteredBookTicket.length;
        },
    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async getUser() {
            try {
                const users = await AuthService.getAll();
                this.users = users.filter(user => user.role === false);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.selectedUser = null;
            this.selectedStatus = null;
            this.activeIndex = -1;
        },
        filterOrdersByUser(user) {
            this.selectedUser = user;
        },
        filterOrdersByStatus(status) {
            this.selectedStatus = status;
        },
    },
    mounted() {
        this.refreshList();
        this.getUser();
    },
};
</script>
