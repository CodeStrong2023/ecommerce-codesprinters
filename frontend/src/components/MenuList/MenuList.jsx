import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: <a href="/login">Iniciar Sesión</a>,
    key: "0",
  },
  {
    label: <a href="/register">Registrarse</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <a href="/cart">Carrito</a>,
    key: "3",
  },
];
const MenuList = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default MenuList;
