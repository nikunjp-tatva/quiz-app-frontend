import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ExamTimer({ examTime = 30, onTimerEnds }: Readonly<{ examTime: number | undefined; onTimerEnds: any }>) {
    const [timeLeft, setTimeLeft] = useState(examTime * 60);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 0) {
                    clearInterval(timerId);

                    console.log('Time is up! data submitted');
                    onTimerEnds();
                    
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [onTimerEnds]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <Box pt={2} pb={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mr={2}>
                <Typography variant="h4">{formatTime(hours)}</Typography>
                <Typography variant="subtitle1">Hours</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mr={2}>
                <Typography variant="h4">{formatTime(minutes)}</Typography>
                <Typography variant="subtitle1">Minutes</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">{formatTime(seconds)}</Typography>
                <Typography variant="subtitle1">Seconds</Typography>
            </Box>
        </Box>
    )
}
