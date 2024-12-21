import { useState, useEffect } from 'react';
import type { SNS } from '../types';
import { supabase } from '@/lib/supabase';

export function useSNSList() {
    const [snsList, setSNSList] = useState<SNS[]>([]);

    useEffect(() => {
        async function fetchSNSList() {
            const { data, error } = await supabase
                .from('sns_master')
                .select('*'); // 必要なカラムを指定しても良い

            if (error) {
                console.error('Failed to fetch SNS list:', error.message);
            } else if (data) {
                setSNSList(data as SNS[]);
            }
        }

        fetchSNSList();
    }, []);

    return { snsList };
}
