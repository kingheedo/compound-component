import { PropsWithChildren, ReactElement, createContext, useContext, useEffect, useMemo, useState } from 'react'
import BackDrop from '../BackDrop';
import './index.css';

interface IDropDownContextProps {
    selected: string
    open: boolean,
    onChangeOpen: () => void,
    onChangeSelect: (payload: string) => void;
}

const DropDownContext = createContext<IDropDownContextProps>({
    selected: '',
    open: false,
    onChangeOpen: () => null,
    onChangeSelect: () => null
})

interface IDropDownProps {
    value?: string;
    onChange: (select: string) => void;
}

const Dropdown = ({ value, onChange, children }: IDropDownProps & PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const onChangeValue = (payload: string) => {
        onChange(payload);
        //다중 선택
        // if (!value.includes(payload)) {
        //     setValue([...value, payload])
        // } else {
        //     setValue([...value].filter(val => val !== payload))
        // }
    };

    const dropdown: IDropDownContextProps = useMemo(() => ({
        selected: value || '',
        open,
        onChangeOpen: () => setOpen(open => !open),
        onChangeSelect: (val) => {
            onChangeValue(val);
            setOpen(open => !open);
        }
    }), [value, open]);

    return (
        <DropDownContext.Provider value={dropdown}>
            {dropdown.open && (<BackDrop onClose={() => dropdown.onChangeOpen()} />)}
            <div className='dropdown'>
                {children}
            </div>
        </DropDownContext.Provider>
    )
}
const Trigger = ({
    as
}: {
    as: ReactElement
}) => {
    const dropdown = useDropDown();
    return (
        <div className='dropdown-trigger-wrap' onClick={() => dropdown.onChangeOpen()}>
            {as}
        </div>
    );
}

const Modal = ({ list }: { list: string[] }) => {
    const dropdown = useDropDown();
    const [triggerHeight, setTriggerHeight] = useState<number>(0);

    const onClickButton = (val: string) => {
        dropdown.onChangeSelect(val);
    }

    useEffect(() => {
        const dropdownEl = document.querySelector('.dropdown');
        if (dropdownEl) {
            setTriggerHeight(dropdownEl.getBoundingClientRect().height + 10)
        }
    }, [])

    return (
        dropdown.open && (
            <ul
                style={{
                    top: triggerHeight
                }}
                onClick={e => e.stopPropagation()}
                className='dropdown-list-wrap'>
                {list.map(val => (
                    <li key={val}>
                        <button onClick={() => onClickButton(val)}>
                            {val}
                        </button>
                    </li>
                ))}
            </ul>
        )
    )
}
const useDropDown = () => useContext(DropDownContext);

Dropdown.Trigger = Trigger;
Dropdown.Modal = Modal;


export default Dropdown