import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useImpactData() {
  const [data, setData] = useState({
    donationsCount: 0,
    mealsServed: 0,
    activeParishes: 0,
    volunteersCount: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchImpact() {
      try {
        const [donationsRes, usersRes, parishesRes] = await Promise.all([
          supabase.from('donations').select('status, created_at'),
          supabase.from('users').select('role, is_verified'),
          supabase.from('parishes').select('id', { count: 'exact' }),
        ]);

        if (donationsRes.error) throw donationsRes.error;
        if (usersRes.error) throw usersRes.error;
        if (parishesRes.error) throw parishesRes.error;

        // Calculate impact
        const totalDonations = donationsRes.data.length;
        
        const completedDonations = donationsRes.data.filter(d => d.status === 'Distributed');
        const mealsServed = completedDonations.length * 5; 

        const verifiedVolunteers = usersRes.data.filter(u => u.role === 'volunteer' && u.is_verified).length;
        
        // Calculate status percentages
        const inTransit = donationsRes.data.filter(d => d.status === 'Accepted' || d.status === 'Collected').length;
        const pending = donationsRes.data.filter(d => d.status === 'Available').length;
        const completed = completedDonations.length;
        
        const totalWithStatus = completed + inTransit + pending;
        const statusData = {
          completed: totalWithStatus > 0 ? Math.round((completed / totalWithStatus) * 100) : 0,
          transit: totalWithStatus > 0 ? Math.round((inTransit / totalWithStatus) * 100) : 0,
          pending: totalWithStatus > 0 ? Math.round((pending / totalWithStatus) * 100) : 0,
        };

        // Calculate donations over time (last 6 months)
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const monthlyData = [];
        const currentDate = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            monthlyData.push({ month: monthNames[d.getMonth()], count: 0 });
        }

        donationsRes.data.forEach(d => {
            if (!d.created_at) return;
            const dDate = new Date(d.created_at);
            const monthDiff = (currentDate.getFullYear() - dDate.getFullYear()) * 12 + (currentDate.getMonth() - dDate.getMonth());
            if (monthDiff >= 0 && monthDiff < 6) {
                monthlyData[5 - monthDiff].count++;
            }
        });

        const maxMonthly = Math.max(...monthlyData.map(m => m.count), 1);
        const chartData = monthlyData.map(m => ({
            ...m,
            height: Math.round((m.count / maxMonthly) * 100) + '%'
        }));

        setData({
          donationsCount: totalDonations,
          mealsServed: mealsServed > 0 ? mealsServed : 0,
          activeParishes: parishesRes.data.length || 0,
          volunteersCount: verifiedVolunteers,
          statusData,
          chartData,
          loading: false,
          error: null,
        });

      } catch (err) {
        console.error('Error fetching impact data:', err);
        setData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    }

    fetchImpact();
  }, []);

  return data;
}
