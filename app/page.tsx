'use client'

import React, { useState, useEffect } from 'react'

export default function Home() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  // 載入 localStorage
  useEffect(() => {
    const stored = localStorage.getItem('comments')
    console.log('讀到留言：', stored)
    if (stored) {
      try {
        setComments(JSON.parse(stored))
      } catch (e) {
        console.error('解析失敗', e)
      }
    }
  }, [])

  // 新增留言 + 存 localStorage
  const handlePost = () => {
    if (!comment.trim()) return
    const updated = [comment, ...comments]
    setComments(updated)
    localStorage.setItem('comments', JSON.stringify(updated))
    setComment('')
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">自由發言區 ✍️</h1>

      <textarea
        className="w-full p-2 border rounded"
        placeholder="寫下你的想法..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handlePost}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        發佈留言
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">發佈留言</h2>
        {comments.length === 0 && <p className="text-gray-500">還沒有留言，快來當第一個吧！</p>}
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="p-2 border rounded bg-white">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
