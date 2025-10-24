import React, { useState } from 'react';
import { Task } from '../features/tasks/tasks.api';

interface Props {
  task: Task;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, title: string, description?: string) => void;
}

const TaskCard: React.FC<Props> = ({ task, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const createdDate = new Date().toLocaleDateString();
  const descriptionLength = task.description ? task.description.length : 0;
  const priority = descriptionLength > 50 ? 'High' : 'Normal';
  const completionPercentage = Math.min(100, descriptionLength / 2);

  return (
    <div 
      className={`bg-white p-6 rounded-2xl shadow-lg mb-4 group relative
        ${isExpanded ? 'scale-[1.02] shadow-2xl' : 'hover:-translate-y-1 hover:shadow-xl'} 
        transition-all duration-300 ease-out cursor-pointer
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r 
        before:from-indigo-500/5 before:to-purple-500/5 before:opacity-0 
        hover:before:opacity-100 before:transition-opacity`}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl overflow-hidden bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4 pt-2">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-bold text-xl text-gray-800">{task.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200
                ${priority === 'High' 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'}`}>
                {priority}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {createdDate}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Activity: {task.description ? 'Active' : 'New'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              className={`p-2 rounded-xl transition-all duration-200 group/btn
                ${isHovered ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-indigo-50 text-gray-500 hover:text-indigo-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="absolute bg-gray-800 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Edit Task
              </span>
            </button>
            <button 
              className={`p-2 rounded-xl transition-all duration-200 group/btn
                ${isHovered ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 text-gray-500 hover:text-red-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) {
                  onDelete(task.id);
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="absolute bg-gray-800 text-white px-2 py-1 text-xs rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Delete Task
              </span>
            </button>
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-20 opacity-90'}`}>
          {isEditing ? (
            <div className="mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Task title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Task description"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (onEdit && editTitle.trim()) {
                      onEdit(task.id, editTitle.trim(), editDescription.trim() || undefined);
                      setIsEditing(false);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            task.description && (
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-white 
                  ${isExpanded ? 'hidden' : 'block'}`} />
                <p className="text-gray-600 leading-relaxed">
                  {task.description}
                </p>
              </div>
            )
          )}
          
          {isExpanded && (
            <div className="mt-6 pt-4 border-t border-gray-100 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="text-gray-500 mb-1">Created</div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="text-gray-500 mb-1">Task ID</div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {task.id}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;