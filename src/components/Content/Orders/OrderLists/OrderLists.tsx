import { Table, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

import React, { useState, useEffect } from 'react';
import { BsDownload, BsListUl } from 'react-icons/bs';
import { CgDisplayGrid } from 'react-icons/cg';
import { Button, Modal } from 'antd';

import { useNavigate } from 'react-router-dom';

import './OrderLists.css';
import axios from 'axios';
import { useAuthState } from '../../../../atom';
import WithAuth from '../../../../withAuth';
import { Service } from '../../../../service';
import CreateOrder from '../../../Create/CreateOrder/CreateOrder';
import { IOrder } from '../../../../interface';

interface DataType {
    createdAt: string
    customer: string
    note: string
    product_id: string
    tags: string
    time: Date
    updatedAt: string
    _v: number
    _id: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Customer',
        dataIndex: 'customer',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
    },
    {
        title: 'Note',
        dataIndex: 'note',
    },
    {
        title: 'Product ID',
        dataIndex: 'product_id',
    },
    {
        title: 'Date',
        dataIndex: 'time',
    },
];

function OrderList() {
    const service = new Service('http://localhost:8888');
    const navigate = useNavigate();

    const [data, setData] = useState<Array<DataType>>();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        service.instance.get('offer', {}).then((res) => {
            setData(res.data);
        });
    }, [loading]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        // cancel
        setIsModalOpen(false);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
    };

    const { Search } = Input;

    const onSearch = (value: string) => console.log(value);

    const [selectedStatus, setSelectedStatus] = useState<String>();
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <WithAuth>
            <div className="WrapperOrderList">
                <div className="TitleOrderList">
                    <div className="TypeScreenOrderList">
                        <p>Orders</p>
                        <div className="ChoiceTypeScreenList">
                            <div className="ChoiceingTypeScreenList">
                                <BsDownload size={18}></BsDownload>
                                <h3 className="ButChoiceingTypeScreenList">Export a file</h3>
                            </div>
                            <div className="ChoiceingTypeScreenList">
                                <BsListUl size={18}></BsListUl>
                                <h3 className="ButChoiceingTypeScreenList">Show list</h3>
                            </div>
                            <div className="ChoiceingTypeScreenList">
                                <CgDisplayGrid size={18}></CgDisplayGrid>
                                <h3 className="ButChoiceingTypeScreenList">Display as a card</h3>
                            </div>
                        </div>
                    </div>
                    <div className="CreateAnOrder">
                        <Button type="primary" onClick={showModal}>Create an order</Button>
                        <Modal title="Create Order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <CreateOrder setModal={setIsModalOpen} setLoading={setLoading}></CreateOrder>
                        </Modal>
                    </div>
                </div>
                <div className="ContainerOrderList">
                    <div className="MenuSeclectionQUick">
                        <div className="SeclectionQUick">All orders</div>
                        <div className="SeclectionQUick">Open orders</div>
                        <div className="SeclectionQUick">Unpaid</div>
                        <div className="SeclectionQUick">Not deliveryd yet</div>
                        <div className="SeclectionQUick">Archive</div>
                    </div>
                    <div className="MenuFillterDetail">
                        <div className="WrapperStatusMenuFillterDetail">
                            <Button className="ButStatusMenuFillterDetail ButMenuFillterDetail">Status</Button>
                            <div className="dropdown-content">
                                <a href="#">
                                    <input type="radio" name="status" value="open" id="open" onChange={radioHandler} />
                                    <div>Open</div>
                                </a>
                                <a href="#">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="archive"
                                        id="archive"
                                        onChange={radioHandler}
                                    />
                                    <div>Archive</div>
                                </a>
                                <a href="#">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="cancel"
                                        id="cancel"
                                        onChange={radioHandler}
                                    />
                                    <div>Cancel</div>
                                </a>
                            </div>
                        </div>
                        <Button className="ButMenuFillterDetail">Paid</Button>
                        <Button className="ButMenuFillterDetail">Delivery</Button>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                            className="InputMenuFillterDetail"
                        />
                    </div>
                    <Table className="TableOrderList" rowSelection={rowSelection} columns={columns} dataSource={data} />
                    ;
                </div>
            </div>
        </WithAuth>
    );
}
export default OrderList;
