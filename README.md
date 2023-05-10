 # RELACIONES EN CRUD

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*Ij4wyJ4yMq_0Vm_U.png" alt="Postman" width="400" height="150">

```typescript

##PETICIONES POSTMAN CAMISAS

POST /shirts - Crea una nueva camisa
GET /shirts - Obtiene todos las camisas
GET /shirts/:id - Obtener una camisa por su ID
PUT /shirts/:id - Actualiza una camisa por su ID
DELETE /shirts/:id - Eliminar una camisa por su ID

##Estructura del JSON

{
  "name": "Camiseta de prueba",
  "description": "Esta es una camiseta de prueba para la tienda en línea.",
  "image": "https://example.com/image.jpg",
  "color": "Azul",
  "price": 29,
  "productSizes": [
    {
      "size": "M"
    }
  ]
}
##PETICIONES POSTMAN PRODUCT SIZES "CREAR TALLAS"

POST /product-size - Crear una nueva talla
GET /product-size - Obtener todas las tallas


##Estructura del JSON

{
    "name": "M",
    "description": "Medium size"
}

```
