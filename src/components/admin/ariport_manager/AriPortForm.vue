<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="code">Mã sân bay</label>
            <Field name="code" type="text" class="form-control" v-model="productLocal.code" />
            <ErrorMessage name="code" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên sân bay</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="local">Khu vực</label>
            <Field name="local" type="text" class="form-control" v-model="productLocal.local" />
            <ErrorMessage name="local" class="error-feedback" />
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
            code: yup
                .string()
                .required("Tiêu đề phải có giá trị."),
            name: yup
                .string()
                .required("Tên phải có giá trị."),
            local: yup
                .string()
                .required("Khu vực phải có giá trị."),
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
