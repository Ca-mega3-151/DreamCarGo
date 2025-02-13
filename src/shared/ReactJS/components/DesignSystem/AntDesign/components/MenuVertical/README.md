# Overview

The `MenuVertical` component extends the functionality of the Ant Design Menu component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Menu component.

# Props

| Prop            | Type                  | Default | Description                                               |
| --------------- | --------------------- | ------- | --------------------------------------------------------- |
| className       | string                | -       | Custom CSS class for styling the menu.                    |
| inlineCollapsed | boolean               | -       | Whether the inline menu is collapsed.                     |
| inlineIndent    | number                | 20      | Indent width of inline menu items.                        |
| expandIcon      | ReactNode             | -       | The icon for expanding the menu items.                    |
| items           | MenuItem<Key>[]       | []      | The menu items to be displayed.                           |
| openKeys        | Key[]                 | -       | The keys of the currently open submenus.                  |
| selectedKey     | Key                   | -       | The key of the currently selected item.                   |
| onSelect        | (key: Key) => void    | -       | Callback function triggered when a menu item is selected. |
| onOpenChange    | (keys: Key[]) => void | -       | Callback function triggered when the open keys change.    |
| Header          | ReactNode             | -       | Custom header component to be displayed above the menu.   |
| Footer          | ReactNode             | -       | Custom footer component to be displayed below the menu.   |

# Usage

```tsx
export const SampleDashboardLayout = () => {
  const [pathname, navigate] = useState("/dashboard");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items = useMemo(() => {
    return [
      {
        key: "/dashboard",
        icon: <HomeOutlined />,
        label: "Home",
        onClick: () => navigate("/dashboard"),
      },
      {
        key: "/organizational-structure",
        icon: <ClusterOutlined />,
        label: "Organization Structure",
        children: [
          {
            key: "/department",
            label: "Department",
            onClick: () => navigate("/department"),
          },
          {
            key: "/employee",
            label: "Employee",
            onClick: () => navigate("/employee"),
          },
        ],
      },
      {
        key: "/appointment",
        icon: <ScheduleOutlined />,
        label: "Appointment",
        onClick: () => navigate("/appointment"),
      },
      {
        key: "/input-check",
        icon: <CheckCircleOutlined />,
        label: "Input Check",
        onClick: () => navigate("/input-check"),
      },
      {
        key: "/consultation",
        icon: <QuestionCircleOutlined />,
        label: "Consultation",
        children: [
          {
            key: "/consultant-form",
            label: "Consultant Form",
            onClick: () => navigate("/consultant-form"),
          },
          {
            key: "/promotion",
            label: "Promotion",
            onClick: () => navigate("/promotion"),
          },
          {
            key: "/course-combo",
            label: "Course Combo",
            onClick: () => navigate("/course-combo"),
          },
          {
            key: "/course-roadmap",
            label: "Course roadmap",
            onClick: () => navigate("/course-roadmap"),
          },
          {
            key: "/course",
            label: "Course",
            onClick: () => navigate("/course"),
          },
        ],
      },
      {
        key: "/trial-request",
        icon: <ExperimentOutlined />,
        label: "Trial Request",
        onClick: () => navigate("/trial-request"),
      },
      {
        key: "/contract_signing",
        icon: <FileDoneOutlined />,
        label: "Contract Signing",
        children: [
          {
            key: "/contract-template-management",
            label: "Contract Template Management",
            onClick: () => navigate("/contract-template-management"),
          },
          {
            key: "/contract-management",
            label: "Contract management",
            onClick: () => navigate("/contract-management"),
          },
        ],
      },
      {
        key: "/student",
        icon: <UserOutlined />,
        label: "Student",
        onClick: () => navigate("/student"),
      },
    ];
  }, []);

  useEffect(() => {
    const currentActiveKey = pathname;
    const parentMenuItem = items.find((item) => {
      return item && "children" in item && item.children?.some((child) => "key" in child && child.key && currentActiveKey.startsWith(child.key.toString()));
    });
    setOpenKeys(parentMenuItem?.key ? [parentMenuItem.key.toString()] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedKey = useMemo(() => {
    const secondSlashIndex = pathname.indexOf("/", 1);
    if (secondSlashIndex !== -1) {
      return pathname.substring(0, secondSlashIndex);
    } else {
      return pathname;
    }
  }, [pathname]);

  const HEADER_HEIGHT = 66;
  const MENU_WIDTH = 240;

  return (
    <div style={{ background: "#f5f5f5", display: "flex" }}>
      <div
        style={{
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: MENU_WIDTH,
          width: MENU_WIDTH,
          background: "#ffffff",
          height: "100vh",
          borderRight: "1px solid #eee",
        }}
      >
        <MenuVertical
          Header={
            <div style={{ height: HEADER_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logo} alt="Logo" />
            </div>
          }
          Footer={
            <Button block danger type="link" icon={<LogoutOutlined />}>
              Logout
            </Button>
          }
          selectedKey={selectedKey}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          items={items}
        />
      </div>
      <div style={{ flex: "1 1 auto" }}>
        <div className="Header" style={{ height: HEADER_HEIGHT, width: "100%", background: "white" }}></div>
        <div style={{ padding: 16 }}>Body Content</div>
      </div>
    </div>
  );
};
```
