import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.ts'
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

interface Subscription {
  user_id: string;
  status: string;
  // add other subscription fields as needed
}

export const useSubscription = (userId: string) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  
  useEffect(() => {
    // Взема текущия абонамент
    const getSubscription = async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (!error && data) setSubscription(data as Subscription)
    }

    getSubscription()

    // Real-time updates за абонамента
    const channel: RealtimeChannel = supabase
      .channel('subscription_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'subscriptions' },
        (payload: RealtimePostgresChangesPayload<Subscription>) => {
          const newData = payload.new as Subscription
          if (newData.user_id === userId) {
            setSubscription(newData)
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [userId])

  return subscription
} 