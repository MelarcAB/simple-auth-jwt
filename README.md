# Autenticación básica con NodeJs, MongoDB y JWT

Aplicación sencilla que cuenta con un registro, login y un home para los que se han iniciado sesión.


## Descripción

Al iniciar la aplicación se conectará con una base de datos en la que se gestionarán los usuarios.
La aplicación corre en el puerto 3001 por defecto.


### Ejecución

* Para registrar un usuario nuevo se tendrá que hacer una petición POST a localhost:3001/api/auth/register con los respectivos parámetros.
```
{
    "name": "Melarc",
    "surname": "Test test",
    "email": "test@gmail.com",
    "password": "example_password"
}
```

* Para el login se hace una petición post a localhost:3001/api/auth/login con los campos respectivos. En caso de OK se devolverá el token generado

```
{
    "email": "test@gmail.com",
    "password": "example_password"
}
```

* Para verificar si funciona se realiza una petición GET a localhost:3001/api/home que solo será visible con el token.
