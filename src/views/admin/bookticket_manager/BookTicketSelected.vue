<template>
    <div class="container">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-clipboard mr-2"></i> Tình trạng vé
            </h4>
            <BookTicketList v-if="filteredBookTicketCount > 0" :orders="filteredBookTicket"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có đơn nào.</p>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/bookticket.service';
import BookTicketList from '@/components/admin/bookticket_manager/BookTicketListSelected.vue';

export default {
    components: {
        BookTicketList,
    },
    data() {
        return {
            orders: [],
            activeIndex: -1,
        };
    },
    computed: {
        filteredBookTicket() {
            return this.orders;
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
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>