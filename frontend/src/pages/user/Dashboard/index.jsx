import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { todosAtom } from "./store/dashboardStore";
import { AddTodo } from './Components/Addtodo';
import { Todos } from './Components/Todos';
import { Toolbar } from './Components/Toolbar';

export function Dashboard() {
    const [activeView, setActiveView] = useState('add');
    const [todos, setTodos] = useRecoilState(todosAtom);

    const fetchTodos = async () => {
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });
            const data = await response.json();
            if (data.success) {
                setTodos(data.todos);
            }
        } catch (error) {
            console.error('Failed to fetch todos');
        }
    };

    useEffect(() => {
        if (activeView === 'manage') {
            fetchTodos();
        }
    }, [activeView]);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Toolbar activeView={activeView} setActiveView={setActiveView} />
            
            {activeView === 'add' ? (
                <AddTodo />
            ) : (
                <Todos todos={todos} />
            )}
        </div>
    );
} 