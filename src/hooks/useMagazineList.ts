import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Magazine } from '@/types';

export function useMagazineList() {
    const [magazines, setMagazines] = useState<Magazine[]>([]);

    useEffect(() => {
        async function fetchMagazines() {
            const { data, error } = await supabase
                .from('magazines')
                .select('*');

            if (error) {
                console.error('Failed to fetch magazines:', error.message);
            } else if (data) {
                setMagazines(data as Magazine[]);
            }
        }

        fetchMagazines();
    }, []);

    return { magazines };
} 