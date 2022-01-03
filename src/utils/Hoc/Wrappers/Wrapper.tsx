//********** IMPORTS ************* */
import React from 'react';

//******************************** */
interface Props {
    class?: string | undefined;
    clicked?: () => void;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    dataType?: string;
    ariaLabel?: string;
    id?: string;
}
const Wrapper: React.FC<Props> = (props) => {
    return (
        <div
            className={props.class!}
            id={props.id!}
            onClick={props.clicked!}
            style={props.style!}
            data-type={props.dataType}
            aria-label={props.ariaLabel!}
        >
            {props.children}
        </div>
    );
};

export default Wrapper;
