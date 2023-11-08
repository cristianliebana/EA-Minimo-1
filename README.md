# Minimo 1 Cristian Liébana

Ejercicio tipo 1:

Se propone añadir a la aplicación ya existente un gestor de denuncias de contenidos o
usuarios. La implementación concreta se deja abierta para poder encajarla en cada aplicación.

El enunciado pedia los siguientes requisitos los cuales el codigo cumple TODOS:
-Los documentos de la nueva colección tendrán al menos una relación con las colecciones ya existentes
(En mi caso lo he relacionado con dos colecciones, usuario y producto).

-Los documentos de la nueva colección tendrán al menos 3 tipos de datos diferentes
(Los 3 tipos de datos diferentes que he utilizado son string,number y date

    userId: string;
    gravity: number;
    date: Date;
    productId: string;
    description: string;
)

-EL API tiene que tener un nuevo endpoint con las 4 llamadas del CRUD y el listado.

-La interfaz gráfica debe tener al menos un nuevo componente.
(He añadido dos, denuncia.component y denuncia.detail.component)

-La interfaz gráfica debe implementar al menos 3 de las llamadas al nuevo endpoint
(Hago todas las llamadas)

La idea que he tenido para plantear este gestor de denuncias es un gestor donde un usuario 
pueda introducir un producto en concreto para realizar esta denuncias. Además, se deberá
de añadir la fecha en la que se ha hecho la denuncia, la gravedad de la denuncia (un número) y
una descripción de cual es la denuncia en cuestión.

Para que el codigo sea mas seguro, he enfocado esta nueva colección a que la relación
entre colecciones se haga mediante el id de tanto usuario como producto. De este modo, 
si un usuario quiere realizar exactamente la misma denuncia sobre el mismo producto no podrá.

IMPORTANTE: Para poder acceder a el gesto de denuncias has de logearte primero con una 
cuenta de administrador. Para crear una cuenta de administrador es tan sencillo como abrir
el insomnia o el postman y hacer un POST a http://localhost:9090/users/createuser/ con un json
que tenga esta estructura:

{
	"username": "admin",
	"email": "admin",
	"password": "1234",
	"rol": "admin"
}
 (Los demas campos son editables pero "rol" tiene que ser admin si no no funcionará)


![Minimo 1](https://github.com/cristianliebana/EA-Minimo-1/assets/91670899/be1c0292-f4a5-499e-b66f-bba564c352e1)
![Minimo 2](https://github.com/cristianliebana/EA-Minimo-1/assets/91670899/43161ec4-5600-4050-9312-228e7633c574)
