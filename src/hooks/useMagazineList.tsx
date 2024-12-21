import { useState, useEffect } from 'react';
import type { Magazine } from '../types';
import { supabase } from '@/lib/supabase';

export function useMagazineList() {
    const [magazines, setMagazines] = useState<Magazine[]>([]);

    useEffect(() => {
        async function fetchMagazineList() {
            const { data, error } = await supabase
                .from('magazine_master')
                .select('*');

            if (error) {
                console.error('Failed to fetch magazine list:', error.message);
            } else if (data) {
                setMagazines(data as Magazine[]);
            }
        }

        fetchMagazineList();
    }, []);

    return { magazines };
}
