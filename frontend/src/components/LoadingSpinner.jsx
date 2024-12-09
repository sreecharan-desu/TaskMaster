import { motion } from "framer-motion";

export function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div 
                className="flex space-x-2"
                animate={{
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                }}
            >
                <motion.div
                    className="w-3 h-3 bg-indigo-600 rounded-full"
                    animate={{
                        y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: 0,
                    }}
                />
                <motion.div
                    className="w-3 h-3 bg-purple-600 rounded-full"
                    animate={{
                        y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: 0.1,
                    }}
                />
                <motion.div
                    className="w-3 h-3 bg-indigo-600 rounded-full"
                    animate={{
                        y: ["0%", "-50%", "0%"],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: 0.2,
                    }}
                />
            </motion.div>
        </div>
    );
} 