import React from 'react';
import { Story, Meta } from '@storybook/react';
import { debounce as lodashDebounce } from 'lodash'
import { debounce } from '../debounce'

export default {
  title: 'Example/Debounce',
  argTypes: { onChange: { action: {} } },
} as Meta;

interface InputProps {
  count: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input: React.FC<InputProps> = ({ count, value, onChange }) => <div>
  <input placeholder="Entrez du texte" onChange={onChange} />
  <p>Valeur : {value}</p>
  <p>Nombre d'évenements : {count}</p>
</div>

export const Default: Story = () => {
  const [count, setCount] = React.useState(0)
  const [value, setValue] = React.useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setCount(count + 1)
  }

  return <Input value={value} count={count} onChange={onChange} />
}

export const WithLodashDebounce: Story = () => {
  const [count, setCount] = React.useState(0)
  const [value, setValue] = React.useState('')

  const debouncedOnChange =
    lodashDebounce(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        setCount(count + 1)
      }, 1000)

  return <Input value={value} count={count} onChange={debouncedOnChange} />
}

export const WithCustomDebounce: Story = () => {
  const [count, setCount] = React.useState(0)
  const [value, setValue] = React.useState<string>('')
  const debouncedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(
      () => {
        setValue(event.target.value)
        setCount(count + 1)
      }, 1000
    )
  }

  return <Input value={value} count={count} onChange={debouncedOnChange} />
}
