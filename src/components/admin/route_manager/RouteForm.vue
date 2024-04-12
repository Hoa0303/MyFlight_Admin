<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="MaTuyen">Mã Tuyến</label>
            <Field name="MaTuyen" type="text" class="form-control" v-model="productLocal.MaTuyen" />
        </div>
        <div class="form-group">
            <label for="MaTuyenBay">Mã Tuyến Bay</label>
            <select name="MaTuyenBay" class="form-control" v-model="productLocal.MaTuyenBay">
                <option v-for="flight in flights" :key="flight._id" :value="flight.MaTuyen">{{ flight.MaTuyen }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="MaHang">Mã Hãng</label>
            <select name="MaHang" class="form-control" v-model="productLocal.MaHang">
                <option v-for="airline in airlines" :key="airline._id" :value="airline.code">{{ airline.code }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="NgayKhoiHanh">Ngày khởi hành</label>
            <Field name="NgayKhoiHanh" type="date" class="form-control" v-model="productLocal.NgayKhoiHanh" />
            <ErrorMessage name="NgayKhoiHanh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="GioKhoiHanh">Giờ khởi hành</label>
            <Field name="GioKhoiHanh" type="time" class="form-control" v-model="productLocal.GioKhoiHanh" />
        </div>
        <div class="form-group">
            <label for="GioDen">Giờ đến</label>
            <Field name="GioDen" type="time" class="form-control" v-model="productLocal.GioDen" />
        </div>
        <div class="form-group">
            <label for="SoHieu">Số Hiệu</label>
            <select name="SoHieu" class="form-control" v-model="productLocal.SoHieu">
                <option v-for="plane in filteredPlanes" :key="plane._id" :value="plane.SoHieu">{{ plane.SoHieu }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-primary me-1" type="submit" @click="submitProduct">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="productLocal._id" class="btn btn-danger" @click="deleteContact">
                <i class="fas fa-trash"></i> Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AirlineService from "@/services/ariline.service";
import PlaneService from "@/services/plane.service";
import FlightService from "@/services/flight.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const ProductFormSchema = yup.object().shape({
            MaTuyen: yup.string().required("Mã tuyến phải có giá trị."),
            MaTuyenBay: yup.string().required("Mã tuyến bay phải có giá trị."),
            MaHang: yup.string().required("Mã hãng phải có giá trị."),
            NgayKhoiHanh: yup.string().required("Ngày khởi hành phải có giá trị."),
            GioKhoiHanh: yup.string().required("Giờ khởi hành phải có giá trị."),
            GioDen: yup.string().required("Giờ đến phải có giá trị."),
            SoHieu: yup.string().required("Số hiệu phải có giá trị."),
            AirlineId: yup.string(),
            TuyenBayId: yup.string(),
            PlaneId: yup.string()
        });
        return {
            productLocal: this.product,
            ProductFormSchema,
            planes: [],
            flights: [],
            airlines: [],
        };
    },
    computed: {
        filteredPlanes() {
            return this.planes.filter(plane => plane.SoHieu.startsWith(this.productLocal.MaHang));
        }
    },
    async mounted() {
        await this.getData();
    },
    methods: {
        async getData() {
            const plane = await PlaneService.getAll();
            this.planes = plane;
            const flight = await FlightService.getAll();
            this.flights = flight;
            const Airline = await AirlineService.getAll();
            this.airlines = Airline;
        },
        submitProduct() {
            const planeId = this.planes.find(plane => plane.SoHieu === this.productLocal.SoHieu)
            if (planeId) {
                this.productLocal.PlaneId = planeId._id;
            }
            const flightId = this.flights.find(flight => flight.MaTuyen === this.productLocal.MaTuyenBay)
            if (flightId) {
                this.productLocal.TuyenBayId = flightId._id;
            }
            const airlineId = this.airlines.find(airline => airline.code === this.productLocal.MaHang)
            if (airlineId) {
                this.productLocal.AirlineId = airlineId._id;
            }
            // console.log(this.productLocal);
            this.$emit("submit:product", this.productLocal);
        },
        deleteContact() {
            this.$emit("delete:product", this.productLocal._id);
        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
