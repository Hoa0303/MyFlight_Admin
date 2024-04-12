<template>
    <div class="page row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane"></i> Máy bay
            </h4>
            <AriLineList v-if="filteredPlanesCount > 0" :planes="filteredPlanes"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không tìm thấy máy bay nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddPlane">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import AriLineList from "@/components/admin/plane_manager/PlaneList.vue";
import PlaneService from "@/services/plane.service";
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
                const { MaHang } = index;
                return [MaHang].join("");
            });
        },
        filteredPlanes() {
            if (!this.searchText) return this.Arilines;
            return this.Arilines.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredPlanes[this.activeIndex];
        },
        filteredPlanesCount() {
            return this.filteredPlanes.length;
        },
    },
    methods: {
        async retrievePlanes() {
            try {
                this.Arilines = await PlaneService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePlanes();
            this.activeIndex = -1;
        },
        goToAddPlane() {
            this.$router.push({ name: "plane.add" });
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