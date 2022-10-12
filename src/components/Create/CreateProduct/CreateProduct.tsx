import { useState, useEffect, useRef } from 'react';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import { Service } from '../../../service';

export default function CreateOrder({ setModal, setLoading }: any) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const service = new Service('http://localhost:8888');
    const [products, setProducts] = useState<Array<any>>();

    useEffect(() => {
        service.instance.get('/product', {}).then((res) => {
            setProducts(res.data);
        });
    }, []);

    const onFinish = (values: any) => {
        if (localStorage.getItem('auth')) {
            service.instance.post('/product', values).then((res) => {
                setModal(false);
                setLoading((prev: any) => !prev);
                inputRef.current.value = '';
            });
        }
    };

    const inputRef = useRef(null);

    return (
        <Form {...layout} onFinish={onFinish}>
            <Form.Item name="name" label="Name">
                <Input ref={inputRef} />
            </Form.Item>
            <Form.Item name="category" label="Category">
                <Input />
            </Form.Item>

            <Form.Item name="brand" label="Brand">
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
