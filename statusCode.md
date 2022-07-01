# Codigos de Estado para las respuestas de las peticiones por parte del cliente hacia la API

## statusCode de SESSIONES
- Codigos del 800 al 899
    - 800: Session existente y activa
    - 801: Session expirada
    - 802: No es posible realizar la peticion por parte de la API hacia la db

## statusCode del Cliente
    - 401: No tienes autorización
    - 404: No se encuentra nada relacionado
    - 406: No se pudo negociar, le hace falta contenido (Campos Vacios)