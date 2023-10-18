import React from "react";
import CardWidget from "../../components/CardWidget";
// icon
import ArticleIcon from "@mui/icons-material/Article";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InventoryIcon from "@mui/icons-material/Inventory";

const Dashboard = () => {
  return (
    <>
      <CardWidget
        heading="Total Customers"
        icon={<ArticleIcon className="card-icon" />}
        value={1220}
      />
      <CardWidget
        heading="Sim Cards Registered"
        icon={<InventoryIcon className="card-icon" />}
        value={31220}
      />
      <CardWidget
        heading="Total Agents"
        icon={<SupportAgentIcon className="card-icon" />}
        value={220}
      />
    </>
  );
};

export default Dashboard;
