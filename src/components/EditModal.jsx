import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import validatePhone from "./validatePhone";
import validateName from "./validateName";

// тут редачим в модалке
function EditModal({ open, onCancel, onSave, contact }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && contact) {
            form.setFieldsValue({
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phone,
            });
        }
    }, [contact, open, form]);// изменяем тоько если изменится contact или open

    // кнопка сохранить в модалке
    const handleOk = async () => {
        try {

            const values = await form.validateFields();

            const updatedContact = {
                ...contact,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
            };

            onSave(updatedContact);
        } catch (error) {
            // и тогда ничего не делаем
        }
    };


    return (
        <Modal
            title="Редагувати контакт"
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Зберегти"
            cancelText="Відміна"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Ім’я"
                    name="firstName"
                    rules={[
                        { required: true, message: "Введіть ім’я" },
                        {
                            validator: (_, value) =>
                                validateName(value)
                                    ? Promise.resolve()
                                    : Promise.reject("Ім’я має містити тільки літери та дефіси"),
                        },
                    ]}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Прізвище"
                    name="lastName"
                    rules={[
                        { required: true, message: "Введіть прізвище" },
                        {
                            validator: (_, value) =>
                                validateName(value)
                                    ? Promise.resolve()
                                    : Promise.reject("Прізвище має містити тільки літери та дефіси"),
                        },
                    ]}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[
                        { required: true, message: "Введіть телефон" },
                        {
                            validator: (_, value) =>
                                validatePhone(value)
                                    ? Promise.resolve()
                                    : Promise.reject("Номер телефону має складатись з 10-15 цифр"),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditModal;
