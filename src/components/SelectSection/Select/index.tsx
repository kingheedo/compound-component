import React from 'react';
import './index.css';
import Dropdown from '@components/DropDown';

interface ISelectProps {
    trigger: React.ReactElement;
    list: string[];
    onChange: (val: string) => void;
}

const Select = ({
    trigger,
    list,
    onChange
}: ISelectProps) => {
    return (
        <div className='select'>
            <Dropdown onChange={onChange}>
                <Dropdown.Trigger as={trigger} />
                <Dropdown.Modal list={list} />
            </Dropdown>
        </div>
    )
}

export default Select