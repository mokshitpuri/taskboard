import React, { useState } from 'react';
import { useTasks } from '../features/tasks/hooks/useTasks';
import TaskCard from '../components/TaskCard';
import { createTask } from '../features/tasks/tasks.api';

const Home: React.FC = () => {
  const { tasks, loading, error, fetchTasks, handleDeleteTask, handleUpdateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = async () => {
    if (!title) return;
    await createTask(title, description);
    setTitle('');
    setDescription('');
    setIsFormVisible(false);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasks = filteredTasks.length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
              Task<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Board</span>
            </h1>
            <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {completedTasks}
                </div>
                <span className="mx-2 text-gray-400">/</span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                  {totalTasks}
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">Tasks</span>
            </div>
            
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className={`group flex items-center px-5 py-3 rounded-xl font-medium transition-all duration-200
                ${isFormVisible 
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                } shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5`}
            >
              <svg className={`w-5 h-5 ${isFormVisible ? 'rotate-45' : ''} transition-transform duration-200`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="ml-2">{isFormVisible ? 'Cancel' : 'New Task'}</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex space-x-4 mb-6">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent bg-white shadow-lg shadow-indigo-500/5
                  focus:border-indigo-500 focus:ring-0 transition-all duration-200 outline-none text-gray-700"
              />
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200 
                absolute left-4 top-1/2 transform -translate-y-1/2" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                    hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 
              hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 text-sm font-medium whitespace-nowrap">
              All Tasks
            </button>
            <button className="px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 
              transition-all duration-200 text-sm font-medium whitespace-nowrap">
              High Priority
            </button>
            <button className="px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 
              transition-all duration-200 text-sm font-medium whitespace-nowrap">
              Recent
            </button>
          </div>
        </div>

        {isFormVisible && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>
              <div className="relative group">
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 
                    group-focus-within:border-indigo-500 transition-all duration-200 outline-none
                    bg-gray-50 group-focus-within:bg-white"
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200 
                  absolute left-4 top-1/2 transform -translate-y-1/2" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="relative group">
                <textarea
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 
                    group-focus-within:border-indigo-500 transition-all duration-200 outline-none
                    bg-gray-50 group-focus-within:bg-white resize-none min-h-[120px]"
                  placeholder="Task Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200 
                  absolute left-4 top-6" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <div className="flex items-center justify-between pt-4">
                <button 
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
                <button 
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-200
                    ${title.trim() 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  onClick={handleAddTask}
                  disabled={!title.trim()}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-8">
            <div className="flex items-center space-x-4 bg-white rounded-2xl px-6 py-4 shadow-lg">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-1 border-2 border-purple-500 border-t-transparent rounded-full animate-spin-reverse"></div>
              </div>
              <span className="text-gray-600 font-medium">Loading your tasks...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 rounded-2xl p-4 mb-6 flex items-center border-l-4 border-red-500">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try different search terms or' : 'Start by'} creating a new task
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleUpdateTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;