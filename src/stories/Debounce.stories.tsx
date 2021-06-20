import React from 'react';
import { Story, Meta } from '@storybook/react';
import { debounce as lodashDebounce } from 'lodash'
import { debounce } from '../debounce'


export default {
  title: 'Example/Debounce',
  argTypes: { onChange: { action: {} } },
} as Meta;

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input: React.FC<InputProps> = ({ value, onChange }) => <div>
  <input placeholder="Entrez du texte" onChange={onChange} />
  <p>Valeur : {value}</p>
</div>

export const Default: Story = () => {
  const [value, setValue] = React.useState<string>('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <Input value={value} onChange={onChange} />
}

export const WithLodashDebounce: Story = () => {
  const [value, setValue] = React.useState<string>('')
  const debouncedOnChange =
    lodashDebounce(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
      }, 1000)

  return <Input value={value} onChange={debouncedOnChange} />
}

export const WithCustomDebounce: Story = () => {
  const [value, setValue] = React.useState<string>('')
  const debouncedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(
      () => {
        setValue(event.target.value)
      }, 1000
    )
  }

  return <Input value={value} onChange={debouncedOnChange} />
}
