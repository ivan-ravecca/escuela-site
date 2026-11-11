# Escuela Site

Website for Arte & Science Nursing School built with React + TypeScript and Vite. Includes a chat assistant that suggests courses and captures prospective student interest.

## Project Structure

```
escuela-site/
│
├── public/              # Static files
│   ├── images/          # Image assets
│   ├── fonts/           # Font files
│   └── favicon.ico      # Website favicon
│
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   │   └── assistant/   # Chat assistant UI (widget, course cards, lead form)
│   ├── pages/           # Page components
│   ├── styles/          # SCSS/CSS (includes chat styles)
│   ├── services/        # API services (AssistantService)
│   ├── contexts/        # React context providers (ChatWidgetContext)
│   ├── hooks/           # Custom hooks (useAssistant)
│   └── App.tsx          # Main application component
│
├── .env                 # Environment variables (Vite - prefix VITE_)
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Environment Variables (Vite)

Create an `.env` file at the root (or `.env.local`) and define variables with the `VITE_` prefix.

```
# Backend base URL
VITE_API_URL=http://localhost:3000

# Note: if you change the frontend port or origin,
# ensure the backend allows CORS with credentials from that origin.
```

Development recommendations:
- Frontend (Vite) runs at `http://localhost:5173` by default
- Backend must allow `credentials: true` in CORS and the frontend `origin`

## Setup and Installation

El listado y las páginas de `/cursos` consultan la API y no incluyen un
catálogo local de respaldo. Si la API falla se muestra un error con opción de
reintentar. El ABM está en `/administracion/cursos` y requiere una sesión
autorizada; permite editar contenido HTML básico, requisitos, clasificación
del menú, imágenes y campos opcionales del asistente. Los cambios de ID
conservan la URL anterior como alias y las bajas se pueden restaurar.
En el ABM las posiciones empiezan en 1 y cuentan únicamente cursos publicados:
una para el listado y otra independiente por cada categoría del menú. Al
guardar se desplazan los demás cursos; una posición mayor a la cantidad
disponible ubica el curso al final. Los cursos despublicados recuperan su
posición solicitada al restaurarse, limitada a las posiciones disponibles.

Antes de desplegar esta versión, aplicar en la base las migraciones de
`escuela-api/migrations` (incluida `004_course_positions.sql`) y configurar allí la carpeta persistente de imágenes
`SHOP_IMAGES_DIR`. Consultar las instrucciones de migración del backend.
El proceso de publicación del frontend no debe borrar las imágenes subidas.

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/escuela-site.git
cd escuela-site
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the `.env.example` file to `.env` and update the values.

```bash
cp .env.example .env
```

4. **Start the development server (Vite)**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

Optional: preview the local build

```bash
npm run preview
```

## Chat Assistant

The chat suggests courses and lets the user express interest. Clicking “I'm interested, please contact me” on a course card opens a form that requests:

- Full name
- Phone (Uruguay format: 099 123 456 or 99 123 456)
- Email (required)

When the form is submitted, a POST is made to `/assistant/interest` with the following payload:

```json
{
	"name": "John Doe",
	"phone": "+598 99 123 456",
	"email": "juan@example.com",
	"course_id": "1",
	"course_name": "Nursing Assistant"
}
```

The bot adds a confirmation message and does not re-list courses after submission.

### Assistant Endpoints

- `GET /assistant/welcome` — Welcome message
- `POST /assistant/chat` — Messaging with course suggestions
- `POST /assistant/interest` — Interest capture (sends email to the team)
- `GET /assistant/csrf-token` — CSRF token retrieval

### CSRF Protection (Frontend)

The app uses Axios with credentials and a CSRF token:

- `withCredentials: true` in `apiClient`
- `initializeCSRF()` calls `GET /assistant/csrf-token` and stores the token
- A request interceptor adds `X-CSRF-Token` automatically to `POST` requests under `/assistant/*`
- If the backend responds with `403` (invalid token), the token is refreshed and the request retried

Implemented in:

- `src/interceptors/apiClient.ts` — Axios instance + interceptors + `initializeCSRF()`
- `src/services/AssistantService.ts` — assistant methods (chat/interest) and `initializeCSRF()`
- `src/hooks/useAssistant.ts` — initializes CSRF on mount and when clearing the conversation

### Backend Requirements (CORS + Cookies)

- CORS must allow the frontend `origin` (e.g., `http://localhost:5173`)
- `credentials: true` to send/receive cookies
- The `/assistant/csrf-token` endpoint sets a cookie (e.g., `__Host-escuela.csrf-token`)
- The `X-CSRF-Token` header must match the token expected by the backend

### Troubleshooting

- Error `403 INVALID_CSRF_TOKEN`:
	- Verify that `VITE_API_URL` points to the correct backend
	- Confirm the backend allows `credentials: true` and the frontend `origin`
	- Check in DevTools (Network) that cookies and the `X-CSRF-Token` header are sent
	- Refresh the token with `initializeCSRF()` if it expired
