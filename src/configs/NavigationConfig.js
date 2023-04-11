import { DashboardOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "sidenav.dashboard.default",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const pagesNavTree = [
  {
    key: "pages",
    path: `${APP_PREFIX_PATH}/pages`,
    title: "sidenav.pages",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: "pages-hl7-list",
        path: `${APP_PREFIX_PATH}/pages/hl7-list`,
        title: "sidenav.pages.hl7-list",
        icon: PlusCircleOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "pages-hl7-entries",
        path: `${APP_PREFIX_PATH}/pages/hl7-entries`,
        title: "sidenav.pages.hl7-entries",
        icon: PlusCircleOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree, ...pagesNavTree];

export default navigationConfig;
