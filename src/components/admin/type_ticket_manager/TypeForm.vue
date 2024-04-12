<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="MaLoai">Mã loại</label>
            <Field name="MaLoai" type="text" class="form-control" v-model="productLocal.MaLoai" />
            <ErrorMessage name="MaLoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên loại</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Gia">Giá</label>
            <Field name="Gia" type="number" class="form-control" v-model="productLocal.Gia" />
            <ErrorMessage name="Gia" class="error-feedback" />
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
            MaLoai: yup
                .string()
                .required("Mã loại phải có giá trị."),
            name: yup
                .string()
                .required("Tên loại phải có giá trị."),
            Gia: yup
                .number()
                .required("Giá phải có giá trị.")
                .positive("Giá phải là số dương.")
                .integer("Giá phải là số nguyên."),
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
