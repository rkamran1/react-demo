import TableList from "views/Tables.jsx";
import TableTablesMessangerList from "views/TablesMessanger.jsx";
import Map from "views/Map.jsx";

var routes = [
    {
        path: "/tables",
        name: "User",
        icon: "nc-icon nc-tile-56",
        component: TableList,
        layout: "/admin"
    },
    {
        path: "/maps",
        name: "Maps",
        icon: "nc-icon nc-pin-3",
        component: Map,
        layout: "/admin"
    },
    {
        path: "/messanger",
        name: "Messenger",
        icon: "nc-icon nc-caps-small",
        component: TableTablesMessangerList,
        layout: "/admin"
    },
];
export default routes;
