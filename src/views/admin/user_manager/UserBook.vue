<template>
    <div class="container row">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-address-book mr-2"></i> Người dùng
            </h4>
            <div class="row">
                <!-- Input nhập email để lọc -->
                <div class="form-group mb-3 col-3">
                    <input type="email" class="form-control" id="emailFilter" placeholder="Nhập email người cần tìm"
                        v-model="emailFilter">
                </div>
            </div>
            <!-- Thống kế danh sách người dùng -->
            <div class="row mb-3">
                <button class="ms-3 text-center btn col-2" disabled>
                    <span class="text-primary">Tổng: {{ filteredContactsCount - 1 }} tài khoản.</span>
                </button>
            </div>
            <!-- Hiển thị danh sách người dùng -->
            <ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có liên hệ nào.</p>
        </div>
    </div>
</template>

<script>
import ContactList from "@/components/admin/user_manager/UserList.vue";
import AuthService from "@/services/auth.service";

export default {
    components: {
        ContactList,
    },
    data() {
        return {
            users: [],
            emailFilter: "",
        };
    },
    computed: {
        contactStrings() {
            return this.users;
        },
        filteredContacts() {
            return this.users.filter(user => {
                return user.email.toLowerCase().includes(this.emailFilter.toLowerCase());
            });
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.users = await AuthService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
