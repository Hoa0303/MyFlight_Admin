<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema" class="my-form">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="cccd">Căn cước công dân</label>
            <Field name="cccd" type="text" class="form-control" v-model="contactLocal.cccd" />
            <ErrorMessage name="cccd" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dob">Ngày sinh</label>
            <Field name="dob" type="date" class="form-control" v-model="contactLocal.dob" />
            <ErrorMessage name="dob" class="error-feedback" />
        </div>
        <div class="form-group">
            <label>Giới tính</label>
            <div>
                <input class="me-1" type="radio" id="male" name="gender" value="1" v-model="contactLocal.gender">
                <label class="me-2" for="male">Nam</label>
                <input class="me-1" type="radio" id="female" name="gender" value="0" v-model="contactLocal.gender">
                <label for="female">Nữ</label>
            </div>
            <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary form-control" type="submit">
                <i class="fas fa-save"></i> Lưu
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
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            cccd: yup.string(),
            dob: yup.string(),
            gender: yup.string(),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
