
import { useEffect, useRef } from 'react';
import { sounds } from '../core/mp3';


const useMessageSound = () => {
    const receivedSoundRef = useRef<HTMLAudioElement | null>(null);
    const sentSoundRef = useRef<HTMLAudioElement | null>(null);
    const hasInteractedRef = useRef(false);

    useEffect(() => {
        receivedSoundRef.current = new Audio(sounds.notification);
        sentSoundRef.current = new Audio(sounds.notification);

        const handleInteraction = () => {

            hasInteractedRef.current = true;
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };


        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    const playReceivedSound = () => {

        if (hasInteractedRef.current && receivedSoundRef.current) {
            receivedSoundRef.current.currentTime = 0;
            receivedSoundRef.current.play().catch(error => {
                console.error("Error al reproducir audio de recepción:", error);
            });
        }
    };

    const playSentSound = () => {

        if (sentSoundRef.current) {
            sentSoundRef.current.currentTime = 0;
            sentSoundRef.current.play().catch(error => {
                console.error("Error al reproducir audio de envío:", error);
            });
        }
    };

    return { playReceivedSound, playSentSound };
};

export default useMessageSound;