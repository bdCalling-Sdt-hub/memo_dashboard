import React from "react";
import { Table, Button } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";

const RecentCustomers = () => {
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
            title: "Customer Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={record.avatar}
                        alt={text}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{text}</span>
                </div>
            ),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (text) => (
                <div className="flex items-center space-x-2">
                    <FaLocationDot />
                    <span className="text-gray-600">{text}</span>
                </div>
            ),
        },
    ];

    const data = [
        {
            id: "01",
            name: "Jerome Bell",
            avatar: "https://via.placeholder.com/40",
            location: "Khabarovsk",
        },
        {
            id: "02",
            name: "Jacob Jones",
            avatar: "https://via.placeholder.com/40",
            location: "Cologne",
        },
        {
            id: "03",
            name: "Marvin McKinney",
            avatar: "https://via.placeholder.com/40",
            location: "Bochum",
        },
        {
            id: "04",
            name: "Brooklyn Simmons",
            avatar: "https://via.placeholder.com/40",
            location: "Lomas de Zamora",
        },
        {
            id: "05",
            name: "Courtney Henry",
            avatar: "https://via.placeholder.com/40",
            location: "Mönchengladbach",
        },
        {
            id: "06",
            name: "Cody Fisher",
            avatar: "https://via.placeholder.com/40",
            location: "Kiel",
        },
        {
            id: "07",
            name: "Theresa Webb",
            avatar: "https://via.placeholder.com/40",
            location: "Bahia Blanca",
        },
        {
            id: "08",
            name: "Jenny Wilson",
            avatar: "https://via.placeholder.com/40",
            location: "Chelyabinsk",
        },
        {
            id: "09",
            name: "Kristin Watson",
            avatar: "https://via.placeholder.com/40",
            location: "North Las Vegas",
        },
    ];

    return (
        <div className="w-full px-6 py-8 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Button
                        icon={<FaArrowLeft />}
                        className="flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 py-1 border rounded-md"
                    />
                    <h1 className="text-xl font-semibold">Recent Customers</h1>
                </div>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 8,
                    showSizeChanger: false,
                    position: ["bottomCenter"],
                    nextIcon: (
                        <Button
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border absolute right-0"
                        >
                            Next <FaArrowRight />
                        </Button>
                    ),
                    prevIcon: (
                        <Button
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md border absolute left-0"
                        >
                            <FaArrowLeft /> Previous
                        </Button>
                    ),
                }}
                rowKey={(record) => record.id}
                bordered
                className="ant-table-custom"
            />
        </div>
    );
};

export default RecentCustomers;
