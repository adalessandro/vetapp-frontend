import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import HL7RawView from "./HL7RawView";
import HL7Service from "../../../../services/HL7Service";

export class HL7MessageList extends Component {
  state = {
    hl7Messages: [],
    hl7RawVisible: false,
    selectedHL7Message: null,
  };

  componentDidMount() {
    const fetchData = async () => {
      const response = await HL7Service.listHL7();
      this.setState({ hl7Messages: response });
    };
    fetchData();
  }

  deleteHL7Message = (id) => {
    const fetchData = async () => {
      await HL7Service.removeHL7({ id });
      this.setState({
        hl7Messages: this.state.hl7Messages.filter((item) => item.id !== id),
      });
      message.success({ content: `Deleted HL7 message ${id}`, duration: 2 });
    };
    fetchData();
  };

  showHL7MessageRaw = (userInfo) => {
    this.setState({
      hl7RawVisible: true,
      selectedHL7Message: userInfo,
    });
  };

  closeHL7MessageRaw = () => {
    this.setState({
      hl7RawVisible: false,
      selectedHL7Message: null,
    });
  };

  render() {
    const { hl7Messages, hl7RawVisible, selectedHL7Message } = this.state;

    const tableColumns = [
      {
        title: "Id",
        dataIndex: "id",
        sorter: {
          compare: (a, b) => a.role.id - b.role.id,
        },
      },
      {
        title: "Payload",
        dataIndex: "payload",
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showHL7MessageRaw(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteHL7Message(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={hl7Messages} rowKey="id" />
        </div>
        <HL7RawView
          data={selectedHL7Message}
          visible={hl7RawVisible}
          close={() => {
            this.closeHL7MessageRaw();
          }}
        />
      </Card>
    );
  }
}

export default HL7MessageList;
