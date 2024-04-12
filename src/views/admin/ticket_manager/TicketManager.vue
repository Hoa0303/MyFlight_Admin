<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-bars"></i> Vé máy bay
            </h4>
            <TicketList v-if="filteredTicketsCount > 0" :tickets="filteredTickets" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted">Không có vé nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddType">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import TicketList from "@/components/admin/ticket_manager/TicketList.vue";
import TicketService from "@/services/ticket.service";
export default {
    components: {
        InputSearch,
        TicketList,
    },
    data() {
        return {
            Tickets: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        contactStrings() {
            return this.Tickets.map((index) => {
                const { MaVe, MaTuyen, MaLoai, MaDatve, ChoNgoi } = index;
                return [MaVe, MaTuyen, MaLoai, MaDatve, ChoNgoi].join("");
            });
        },
        filteredTickets() {
            if (!this.searchText) return this.Tickets;
            return this.Tickets.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredTickets[this.activeIndex];
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