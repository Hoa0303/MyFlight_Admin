<template>
    <div class="container">
        <h4 class="text-center">Thêm vé mới</h4>
        <div class="col-md-6 mx-auto">
            <TicketForm :product="newProduct" @submit:product="addProduct" />
        </div>
    </div>
</template>

<script>
import TicketForm from "@/components/admin/ticket_manager/TicketForm.vue";
import TicketService from "@/services/ticket.service";
export default {
    components: {
        TicketForm,
    },
    data() {
        return {
            newProduct: {
                MaVe: '',
                MaTuyen: '',
                MaLoai: '',
                MaDatVe: '',
                ChoNgoi: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await TicketService.create(data);
                window.alert("Vé mới đã thêm thành công")
                this.$router.push({ name: "ticket_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
