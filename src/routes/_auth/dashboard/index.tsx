import { createFileRoute } from "@tanstack/react-router";
import { Col, Row } from "antd";
import { PageHeader } from "../../../components/header/pageHeader";

export const Route = createFileRoute("/_auth/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Dashboard"
            subtitle="Visualize os principais dados do backoffice."
          />
        </Col>
      </Row>
    </Row>
  );
}