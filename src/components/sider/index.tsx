import {
  ArrowRightOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Badge, Button } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTheme } from "../../contexts/themeContext";
import { MenuItens } from "./menus";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { Link, useNavigate } from "react-router-dom";
// import { signOut } from "@aws-amplify/auth";

interface SiderComponentI {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const SiderComponent = ({
  isMenuOpen,
  setIsMenuOpen,
  children,
}: SiderComponentI) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isSm, isMd, isXl, isLg } = useBreakpoints();
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      pageTitleRender={false}
      menuDataRender={() => MenuItens(100)}
      contentStyle={{
        padding: 0,
        backgroundColor: "red",
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
      layout="side"
      collapsed={!isMenuOpen}
      onCollapse={(collapsed) => setIsMenuOpen(!collapsed)}
      logo={
        theme === "light" ? (
          <Link to="/dashboard">
            {" "}
            <img
              src="/logoDef.svg"
              style={
                !isMd || isSm
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />{" "}
          </Link>
        ) : (
          <Link to="/dashboard">
            <img
              src="/logoWhiteDef.svg"
              style={
                !isMd || isSm
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />
          </Link>
        )
      }
      headerContentRender={
        !isSm
          ? () => {
              return (
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    width: 50,
                  }}
                >
                  {!isMenuOpen ? (
                    <MenuUnfoldOutlined style={{ fontSize: 22 }} />
                  ) : (
                    <MenuFoldOutlined style={{ fontSize: 22 }} />
                  )}
                </div>
              );
            }
          : undefined
      }
      collapsedButtonRender={
        isSm
          ? undefined
          : () => {
              return "";
            }
      }
      menuItemRender={(item, dom) => {
        if (item.name === "Pendentes" || item.name === "Terminais") {
          return (
            <Link
              to={item.path ?? ""}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {dom} <Badge color="green" count={100}></Badge>
            </Link>
          );
        }
        return <Link to={item.path ?? ""}>{dom}</Link>;
      }}
      siderWidth={isXl ? 240 : isLg ? 200 : isMenuOpen ? 300 : 80}
      title=""
      menuFooterRender={(props) => {
        return (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              paddingBlockStart: 12,
              gap: 8,
            }}
          >
            {theme === "light" ? (
              <Button
                style={{ width: "100%" }}
                onClick={() => setTheme("dark")}
                icon={<SunOutlined />}
                type="text"
              />
            ) : (
              <Button
                style={{ width: "100%" }}
                onClick={() => setTheme("light")}
                icon={<MoonOutlined />}
                type="text"
              />
            )}
            <Button
              size="large"
              type="text"
              style={{ width: "100%" }}
              icon={<ArrowRightOutlined />}
              onClick={() => navigate("/")}
            >
              {!props?.collapsed && "Acessar Franquia"}
            </Button>
            <Button
              size="large"
              type="text"
              style={{ width: "100%" }}
              icon={<UserOutlined />}
              onClick={() => navigate("/")}
            >
              {!props?.collapsed && "Acessar perfil"}
            </Button>
            <Button
              size="large"
              type="text"
              danger
              style={{ width: "100%" }}
              icon={<LogoutOutlined />}
              onClick={() => {}}
            >
              {!props?.collapsed && "Sair do backoffice"}
            </Button>
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
