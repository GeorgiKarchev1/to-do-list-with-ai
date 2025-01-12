import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom'
import VoiceRecorder from '../components/VoiceRecorder'
import { Task } from '../types/Task'

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])

  if (!user) {
    return <Navigate to="/" replace />
  }

  const handleTaskCreated = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: text,
      completed: false,
      createdAt: new Date()
    }
    setTasks(prev => [...prev, newTask])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dali Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{user.email}</span>
            <button
              onClick={() => alert('Account settings coming soon!')}
              className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              Account
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6">
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-4">Voice Commands</h2>
              <VoiceRecorder onTaskCreated={handleTaskCreated} />
            </div>

            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        setTasks(prev =>
                          prev.map(t =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        )
                      }}
                      className="w-5 h-5 rounded border-gray-600"
                    />
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 