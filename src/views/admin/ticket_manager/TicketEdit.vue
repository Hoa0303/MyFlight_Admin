<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh vé</h4>
        <div class="col-md-9 mx-auto">
            <TicketForm :product="product" @submit:product="updateAriPort" @delete:product="deleteAriPort" />
            <p class="text-center">{{ message }}</p>
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await TicketService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateAriPort(data) {
            try {
                await TicketService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "ticket_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteAriPort() {
            if (confirm("Bạn muốn xóa vé này?")) {
                try {
                    await TicketService.delete(this.product._id);
                    this.$router.push({ name: "ticket_manager" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>