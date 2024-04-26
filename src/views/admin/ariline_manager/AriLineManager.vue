<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane-arrival"></i> Hãng hàng không
            </h4>
            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddAriLine">
                    <i class="fas fa-plus"></i> Thêm hãng mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredAriLinesCount }} hãng.</span>
                </button>
            </div>
            <AriLineList v-if="filteredAriLinesCount > 0" :arilines="filteredAriLines"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
        </div>
    </div>
</template>


<script>
import AriLineList from "../../../components/admin/porduct_manager/AriLineList.vue";
import AriLineService from "@/services/ariline.service";
export default {
    components: {
        AriLineList,
    },
    data() {
        return {
            Arilines: [],
        };
    },
    computed: {
        contactStrings() {
            return this.Arilines;
        },
        filteredAriLines() {
            return this.Arilines;
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