import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

interface Props {
    onConfettiComplete?: any
}

const CustomConfetti: React.FC<Props> = ({ onConfettiComplete }) => {
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
            colors={["#7269ef", "#f5f6fc00", "#000", "#fff"]}
            onConfettiComplete={onConfettiComplete}
        />
    )
}

export default CustomConfetti