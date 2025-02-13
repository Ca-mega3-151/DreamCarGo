# Overview

The `MenuHorizontal` component extends the functionality of the Ant Design Menu component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Menu component.

# Props

| Prop        | Type               | Default | Description                                               |
| ----------- | ------------------ | ------- | --------------------------------------------------------- |
| className   | string             | -       | Custom CSS class for styling the menu.                    |
| expandIcon  | ReactNode          | -       | The icon for expanding the menu items.                    |
| items       | MenuItem<Key>[]    | []      | The menu items to be displayed.                           |
| selectedKey | Key                | -       | The key of the currently selected item.                   |
| onSelect    | (key: Key) => void | -       | Callback function triggered when a menu item is selected. |

# Usage

```tsx
export const Sample = () => {
  const [pathname, navigate] = useState("/bundles");

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <img src={logo} alt="Logo" />
      <MenuHorizontal
        selectedKey={pathname}
        items={[
          {
            key: "/drinks",
            label: "Drinks",
            children: [
              {
                key: "/all",
                label: "Shop all",
                onClick: () => navigate("/all"),
              },
              {
                key: "/collections/cold-pressed-juices",
                label: "Cold-pressed Juices",
                onClick: () => navigate("/collections/cold-pressed-juices"),
              },
              {
                key: "/collections/kombuchas",
                label: "Kombuchas",
                onClick: () => navigate("/collections/kombuchas"),
              },
              {
                key: "/collections/plant-milks",
                label: "Plant Milks",
                onClick: () => navigate("/collections/plant-milks"),
              },
              {
                key: "/collections/shakes",
                label: "Shakes",
                onClick: () => navigate("/collections/shakes"),
              },
              {
                key: "/collections/lemonades",
                label: "Lemonades",
                onClick: () => navigate("/collections/lemonades"),
              },
            ],
          },
          {
            key: "/bundles",
            label: "Bundles",
            onClick: () => navigate("/bundles"),
          },
          {
            key: "/recipes",
            label: "Recipes",
            onClick: () => navigate("/recipes"),
          },
          {
            key: "/about",
            label: "About",
            children: [
              {
                key: "/our-story",
                label: "Our Story",
                onClick: () => navigate("/our-story"),
              },
              {
                key: "/contact-us",
                label: "Contact Us",
                onClick: () => navigate("/contact-us"),
              },
            ],
          },
        ]}
      />
    </div>
  );
};
```
