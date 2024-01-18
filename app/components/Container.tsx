'use client'
import React from 'react'


interface ContinerProps {
    children: React.ReactNode
}


const Container: React.FC<ContinerProps> = ({ children }) => {
    return (
        <div className=''>{children}</div>
    )
}

export default Container