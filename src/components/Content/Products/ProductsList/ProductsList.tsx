import { Table, Input, Modal } from 'antd';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsDownload, BsListUl, BsUpload } from 'react-icons/bs';
import axios from 'axios';
import { Service } from '../../../../service';
import CreateProduct from '../../../Create/CreateProduct/CreateProduct';
import WithAuth from '../../../../withAuth';

interface DataType {
    key: React.Key;
    product: string;
    category: string;
    brand: string;
    createdAt: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Create Day',
        dataIndex: 'createdAt',
    },
];

function ProductsList() {
    const service = new Service('http://localhost:8888');
    const navigate = useNavigate();

    const [data, setData] = useState<Array<DataType>>();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        service.instance.get('product', {}).then((res) => {
            setData(res.data);
        });
    }, [loading]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handOk = () => {
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
                        <p>Product</p>
                        <div className="ChoiceTypeScreenList">
                            <div className="ChoiceingTypeScreenList">
                                <BsDownload size={18}></BsDownload>
                                <h3 className="ButChoiceingTypeScreenList">Export a file</h3>
                            </div>
                            <div className="ChoiceingTypeScreenList">
                                <BsUpload size={18}></BsUpload>
                                <h3 className="ButChoiceingTypeScreenList">Import a list</h3>
                            </div>
                        </div>
                    </div>
                    <div className="CreateAnOrder">
                        <Button type="primary" onClick={showModal}>
                            Create a product
                        </Button>
                        <Modal title="Create Order" open={isModalOpen} onOk={handOk} onCancel={handleCancel}>
                            <CreateProduct setModal={setIsModalOpen} setLoading={setLoading}></CreateProduct>
                        </Modal>
                    </div>
                </div>
                <div className="ContainerOrderList">
                    <div className="MenuSeclectionQUick">
                        <div className="SeclectionQUick">All product</div>
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

export default ProductsList;
