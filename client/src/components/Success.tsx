import { motion } from 'framer-motion';

export default function Success({ size, width, color }: { size: number, width: number, color: string }) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            initial="hidden"
            animate="visible"
        >
            <motion.path
                d={`
                    M ${size * 0.2} ${size * 0.5} 
                    L ${size * 0.4} ${size * 0.7} 
                    L ${size * 0.8} ${size * 0.3}
                `}
                fill="transparent"
                stroke={color}
                strokeWidth={width}
                strokeLinecap="round"
                variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </motion.svg>
    )
}
