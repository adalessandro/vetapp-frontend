import React, { Component } from "react";
import { Drawer, Divider, Table, Tag } from "antd";

function genTable(data) {
  const ret = [];

  function genChild(id) {
    ret.push({
      key: id,
      id: id,
      value: data[id],
    });
  }

  genChild("id");

  genChild("patientName");
  genChild("patientSex");
  genChild("patientAlias");
  genChild("patientRace");

  genChild("observationDate");
  genChild("observationCollector");

  genChild("resultAge");

  genChild("wbcValue");
  genChild("wbcUnit");
  genChild("wbcRange");

  genChild("lymPValue");
  genChild("lymPUnit");
  genChild("lymPRange");

  genChild("granPValue");
  genChild("granPUnit");
  genChild("granPRange");

  genChild("midPValue");
  genChild("midPUnit");
  genChild("midPRange");

  genChild("lymNValue");
  genChild("lymNUnit");
  genChild("lymNRange");

  genChild("granNValue");
  genChild("granNUnit");
  genChild("granNRange");

  genChild("midNValue");
  genChild("midNUnit");
  genChild("midNRange");

  genChild("rbcValue");
  genChild("rbcUnit");
  genChild("rbcRange");

  genChild("hgbValue");
  genChild("hgbUnit");
  genChild("hgbRange");

  genChild("hctValue");
  genChild("hctUnit");
  genChild("hctRange");

  genChild("mcvValue");
  genChild("mcvUnit");
  genChild("mcvRange");

  genChild("mchValue");
  genChild("mchUnit");
  genChild("mchRange");

  genChild("mchcValue");
  genChild("mchcUnit");
  genChild("mchcRange");

  genChild("rdwcvValue");
  genChild("rdwcvUnit");
  genChild("rdwcvRange");

  genChild("rdwsdValue");
  genChild("rdwsdUnit");
  genChild("rdwsdRange");

  genChild("pltValue");
  genChild("pltUnit");
  genChild("pltRange");

  genChild("mpvValue");
  genChild("mpvUnit");
  genChild("mpvRange");

  genChild("pdwValue");
  genChild("pdwUnit");
  genChild("pdwRange");

  genChild("pctValue");
  genChild("pctUnit");
  genChild("pctRange");

  return ret;
}

export class HL7EntryView extends Component {
  render() {
    const { data, visible, close } = this.props;

    if (!data) return;

    const tableColumns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
      },
    ];
    const tableData = genTable(data);

    return (
      <Drawer
        width={500}
        placement="right"
        onClose={close}
        closable={false}
        open={visible}
      >
        <div className="text-center mt-3">
          <h3 className="mt-2 mb-0">HL7 ENTRY</h3>
        </div>
        <Divider dashed />
        <Table columns={tableColumns} dataSource={tableData} />
      </Drawer>
    );
  }
}

export default HL7EntryView;
