<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a href="/admin/ariline_manager" class="ms-5 navbar-brand">My Flight</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuTickets" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ticket"></i>
                            Vé
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuTickets">
                            <li><router-link :to="{ name: 'ticket_manager' }" class="dropdown-item">Quản lý vé máy
                                    bay</router-link></li>
                            <li><router-link :to="{ name: 'type_manager' }" class="dropdown-item">Quản lý loại
                                    vé</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuRoutes" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-route"></i>
                            Tuyến
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuRoutes">
                            <li><router-link :to="{ name: 'flight_manager' }" class="dropdown-item">Quản lý tuyến
                                    bay</router-link></li>
                            <li><router-link :to="{ name: 'route_manager' }" class="dropdown-item">Quản lý
                                    tuyến</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuAirlines" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-plane"></i>
                            Máy bay
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuAirlines">
                            <li><router-link :to="{ name: 'ariline_manager' }" class="dropdown-item">Quản lý hãng hàng
                                    không</router-link></li>
                            <li><router-link :to="{ name: 'plane_manager' }" class="dropdown-item">Quản lý máy
                                    bay</router-link></li>
                            <li><router-link :to="{ name: 'ariport_manager' }" class="dropdown-item">Quản lý sân
                                    bay</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contactbook' }" class="nav-link">
                            <i class="fas fa-user"></i>
                            Tài khoản
                        </router-link>
                    </li>
                    <!-- Dropdown for User -->
                    <li class="nav-item dropdown me-5" v-if="userName">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuUser" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user"></i>
                            {{ userName }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuUser">
                            <li>
                                <router-link to="#" class="dropdown-item" @click="confirmLogout">
                                    <i class="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item me-5" v-else>
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            Đăng nhập
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            userName: ''
        };
    },
    mounted() {
        this.getUserNameFromCookie();
    },
    methods: {
        getUserNameFromCookie() {
            const userName = Cookies.get('userName');
            if (userName) {
                this.userName = userName;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {
            Cookies.remove('userName');
            Cookies.remove('userId');
            this.userName = '';
            this.$router.push({ name: 'login' });
        }
    }
};
</script>
