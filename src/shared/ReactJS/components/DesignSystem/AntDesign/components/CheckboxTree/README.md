# Overview

The `CheckboxTree` component extends the functionality of the Ant Design Tree component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree component.

# Props

| Prop             | Type                                                                                                                        | Default              | Description                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| className        | `string`                                                                                                                    | -                    | Custom CSS class for styling the tree component.                                    |
| data             | `Leaf<Model>[]`                                                                                                             | -                    | The array of leaf nodes that make up the tree data.                                 |
| value            | `string[]`                                                                                                                  | -                    | The keys of the currently selected nodes.                                           |
| disabled         | `boolean`                                                                                                                   | -                    | Whether the entire tree is disabled.                                                |
| height           | `number`                                                                                                                    | -                    | The height of the tree component.                                                   |
| defaultExpandAll | `boolean`                                                                                                                   | -                    | Whether to expand all tree nodes by default.                                        |
| onChange         | `(keys: undefined \| string[], options: undefined \| Array<Omit<Leaf<Model>, 'disabled' \| 'hidden' \| 'parent'>>) => void` | -                    | Callback function triggered when a node's value state changes.                      |
| iconExpand       | `(props: { expanded: boolean }) => ReactNode`                                                                               | -                    | Customize expand/collapse icons for tree nodes (with default rotate angular style). |
| expandedKeys     | `string[]`                                                                                                                  | -                    | The keys of the currently expanded nodes.                                           |
| onExpand         | `(keys: string[]) => void`                                                                                                  | -                    | Callback function triggered when a node's expanded state changes.                   |
| readOnly         | `boolean`                                                                                                                   | `false`              | If true, the tree is read-only and cannot be changed by the user.                   |
| valueVariant     | `'controlled-state' \| 'uncontrolled-state'`                                                                                | `'controlled-state'` | Determines if the tree is in a controlled or uncontrolled state.                    |

# Usage

```tsx
export const Sample = () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  return (
    <div>
      <p>State: {checkedKeys.join(", ")}</p>
      <CheckboxTree
        data={data}
        value={checkedKeys}
        onChange={(values) => {
          setCheckedKeys(values ?? []);
        }}
      />
    </div>
  );
};
import { Leaf } from "../src/types/Leaf";

export interface Department {
  id: string;
  label: string;
  parentId: string | null;
}

export const data: Leaf<Department>[] = [
  {
    value: "1",
    label: "CEO",
    parent: null,
    rawData: { id: "1", label: "CEO", parentId: null },
  },
  {
    value: "2",
    label: "CFO",
    parent: "1",
    rawData: { id: "2", label: "CFO", parentId: "1" },
  },
  {
    value: "3",
    label: "COO",
    parent: "1",
    rawData: { id: "3", label: "COO", parentId: "1" },
  },
  {
    value: "4",
    label: "CTO",
    parent: "1",
    rawData: { id: "4", label: "CTO", parentId: "1" },
  },
  {
    value: "5",
    label: "Head of Academics",
    parent: "1",
    disabled: true,
    rawData: { id: "5", label: "Head of Academics", parentId: "1" },
  },
  {
    value: "6",
    label: "Head of Marketing",
    parent: "1",
    disabled: true,
    rawData: { id: "6", label: "Head of Marketing", parentId: "1" },
  },
  {
    value: "7",
    label: "Head of Sales",
    parent: "1",
    rawData: { id: "7", label: "Head of Sales", parentId: "1" },
  },
  {
    value: "8",
    label: "Finance Manager",
    parent: "2",
    rawData: { id: "8", label: "Finance Manager", parentId: "2" },
  },
  {
    value: "9",
    label: "Operations Manager",
    parent: "3",
    rawData: { id: "9", label: "Operations Manager", parentId: "3" },
  },
  {
    value: "10",
    label: "IT Manager",
    parent: "4",
    rawData: { id: "10", label: "IT Manager", parentId: "4" },
  },
  {
    value: "11",
    label: "Curriculum Director",
    parent: "5",
    rawData: { id: "11", label: "Curriculum Director", parentId: "5" },
  },
  {
    value: "12",
    label: "Content Developer",
    parent: "5",
    rawData: { id: "12", label: "Content Developer", parentId: "5" },
  },
  {
    value: "13",
    label: "Marketing Manager",
    parent: "6",
    rawData: { id: "13", label: "Marketing Manager", parentId: "6" },
  },
  {
    value: "14",
    label: "Sales Manager",
    parent: "7",
    rawData: { id: "14", label: "Sales Manager", parentId: "7" },
  },
  {
    value: "15",
    label: "Accountant",
    parent: "8",
    rawData: { id: "15", label: "Accountant", parentId: "8" },
  },
  {
    value: "16",
    label: "HR Manager",
    parent: "3",
    rawData: { id: "16", label: "HR Manager", parentId: "3" },
  },
  {
    value: "17",
    label: "Support Staff",
    parent: "9",
    disabled: true,
    rawData: { id: "17", label: "Support Staff", parentId: "9" },
  },
  {
    value: "18",
    label: "Software Engineer",
    parent: "10",
    rawData: { id: "18", label: "Software Engineer", parentId: "10" },
  },
  {
    value: "19",
    label: "Network Administrator",
    parent: "10",
    rawData: { id: "19", label: "Network Administrator", parentId: "10" },
  },
  {
    value: "20",
    label: "Instructional Designer",
    parent: "11",
    rawData: { id: "20", label: "Instructional Designer", parentId: "11" },
  },
  {
    value: "21",
    label: "Marketing Specialist",
    parent: "13",
    rawData: { id: "21", label: "Marketing Specialist", parentId: "13" },
  },
  {
    value: "22",
    label: "Sales Representative",
    parent: "14",
    rawData: { id: "22", label: "Sales Representative", parentId: "14" },
  },
  {
    value: "23",
    label: "Junior Accountant",
    parent: "15",
    rawData: { id: "23", label: "Junior Accountant", parentId: "15" },
  },
  {
    value: "24",
    label: "Financial Analyst",
    parent: "8",
    rawData: { id: "24", label: "Financial Analyst", parentId: "8" },
  },
  {
    value: "25",
    label: "Recruiter",
    parent: "16",
    disabled: true,
    rawData: { id: "25", label: "Recruiter", parentId: "16" },
  },
  {
    value: "26",
    label: "HR Assistant",
    parent: "16",
    rawData: { id: "26", label: "HR Assistant", parentId: "16" },
  },
  {
    value: "27",
    label: "Logistics Coordinator",
    parent: "9",
    rawData: { id: "27", label: "Logistics Coordinator", parentId: "9" },
  },
  {
    value: "28",
    label: "Office Administrator",
    parent: "9",
    rawData: { id: "28", label: "Office Administrator", parentId: "9" },
  },
  {
    value: "29",
    label: "Technical Support Specialist",
    parent: "10",
    rawData: { id: "29", label: "Technical Support Specialist", parentId: "10" },
  },
  {
    value: "30",
    label: "Data Analyst",
    parent: "10",
    rawData: { id: "30", label: "Data Analyst", parentId: "10" },
  },
  {
    value: "31",
    label: "Senior Content Developer",
    parent: "12",
    rawData: { id: "31", label: "Senior Content Developer", parentId: "12" },
  },
  {
    value: "32",
    label: "Junior Content Developer",
    parent: "12",
    rawData: { id: "32", label: "Junior Content Developer", parentId: "12" },
  },
  {
    value: "33",
    label: "Instructional Coordinator",
    parent: "11",
    rawData: { id: "33", label: "Instructional Coordinator", parentId: "11" },
  },
  {
    value: "34",
    label: "Graphic Designer",
    parent: "11",
    disabled: true,
    rawData: { id: "34", label: "Graphic Designer", parentId: "11" },
  },
  {
    value: "35",
    label: "Marketing Coordinator",
    parent: "13",
    disabled: true,
    rawData: { id: "35", label: "Marketing Coordinator", parentId: "13" },
  },
  {
    value: "36",
    label: "SEO Specialist",
    parent: "13",
    rawData: { id: "36", label: "SEO Specialist", parentId: "13" },
  },
  {
    value: "37",
    label: "Copywriter",
    parent: "13",
    rawData: { id: "37", label: "Copywriter", parentId: "13" },
  },
  {
    value: "38",
    label: "Social Media Manager",
    parent: "13",
    rawData: { id: "38", label: "Social Media Manager", parentId: "13" },
  },
  {
    value: "39",
    label: "Digital Marketing Specialist",
    parent: "13",
    rawData: { id: "39", label: "Digital Marketing Specialist", parentId: "13" },
  },
  {
    value: "40",
    label: "Sales Assistant",
    parent: "14",
    rawData: { id: "40", label: "Sales Assistant", parentId: "14" },
  },
  {
    value: "41",
    label: "Customer Service Representative",
    parent: "14",
    rawData: { id: "41", label: "Customer Service Representative", parentId: "14" },
  },
  {
    value: "42",
    label: "Regional Sales Manager",
    parent: "14",
    rawData: { id: "42", label: "Regional Sales Manager", parentId: "14" },
  },
  {
    value: "43",
    label: "Sales Trainer",
    parent: "14",
    rawData: { id: "43", label: "Sales Trainer", parentId: "14" },
  },
  {
    value: "44",
    label: "Product Manager",
    parent: "4",
    rawData: { id: "44", label: "Product Manager", parentId: "4" },
  },
  {
    value: "45",
    label: "Project Manager",
    parent: "3",
    rawData: { id: "45", label: "Project Manager", parentId: "3" },
  },
  {
    value: "46",
    label: "Program Manager",
    parent: "5",
    disabled: true,
    rawData: { id: "46", label: "Program Manager", parentId: "5" },
  },
  {
    value: "47",
    label: "Learning Specialist",
    parent: "5",
    disabled: true,
    rawData: { id: "47", label: "Learning Specialist", parentId: "5" },
  },
  {
    value: "48",
    label: "Research Analyst",
    parent: "5",
    rawData: { id: "48", label: "Research Analyst", parentId: "5" },
  },
  {
    value: "49",
    label: "Educational Consultant",
    parent: "5",
    rawData: { id: "49", label: "Educational Consultant", parentId: "5" },
  },
  {
    value: "50",
    label: "Compliance Officer",
    parent: "3",
    rawData: { id: "50", label: "Compliance Officer", parentId: "3" },
  },
  {
    value: "51",
    label: "Legal Advisor",
    parent: "2",
    rawData: { id: "51", label: "Legal Advisor", parentId: "2" },
  },
  {
    value: "52",
    label: "Internal Auditor",
    parent: "2",
    rawData: { id: "52", label: "Internal Auditor", parentId: "2" },
  },
  {
    value: "53",
    label: "Budget Analyst",
    parent: "8",
    rawData: { id: "53", label: "Budget Analyst", parentId: "8" },
  },
  {
    value: "54",
    label: "Accounts Payable Clerk",
    parent: "8",
    rawData: { id: "54", label: "Accounts Payable Clerk", parentId: "8" },
  },
  {
    value: "55",
    label: "Accounts Receivable Clerk",
    parent: "8",
    rawData: { id: "55", label: "Accounts Receivable Clerk", parentId: "8" },
  },
  {
    value: "56",
    label: "Payroll Specialist",
    parent: "8",
    rawData: { id: "56", label: "Payroll Specialist", parentId: "8" },
  },
  {
    value: "57",
    label: "Benefits Coordinator",
    parent: "16",
    rawData: { id: "57", label: "Benefits Coordinator", parentId: "16" },
  },
  {
    value: "58",
    label: "Training Coordinator",
    parent: "16",
    rawData: { id: "58", label: "Training Coordinator", parentId: "16" },
  },
  {
    value: "59",
    label: "Operations Coordinator",
    parent: "9",
    rawData: { id: "59", label: "Operations Coordinator", parentId: "9" },
  },
  {
    value: "60",
    label: "Facilities Manager",
    parent: "9",
    rawData: { id: "60", label: "Facilities Manager", parentId: "9" },
  },
  {
    value: "61",
    label: "Systems Administrator",
    parent: "10",
    rawData: { id: "61", label: "Systems Administrator", parentId: "10" },
  },
  {
    value: "62",
    label: "DevOps Engineer",
    parent: "10",
    rawData: { id: "62", label: "DevOps Engineer", parentId: "10" },
  },
  {
    value: "63",
    label: "Quality Assurance Engineer",
    parent: "10",
    rawData: { id: "63", label: "Quality Assurance Engineer", parentId: "10" },
  },
  {
    value: "64",
    label: "Technical Writer",
    parent: "10",
    rawData: { id: "64", label: "Technical Writer", parentId: "10" },
  },
  {
    value: "65",
    label: "Senior Software Engineer",
    parent: "10",
    rawData: { id: "65", label: "Senior Software Engineer", parentId: "10" },
  },
  {
    value: "66",
    label: "Junior Software Engineer",
    parent: "18",
    rawData: { id: "66", label: "Junior Software Engineer", parentId: "18" },
  },
  {
    value: "67",
    label: "IT Support Technician",
    parent: "10",
    rawData: { id: "67", label: "IT Support Technician", parentId: "10" },
  },
  {
    value: "68",
    label: "Database Administrator",
    parent: "10",
    rawData: { id: "68", label: "Database Administrator", parentId: "10" },
  },
  {
    value: "69",
    label: "Web Developer",
    parent: "10",
    rawData: { id: "69", label: "Web Developer", parentId: "10" },
  },
  {
    value: "70",
    label: "Instructional Technologist",
    parent: "11",
    rawData: { id: "70", label: "Instructional Technologist", parentId: "11" },
  },
  {
    value: "71",
    label: "E-learning Specialist",
    parent: "11",
    rawData: { id: "71", label: "E-learning Specialist", parentId: "11" },
  },
  {
    value: "72",
    label: "Content Strategist",
    parent: "12",
    rawData: { id: "72", label: "Content Strategist", parentId: "12" },
  },
  {
    value: "73",
    label: "Educational Content Writer",
    parent: "12",
    rawData: { id: "73", label: "Educational Content Writer", parentId: "12" },
  },
  {
    value: "74",
    label: "Video Producer",
    parent: "12",
    rawData: { id: "74", label: "Video Producer", parentId: "12" },
  },
  {
    value: "75",
    label: "Multimedia Specialist",
    parent: "12",
    rawData: { id: "75", label: "Multimedia Specialist", parentId: "12" },
  },
  {
    value: "76",
    label: "Senior Graphic Designer",
    parent: "11",
    rawData: { id: "76", label: "Senior Graphic Designer", parentId: "11" },
  },
  {
    value: "77",
    label: "Junior Graphic Designer",
    parent: "34",
    rawData: { id: "77", label: "Junior Graphic Designer", parentId: "34" },
  },
  {
    value: "78",
    label: "Communications Manager",
    parent: "6",
    rawData: { id: "78", label: "Communications Manager", parentId: "6" },
  },
  {
    value: "79",
    label: "Public Relations Specialist",
    parent: "6",
    rawData: { id: "79", label: "Public Relations Specialist", parentId: "6" },
  },
  {
    value: "80",
    label: "Event Coordinator",
    parent: "13",
    rawData: { id: "80", label: "Event Coordinator", parentId: "13" },
  },
  {
    value: "81",
    label: "Community Manager",
    parent: "6",
    rawData: { id: "81", label: "Community Manager", parentId: "6" },
  },
  {
    value: "82",
    label: "Senior Sales Representative",
    parent: "14",
    rawData: { id: "82", label: "Senior Sales Representative", parentId: "14" },
  },
  {
    value: "83",
    label: "Business Development Manager",
    parent: "14",
    rawData: { id: "83", label: "Business Development Manager", parentId: "14" },
  },
  {
    value: "84",
    label: "Customer Success Manager",
    parent: "14",
    rawData: { id: "84", label: "Customer Success Manager", parentId: "14" },
  },
  {
    value: "85",
    label: "Inside Sales Representative",
    parent: "14",
    rawData: { id: "85", label: "Inside Sales Representative", parentId: "14" },
  },
  {
    value: "86",
    label: "Outside Sales Representative",
    parent: "14",
    rawData: { id: "86", label: "Outside Sales Representative", parentId: "14" },
  },
  {
    value: "87",
    label: "Sales Operations Analyst",
    parent: "14",
    rawData: { id: "87", label: "Sales Operations Analyst", parentId: "14" },
  },
  {
    value: "88",
    label: "Territory Sales Manager",
    parent: "14",
    rawData: { id: "88", label: "Territory Sales Manager", parentId: "14" },
  },
  {
    value: "89",
    label: "Partnership Manager",
    parent: "14",
    rawData: { id: "89", label: "Partnership Manager", parentId: "14" },
  },
  {
    value: "90",
    label: "Corporate Trainer",
    parent: "14",
    rawData: { id: "90", label: "Corporate Trainer", parentId: "14" },
  },
  {
    value: "91",
    label: "Product Marketing Manager",
    parent: "6",
    rawData: { id: "91", label: "Product Marketing Manager", parentId: "6" },
  },
  {
    value: "92",
    label: "User Experience Researcher",
    parent: "6",
    rawData: { id: "92", label: "User Experience Researcher", parentId: "6" },
  },
  {
    value: "93",
    label: "Customer Support Manager",
    parent: "14",
    rawData: { id: "93", label: "Customer Support Manager", parentId: "14" },
  },
  {
    value: "94",
    label: "Customer Support Specialist",
    parent: "93",
    rawData: { id: "94", label: "Customer Support Specialist", parentId: "93" },
  },
  {
    value: "95",
    label: "Customer Support Assistant",
    parent: "93",
    rawData: { id: "95", label: "Customer Support Assistant", parentId: "93" },
  },
  {
    value: "96",
    label: "Business Analyst",
    parent: "3",
    rawData: { id: "96", label: "Business Analyst", parentId: "3" },
  },
  {
    value: "97",
    label: "Senior Project Manager",
    parent: "45",
    rawData: { id: "97", label: "Senior Project Manager", parentId: "45" },
  },
  {
    value: "98",
    label: "Junior Project Manager",
    parent: "45",
    rawData: { id: "98", label: "Junior Project Manager", parentId: "45" },
  },
  {
    value: "99",
    label: "Project Coordinator",
    parent: "45",
    rawData: { id: "99", label: "Project Coordinator", parentId: "45" },
  },
  {
    value: "100",
    label: "Operations Analyst",
    parent: "3",
    rawData: { id: "100", label: "Operations Analyst", parentId: "3" },
  },
];
```
