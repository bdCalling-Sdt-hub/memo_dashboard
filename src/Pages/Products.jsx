import React from "react";
import { Table, Input, Select, Button } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const Products = () => {
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            align: "center",
        },
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            render: (text, record) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={record.image}
                        alt={text}
                        className="w-8 h-8 rounded-full"
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Product of the shop",
            dataIndex: "shopName",
            key: "shopName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Pieces sold",
            dataIndex: "piecesSold",
            key: "piecesSold",
        },
        {
            title: "Sales",
            dataIndex: "sales",
            key: "sales",
        },
    ];

    const data = [
        {
            key: "1",
            index: "01",
            productName: "Men beauty kit",
            shopName: "Cameron salons",
            price: "€60",
            piecesSold: 43,
            sales: "€1850",
            image: "https://via.placeholder.com/30",
        },
        {
            key: "2",
            index: "02",
            productName: "Hair color",
            shopName: "The beauty center",
            price: "€50",
            piecesSold: 70,
            sales: "€2450",
            image: "https://via.placeholder.com/30",
        },
        {
            key: "3",
            index: "03",
            productName: "Men beauty kit",
            shopName: "Monday salons",
            price: "€70",
            piecesSold: 64,
            sales: "€1850",
            image: "https://via.placeholder.com/30",
        },
        {
            key: "4",
            index: "04",
            productName: "Men beauty kit",
            shopName: "The barbers",
            price: "€40",
            piecesSold: 63,
            sales: "€1850",
            image: "https://via.placeholder.com/30",
        },
        {
            key: "5",
            index: "05",
            productName: "Men beauty kit",
            shopName: "Cameron salons",
            price: "€120",
            piecesSold: 53,
            sales: "€1850",
            image: "https://via.placeholder.com/30",
        },
    ];

    return (
        <div className="w-full px-6 py-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Button
                        icon={<FaArrowLeft />}
                        className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
                    />
                    <h1 className="text-xl font-semibold">Products (135)</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <Select
                        defaultValue="All products"
                        options={[
                            { value: "all", label: "All products" },
                            { value: "beauty", label: "Beauty" },
                            { value: "salons", label: "Salons" },
                        ]}
                        className="w-40"
                    />
                    <Input
                        prefix={<AiOutlineSearch className="text-gray-400" />}
                        placeholder="Search"
                        className="w-60"
                    />
                </div>
            </div>

            {/* Table Section */}
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    position: ["bottomCenter"],
                    defaultPageSize: 8,
                    showSizeChanger: false,
                    nextIcon: (
                        <Button
                            icon={<FaArrowRight />}
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border absolute right-0"
                        >
                            Next
                        </Button>
                    ),
                    prevIcon: (
                        <Button
                            icon={<FaArrowLeft />}
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border absolute left-0"
                        >
                            Previous
                        </Button>
                    ),
                }}
                bordered
                rowClassName="text-sm"
            />
        </div>
    );
};

export default Products;
