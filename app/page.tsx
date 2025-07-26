'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 連接 Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Message = {
  id: number
  content: string
  created_at: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  // 取得所有留言
  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('載入留言失敗:', error.message)
    } else {
      setMessages(data as Message[])
    }
  }

  async function sendMessage() {
    if (!newMessage.trim()) return

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: newMessage }])

    if (error) {
      console.error('留言失敗:', error.message)
    } else {
      setNewMessage('')
      fetchMessages()
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>留言牆 🧱</h1>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="輸入留言..."
          style={{ padding: 8, marginRight: 8 }}
        />
        <button onClick={sendMessage}>送出</button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{new Date(msg.created_at).toLocaleString()}</strong>
            <br />
            {msg.content}
          </li>
        ))}
      </ul>
    </main>
  )
}
