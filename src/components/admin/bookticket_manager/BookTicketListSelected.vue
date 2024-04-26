<template>
    <div>
        <div v-for="(order, index) in paginatedOrders" :key="order._id" class="list-group mt-5">
            <!-- Thêm class 'pending-request' nếu order.req === 1 -->
            <div :class="{ 'pending-request': order.req === 1 }"
                class="d-flex w-100 justify-content-between list-group-item">
                <h5 class="mb-1">{{ getUserByOrderId(order.UserId).name }} - <a class="link-success"
                        :href="'/admin/user_manager/' + order.UserId">{{ order.UserId }}</a></h5>
                <p class="mb-1">
                <h6> Trạng thái:
                    <span :class="{
                        'text-warning': order.status === 'Đang đợi duyệt',
                        'text-success': order.status === 'Đã duyệt',
                        'text-danger': order.status === 'Đã hủy' || order.status === 'Yêu cầu hủy vé'
                    }">
                        {{ order.status }}
                    </span>
                </h6>
                </p>
            </div>

            <div class="list-group-item">
                <div class="row">
                    <div class="col-10">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(book, bookIndex) in order.Tickets" :key="book.bookId">
                                <strong>{{ 'Vé ' + (bookIndex + 1) }}: </strong>
                                <a class="link-success" :href="'/admin/ticket_manager/' + book">{{
                                    getTicketByOrderId(book).MaVe }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-2 d-flex justify-content-end align-items-center">
                        <button v-if="order.status === 'Đang đợi duyệt'" class="btn btn-sm btn-primary"
                            style="white-space: nowrap;" @click="updateTicket(order._id)">
                            <i class="fas fa-check"></i> Duyệt vé
                        </button>
                        <button v-else class="btn btn-sm btn-primary" style="white-space: nowrap;" disabled>
                            <i class="fas fa-check"></i> Duyệt vé
                        </button>
                        <button v-if="order.req === 1" class="btn btn-sm btn-danger ms-2" style="white-space: nowrap;"
                            @click="confirmCancel(order._id, order.Tickets)">
                            <i class="fas fa-times"></i> Xác nhận hủy
                        </button>
                        <button v-else class="btn btn-sm btn-danger ms-2" style="white-space: nowrap;" disabled>
                            <i class="fas fa-times"></i> Xác nhận hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service';
import TicketService from '@/services/ticket.service';
import BookticketService from '@/services/bookticket.service';
export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data() {
        return {
            users: [],
            tickets: [],
            currentPage: 1,
            itemsPerPage: 3
        };
    },
    emits: ["update:activeIndex"],
    computed: {
        paginatedOrders() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            // Lọc các đơn hàng có _id giống với ID trên URL trước khi phân trang
            const filteredOrders = this.sortedOrders.filter(order => order._id === this.$route.params.id);
            return filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
        },
        pageCount() {
            return Math.ceil(this.sortedOrders.length / this.itemsPerPage);
        },
        sortedOrders() {
            return this.orders.slice().sort((a, b) => {
                const statusOrder = {
                    'Đang đợi duyệt': 1,
                    'Yêu cầu hủy vé': 2,
                    'Đã duyệt': 3,
                    'Đã hủy': 4,
                };
                return statusOrder[a.status] - statusOrder[b.status];
            });
        }
    },
    mounted() {
        this.getUser();
        this.getTicket();
    },
    methods: {
        async getUser() {
            for (const order of this.sortedOrders) {
                const user = await AuthService.get(order.UserId);
                this.users.push(user);
            }
        },
        async getTicket() {
            const ticket = await TicketService.getAll();
            this.tickets = ticket;
        },
        async updateTicket(id) {
            await BookticketService.update(id);
            window.location.reload();
        },
        async confirmCancel(id, Tickets) {
            try {
                for (let i = 0; i < Tickets.length; i++) {
                    const data = { MaDatVe: '' };
                    await TicketService.update(Tickets[i], data);
                }
                await BookticketService.cancel(id);
                window.location.reload();
            } catch (error) {
                console.error('Error confirming cancel:', error);
            }
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        getUserByOrderId(userId) {
            return this.users.find(user => user._id === userId) || {};
        },
        getTicketByOrderId(IdTicket) {
            return this.tickets.find(ticket => ticket._id === IdTicket) || {};
        },
        changePage(page) {
            this.currentPage = page;
        }
    },
};
</script>

<style scoped>
/* Style cho số 1 hình tròn màu đỏ */
.pending-request::before {
    content: "1";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background-color: red;
    color: white;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
}
</style>