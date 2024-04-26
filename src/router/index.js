import { createWebHistory, createRouter } from "vue-router";
// Auth
import Register from "@/views/auth/RegisterPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";

// Function admin
import ContactBook from "@/views/admin/user_manager/UserBook.vue";
import AriLine from "@/views/admin/ariline_manager/AriLineManager.vue";
import Plane from "@/views/admin/plane_manager/PlaneManager.vue";
import Ariport from "@/views/admin/ariport_manager/AriportManager.vue";
import Flight from "@/views/admin/flight_manager/FlightManager.vue";
import Route from "@/views/admin/route_manager/RouteManager.vue";
import Type from "@/views/admin/type_ticket_manager/TypeManager.vue";
import Ticket from "@/views/admin/ticket_manager/TicketManager.vue";
import BookTicket from "@/views/admin/bookticket_manager/BookTicketManaget.vue";
const routes = [
    //Auth
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/admin",
        name: "adminpage",
        component: Ticket,
    },
    {
        path: "/",
        name: "login",
        component: LoginPage,
    },

    // User_manager
    {
        path: "/admin/user_manager",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/admin/user_manager/:id",
        name: "contact.edit",
        component: () => import("@/views/admin/user_manager/UserEdit.vue"),
        props: true
    },

    // AriLine_manager
    {
        path: "/admin/ariline_manager",
        name: "ariline_manager",
        component: AriLine,
    },
    {
        path: "/admin/ariline_manager/:id",
        name: "ariline.edit",
        component: () => import("@/views/admin/ariline_manager/AriLineEdit.vue"),
        props: true
    },
    {
        path: "/admin/ariline_managar/addAriLine",
        name: "ariline.add",
        component: () => import("@/views/admin/ariline_manager/AriLineAdd.vue"),
        props: true
    },

    // Plane_manager
    {
        path: "/admin/plane_manager",
        name: "plane_manager",
        component: Plane,
    },
    {
        path: "/admin/plane_manager/:id",
        name: "plane.edit",
        component: () => import("@/views/admin/plane_manager/PlaneEdit.vue"),
        props: true
    },
    {
        path: "/admin/ariline_managar/addPlane",
        name: "plane.add",
        component: () => import("@/views/admin/plane_manager/PlaneAdd.vue"),
    },

    // Ariport_manager
    {
        path: "/admin/ariport_manager",
        name: "ariport_manager",
        component: Ariport,
    },
    {
        path: "/admin/ariport_manager/:id",
        name: "ariport.edit",
        component: () => import("@/views/admin/ariport_manager/AriportEdit.vue"),
        props: true
    },
    {
        path: "/admin/ariport_manager/addAriport",
        name: "ariport.add",
        component: () => import("@/views/admin/ariport_manager/AriportAdd.vue"),
    },

    // FLight_manager
    {
        path: "/admin/flight_manager",
        name: "flight_manager",
        component: Flight,
    },
    {
        path: "/admin/flight_manager/:id",
        name: "flight.edit",
        component: () => import("@/views/admin/flight_manager/FlightEdit.vue"),
        props: true
    },
    {
        path: "/admin/flight_manager/addFlight",
        name: "flight.add",
        component: () => import("@/views/admin/flight_manager/FlightAdd.vue"),
    },

    // Route_manager
    {
        path: "/admin/route_manager",
        name: "route_manager",
        component: Route,
    },
    {
        path: "/admin/route_manager/:id",
        name: "route.edit",
        component: () => import("@/views/admin/route_manager/RouteEdit.vue"),
        props: true
    },
    {
        path: "/admin/route_manager/addRoute",
        name: "route.add",
        component: () => import("@/views/admin/route_manager/RouteAdd.vue"),
    },

    // Type_manager
    {
        path: "/admin/type_manager",
        name: "type_manager",
        component: Type,
    },
    {
        path: "/admin/type_manager/:id",
        name: "type.edit",
        component: () => import("@/views/admin/type_ticket_manager/TypeEdit.vue"),
        props: true
    },
    {
        path: "/admin/type_manager/addType",
        name: "type.add",
        component: () => import("@/views/admin/type_ticket_manager/TypeAdd.vue"),
    },

    // Ticket_manager
    {
        path: "/admin/ticket_manager",
        name: "ticket_manager",
        component: Ticket,
    },
    {
        path: "/admin/ticket_manager/:id",
        name: "ticket.edit",
        component: () => import("@/views/admin/ticket_manager/TicketEdit.vue"),
        props: true
    },
    {
        path: "/admin/ticket_manager/addTicket",
        name: "ticket.add",
        component: () => import("@/views/admin/ticket_manager/TicketAdd.vue"),
    },

    // BookTicket_manager
    {
        path: "/admin/Status",
        name: "bookticket_manager",
        component: BookTicket,
    },
    {
        path: "/admin/Status/:id",
        name: "selected",
        component: () => import("@/views/admin/bookticket_manager/BookTicketSelected.vue"),
        props: true
    },

    // Not Found
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;