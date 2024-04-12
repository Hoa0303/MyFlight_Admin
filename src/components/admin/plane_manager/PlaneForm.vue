<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="SoHieu">Số Hiệu</label>
            <Field name="SoHieu" type="text" class="form-control" v-model="productLocal.SoHieu" />
            <ErrorMessage name="SoHieu" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaHang">Mã hãng</label>
            <Field name="MaHang" type="text" class="form-control" v-model="productLocal.MaHang" />
            <ErrorMessage name="MaHang" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SoGhe">Số ghế</label>
            <Field name="SoGhe" type="number" class="form-control" v-model="productLocal.SoGhe" />
            <ErrorMessage name="SoGhe" class="error-feedback" />
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
            SoHieu: yup
                .string()
                .required("Số hiệu phải có giá trị."),
            MaHang: yup
                .string()
                .required("Mã hãng phải có giá trị."),
            SoGhe: yup
                .number()
                .integer("Số ghế phải là số nguyên.")
        });
        return {
            productLocal: this.product,
            ProductFormSchema,
        };
    },
    methods: {
        submitProduct() {
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