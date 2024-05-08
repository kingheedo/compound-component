import { PropsWithChildren } from 'react'
import './index.css';

interface IBackDropProps {
    onClose: () => void;
}

const BackDrop = ({ onClose, children }: IBackDropProps & PropsWithChildren) => {
    return (
        <div onClick={() => onClose()} className='backdrop'>
            {children}
        </div>
    )
}

export default BackDrop