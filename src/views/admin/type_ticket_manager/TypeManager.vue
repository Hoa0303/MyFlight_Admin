<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fa-solid fa-bars"></i> Loại vé
            </h4>
            <TypeList v-if="filteredTypesCount > 0" :types="filteredTypes" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted">Không có sân bay nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddType">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import TypeList from "@/components/admin/type_ticket_manager/TypeList.vue";
import TypeService from "@/services/type.service";
export default {
    components: {
        InputSearch,
        TypeList,
    },
    data() {
        return {
            Types: [],
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
            return this.Types.map((index) => {
                const { MaLoai, name, Gia } = index;
                return [MaLoai, name, Gia].join("");
            });
        },
        filteredTypes() {
            if (!this.searchText) return this.Types;
            return this.Types.filter((_index, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredTypes[this.activeIndex];
        },
        filteredTypesCount() {
            return this.filteredTypes.length;
        },
    },
    methods: {
        async retrieveTypes() {
            try {
                this.Types = await TypeService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTypes();
            this.activeIndex = -1;
        },
        goToAddType() {
            this.$router.push({ name: "type.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>