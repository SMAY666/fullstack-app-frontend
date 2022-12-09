import React from 'react';


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    state: string;
    setState: any;
    additionalOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export default function InputString({state, setState, additionalOnChange, ...props}: Props) {
    return (
        <input
            {...props}
            value={state}
            onChange={(event) => {
                setState(event.target.value);

                if (additionalOnChange) {
                    additionalOnChange(event);
                }
            }}
        />
    )
}
