import { useState } from 'react';
import Select from './Select';

const SelectButton = () => {
  return (
    <button className='select-btn' type='button'>
      버튼
    </button>
  )
}

const SelectSection = () => {
  const [select, setSelect] = useState('');
  return (
    <section className='dropdown-select'>
        <strong>
        {select}
        </strong>
        <Select
          onChange={(val: string) => setSelect(val)}
          trigger={<SelectButton />}
          list={['Next.js', 'Remix', 'Gatsby', 'Relay']}
        />
      </section>
  )
}

export default SelectSection