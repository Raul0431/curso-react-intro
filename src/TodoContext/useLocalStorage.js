import React from 'react';

// Custom Hook para manejar el localStorage
function useLocalStorage(itemName, initialValue){
    
    const [item, setItem] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(()=>{
        setTimeout(() => {
            try {
                //Obtener los todos desde el localStorage
                const localStorageItem = localStorage.getItem(itemName);
                let parseItems; // valor por defecto

                //Si no hay todos en el localStorage, inicializar con un array vacío
                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parseItems = initialValue;
                }else{
                    parseItems = JSON.parse(localStorageItem);
                    setItem(parseItems);
                }
                setLoading(false);
            }catch(error){
                setError(true);
                setLoading(true);
            }
        }, 2000);
    }, []);

   // Función para guardar los todos tanto en el estado como en el localStorage
    const saveItem = (newItem)=>{
        localStorage.setItem(itemName, JSON.stringify(newItem));// actualizar localStorage
        setItem(newItem);// actualizar estado
    };

    return {item, saveItem, loading, error};// devolver el estado y la función para guardar
}

export { useLocalStorage };