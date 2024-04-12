<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-departure"></i> Sân bay
            </h4>
            <AriPortList v-if="filteredAriPortsCount > 0" :ariports="filteredAriPorts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted">Không có sân bay nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddAriPort">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import AriPortList from "@/components/admin/ariport_manager/AriPortList.vue";
import AriPortService from "@/services/ariport.service";
export default {
    components: {
        InputSearch,
        AriPortList,
    },
    data() {
        return {
            Ariports: [],
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
            return this.Ariports.map((index) => {
                const { code, local, name } = index;
                return [code, local, name].join("");
            });
        },
        filteredAriPorts() {
            if (!this.searchText) return this.Ariports;
            return this.Ariports.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredAriPorts[this.activeIndex];
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