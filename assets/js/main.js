class Ingrediente {
    constructor(nombre, precio= 0) {
        this.nombre = nombre;
         this.precio = precio;
    }
}

class Pizza {
    constructor() {
        this.ingredientesSeleccionados = [];
        this.ingredientesExtras = [];
        this.precioPizza = 0;
        this.precioExtra = 800;
        this.propina = 0;


    }

    agregarIngrediente(ingrediente) {
        if (this.ingredientesSeleccionados.length < 3) {
            this.ingredientesSeleccionados.push(ingrediente);
        } else {
            this.ingredientesExtras.push(ingrediente);
        }
    }

    calcularTotal() {
        let total = this.precioPizza;
        total += this.ingredientesExtras.length * this.precioExtra;
        total += this.propina;
        return total;
    }

    cambiarPropina(nuevaPropina) {
        this.propina = nuevaPropina;
    }

    mostrarResumen() {
        const total = this.calcularTotal();
        return `El costo total de tu pedido es: $${total}`;
    }
}

const pizza = new Pizza();

// Manejar la selección de ingredientes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const nombreIngrediente = checkbox.id;
        const ingrediente = new Ingrediente(nombreIngrediente, 800);

        if (checkbox.checked) {
            pizza.agregarIngrediente(ingrediente);
        } else {
            pizza.ingredientesSeleccionados = pizza.ingredientesSeleccionados.filter(ing => ing.nombre !== nombreIngrediente);
            pizza.ingredientesExtras = pizza.ingredientesExtras.filter(ing => ing.nombre !== nombreIngrediente);
        }

        actualizarResumen();
    });
});

// Manejar la entrada de propina
document.getElementById('propina').addEventListener('input', (e) => {
    pizza.cambiarPropina(parseInt(e.target.value) || 1000);
    actualizarResumen();
});

// Manejar el envío del pedido
document.getElementById('enviar').addEventListener('click', () => {
    if (pizza.propina <= 999) {
        // Mostrar un alert si la propina es 0 o menor
        alert('Aún no ha definido una propina.');
    } else {
        // Mostrar un alert que confirma el envío de la propina
        alert(`Su propina de $${pizza.propina} ha sido enviada`);
        // Aquí puedes agregar la lógica para enviar el pedido, si es necesario
    }
});
// Actualizar la vista del resumen
function actualizarResumen() {
    const ingredientesSeleccionadosUl = document.getElementById('ingredientesSeleccionados');
    const ingredientesExtrasUl = document.getElementById('ingredientesExtras');
    const totalExtraSpan = document.getElementById('totalextra');
    const propinaSpan = document.getElementById('propinatotal');

    ingredientesSeleccionadosUl.innerHTML = '';
    ingredientesExtrasUl.innerHTML = '';

    for (const ing of pizza.ingredientesSeleccionados) {
        ingredientesSeleccionadosUl.innerHTML += `<li>${ing.nombre}</li>`;
    }

    for (const ing of pizza.ingredientesExtras) {
        ingredientesExtrasUl.innerHTML += `<li>${ing.nombre}</li>`;
    }

    totalExtraSpan.innerText = `$${pizza.ingredientesExtras.length * pizza.precioExtra}`;
    propinaSpan.innerText = `$${pizza.propina}`;
}

//Llamar
actualizarResumen();