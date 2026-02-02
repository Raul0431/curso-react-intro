import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
// import { TodosCounterLoading } from '../TodosCounterLoading';
import { CreateTodoButton } from '../CreateTodoButton';//como la carpeta se llama igual que el archivo, no es necesario poner el nombre del archivo
import { TodoContext } from '../TodoContext';   
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import React from 'react';

function AppUI(){

    const {
        loading,
        error,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);

    return (
    <>
        {/* {Loading && <TodosCounterLoading />} */}
        <TodoCounter />
        <TodoSearch />
        <TodoList>
            {loading && (
            <>
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
            </>
            )}
            {error && <TodosError/>}
            {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

            {searchedTodos.map(todo => (
            <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
            />
            ))}
        </TodoList>
        <CreateTodoButton setOpenModal={setOpenModal} />

        {openModal && (
            <Modal>
                <TodoForm />
            </Modal>
        )}
    </>
    );
}

export { AppUI };