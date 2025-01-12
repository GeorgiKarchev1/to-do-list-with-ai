import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TaskList = ({ tasks, onToggleTask }: TaskListProps) => {
  return (
    <div className="mt-6 w-full max-w-md">
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-3 bg-white rounded-lg shadow"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 