<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="code">Mã tuyến</label>
            <Field name="code" type="text" class="form-control" v-model="productLocal.MaTuyen" />
            <ErrorMessage name="code" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá tuyến</label>
            <Field name="price" type="text" class="form-control" v-model="productLocal.GiaTuyen" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="destination">Khởi hành</label>
            <select v-model="productLocal.SanBayDi" class="form-control">
                <option v-for="airport in airports" :key="airport.code" :value="airport.code">{{ airport.name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="departure">Điểm đến</label>
            <select v-model="productLocal.SanBayDen" class="form-control">
                <option v-for="airport in airports" :key="airport.code" :value="airport.code">{{ airport.name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-primary me-1" type="submit">
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
import AriportService from "@/services/ariport.service";
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
        return {
            productLocal: this.product,
            ProductFormSchema: yup.object().shape({
                code: yup
                    .string(),
                price: yup
                    .string(),
                destination: yup
                    .string(),
                departure: yup
                    .string(),
                derpartId: yup
                    .string(),
                destinaId: yup
                    .string()
            }),
            airports: [],
        };
    },
    async mounted() {
        await this.getAriPort();
    },

    methods: {
        async getAriPort() {
            try {
                const airports = await AriportService.getAll();
                this.airports = airports;

                airports.forEach(airport => {
                    if (airport.name === this.productLocal.SanBayDen) {
                        this.productLocal.SanBayDen = airport.code;
                    }
                    if (airport.name === this.productLocal.SanBayDi) {
                        this.productLocal.SanBayDi = airport.code;
                    }
                });
            } catch (error) {
                console.error("Error fetching airports:", error);
            }
        },


        submitProduct() {
            const selectedDen = this.airports.find(airport => airport.code === this.productLocal.SanBayDen);
            if (selectedDen) {
                this.productLocal.SanBayDen = selectedDen.name;
                this.productLocal.destinaId = selectedDen._id;
            }

            const selectedDi = this.airports.find(airport => airport.code === this.productLocal.SanBayDi);
            if (selectedDi) {
                this.productLocal.SanBayDi = selectedDi.name;
                this.productLocal.derpartId = selectedDi._id;
            }

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
