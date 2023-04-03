import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import HL7ParseView from "./HL7ParseView";
import HL7RawView from "./HL7RawView";
import HL7Service from "../../../../services/HL7Service";
const hl7Standard = require("hl7-standard");

export class HL7MessageList extends Component {
  state = {
    hl7Messages: [],
    hl7ParseVisible: false,
    hl7RawVisible: false,
    selectedHL7Message: null,
  };

  componentDidMount() {
    const fetchData = async () => {
      const response = await HL7Service.listHL7();
      const hl7Messages = Array.from(response);
      hl7Messages.forEach((elm) => {
        elm.message = new hl7Standard(elm.payload);
        elm.message.transform();
      });
      this.setState({ hl7Messages });
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

  showHL7MessageParse = (hl7Message) => {
    this.setState({
      hl7ParseVisible: true,
      selectedHL7Message: hl7Message,
    });
  };

  closeHL7MessageParse = () => {
    this.setState({
      hl7ParseVisible: false,
      selectedHL7Message: null,
    });
  };

  showHL7MessageRaw = (hl7Message) => {
    this.setState({
      hl7RawVisible: true,
      selectedHL7Message: hl7Message,
    });
  };

  closeHL7MessageRaw = () => {
    this.setState({
      hl7RawVisible: false,
      selectedHL7Message: null,
    });
  };

  render() {
    const { hl7Messages, hl7ParseVisible, hl7RawVisible, selectedHL7Message } =
      this.state;

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
            <Tooltip title="View Parse">
              <Button
                type="primary"
                className="mr-2"
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  this.showHL7MessageParse(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="View Raw">
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
        <HL7ParseView
          data={selectedHL7Message}
          visible={hl7ParseVisible}
          close={() => {
            this.closeHL7MessageParse();
          }}
        />
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
