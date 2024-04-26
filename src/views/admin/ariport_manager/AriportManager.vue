<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-departure"></i> Sân bay
            </h4>
            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddAriPort">
                    <i class="fas fa-plus"></i> Thêm sân bay mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredAriPortsCount }} sân bay.</span>
                </button>
            </div>
            <AriPortList v-if="filteredAriPortsCount > 0" :ariports="filteredAriPorts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted">Không có sân bay nào.</p>
        </div>
    </div>
</template>

<script>
import AriPortList from "@/components/admin/ariport_manager/AriPortList.vue";
import AriPortService from "@/services/ariport.service";
export default {
    components: {
        AriPortList,
    },
    data() {
        return {
            Ariports: [],
        };
    },
    computed: {
        contactStrings() {
            return this.Ariports;
        },
        filteredAriPorts() {
            return this.Ariports;
        },
        filteredAriPortsCount() {
            return this.filteredAriPorts.length;
        },
    },
    methods: {
        async retrieveAriports() {
            try {
                this.Ariports = await AriPortService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveAriports();
            this.activeIndex = -1;
        },
        goToAddAriPort() {
            this.$router.push({ name: "ariport.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>