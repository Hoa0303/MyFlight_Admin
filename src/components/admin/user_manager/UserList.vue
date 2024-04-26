<template>
    <div>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">CCCD</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contact, index) in currentPageContacts" :key="contact._id"
                        :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                        <td>{{ index + 1 }}</td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.address }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>{{ contact.cccd }}</td>
                        <td>{{ contact.dob }}</td>
                        <td>{{ contact.gender }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <router-link :to="{ name: 'contact.edit', params: { id: contact._id }, }"
                                    class="nav-link">
                                    <span class="btn btn-sm btn-success" style="white-space: nowrap;">
                                        <i class="fas fa-plus"></i> Hiệu chỉnh
                                    </span>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="text-center">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-for="(group, pageIndex) in Math.ceil(filteredContacts.length / pageSize)"
                        :key="pageIndex">
                        <a class="page-link" href="#" @click.prevent="changePage(pageIndex)">{{ pageIndex + 1 }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            currentPage: 0,
            pageSize: 5,
        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        changePage(pageIndex) {
            this.currentPage = pageIndex;
        }
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(contact => contact.role === false);
        },
        currentPageContacts() {
            const startIndex = this.currentPage * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredContacts.slice(startIndex, endIndex);
        }
    }
};
</script>

<style scoped>
.table {
    width: 100%;
}

.table th,
.table td {
    vertical-align: middle;
}

.table tbody tr:hover {
    background-color: #f2f2f2;
}

.active {
    background-color: #d3d3d3;
}
</style>
