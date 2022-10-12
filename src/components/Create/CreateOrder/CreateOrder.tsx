import { useState, useEffect } from "react"
import { Form, Button, Input, Select, DatePicker } from "antd"
import { Service } from "../../../service";


export default function CreateOrder({ setModal, setLoading }:any) {

    const service = new Service("http://localhost:8888")
    const [products, setProducts] = useState<Array<any>>()

    useEffect(() => {
        service.instance.get("/product", {}).then(res => {
            setProducts(res.data)
        })
    }, [])

    const onSubmit = (values: any) => {
        service.instance.post("/offer", values).then(res => {
            console.log(res.data)
            setModal(false)
            setLoading((prev:any) => !prev)
        })
    }

    return <div className="p-6">
            <Form onFinish={onSubmit}>
                <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
                    <Input placeholder="Nhập số điện thoại"/>
                </Form.Item>
                <Form.Item name="product_id" label="Product" rules={[{ required: true }]}>
                    <Select placeholder="Chọn sản phẩm">
                        {products?.map(item => <Select.Option key={item._id} value={item._id}>
                            {item.name}
                        </Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="time" label="Time" rules={[{ required: true }]}>
                    <DatePicker  placeholder="Ngày giao" showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
                    <Input placeholder="Tags"/>
                </Form.Item>
                <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                    <Input placeholder="Note" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
}