import React from "react";
import { Modal, Descriptions, Table } from "antd";
import utils from "utils";

function genTable(data) {
  const ret = [];

  function genChildTriplet(id, title) {
    const child = {
      key: id,
      title: title,
      value: data[`${id}Value`],
      unit: data[`${id}Unit`],
      range: data[`${id}Range`],
    };
    ret.push(child);
  }

  genChildTriplet("wbc", "WBC");
  genChildTriplet("lymP", "LYM%");
  genChildTriplet("granP", "GRAN%");
  genChildTriplet("midP", "MID%");
  genChildTriplet("lymN", "LYM#");
  genChildTriplet("granN", "GRAN%");
  genChildTriplet("midN", "MID#");
  genChildTriplet("rbc", "RBC");
  genChildTriplet("hgb", "HGB");
  genChildTriplet("hct", "HCT");
  genChildTriplet("mcv", "MCV");
  genChildTriplet("mch", "MCH");
  genChildTriplet("mchc", "MCHC");
  genChildTriplet("rdwcv", "RDW-CV");
  genChildTriplet("rdwsd", "RDW-SD");
  genChildTriplet("plt", "PLT");
  genChildTriplet("mpv", "MPV");
  genChildTriplet("pdw", "PDW");
  genChildTriplet("pct", "PCT");

  return ret;
}

const HL7EntryModal = ({ data, visible, close }) => {
  if (!data) return;

  const handleOk = () => {
    close();
  };

  const handleCancel = () => {
    close();
  };

  const headerData = [
    { key: "patientAlias", title: "Paciente" },
    { key: "patientSex", title: "Sexo" },
    { key: "resultAge", title: "Edad", render: utils.intervalDateToString },
    { key: "patientRace", title: "Especie" },
    { key: "patientName", title: "Responsable" },
    { key: "observationCollector", title: "Solicita" },
  ];

  const tableColumns = [
    {
      title: "Campo",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Unidad",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Rango",
      dataIndex: "range",
      key: "range",
    },
  ];
  const tableData = genTable(data);

  return (
    <>
      <Modal
        title={`Muestra #${data.id} - (${new Date(
          data.observationDate.slice(0, -1)
        ).toLocaleString()})`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions title="" layout="vertical">
          {headerData.map((header) => (
            <Descriptions.Item label={header.title} key={header.title}>
              {header.render
                ? header.render(data[header.key])
                : data[header.key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Table size="small" columns={tableColumns} dataSource={tableData} />
      </Modal>
    </>
  );
};

export default HL7EntryModal;
