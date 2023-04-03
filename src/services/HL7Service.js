import fetch from "auth/FetchInterceptor";

const HL7Service = {};

HL7Service.listHL7 = function (params) {
  return fetch({
    url: "/hl7",
    method: "get",
    params,
  });
};

HL7Service.removeHL7 = function (params) {
  return fetch({
    url: `/hl7/${params.id}`,
    method: "delete",
  });
};

export default HL7Service;
