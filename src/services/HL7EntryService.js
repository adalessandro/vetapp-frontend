import fetch from "auth/FetchInterceptor";

const HL7EntryService = {};

HL7EntryService.list = function (params) {
  return fetch({
    url: "/hl7-entry",
    method: "get",
    params,
  });
};

HL7EntryService.remove = function (params) {
  return fetch({
    url: `/hl7-entry/${params.id}`,
    method: "delete",
  });
};

export default HL7EntryService;
