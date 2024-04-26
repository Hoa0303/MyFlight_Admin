<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-plane"></i> Máy bay
            </h4>
            <div class="row mb-3">
                <button class="btn btn-primary col-3" @click="goToAddPlane">
                    <i class="fas fa-plus"></i> Thêm máy bay mới
                </button>
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredPlanesCount }} máy bay .</span>
                </button>
            </div>
            <AriLineList v-if="filteredPlanesCount > 0" :planes="filteredPlanes" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không tìm thấy máy bay nào.</p>
        </div>
    </div>
</template>


<script>
import AriLineList from "@/components/admin/plane_manager/PlaneList.vue";
import PlaneService from "@/services/plane.service";
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
        filteredPlanes() {
            return this.Arilines;
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