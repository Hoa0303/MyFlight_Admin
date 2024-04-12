<template>
    <div class="page row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-arrival"></i> Hãng hàng không
            </h4>
            <AriLineList v-if="filteredAriLinesCount > 0" :arilines="filteredAriLines"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddAriLine">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import AriLineList from "../../../components/admin/porduct_manager/AriLineList.vue";
import AriLineService from "@/services/ariline.service";
export default {
    components: {
        InputSearch,
        AriLineList,
    },
    data() {
        return {
            Arilines: [],
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
            return this.Arilines.map((index) => {
                const { code, name } = index;
                return [code, name].join("");
            });
        },
        filteredAriLines() {
            if (!this.searchText) return this.Arilines;
            return this.Arilines.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredAriLines[this.activeIndex];
        },
        filteredAriLinesCount() {
            return this.filteredAriLines.length;
        },
    },
    methods: {
        async retrieveAriLines() {
            try {
                this.Arilines = await AriLineService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveAriLines();
            this.activeIndex = -1;
        },
        goToAddAriLine() {
            this.$router.push({ name: "ariline.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>../../../components/admin/porduct_manager/AriLineList.vue