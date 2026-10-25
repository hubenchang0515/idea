import React from "react"

export interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

export default function Card(props:CardProps) {
    return (
        <div className={props.className || 'glass rounded-2xl p-3'}>
            {props.children}
        </div>
    )
}
