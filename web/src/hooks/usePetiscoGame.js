import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../services/ApiService';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

export const usePetiscoGame = () => {
    const { token } = useAuth();
    const { updateUser } = useUser();
    const [petiscos, setPetiscos] = useState([]);
    const [gameActive, setGameActive] = useState(true);

    const addCoins = async () => {
        const { addCoins } = ApiService(token);
        try {
            const response = await addCoins();
            updateUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar coins:', error);
            throw error;
        }
    };

    const generateRandomPosition = useCallback(() => {
        // Evita bordas (10% a 90% da tela)
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        return { x, y };
    }, []);

    const spawnPetisco = useCallback(() => {
        if (!gameActive) return;

        const newPetisco = {
            id: Date.now() + Math.random(),
            position: generateRandomPosition(),
            timeout: setTimeout(() => {
                setPetiscos(prev => prev.filter(p => p.id !== newPetisco.id));
            }, 10000)
        };

        setPetiscos(prev => [...prev, newPetisco]);
    }, [generateRandomPosition, gameActive]);

    const collectPetisco = async (petiscoId) => {
        const petisco = petiscos.find(p => p.id === petiscoId);
        if (petisco) {
            clearTimeout(petisco.timeout);
            setPetiscos(prev => prev.filter(p => p.id !== petiscoId));
            await addCoins();
        }
    };

    // Spawn aleatório de petiscos
    useEffect(() => {
        if (!gameActive) return;

        const spawnInterval = setInterval(() => {
            // 80% de chance de spawnar um novo petisco a cada 15 segundos
            if (Math.random() < 0.8 && petiscos.length < 5) {
                spawnPetisco();
            }
        }, 15000);

        return () => clearInterval(spawnInterval);
    }, [spawnPetisco, petiscos.length, gameActive]);

    // Limpar petiscos ao desmontar
    useEffect(() => {
        return () => {
            petiscos.forEach(petisco => {
                if (petisco.timeout) clearTimeout(petisco.timeout);
            });
        };
    }, [petiscos]);

    return {
        petiscos,
        gameActive,
        collectPetisco,
        stopGame: () => setGameActive(false),
        startGame: () => setGameActive(true)
    };
};
