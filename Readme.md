# Documentacion Para Integrar Auth Y Seguridad

Instalar cuando vayas a implementarlo:

```bash
npm install helmet express-rate-limit bcrypt jsonwebtoken
```

Variables `.env` recomendadas:

```env
JWT_SECRET=clave_larga_privada
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=12
```

## Configuracion JWT

JWT se usa para crear un token firmado cuando el usuario hace login. El cliente debe enviar ese token en cada peticion privada usando el header `Authorization`.

Ejemplo de payload recomendado:

```js
const payload = {
  sub: user.id,
  email: user.email,
};
```

Firmar el token en login:

```js
import jwt from "jsonwebtoken";

const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
});
```

Respuesta de login:

```js
return res.status(200).json({
  success: true,
  data: {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  },
});
```

Enviar el token desde el cliente:

```http
Authorization: Bearer <token>
```

Verificar el token en un middleware:

```js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token requerido",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token invalido",
    });
  }
};
```

Proteger rutas:

```js
app.use("/todos", auth, todosRouter);
```

Buenas practicas con JWT:

- Guardar `JWT_SECRET` solo en `.env`, nunca en el codigo.
- Usar una clave larga y privada.
- No guardar passwords ni datos sensibles dentro del token.
- Usar `sub` para guardar el id del usuario.
- Definir expiracion con `expiresIn`.
- Usar HTTPS en produccion.
- Enviar el token con `Authorization: Bearer <token>`.

## Tabla Users

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Flujo Recomendado

```txt
/auth/register
  -> validar body con Zod
  -> bcrypt.hash(password)
  -> guardar user en MySQL

/auth/login
  -> buscar user por email
  -> bcrypt.compare(password, password_hash)
  -> jwt.sign(...)

/todos
  -> auth middleware
  -> todosRouter
```

## Seguridad Global

En `index.js`:

```js
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

app.disable("x-powered-by");
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
```

Rate limit mas estricto para auth:

```js
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
});

app.use("/auth", authLimiter, authRouter);
```

## Buenas Practicas

- No guardar passwords en texto plano, siempre `bcrypt.hash`.
- No devolver si fallo email o password; usar "Credenciales invalidas".
- No usar `root` de MySQL en produccion.
- Usar SQL parametrizado con `?`.
- Proteger rutas privadas con `auth`.
- Limitar `/auth/login` con rate limit.
- Usar `helmet()` globalmente.
- Tener un error handler global para no exponer errores internos.
