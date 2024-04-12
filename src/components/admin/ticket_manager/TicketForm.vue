<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="MaVe">Mã Vé</label>
            <Field name="MaVe" type="text" class="form-control" v-model="productLocal.MaVe" />
            <ErrorMessage name="MaVe" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaTuyen">Mã tuyến</label>
            <select name="MaTuyen" class="form-control" v-model="productLocal.MaTuyen">
                <option v-for="route in routes" :key="route._id" :value="route.MaTuyen">{{ route.MaTuyen }}</option>
            </select>
            <ErrorMessage name="MaTuyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaLoai">Mã loại</label>
            <select name="MaLoai" class="form-control" v-model="productLocal.MaLoai">
                <option v-for="type in types" :key="type._id" :value="type.MaLoai">{{ type.MaLoai }}</option>
            </select>
            <ErrorMessage name="MaLoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaDatVe">Mã đặt vé</label>
            <Field name="MaDatVe" type="text" class="form-control" v-model="productLocal.MaDatVe" />
        </div>
        <div class="form-group">
            <label for="name">Chỗ ngồi</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.ChoNgoi" />
            <ErrorMessage name="name" class="error-feedback" />
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
import RouteService from "@/services/route.service";
import TypeService from "@/services/type.service";

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
            MaVe: yup
                .string()
                .required("Mã Vé phải có giá trị."),
            MaTuyen: yup
                .string(),
            MaLoai: yup
                .string(),
            MaDatVe: yup
                .string(),
            name: yup
                .string()
                .required("Chỗ ngồi phải có giá trị."),
            IdTuyen: yup
                .string(),
            IdLoai: yup
                .string(),
            IdDatVe: yup
                .string()
        });
        return {
            productLocal: this.product,
            ProductFormSchema,
            routes: [],
            types: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const routes = await RouteService.getAll();
                this.routes = routes;
                const types = await TypeService.getAll();
                this.types = types;
            } catch (error) {
                console.error("Error while fetching data:", error);
            }
        },

        submitProduct() {
            const routeId = this.routes.find(route => route.MaTuyen === this.productLocal.MaTuyen);
            if (routeId) {
                this.productLocal.IdTuyen = routeId._id;
            }
            const typeId = this.types.find(type => type.MaLoai === this.productLocal.MaLoai);
            if (typeId) {
                this.productLocal.IdLoai = typeId._id;
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
