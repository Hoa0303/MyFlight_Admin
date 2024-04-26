<template>
    <div class="container row">
        <div class="mt-2">
            <h4 class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-ticket-detailed" viewBox="0 0 16 16">
                    <path
                        d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z" />
                    <path
                        d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
                </svg>
                <span> Vé máy bay</span>
            </h4>
            <div class="row">
                <div class="form-group mb-3 col-4">
                    <div class="input-group">
                        <select class="form-select" v-model="selectedMaTuyen">
                            <option value="">Tất cả mã tuyến</option>
                            <option v-for="maTuyen in uniqueMaTuyens" :value="maTuyen">{{ maTuyen }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group mb-3 col-4">
                    <div class="input-group">
                        <select class="form-select" v-model="selectedLoaiVe">
                            <option value="">Tất cả loại vé</option>
                            <option v-for="loaiVe in uniqueLoaiVes" :value="loaiVe">{{ loaiVe }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="form-group mb-3 col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="showBookedTickets">
                        <label class="form-check-label">Chỉ hiển thị vé đã đặt</label>
                    </div>
                </div>

                <div class="form-group mb-3 col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="showNotBookedTickets">
                        <label class="form-check-label">Chỉ hiển thị vé chưa đặt</label>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddType">
                    <i class="fas fa-plus"></i> Thêm vé mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredTicketsCount }} vé.</span>
                </button>
            </div>

            <!-- Hiển thị danh sách vé -->
            <TicketList v-if="filteredTicketsCount > 0" :tickets="filteredTickets" v-model:activeIndex="activeIndex" />
        </div>
    </div>
</template>

<script>
import TicketList from "@/components/admin/ticket_manager/TicketList.vue";
import TicketService from "@/services/ticket.service";

export default {
    components: {
        TicketList,
    },
    data() {
        return {
            Tickets: [],
            activeIndex: -1,
            searchText: "",
            selectedMaTuyen: "",
            selectedLoaiVe: "",
            showBookedTickets: false,
            showNotBookedTickets: false
        };
    },
    computed: {
        uniqueMaTuyens() {
            const maTuyens = new Set();
            this.Tickets.forEach((ticket) => {
                maTuyens.add(ticket.MaTuyen);
            });
            return Array.from(maTuyens);
        },
        uniqueLoaiVes() {
            const loaiVes = new Set();
            this.Tickets.forEach((ticket) => {
                loaiVes.add(ticket.MaLoai);
            });
            return Array.from(loaiVes);
        },
        filteredTickets() {
            return this.Tickets.filter(ticket => {
                const maTuyenMatch = this.selectedMaTuyen ? ticket.MaTuyen === this.selectedMaTuyen : true;
                const loaiVeMatch = this.selectedLoaiVe ? ticket.MaLoai === this.selectedLoaiVe : true;
                const isBooked = this.showBookedTickets ? ticket.MaDatVe !== '' : true;
                const isNotBooked = this.showNotBookedTickets ? ticket.MaDatVe === '' : true;
                return maTuyenMatch && loaiVeMatch && isBooked && isNotBooked;
            });
        },
        filteredTicketsCount() {
            return this.filteredTickets.length;
        },
    },
    methods: {
        async retrieveTickets() {
            try {
                this.Tickets = await TicketService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTickets();
            this.activeIndex = -1;
        },
        goToAddType() {
            this.$router.push({ name: "ticket.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
