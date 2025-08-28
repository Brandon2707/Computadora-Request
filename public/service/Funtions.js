// Obtener productos
async function GetUsuarios() {
    try {
        const response = await fetch('http://localhost:3001/productos', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const products = await response.json();
        return products;

    } catch (error) {
        console.error("Hay un error al obtener los productos", error);
        throw error;
    }
}

// Crear producto
async function CreateUsuario(Usuario) {
    try {
        const response = await fetch('http://localhost:3001/productos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const newUsuario = await response.json();
        return newUsuario;

    } catch (error) {
        console.error("Hay un error al crear el producto", error);
        throw error;
    }
}

// Actualizar producto
async function UpdateUsuario(id, updatedUsuario) {
    try {
        const response = await fetch(`http://localhost:3001/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        const Usuario = await response.json();
        return Usuario;

    } catch (error) {
        console.error("Hay un error al actualizar el producto", error);
        throw error;
    }
}

// Eliminar producto
async function DeleteUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3001/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response.ok;

    } catch (error) {
        console.error("Hay un error al eliminar el producto", error);
        throw error;
    }
}

export { GetUsuarios, CreateUsuario, UpdateUsuario, DeleteUsuario };


