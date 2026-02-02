import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

// Provider es el que provee la información a los componentes que lo necesiten
const TodoProvider = ({children})=>{

     //Logica de inicio de la aplicación "components stateful logic"
    // Estado para los todos y el valor de busqueda usando el custom hook
    const  {
        item: todos,
        saveItem: saveTodos,
        loading, 
        error} = useLocalStorage('TODOS_V1', []);// estado para los todos

    const [searchValue, setSearchValue] = React.useState('');// estado para el valor de búsqueda

    const [openModal, setOpenModal] = React.useState(false);

    // Calcular los totales de todos y completados
    const completedTodos = todos.filter(
        todo => !!todo.completed
    ).length;
    
    const totalTodos = todos.length;

    // Filtrar los todos según el valor de busqueda
    const searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        }
    );

    const addTodo = (text)=>{
        const newTodos = [...todos];
        newTodos.push({ completed: false, text });
        saveTodos(newTodos);
    }

    // Funciones para completar y eliminar un todo
    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };
    
    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completeTodo,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            deleteTodo,
            completedTodos,
            openModal,
            setOpenModal,
        }}>
            {children} 
        </TodoContext.Provider>
    );
}

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'Usar estados derivados', completed: true },
// ];

// localStorage.setItem('VERSION_01', JSON.stringify(defaultTodos));
// localStorage.removeItem('VERSION_01');


export {TodoContext, TodoProvider};