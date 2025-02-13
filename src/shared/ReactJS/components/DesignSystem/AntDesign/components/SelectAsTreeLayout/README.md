# SelectSingleAsTreeLayout

## Overview

The `SelectSingleAsTreeLayout` component extends the functionality of the Ant Design Tree Select component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree Select component.

## Props

| Prop                      | Type                                                                                                             | Default              | Description                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| `className`               | `string`                                                                                                         | -                    | Custom CSS class for styling the component.                                   |
| `data`                    | `Leaf<Model>[]`                                                                                                  | -                    | The array of leaf nodes that make up the tree data.                           |
| `value`                   | `string \| undefined`                                                                                            | -                    | The key of the currently selected node.                                       |
| `onChange`                | `(key: undefined \| string, option: undefined \| Omit<Leaf<Model>, 'disabled' \| 'hidden' \| 'parent'>) => void` | -                    | Callback function triggered when a node's selected state changes.             |
| `loading`                 | `boolean`                                                                                                        | -                    | Indicates whether the tree is in a loading state.                             |
| `notFoundContent`         | `ReactNode`                                                                                                      | -                    | Content displayed when no data is found.                                      |
| `allowClear`              | `boolean`                                                                                                        | `true`               | If true, allows the user to clear the selection.                              |
| `placeholder`             | `string`                                                                                                         | -                    | Placeholder text displayed when no nodes are selected.                        |
| `disabled`                | `boolean`                                                                                                        | -                    | If true, disables the entire tree.                                            |
| `autoClearSearchValue`    | `boolean`                                                                                                        | `true`               | If true, automatically clears the search value when a node is selected.       |
| `direction`               | `'ltr' \| 'rtl'`                                                                                                 | -                    | Layout direction (either 'ltr' for left-to-right or 'rtl' for right-to-left). |
| `onDropdownVisibleChange` | `(open: boolean) => void`                                                                                        | -                    | Callback function triggered when the dropdown's visibility changes.           |
| `onSearch`                | `(searchValue: string) => void`                                                                                  | -                    | Callback function triggered when a search is performed.                       |
| `open`                    | `boolean`                                                                                                        | -                    | Whether the dropdown is open or not.                                          |
| `searchValue`             | `string`                                                                                                         | -                    | The current search input value.                                               |
| `readOnly`                | `boolean`                                                                                                        | `false`              | If true, the tree is read-only and cannot be changed by the user.             |
| `valueVariant`            | `'controlled-state' \| 'uncontrolled-state'`                                                                     | `'controlled-state'` | Determines if the tree is in a controlled or uncontrolled state.              |
| `openVariant`             | `'controlled-state' \| 'uncontrolled-state'`                                                                     | `'controlled-state'` | Determines if the open state is in a controlled or uncontrolled state.        |
| `size`                    | `string`                                                                                                         | -                    | The size of the input box (e.g., 'small', 'middle', 'large').                 |
| `showSearch`              | `boolean`                                                                                                        | `true`               | If true, a search input is shown for filtering tree nodes.                    |
| `filterTreeNode`          | `(inputValue: string, node: TreeNode) => boolean`                                                                | `baseFilterOption`   | Custom function to filter tree nodes based on search input.                   |
| `showCheckedStrategy`     | `string`                                                                                                         | `'SHOW_PARENT'`      | Strategy for showing selected nodes (e.g., 'SHOW_PARENT').                    |

## Usage

```typescript
const Basic = () => {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

  return (
    <div>
      <p>State: {selectedKey}</p>
      <SelectSingleAsTreeLayout data={data} value={selectedKey} onChange={setSelectedKey} />
    </div>
  );
};
export interface Department {
  id: string;
  label: string;
  parentId: string | null;
}

export const data: Leaf<Department>[] = [
  {
    value: '1',
    label: 'CEO',
    searchValue: 'CEO',
    parent: null,
    rawData: { id: '1', label: 'CEO', parentId: null },
  },
  {
    value: '2',
    label: 'CFO',
    searchValue: 'CFO',
    parent: '1',
    rawData: { id: '2', label: 'CFO', parentId: '1' },
  },
  {
    value: '3',
    label: 'COO',
    searchValue: 'COO',
    parent: '1',
    rawData: { id: '3', label: 'COO', parentId: '1' },
  },
  {
    value: '4',
    label: 'CTO',
    searchValue: 'CTO',
    parent: '1',
    rawData: { id: '4', label: 'CTO', parentId: '1' },
  },
  {
    value: '5',
    label: 'Head of Academics',
    searchValue: 'Head of Academics',
    parent: '1',
    disabled: true,
    rawData: { id: '5', label: 'Head of Academics', parentId: '1' },
  },
  {
    value: '6',
    label: 'Head of Marketing',
    searchValue: 'Head of Marketing',
    parent: '1',
    disabled: true,
    rawData: { id: '6', label: 'Head of Marketing', parentId: '1' },
  },
  {
    value: '7',
    label: 'Head of Sales',
    searchValue: 'Head of Sales',
    parent: '1',
    rawData: { id: '7', label: 'Head of Sales', parentId: '1' },
  },
  {
    value: '8',
    label: 'Finance Manager',
    searchValue: 'Finance Manager',
    parent: '2',
    rawData: { id: '8', label: 'Finance Manager', parentId: '2' },
  },
  {
    value: '9',
    label: 'Operations Manager',
    searchValue: 'Operations Manager',
    parent: '3',
    rawData: { id: '9', label: 'Operations Manager', parentId: '3' },
  },
  {
    value: '10',
    label: 'IT Manager',
    searchValue: 'IT Manager',
    parent: '4',
    rawData: { id: '10', label: 'IT Manager', parentId: '4' },
  },
  {
    value: '11',
    label: 'Curriculum Director',
    searchValue: 'Curriculum Director',
    parent: '5',
    rawData: { id: '11', label: 'Curriculum Director', parentId: '5' },
  },
  {
    value: '12',
    label: 'Content Developer',
    searchValue: 'Content Developer',
    parent: '5',
    rawData: { id: '12', label: 'Content Developer', parentId: '5' },
  },
  {
    value: '13',
    label: 'Marketing Manager',
    searchValue: 'Marketing Manager',
    parent: '6',
    rawData: { id: '13', label: 'Marketing Manager', parentId: '6' },
  },
  {
    value: '14',
    label: 'Sales Manager',
    searchValue: 'Sales Manager',
    parent: '7',
    rawData: { id: '14', label: 'Sales Manager', parentId: '7' },
  },
  {
    value: '15',
    label: 'Accountant',
    searchValue: 'Accountant',
    parent: '8',
    rawData: { id: '15', label: 'Accountant', parentId: '8' },
  },
  {
    value: '16',
    label: 'HR Manager',
    searchValue: 'HR Manager',
    parent: '3',
    rawData: { id: '16', label: 'HR Manager', parentId: '3' },
  },
  {
    value: '17',
    label: 'Support Staff',
    searchValue: 'Support Staff',
    parent: '9',
    disabled: true,
    rawData: { id: '17', label: 'Support Staff', parentId: '9' },
  },
  {
    value: '18',
    label: 'Software Engineer',
    searchValue: 'Software Engineer',
    parent: '10',
    rawData: { id: '18', label: 'Software Engineer', parentId: '10' },
  },
  {
    value: '19',
    label: 'Network Administrator',
    searchValue: 'Network Administrator',
    parent: '10',
    rawData: { id: '19', label: 'Network Administrator', parentId: '10' },
  },
  {
    value: '20',
    label: 'Instructional Designer',
    searchValue: 'Instructional Designer',
    parent: '11',
    rawData: { id: '20', label: 'Instructional Designer', parentId: '11' },
  },
  {
    value: '21',
    label: 'Marketing Specialist',
    searchValue: 'Marketing Specialist',
    parent: '13',
    rawData: { id: '21', label: 'Marketing Specialist', parentId: '13' },
  },
  {
    value: '22',
    label: 'Sales Representative',
    searchValue: 'Sales Representative',
    parent: '14',
    rawData: { id: '22', label: 'Sales Representative', parentId: '14' },
  },
  {
    value: '23',
    label: 'Junior Accountant',
    searchValue: 'Junior Accountant',
    parent: '15',
    rawData: { id: '23', label: 'Junior Accountant', parentId: '15' },
  },
  {
    value: '24',
    label: 'Financial Analyst',
    searchValue: 'Financial Analyst',
    parent: '8',
    rawData: { id: '24', label: 'Financial Analyst', parentId: '8' },
  },
  {
    value: '25',
    label: 'Recruiter',
    searchValue: 'Recruiter',
    parent: '16',
    disabled: true,
    rawData: { id: '25', label: 'Recruiter', parentId: '16' },
  },
  {
    value: '26',
    label: 'HR Assistant',
    searchValue: 'HR Assistant',
    parent: '16',
    rawData: { id: '26', label: 'HR Assistant', parentId: '16' },
  },
  {
    value: '27',
    label: 'Logistics Coordinator',
    searchValue: 'Logistics Coordinator',
    parent: '9',
    rawData: { id: '27', label: 'Logistics Coordinator', parentId: '9' },
  },
  {
    value: '28',
    label: 'Office Administrator',
    searchValue: 'Office Administrator',
    parent: '9',
    rawData: { id: '28', label: 'Office Administrator', parentId: '9' },
  },
  {
    value: '29',
    label: 'Technical Support Specialist',
    searchValue: 'Technical Support Specialist',
    parent: '10',
    rawData: { id: '29', label: 'Technical Support Specialist', parentId: '10' },
  },
  {
    value: '30',
    label: 'Data Analyst',
    searchValue: 'Data Analyst',
    parent: '10',
    rawData: { id: '30', label: 'Data Analyst', parentId: '10' },
  },
  {
    value: '31',
    label: 'Senior Content Developer',
    searchValue: 'Senior Content Developer',
    parent: '12',
    rawData: { id: '31', label: 'Senior Content Developer', parentId: '12' },
  },
  {
    value: '32',
    label: 'Junior Content Developer',
    searchValue: 'Junior Content Developer',
    parent: '12',
    rawData: { id: '32', label: 'Junior Content Developer', parentId: '12' },
  },
  {
    value: '33',
    label: 'Instructional Coordinator',
    searchValue: 'Instructional Coordinator',
    parent: '11',
    rawData: { id: '33', label: 'Instructional Coordinator', parentId: '11' },
  },
  {
    value: '34',
    label: 'Graphic Designer',
    searchValue: 'Graphic Designer',
    parent: '11',
    disabled: true,
    rawData: { id: '34', label: 'Graphic Designer', parentId: '11' },
  },
  {
    value: '35',
    label: 'Marketing Coordinator',
    searchValue: 'Marketing Coordinator',
    parent: '13',
    disabled: true,
    rawData: { id: '35', label: 'Marketing Coordinator', parentId: '13' },
  },
  {
    value: '36',
    label: 'SEO Specialist',
    searchValue: 'SEO Specialist',
    parent: '13',
    rawData: { id: '36', label: 'SEO Specialist', parentId: '13' },
  },
  {
    value: '37',
    label: 'Copywriter',
    searchValue: 'Copywriter',
    parent: '13',
    rawData: { id: '37', label: 'Copywriter', parentId: '13' },
  },
  {
    value: '38',
    label: 'Social Media Manager',
    searchValue: 'Social Media Manager',
    parent: '13',
    rawData: { id: '38', label: 'Social Media Manager', parentId: '13' },
  },
  {
    value: '39',
    label: 'Digital Marketing Specialist',
    searchValue: 'Digital Marketing Specialist',
    parent: '13',
    rawData: { id: '39', label: 'Digital Marketing Specialist', parentId: '13' },
  },
  {
    value: '40',
    label: 'Sales Assistant',
    searchValue: 'Sales Assistant',
    parent: '14',
    rawData: { id: '40', label: 'Sales Assistant', parentId: '14' },
  },
  {
    value: '41',
    label: 'Customer Service Representative',
    searchValue: 'Customer Service Representative',
    parent: '14',
    rawData: { id: '41', label: 'Customer Service Representative', parentId: '14' },
  },
  {
    value: '42',
    label: 'Regional Sales Manager',
    searchValue: 'Regional Sales Manager',
    parent: '14',
    rawData: { id: '42', label: 'Regional Sales Manager', parentId: '14' },
  },
  {
    value: '43',
    label: 'Sales Trainer',
    searchValue: 'Sales Trainer',
    parent: '14',
    rawData: { id: '43', label: 'Sales Trainer', parentId: '14' },
  },
  {
    value: '44',
    label: 'Product Manager',
    searchValue: 'Product Manager',
    parent: '4',
    rawData: { id: '44', label: 'Product Manager', parentId: '4' },
  },
  {
    value: '45',
    label: 'Project Manager',
    searchValue: 'Project Manager',
    parent: '3',
    rawData: { id: '45', label: 'Project Manager', parentId: '3' },
  },
  {
    value: '46',
    label: 'Program Manager',
    searchValue: 'Program Manager',
    parent: '5',
    disabled: true,
    rawData: { id: '46', label: 'Program Manager', parentId: '5' },
  },
  {
    value: '47',
    label: 'Learning Specialist',
    searchValue: 'Learning Specialist',
    parent: '5',
    disabled: true,
    rawData: { id: '47', label: 'Learning Specialist', parentId: '5' },
  },
  {
    value: '48',
    label: 'Research Analyst',
    searchValue: 'Research Analyst',
    parent: '5',
    rawData: { id: '48', label: 'Research Analyst', parentId: '5' },
  },
  {
    value: '49',
    label: 'Educational Consultant',
    searchValue: 'Educational Consultant',
    parent: '5',
    rawData: { id: '49', label: 'Educational Consultant', parentId: '5' },
  },
  {
    value: '50',
    label: 'Compliance Officer',
    searchValue: 'Compliance Officer',
    parent: '3',
    rawData: { id: '50', label: 'Compliance Officer', parentId: '3' },
  },
  {
    value: '51',
    label: 'Legal Advisor',
    searchValue: 'Legal Advisor',
    parent: '2',
    rawData: { id: '51', label: 'Legal Advisor', parentId: '2' },
  },
  {
    value: '52',
    label: 'Internal Auditor',
    searchValue: 'Internal Auditor',
    parent: '2',
    rawData: { id: '52', label: 'Internal Auditor', parentId: '2' },
  },
  {
    value: '53',
    label: 'Budget Analyst',
    searchValue: 'Budget Analyst',
    parent: '8',
    rawData: { id: '53', label: 'Budget Analyst', parentId: '8' },
  },
  {
    value: '54',
    label: 'Accounts Payable Clerk',
    searchValue: 'Accounts Payable Clerk',
    parent: '8',
    rawData: { id: '54', label: 'Accounts Payable Clerk', parentId: '8' },
  },
  {
    value: '55',
    label: 'Accounts Receivable Clerk',
    searchValue: 'Accounts Receivable Clerk',
    parent: '8',
    rawData: { id: '55', label: 'Accounts Receivable Clerk', parentId: '8' },
  },
  {
    value: '56',
    label: 'Payroll Specialist',
    searchValue: 'Payroll Specialist',
    parent: '8',
    rawData: { id: '56', label: 'Payroll Specialist', parentId: '8' },
  },
  {
    value: '57',
    label: 'Benefits Coordinator',
    searchValue: 'Benefits Coordinator',
    parent: '16',
    rawData: { id: '57', label: 'Benefits Coordinator', parentId: '16' },
  },
  {
    value: '58',
    label: 'Training Coordinator',
    searchValue: 'Training Coordinator',
    parent: '16',
    rawData: { id: '58', label: 'Training Coordinator', parentId: '16' },
  },
  {
    value: '59',
    label: 'Operations Coordinator',
    searchValue: 'Operations Coordinator',
    parent: '9',
    rawData: { id: '59', label: 'Operations Coordinator', parentId: '9' },
  },
  {
    value: '60',
    label: 'Facilities Manager',
    searchValue: 'Facilities Manager',
    parent: '9',
    rawData: { id: '60', label: 'Facilities Manager', parentId: '9' },
  },
  {
    value: '61',
    label: 'Systems Administrator',
    searchValue: 'Systems Administrator',
    parent: '10',
    rawData: { id: '61', label: 'Systems Administrator', parentId: '10' },
  },
  {
    value: '62',
    label: 'DevOps Engineer',
    searchValue: 'DevOps Engineer',
    parent: '10',
    rawData: { id: '62', label: 'DevOps Engineer', parentId: '10' },
  },
  {
    value: '63',
    label: 'Quality Assurance Engineer',
    searchValue: 'Quality Assurance Engineer',
    parent: '10',
    rawData: { id: '63', label: 'Quality Assurance Engineer', parentId: '10' },
  },
  {
    value: '64',
    label: 'Technical Writer',
    searchValue: 'Technical Writer',
    parent: '10',
    rawData: { id: '64', label: 'Technical Writer', parentId: '10' },
  },
  {
    value: '65',
    label: 'Senior Software Engineer',
    searchValue: 'Senior Software Engineer',
    parent: '10',
    rawData: { id: '65', label: 'Senior Software Engineer', parentId: '10' },
  },
  {
    value: '66',
    label: 'Junior Software Engineer',
    searchValue: 'Junior Software Engineer',
    parent: '18',
    rawData: { id: '66', label: 'Junior Software Engineer', parentId: '18' },
  },
  {
    value: '67',
    label: 'IT Support Technician',
    searchValue: 'IT Support Technician',
    parent: '10',
    rawData: { id: '67', label: 'IT Support Technician', parentId: '10' },
  },
  {
    value: '68',
    label: 'Database Administrator',
    searchValue: 'Database Administrator',
    parent: '10',
    rawData: { id: '68', label: 'Database Administrator', parentId: '10' },
  },
  {
    value: '69',
    label: 'Web Developer',
    searchValue: 'Web Developer',
    parent: '10',
    rawData: { id: '69', label: 'Web Developer', parentId: '10' },
  },
  {
    value: '70',
    label: 'Instructional Technologist',
    searchValue: 'Instructional Technologist',
    parent: '11',
    rawData: { id: '70', label: 'Instructional Technologist', parentId: '11' },
  },
  {
    value: '71',
    label: 'E-learning Specialist',
    searchValue: 'E-learning Specialist',
    parent: '11',
    rawData: { id: '71', label: 'E-learning Specialist', parentId: '11' },
  },
  {
    value: '72',
    label: 'Content Strategist',
    searchValue: 'Content Strategist',
    parent: '12',
    rawData: { id: '72', label: 'Content Strategist', parentId: '12' },
  },
  {
    value: '73',
    label: 'Educational Content Writer',
    searchValue: 'Educational Content Writer',
    parent: '12',
    rawData: { id: '73', label: 'Educational Content Writer', parentId: '12' },
  },
  {
    value: '74',
    label: 'Video Producer',
    searchValue: 'Video Producer',
    parent: '12',
    rawData: { id: '74', label: 'Video Producer', parentId: '12' },
  },
  {
    value: '75',
    label: 'Multimedia Specialist',
    searchValue: 'Multimedia Specialist',
    parent: '12',
    rawData: { id: '75', label: 'Multimedia Specialist', parentId: '12' },
  },
  {
    value: '76',
    label: 'Senior Graphic Designer',
    searchValue: 'Senior Graphic Designer',
    parent: '11',
    rawData: { id: '76', label: 'Senior Graphic Designer', parentId: '11' },
  },
  {
    value: '77',
    label: 'Junior Graphic Designer',
    searchValue: 'Junior Graphic Designer',
    parent: '34',
    rawData: { id: '77', label: 'Junior Graphic Designer', parentId: '34' },
  },
  {
    value: '78',
    label: 'Communications Manager',
    searchValue: 'Communications Manager',
    parent: '6',
    rawData: { id: '78', label: 'Communications Manager', parentId: '6' },
  },
  {
    value: '79',
    label: 'Public Relations Specialist',
    searchValue: 'Public Relations Specialist',
    parent: '6',
    rawData: { id: '79', label: 'Public Relations Specialist', parentId: '6' },
  },
  {
    value: '80',
    label: 'Event Coordinator',
    searchValue: 'Event Coordinator',
    parent: '13',
    rawData: { id: '80', label: 'Event Coordinator', parentId: '13' },
  },
  {
    value: '81',
    label: 'Community Manager',
    searchValue: 'Community Manager',
    parent: '6',
    rawData: { id: '81', label: 'Community Manager', parentId: '6' },
  },
  {
    value: '82',
    label: 'Senior Sales Representative',
    searchValue: 'Senior Sales Representative',
    parent: '14',
    rawData: { id: '82', label: 'Senior Sales Representative', parentId: '14' },
  },
  {
    value: '83',
    label: 'Business Development Manager',
    searchValue: 'Business Development Manager',
    parent: '14',
    rawData: { id: '83', label: 'Business Development Manager', parentId: '14' },
  },
  {
    value: '84',
    label: 'Customer Success Manager',
    searchValue: 'Customer Success Manager',
    parent: '14',
    rawData: { id: '84', label: 'Customer Success Manager', parentId: '14' },
  },
  {
    value: '85',
    label: 'Inside Sales Representative',
    searchValue: 'Inside Sales Representative',
    parent: '14',
    rawData: { id: '85', label: 'Inside Sales Representative', parentId: '14' },
  },
  {
    value: '86',
    label: 'Outside Sales Representative',
    searchValue: 'Outside Sales Representative',
    parent: '14',
    rawData: { id: '86', label: 'Outside Sales Representative', parentId: '14' },
  },
  {
    value: '87',
    label: 'Sales Operations Analyst',
    searchValue: 'Sales Operations Analyst',
    parent: '14',
    rawData: { id: '87', label: 'Sales Operations Analyst', parentId: '14' },
  },
  {
    value: '88',
    label: 'Territory Sales Manager',
    searchValue: 'Territory Sales Manager',
    parent: '14',
    rawData: { id: '88', label: 'Territory Sales Manager', parentId: '14' },
  },
  {
    value: '89',
    label: 'Partnership Manager',
    searchValue: 'Partnership Manager',
    parent: '14',
    rawData: { id: '89', label: 'Partnership Manager', parentId: '14' },
  },
  {
    value: '90',
    label: 'Corporate Trainer',
    searchValue: 'Corporate Trainer',
    parent: '14',
    rawData: { id: '90', label: 'Corporate Trainer', parentId: '14' },
  },
  {
    value: '91',
    label: 'Product Marketing Manager',
    searchValue: 'Product Marketing Manager',
    parent: '6',
    rawData: { id: '91', label: 'Product Marketing Manager', parentId: '6' },
  },
  {
    value: '92',
    label: 'User Experience Researcher',
    searchValue: 'User Experience Researcher',
    parent: '6',
    rawData: { id: '92', label: 'User Experience Researcher', parentId: '6' },
  },
  {
    value: '93',
    label: 'Customer Support Manager',
    searchValue: 'Customer Support Manager',
    parent: '14',
    rawData: { id: '93', label: 'Customer Support Manager', parentId: '14' },
  },
  {
    value: '94',
    label: 'Customer Support Specialist',
    searchValue: 'Customer Support Specialist',
    parent: '93',
    rawData: { id: '94', label: 'Customer Support Specialist', parentId: '93' },
  },
  {
    value: '95',
    label: 'Customer Support Assistant',
    searchValue: 'Customer Support Assistant',
    parent: '93',
    rawData: { id: '95', label: 'Customer Support Assistant', parentId: '93' },
  },
  {
    value: '96',
    label: 'Business Analyst',
    searchValue: 'Business Analyst',
    parent: '3',
    rawData: { id: '96', label: 'Business Analyst', parentId: '3' },
  },
  {
    value: '97',
    label: 'Senior Project Manager',
    searchValue: 'Senior Project Manager',
    parent: '45',
    rawData: { id: '97', label: 'Senior Project Manager', parentId: '45' },
  },
  {
    value: '98',
    label: 'Junior Project Manager',
    searchValue: 'Junior Project Manager',
    parent: '45',
    rawData: { id: '98', label: 'Junior Project Manager', parentId: '45' },
  },
  {
    value: '99',
    label: 'Project Coordinator',
    searchValue: 'Project Coordinator',
    parent: '45',
    rawData: { id: '99', label: 'Project Coordinator', parentId: '45' },
  },
  {
    value: '100',
    label: 'Operations Analyst',
    searchValue: 'Operations Analyst',
    parent: '3',
    rawData: { id: '100', label: 'Operations Analyst', parentId: '3' },
  },
];
```

# SelectMultipleAsTreeLayout

## Overview

The `SelectMultipleAsTreeLayout` component extends the functionality of the Ant Design Tree Select component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tree Select component.

## Props

| Prop                      | Type                                                                                              | Default              | Description                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| `className`               | `string`                                                                                          | -                    | Custom CSS class for styling the component.                                   |
| `data`                    | `Leaf<Model>[]`                                                                                   | -                    | The array of leaf nodes that make up the tree data.                           |
| `value`                   | `string[]`                                                                                        | -                    | The keys of the currently selected nodes.                                     |
| `onChange`                | `(keys: string[], options: Array<Omit<Leaf<Model>, 'disabled' \| 'hidden' \| 'parent'>>) => void` | -                    | Callback function triggered when a node's selected state changes.             |
| `loading`                 | `boolean`                                                                                         | -                    | Indicates whether the tree is in a loading state.                             |
| `notFoundContent`         | `ReactNode`                                                                                       | -                    | Content displayed when no data is found.                                      |
| `allowClear`              | `boolean`                                                                                         | `true`               | If true, allows the user to clear the selection.                              |
| `placeholder`             | `string`                                                                                          | -                    | Placeholder text displayed when no nodes are selected.                        |
| `disabled`                | `boolean`                                                                                         | -                    | If true, disables the entire tree.                                            |
| `autoClearSearchValue`    | `boolean`                                                                                         | `true`               | If true, automatically clears the search value when a node is selected.       |
| `direction`               | `'ltr' \| 'rtl'`                                                                                  | -                    | Layout direction (either 'ltr' for left-to-right or 'rtl' for right-to-left). |
| `onDropdownVisibleChange` | `(open: boolean) => void`                                                                         | -                    | Callback function triggered when the dropdown's visibility changes.           |
| `onSearch`                | `(searchValue: string) => void`                                                                   | -                    | Callback function triggered when a search is performed.                       |
| `open`                    | `boolean`                                                                                         | -                    | Whether the dropdown is open or not.                                          |
| `searchValue`             | `string`                                                                                          | -                    | The current search input value.                                               |
| `readOnly`                | `boolean`                                                                                         | `false`              | If true, the tree is read-only and cannot be changed by the user.             |
| `valueVariant`            | `'controlled-state' \| 'uncontrolled-state'`                                                      | `'controlled-state'` | Determines if the tree is in a controlled or uncontrolled state.              |
| `openVariant`             | `'controlled-state' \| 'uncontrolled-state'`                                                      | `'controlled-state'` | Determines if the open state is in a controlled or uncontrolled state.        |
| `size`                    | `string`                                                                                          | -                    | The size of the input box (e.g., 'small', 'middle', 'large').                 |
| `showSearch`              | `boolean`                                                                                         | `true`               | If true, a search input is shown for filtering tree nodes.                    |
| `treeCheckable`           | `boolean`                                                                                         | `false`              | If true, allows for checking multiple tree nodes.                             |
| `filterTreeNode`          | `(inputValue: string, node: TreeNode) => boolean`                                                 | `baseFilterOption`   | Custom function to filter tree nodes based on search input.                   |
| `showCheckedStrategy`     | `string`                                                                                          | `'SHOW_PARENT'`      | Strategy for showing selected nodes (e.g., 'SHOW_PARENT').                    |

## Usage

```typescript
const Basic = () => {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

  return (
    <div>
      <p>State: {selectedKey}</p>
      <SelectMultipleAsTreeLayout data={data} value={selectedKey} onChange={setSelectedKey} />
    </div>
  );
};
export interface Department {
  id: string;
  label: string;
  parentId: string | null;
}

export const data: Leaf<Department>[] = [
  {
    value: '1',
    label: 'CEO',
    searchValue: 'CEO',
    parent: null,
    rawData: { id: '1', label: 'CEO', parentId: null },
  },
  {
    value: '2',
    label: 'CFO',
    searchValue: 'CFO',
    parent: '1',
    rawData: { id: '2', label: 'CFO', parentId: '1' },
  },
  {
    value: '3',
    label: 'COO',
    searchValue: 'COO',
    parent: '1',
    rawData: { id: '3', label: 'COO', parentId: '1' },
  },
  {
    value: '4',
    label: 'CTO',
    searchValue: 'CTO',
    parent: '1',
    rawData: { id: '4', label: 'CTO', parentId: '1' },
  },
  {
    value: '5',
    label: 'Head of Academics',
    searchValue: 'Head of Academics',
    parent: '1',
    disabled: true,
    rawData: { id: '5', label: 'Head of Academics', parentId: '1' },
  },
  {
    value: '6',
    label: 'Head of Marketing',
    searchValue: 'Head of Marketing',
    parent: '1',
    disabled: true,
    rawData: { id: '6', label: 'Head of Marketing', parentId: '1' },
  },
  {
    value: '7',
    label: 'Head of Sales',
    searchValue: 'Head of Sales',
    parent: '1',
    rawData: { id: '7', label: 'Head of Sales', parentId: '1' },
  },
  {
    value: '8',
    label: 'Finance Manager',
    searchValue: 'Finance Manager',
    parent: '2',
    rawData: { id: '8', label: 'Finance Manager', parentId: '2' },
  },
  {
    value: '9',
    label: 'Operations Manager',
    searchValue: 'Operations Manager',
    parent: '3',
    rawData: { id: '9', label: 'Operations Manager', parentId: '3' },
  },
  {
    value: '10',
    label: 'IT Manager',
    searchValue: 'IT Manager',
    parent: '4',
    rawData: { id: '10', label: 'IT Manager', parentId: '4' },
  },
  {
    value: '11',
    label: 'Curriculum Director',
    searchValue: 'Curriculum Director',
    parent: '5',
    rawData: { id: '11', label: 'Curriculum Director', parentId: '5' },
  },
  {
    value: '12',
    label: 'Content Developer',
    searchValue: 'Content Developer',
    parent: '5',
    rawData: { id: '12', label: 'Content Developer', parentId: '5' },
  },
  {
    value: '13',
    label: 'Marketing Manager',
    searchValue: 'Marketing Manager',
    parent: '6',
    rawData: { id: '13', label: 'Marketing Manager', parentId: '6' },
  },
  {
    value: '14',
    label: 'Sales Manager',
    searchValue: 'Sales Manager',
    parent: '7',
    rawData: { id: '14', label: 'Sales Manager', parentId: '7' },
  },
  {
    value: '15',
    label: 'Accountant',
    searchValue: 'Accountant',
    parent: '8',
    rawData: { id: '15', label: 'Accountant', parentId: '8' },
  },
  {
    value: '16',
    label: 'HR Manager',
    searchValue: 'HR Manager',
    parent: '3',
    rawData: { id: '16', label: 'HR Manager', parentId: '3' },
  },
  {
    value: '17',
    label: 'Support Staff',
    searchValue: 'Support Staff',
    parent: '9',
    disabled: true,
    rawData: { id: '17', label: 'Support Staff', parentId: '9' },
  },
  {
    value: '18',
    label: 'Software Engineer',
    searchValue: 'Software Engineer',
    parent: '10',
    rawData: { id: '18', label: 'Software Engineer', parentId: '10' },
  },
  {
    value: '19',
    label: 'Network Administrator',
    searchValue: 'Network Administrator',
    parent: '10',
    rawData: { id: '19', label: 'Network Administrator', parentId: '10' },
  },
  {
    value: '20',
    label: 'Instructional Designer',
    searchValue: 'Instructional Designer',
    parent: '11',
    rawData: { id: '20', label: 'Instructional Designer', parentId: '11' },
  },
  {
    value: '21',
    label: 'Marketing Specialist',
    searchValue: 'Marketing Specialist',
    parent: '13',
    rawData: { id: '21', label: 'Marketing Specialist', parentId: '13' },
  },
  {
    value: '22',
    label: 'Sales Representative',
    searchValue: 'Sales Representative',
    parent: '14',
    rawData: { id: '22', label: 'Sales Representative', parentId: '14' },
  },
  {
    value: '23',
    label: 'Junior Accountant',
    searchValue: 'Junior Accountant',
    parent: '15',
    rawData: { id: '23', label: 'Junior Accountant', parentId: '15' },
  },
  {
    value: '24',
    label: 'Financial Analyst',
    searchValue: 'Financial Analyst',
    parent: '8',
    rawData: { id: '24', label: 'Financial Analyst', parentId: '8' },
  },
  {
    value: '25',
    label: 'Recruiter',
    searchValue: 'Recruiter',
    parent: '16',
    disabled: true,
    rawData: { id: '25', label: 'Recruiter', parentId: '16' },
  },
  {
    value: '26',
    label: 'HR Assistant',
    searchValue: 'HR Assistant',
    parent: '16',
    rawData: { id: '26', label: 'HR Assistant', parentId: '16' },
  },
  {
    value: '27',
    label: 'Logistics Coordinator',
    searchValue: 'Logistics Coordinator',
    parent: '9',
    rawData: { id: '27', label: 'Logistics Coordinator', parentId: '9' },
  },
  {
    value: '28',
    label: 'Office Administrator',
    searchValue: 'Office Administrator',
    parent: '9',
    rawData: { id: '28', label: 'Office Administrator', parentId: '9' },
  },
  {
    value: '29',
    label: 'Technical Support Specialist',
    searchValue: 'Technical Support Specialist',
    parent: '10',
    rawData: { id: '29', label: 'Technical Support Specialist', parentId: '10' },
  },
  {
    value: '30',
    label: 'Data Analyst',
    searchValue: 'Data Analyst',
    parent: '10',
    rawData: { id: '30', label: 'Data Analyst', parentId: '10' },
  },
  {
    value: '31',
    label: 'Senior Content Developer',
    searchValue: 'Senior Content Developer',
    parent: '12',
    rawData: { id: '31', label: 'Senior Content Developer', parentId: '12' },
  },
  {
    value: '32',
    label: 'Junior Content Developer',
    searchValue: 'Junior Content Developer',
    parent: '12',
    rawData: { id: '32', label: 'Junior Content Developer', parentId: '12' },
  },
  {
    value: '33',
    label: 'Instructional Coordinator',
    searchValue: 'Instructional Coordinator',
    parent: '11',
    rawData: { id: '33', label: 'Instructional Coordinator', parentId: '11' },
  },
  {
    value: '34',
    label: 'Graphic Designer',
    searchValue: 'Graphic Designer',
    parent: '11',
    disabled: true,
    rawData: { id: '34', label: 'Graphic Designer', parentId: '11' },
  },
  {
    value: '35',
    label: 'Marketing Coordinator',
    searchValue: 'Marketing Coordinator',
    parent: '13',
    disabled: true,
    rawData: { id: '35', label: 'Marketing Coordinator', parentId: '13' },
  },
  {
    value: '36',
    label: 'SEO Specialist',
    searchValue: 'SEO Specialist',
    parent: '13',
    rawData: { id: '36', label: 'SEO Specialist', parentId: '13' },
  },
  {
    value: '37',
    label: 'Copywriter',
    searchValue: 'Copywriter',
    parent: '13',
    rawData: { id: '37', label: 'Copywriter', parentId: '13' },
  },
  {
    value: '38',
    label: 'Social Media Manager',
    searchValue: 'Social Media Manager',
    parent: '13',
    rawData: { id: '38', label: 'Social Media Manager', parentId: '13' },
  },
  {
    value: '39',
    label: 'Digital Marketing Specialist',
    searchValue: 'Digital Marketing Specialist',
    parent: '13',
    rawData: { id: '39', label: 'Digital Marketing Specialist', parentId: '13' },
  },
  {
    value: '40',
    label: 'Sales Assistant',
    searchValue: 'Sales Assistant',
    parent: '14',
    rawData: { id: '40', label: 'Sales Assistant', parentId: '14' },
  },
  {
    value: '41',
    label: 'Customer Service Representative',
    searchValue: 'Customer Service Representative',
    parent: '14',
    rawData: { id: '41', label: 'Customer Service Representative', parentId: '14' },
  },
  {
    value: '42',
    label: 'Regional Sales Manager',
    searchValue: 'Regional Sales Manager',
    parent: '14',
    rawData: { id: '42', label: 'Regional Sales Manager', parentId: '14' },
  },
  {
    value: '43',
    label: 'Sales Trainer',
    searchValue: 'Sales Trainer',
    parent: '14',
    rawData: { id: '43', label: 'Sales Trainer', parentId: '14' },
  },
  {
    value: '44',
    label: 'Product Manager',
    searchValue: 'Product Manager',
    parent: '4',
    rawData: { id: '44', label: 'Product Manager', parentId: '4' },
  },
  {
    value: '45',
    label: 'Project Manager',
    searchValue: 'Project Manager',
    parent: '3',
    rawData: { id: '45', label: 'Project Manager', parentId: '3' },
  },
  {
    value: '46',
    label: 'Program Manager',
    searchValue: 'Program Manager',
    parent: '5',
    disabled: true,
    rawData: { id: '46', label: 'Program Manager', parentId: '5' },
  },
  {
    value: '47',
    label: 'Learning Specialist',
    searchValue: 'Learning Specialist',
    parent: '5',
    disabled: true,
    rawData: { id: '47', label: 'Learning Specialist', parentId: '5' },
  },
  {
    value: '48',
    label: 'Research Analyst',
    searchValue: 'Research Analyst',
    parent: '5',
    rawData: { id: '48', label: 'Research Analyst', parentId: '5' },
  },
  {
    value: '49',
    label: 'Educational Consultant',
    searchValue: 'Educational Consultant',
    parent: '5',
    rawData: { id: '49', label: 'Educational Consultant', parentId: '5' },
  },
  {
    value: '50',
    label: 'Compliance Officer',
    searchValue: 'Compliance Officer',
    parent: '3',
    rawData: { id: '50', label: 'Compliance Officer', parentId: '3' },
  },
  {
    value: '51',
    label: 'Legal Advisor',
    searchValue: 'Legal Advisor',
    parent: '2',
    rawData: { id: '51', label: 'Legal Advisor', parentId: '2' },
  },
  {
    value: '52',
    label: 'Internal Auditor',
    searchValue: 'Internal Auditor',
    parent: '2',
    rawData: { id: '52', label: 'Internal Auditor', parentId: '2' },
  },
  {
    value: '53',
    label: 'Budget Analyst',
    searchValue: 'Budget Analyst',
    parent: '8',
    rawData: { id: '53', label: 'Budget Analyst', parentId: '8' },
  },
  {
    value: '54',
    label: 'Accounts Payable Clerk',
    searchValue: 'Accounts Payable Clerk',
    parent: '8',
    rawData: { id: '54', label: 'Accounts Payable Clerk', parentId: '8' },
  },
  {
    value: '55',
    label: 'Accounts Receivable Clerk',
    searchValue: 'Accounts Receivable Clerk',
    parent: '8',
    rawData: { id: '55', label: 'Accounts Receivable Clerk', parentId: '8' },
  },
  {
    value: '56',
    label: 'Payroll Specialist',
    searchValue: 'Payroll Specialist',
    parent: '8',
    rawData: { id: '56', label: 'Payroll Specialist', parentId: '8' },
  },
  {
    value: '57',
    label: 'Benefits Coordinator',
    searchValue: 'Benefits Coordinator',
    parent: '16',
    rawData: { id: '57', label: 'Benefits Coordinator', parentId: '16' },
  },
  {
    value: '58',
    label: 'Training Coordinator',
    searchValue: 'Training Coordinator',
    parent: '16',
    rawData: { id: '58', label: 'Training Coordinator', parentId: '16' },
  },
  {
    value: '59',
    label: 'Operations Coordinator',
    searchValue: 'Operations Coordinator',
    parent: '9',
    rawData: { id: '59', label: 'Operations Coordinator', parentId: '9' },
  },
  {
    value: '60',
    label: 'Facilities Manager',
    searchValue: 'Facilities Manager',
    parent: '9',
    rawData: { id: '60', label: 'Facilities Manager', parentId: '9' },
  },
  {
    value: '61',
    label: 'Systems Administrator',
    searchValue: 'Systems Administrator',
    parent: '10',
    rawData: { id: '61', label: 'Systems Administrator', parentId: '10' },
  },
  {
    value: '62',
    label: 'DevOps Engineer',
    searchValue: 'DevOps Engineer',
    parent: '10',
    rawData: { id: '62', label: 'DevOps Engineer', parentId: '10' },
  },
  {
    value: '63',
    label: 'Quality Assurance Engineer',
    searchValue: 'Quality Assurance Engineer',
    parent: '10',
    rawData: { id: '63', label: 'Quality Assurance Engineer', parentId: '10' },
  },
  {
    value: '64',
    label: 'Technical Writer',
    searchValue: 'Technical Writer',
    parent: '10',
    rawData: { id: '64', label: 'Technical Writer', parentId: '10' },
  },
  {
    value: '65',
    label: 'Senior Software Engineer',
    searchValue: 'Senior Software Engineer',
    parent: '10',
    rawData: { id: '65', label: 'Senior Software Engineer', parentId: '10' },
  },
  {
    value: '66',
    label: 'Junior Software Engineer',
    searchValue: 'Junior Software Engineer',
    parent: '18',
    rawData: { id: '66', label: 'Junior Software Engineer', parentId: '18' },
  },
  {
    value: '67',
    label: 'IT Support Technician',
    searchValue: 'IT Support Technician',
    parent: '10',
    rawData: { id: '67', label: 'IT Support Technician', parentId: '10' },
  },
  {
    value: '68',
    label: 'Database Administrator',
    searchValue: 'Database Administrator',
    parent: '10',
    rawData: { id: '68', label: 'Database Administrator', parentId: '10' },
  },
  {
    value: '69',
    label: 'Web Developer',
    searchValue: 'Web Developer',
    parent: '10',
    rawData: { id: '69', label: 'Web Developer', parentId: '10' },
  },
  {
    value: '70',
    label: 'Instructional Technologist',
    searchValue: 'Instructional Technologist',
    parent: '11',
    rawData: { id: '70', label: 'Instructional Technologist', parentId: '11' },
  },
  {
    value: '71',
    label: 'E-learning Specialist',
    searchValue: 'E-learning Specialist',
    parent: '11',
    rawData: { id: '71', label: 'E-learning Specialist', parentId: '11' },
  },
  {
    value: '72',
    label: 'Content Strategist',
    searchValue: 'Content Strategist',
    parent: '12',
    rawData: { id: '72', label: 'Content Strategist', parentId: '12' },
  },
  {
    value: '73',
    label: 'Educational Content Writer',
    searchValue: 'Educational Content Writer',
    parent: '12',
    rawData: { id: '73', label: 'Educational Content Writer', parentId: '12' },
  },
  {
    value: '74',
    label: 'Video Producer',
    searchValue: 'Video Producer',
    parent: '12',
    rawData: { id: '74', label: 'Video Producer', parentId: '12' },
  },
  {
    value: '75',
    label: 'Multimedia Specialist',
    searchValue: 'Multimedia Specialist',
    parent: '12',
    rawData: { id: '75', label: 'Multimedia Specialist', parentId: '12' },
  },
  {
    value: '76',
    label: 'Senior Graphic Designer',
    searchValue: 'Senior Graphic Designer',
    parent: '11',
    rawData: { id: '76', label: 'Senior Graphic Designer', parentId: '11' },
  },
  {
    value: '77',
    label: 'Junior Graphic Designer',
    searchValue: 'Junior Graphic Designer',
    parent: '34',
    rawData: { id: '77', label: 'Junior Graphic Designer', parentId: '34' },
  },
  {
    value: '78',
    label: 'Communications Manager',
    searchValue: 'Communications Manager',
    parent: '6',
    rawData: { id: '78', label: 'Communications Manager', parentId: '6' },
  },
  {
    value: '79',
    label: 'Public Relations Specialist',
    searchValue: 'Public Relations Specialist',
    parent: '6',
    rawData: { id: '79', label: 'Public Relations Specialist', parentId: '6' },
  },
  {
    value: '80',
    label: 'Event Coordinator',
    searchValue: 'Event Coordinator',
    parent: '13',
    rawData: { id: '80', label: 'Event Coordinator', parentId: '13' },
  },
  {
    value: '81',
    label: 'Community Manager',
    searchValue: 'Community Manager',
    parent: '6',
    rawData: { id: '81', label: 'Community Manager', parentId: '6' },
  },
  {
    value: '82',
    label: 'Senior Sales Representative',
    searchValue: 'Senior Sales Representative',
    parent: '14',
    rawData: { id: '82', label: 'Senior Sales Representative', parentId: '14' },
  },
  {
    value: '83',
    label: 'Business Development Manager',
    searchValue: 'Business Development Manager',
    parent: '14',
    rawData: { id: '83', label: 'Business Development Manager', parentId: '14' },
  },
  {
    value: '84',
    label: 'Customer Success Manager',
    searchValue: 'Customer Success Manager',
    parent: '14',
    rawData: { id: '84', label: 'Customer Success Manager', parentId: '14' },
  },
  {
    value: '85',
    label: 'Inside Sales Representative',
    searchValue: 'Inside Sales Representative',
    parent: '14',
    rawData: { id: '85', label: 'Inside Sales Representative', parentId: '14' },
  },
  {
    value: '86',
    label: 'Outside Sales Representative',
    searchValue: 'Outside Sales Representative',
    parent: '14',
    rawData: { id: '86', label: 'Outside Sales Representative', parentId: '14' },
  },
  {
    value: '87',
    label: 'Sales Operations Analyst',
    searchValue: 'Sales Operations Analyst',
    parent: '14',
    rawData: { id: '87', label: 'Sales Operations Analyst', parentId: '14' },
  },
  {
    value: '88',
    label: 'Territory Sales Manager',
    searchValue: 'Territory Sales Manager',
    parent: '14',
    rawData: { id: '88', label: 'Territory Sales Manager', parentId: '14' },
  },
  {
    value: '89',
    label: 'Partnership Manager',
    searchValue: 'Partnership Manager',
    parent: '14',
    rawData: { id: '89', label: 'Partnership Manager', parentId: '14' },
  },
  {
    value: '90',
    label: 'Corporate Trainer',
    searchValue: 'Corporate Trainer',
    parent: '14',
    rawData: { id: '90', label: 'Corporate Trainer', parentId: '14' },
  },
  {
    value: '91',
    label: 'Product Marketing Manager',
    searchValue: 'Product Marketing Manager',
    parent: '6',
    rawData: { id: '91', label: 'Product Marketing Manager', parentId: '6' },
  },
  {
    value: '92',
    label: 'User Experience Researcher',
    searchValue: 'User Experience Researcher',
    parent: '6',
    rawData: { id: '92', label: 'User Experience Researcher', parentId: '6' },
  },
  {
    value: '93',
    label: 'Customer Support Manager',
    searchValue: 'Customer Support Manager',
    parent: '14',
    rawData: { id: '93', label: 'Customer Support Manager', parentId: '14' },
  },
  {
    value: '94',
    label: 'Customer Support Specialist',
    searchValue: 'Customer Support Specialist',
    parent: '93',
    rawData: { id: '94', label: 'Customer Support Specialist', parentId: '93' },
  },
  {
    value: '95',
    label: 'Customer Support Assistant',
    searchValue: 'Customer Support Assistant',
    parent: '93',
    rawData: { id: '95', label: 'Customer Support Assistant', parentId: '93' },
  },
  {
    value: '96',
    label: 'Business Analyst',
    searchValue: 'Business Analyst',
    parent: '3',
    rawData: { id: '96', label: 'Business Analyst', parentId: '3' },
  },
  {
    value: '97',
    label: 'Senior Project Manager',
    searchValue: 'Senior Project Manager',
    parent: '45',
    rawData: { id: '97', label: 'Senior Project Manager', parentId: '45' },
  },
  {
    value: '98',
    label: 'Junior Project Manager',
    searchValue: 'Junior Project Manager',
    parent: '45',
    rawData: { id: '98', label: 'Junior Project Manager', parentId: '45' },
  },
  {
    value: '99',
    label: 'Project Coordinator',
    searchValue: 'Project Coordinator',
    parent: '45',
    rawData: { id: '99', label: 'Project Coordinator', parentId: '45' },
  },
  {
    value: '100',
    label: 'Operations Analyst',
    searchValue: 'Operations Analyst',
    parent: '3',
    rawData: { id: '100', label: 'Operations Analyst', parentId: '3' },
  },
];
```
