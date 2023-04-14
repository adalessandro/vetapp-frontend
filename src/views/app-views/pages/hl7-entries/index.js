import React, { Component } from "react";
import { Card, Table, Tooltip, message, Button } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import HL7EntryView from "./HL7EntryView";
import HL7EntryModal from "./HL7EntryModal";
import HL7EntryService from "../../../../services/HL7EntryService";
import utils from "utils";
import FileSaver from "file-saver";

export class HL7EntryList extends Component {
  state = {
    hl7Entries: [],
    hl7Visible: false,
    hl7ModalVisible: false,
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
      message.success({ content: `Eliminada Muestra #${id}`, duration: 2 });
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

  showHL7EntryModal = (hl7Entry) => {
    this.setState({
      hl7ModalVisible: true,
      selectedHL7Entry: hl7Entry,
    });
  };

  closeHL7EntryModal = () => {
    this.setState({
      hl7ModalVisible: false,
      selectedHL7Entry: null,
    });
  };

  downloadHL7EntryExcel = (hl7Entry) => {
    const fetchData = async () => {
      const data = await HL7EntryService.downloadExcel({ id: hl7Entry.id });
      const date = new Date(hl7Entry.observationDate.slice(0, -1))
        .toLocaleString()
        .split("T")[0];
      const filename = `${date} - ${hl7Entry.patientAlias} - ${hl7Entry.patientName}.xlsx`;
      FileSaver.saveAs(data, filename);
      message.success({
        content: `Downloaded Excel file ${filename}`,
        duration: 2,
      });
    };
    fetchData();
  };

  render() {
    const { hl7Entries, hl7Visible, hl7ModalVisible, selectedHL7Entry } =
      this.state;

    const tableColumns = [
      {
        title: "#",
        dataIndex: "id",
        sorter: {
          compare: (a, b) => utils.antdTableSorter(a, b, "id"),
        },
      },
      {
        title: "Fecha",
        dataIndex: "observationDate",
        render: (a) => new Date(a.slice(0, -1)).toLocaleString(),
        sorter: {
          compare: (a, b) => {
            return (
              Date.parse(a.observationDate) - Date.parse(b.observationDate)
            );
          },
        },
      },
      {
        title: "Paciente",
        dataIndex: "patientAlias",
        sorter: {
          compare: (a, b) => utils.antdTableSorter(a, b, "patientAlias"),
        },
      },
      {
        title: "Sexo",
        dataIndex: "patientSex",
        sorter: {
          compare: (a, b) => utils.antdTableSorter(a, b, "patientSex"),
        },
      },
      {
        title: "Edad",
        dataIndex: "resultAge",
        render: utils.intervalDateToString,
        sorter: {
          compare: (a, b) => {
            return utils.intervalCompare(a.resultAge, b.resultAge);
          },
        },
      },
      {
        title: "Especie",
        dataIndex: "patientRace",
        sorter: {
          compare: (a, b) => utils.antdTableSorter(a, b, "patientRace"),
        },
      },
      {
        title: "Responsable",
        dataIndex: "patientName",
        sorter: {
          compare: (a, b) => utils.antdTableSorter(a, b, "patientName"),
        },
      },

      {
        title: "Solicita",
        dataIndex: "observationCollector",
        sorter: {
          compare: (a, b) =>
            utils.antdTableSorter(a, b, "observationCollector"),
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
                style={{ display: "none" }}
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  this.showHL7Entry(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Ver">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showHL7EntryModal(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Descargar Excel">
              <Button
                className="mr-2"
                icon={<DownloadOutlined />}
                onClick={() => {
                  this.downloadHL7EntryExcel(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Eliminar">
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
        <HL7EntryModal
          data={selectedHL7Entry}
          visible={hl7ModalVisible}
          close={() => {
            this.closeHL7EntryModal();
          }}
        />
      </Card>
    );
  }
}

export default HL7EntryList;
