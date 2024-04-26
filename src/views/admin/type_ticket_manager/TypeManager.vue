<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                    class="bi bi-card-list" viewBox="0 0 16 16">
                    <path
                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                    <path
                        d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
                Loại vé
            </h4>
            <div class="row mb-3 ms-2">
                <div class="col-3 form-check">
                    <input class="form-check-input" type="checkbox" v-model="ascendingSort" id="ascendingSort">
                    <label class="form-check-label text-success" for="ascendingSort">
                        <h5><i class="fas fa-sort-amount-down"></i> Sắp xếp giảm dần</h5>
                    </label>
                </div>
                <div class="col-3 form-check">
                    <input class="form-check-input" type="checkbox" v-model="descendingSort" id="descendingSort">
                    <label class="form-check-label text-success" for="descendingSort">
                        <h5><i class="fas fa-sort-amount-up"></i> Sắp xếp tăng dần</h5>
                    </label>
                </div>
            </div>
            <div class="row mb-3">
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredTypesCount }} loại vé.</span>
                </button>
            </div>
            <TypeList v-if="filteredTypesCount > 0" :types="filteredTypes" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted">Không có sân bay nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddType">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>

<script>
import TypeList from "@/components/admin/type_ticket_manager/TypeList.vue";
import TypeService from "@/services/type.service";
export default {
    components: {
        TypeList,
    },
    data() {
        return {
            Types: [],
            ascendingSort: false,
            descendingSort: false
        };
    },
    computed: {
        filteredTypes() {
            let types = this.Types;
            if (this.ascendingSort) {
                types = types.slice().sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.descendingSort) {
                types = types.slice().sort((a, b) => b.name.localeCompare(a.name));
            }
            return types;
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
