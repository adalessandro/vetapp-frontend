import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import { DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import HL7EntryView from "./HL7EntryView";
import HL7EntryService from "../../../../services/HL7EntryService";

export class HL7EntryList extends Component {
  state = {
    hl7Entries: [],
    hl7Visible: false,
    selectedHL7Entry: null,
  };

  componentDidMount() {
    const fetchData = async () => {
      const response = await HL7EntryService.list();
      const hl7Entries = Array.from(response);
      this.setState({ hl7Entries });
    };
    fetchData();
  }

  deleteHL7Entry = (id) => {
    const fetchData = async () => {
      await HL7EntryService.remove({ id });
      this.setState({
        hl7Entries: this.state.hl7Entries.filter((item) => item.id !== id),
      });
      message.success({ content: `Deleted HL7 entry ${id}`, duration: 2 });
    };
    fetchData();
  };

  showHL7Entry = (hl7Entry) => {
    this.setState({
      hl7Visible: true,
      selectedHL7Entry: hl7Entry,
    });
  };

  closeHL7Entry = () => {
    this.setState({
      hl7Visible: false,
      selectedHL7Entry: null,
    });
  };

  render() {
    const { hl7Entries, hl7Visible, selectedHL7Entry } = this.state;

    const tableColumns = [
      {
        title: "Id",
        dataIndex: "id",
        sorter: {
          compare: (a, b) => a.role.id - b.role.id,
        },
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
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  this.showHL7Entry(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteHL7Entry(elm.id);
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
          <Table columns={tableColumns} dataSource={hl7Entries} rowKey="id" />
        </div>
        <HL7EntryView
          data={selectedHL7Entry}
          visible={hl7Visible}
          close={() => {
            this.closeHL7Entry();
          }}
        />
      </Card>
    );
  }
}

export default HL7EntryList;
