document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const orderForm = document.getElementById('order-form');
    const orderMessage = document.getElementById('order-message'); 

   
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    
    const renderCartItems = () => {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            const itemCounts = {}; 

            
            cartItems.forEach(item => {
                if (itemCounts[item.id]) {
                    itemCounts[item.id].quantity += item.quantity; 
                } else {
                    itemCounts[item.id] = { name: item.name, price: item.price, quantity: item.quantity };
                }
            });

            let totalPrice = 0; 

            
            for (const id in itemCounts) {
                const cartItem = document.createElement('div');
                const itemTotal = itemCounts[id].price * itemCounts[id].quantity; 
                totalPrice += itemTotal;

                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${itemCounts[id].name} (Количество: ${itemCounts[id].quantity}) - ${itemCounts[id].price} руб за единицу. Общая сумма: ${itemTotal} руб</p>
                    <button class="remove-btn" data-id="${id}">Удалить</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            }

            
            const totalDisplay = document.createElement('div');
            totalDisplay.textContent = `Итоговая стоимость: ${totalPrice} руб`;
            cartItemsContainer.appendChild(totalDisplay);

           
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.getAttribute('data-id');
                    removeFromCart(id);
                });
            });
        }
    };

    
    const addToCart = (product) => {
        const quantityInput = document.querySelector(`.quantity-input[data-product-id="${product.id}"]`); 
        let quantity;
        if (quantityInput.value < 1) {
            console.log('Введите число больше 0')
            return;
        }
        else {
            quantity = parseInt(quantityInput.value)
        }

    

       
        const existingItemIndex = cartItems.findIndex(item => item.id == product.id); 

        if (existingItemIndex > -1) {
            
            cartItems[existingItemIndex].quantity += quantity;
        } else {
           
            const productWithQuantity = { ...product, quantity: quantity };
            cartItems.push(productWithQuantity);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    };


addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price')); 
        const product = { id: productId, name: productName, price: productPrice }; 
        addToCart(product);
    });
});


function updateItemQuantity(id, quantity) {
updateCart((prev) => {
    let cart = { ...prev };

    if (cart.products[id]) {
        cart.products[id].quantity = quantity;

       
        if (cart.products[id].quantity <= 0) {
            delete cart.products[id];
        }
    }

    return cart;
});
}


function handleQuantityUpdate(event) {
event.preventDefault();
const form = event.currentTarget;
const id = form.dataset.productId; 
const quantity = parseInt(form.elements.quantity.value, 10); 

updateItemQuantity(id, quantity); 
}


    
    const removeFromCart = (id) => {
        const index = cartItems.findIndex(item => item.id == id); 
        if (index > -1) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    };

   
   if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

       
        button.addEventListener('click', () => {
            
            localStorage.removeItem('cartItems');
            cartItems = []; 
            renderCartItems(); 
        });

        renderCartItems();

        
        orderMessage.textContent = 'Заказ оформлен!';
        orderMessage.style.display = 'block'; 
        setTimeout(() => {
            orderMessage.style.display = 'none'; 
        }, 3000);
    });
}


renderCartItems();
});






