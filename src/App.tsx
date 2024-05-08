import './App.css'
import Select from '@components/Select'
import { useState } from 'react';

const App = () => {
  const [select, setSelect] = useState('');
  return (
    <div className='app'>
      <strong>
        {select}
      </strong>
      <Select
        onChange={(val: string) => setSelect(val)}
        trigger={<SelectButton />}
        list={['Next.js', 'Remix', 'Gatsby', 'Relay']}
      />
    </div>
  )
}

const SelectButton = () => {
  return (
    <button className='select-btn' type='button'>
      버튼
    </button>
  )
}

export default App
