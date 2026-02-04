# SkyWings - Frontend para Arquitectura AWS

Frontend completo de una aerolínea moderna, diseñado para ser desplegado en **Amazon S3 + CloudFront**.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 CloudFront (CDN)                        │
│  - Cache global                                         │
│  - HTTPS/SSL                                            │
│  - Compresión GZIP                                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            S3 Bucket (Static Hosting)                   │
│  - index.html                                           │
│  - styles.css                                           │
│  - script.js                                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (EC2)                          │
│  - Búsqueda de vuelos                                   │
│  - Reservas                                             │
│  - Autenticación                                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Base de Datos (EC2)                        │
│  - MySQL/PostgreSQL                                     │
│  - Datos de vuelos, usuarios, reservas                 │
└─────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
skywings-frontend/
│
├── index.html          # Página principal
├── styles.css          # Estilos completos con animaciones
├── script.js           # JavaScript para interactividad
└── README.md           # Este archivo
```

## 🚀 Despliegue en AWS S3

### Paso 1: Crear el Bucket S3

```bash
# Crear bucket (reemplaza 'tu-nombre-bucket' con un nombre único)
aws s3 mb s3://skywings-frontend-prod

# Habilitar hosting estático
aws s3 website s3://skywings-frontend-prod \
  --index-document index.html \
  --error-document index.html
```

### Paso 2: Configurar Política del Bucket

Crear archivo `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::skywings-frontend-prod/*"
    }
  ]
}
```

Aplicar política:

```bash
aws s3api put-bucket-policy \
  --bucket skywings-frontend-prod \
  --policy file://bucket-policy.json
```

### Paso 3: Subir Archivos

```bash
# Subir todos los archivos
aws s3 sync . s3://skywings-frontend-prod \
  --exclude "*.md" \
  --exclude ".git/*" \
  --cache-control "max-age=31536000" \
  --acl public-read

# Para el HTML (cache más corto)
aws s3 cp index.html s3://skywings-frontend-prod/ \
  --cache-control "max-age=3600" \
  --content-type "text/html" \
  --acl public-read
```

### Paso 4: Configurar CloudFront

```bash
# Crear distribución de CloudFront
aws cloudfront create-distribution \
  --origin-domain-name skywings-frontend-prod.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

Configuración recomendada:
- **Price Class**: Use Only U.S., Canada and Europe (más económico)
- **Alternate Domain Names (CNAMEs)**: www.skywings.com, skywings.com
- **SSL Certificate**: AWS Certificate Manager (ACM)
- **Compress Objects Automatically**: Yes
- **Default TTL**: 86400 (24 horas)

## 🔧 Variables de Entorno

Para conectar con tu backend en EC2, edita `script.js`:

```javascript
// Configuración del backend
const API_BASE_URL = 'https://api.skywings.com'; // Tu EC2 con API
const API_ENDPOINTS = {
  searchFlights: '/api/v1/flights/search',
  bookFlight: '/api/v1/bookings',
  checkIn: '/api/v1/checkin'
};
```

## 🎨 Características del Frontend

### ✅ Funcionalidades Implementadas

- ✅ Buscador de vuelos (ida y vuelta, solo ida, multidestino)
- ✅ Selector de origen y destino con swap
- ✅ Selector de fechas
- ✅ Selector de pasajeros y clase
- ✅ Destinos populares con precios
- ✅ Servicios destacados
- ✅ Banner promocional
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves y profesionales
- ✅ Navegación intuitiva

### 🎯 Próximas Integraciones (Backend)

1. **API de Búsqueda de Vuelos**
   ```javascript
   POST /api/v1/flights/search
   {
     "origin": "BOG",
     "destination": "MIA",
     "departureDate": "2026-02-15",
     "returnDate": "2026-02-22",
     "passengers": {
       "adults": 1,
       "children": 0,
       "infants": 0
     },
     "class": "economy"
   }
   ```

2. **API de Reservas**
3. **API de Check-in**
4. **API de Estado de Vuelo**
5. **Autenticación de Usuarios**
6. **Sistema de LifeMiles**

## 📊 Optimizaciones Implementadas

- ✅ **CSS optimizado**: Variables CSS, animaciones performantes
- ✅ **JavaScript modular**: Código organizado y mantenible
- ✅ **Lazy Loading**: Para imágenes (cuando se agreguen)
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado
- ✅ **SEO Ready**: Estructura HTML semántica

## 🔐 Configuración de CORS (Backend)

Tu backend en EC2 debe permitir solicitudes desde CloudFront:

```javascript
// Express.js ejemplo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://d123456.cloudfront.net');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

## 📈 Monitoreo y Analytics

### CloudWatch Metrics
```bash
# Habilitar logging en CloudFront
aws cloudfront create-monitoring-subscription \
  --distribution-id XXXXXXXXXXXXX
```

### Google Analytics (Opcional)
Agregar en `index.html` antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚦 Roadmap de Migración a Arquitectura Escalable

### Fase 1: Básica (Actual)
- ✅ S3 + CloudFront (Frontend)
- ✅ EC2 (Backend monolítico)
- ✅ EC2 (Base de datos)

### Fase 2: Escalabilidad Mejorada
- 🔄 Auto Scaling Groups para EC2
- 🔄 Application Load Balancer (ALB)
- 🔄 RDS Multi-AZ (migración de BD desde EC2)
- 🔄 ElastiCache (Redis para sesiones)

### Fase 3: Microservicios
- ⏳ ECS/Fargate (contenedores)
- ⏳ API Gateway + Lambda (serverless)
- ⏳ DynamoDB (NoSQL para alta escala)
- ⏳ SNS/SQS (mensajería asíncrona)

### Fase 4: Alta Disponibilidad
- ⏳ Multi-Region Deployment
- ⏳ Route 53 Health Checks
- ⏳ CloudFront with AWS WAF
- ⏳ Backup automatizado con AWS Backup

## 💰 Estimación de Costos (Mensual)

### Configuración Actual
- **S3**: ~$0.50 (5GB, 10k requests)
- **CloudFront**: ~$2.00 (10GB transfer)
- **EC2 Backend**: ~$10 (t3.micro)
- **EC2 Database**: ~$10 (t3.micro)
- **Total**: ~$22.50/mes

### Configuración Escalable (Fase 2)
- **S3 + CloudFront**: ~$5
- **ALB**: ~$20
- **EC2 Auto Scaling**: ~$50-100
- **RDS Multi-AZ**: ~$30
- **ElastiCache**: ~$15
- **Total**: ~$120-170/mes

## 🧪 Testing Local

```bash
# Servidor local simple con Python
python -m http.server 8000

# O con Node.js
npx http-server -p 8000
```

Visita: `http://localhost:8000`

## 📝 Notas Importantes

1. **Seguridad**: Nunca expongas credenciales AWS en el código
2. **HTTPS**: Siempre usa HTTPS en producción (CloudFront + ACM)
3. **Caché**: Configura TTLs apropiados en CloudFront
4. **Versionado**: Usa nombres con hash para assets (styles.v2.css)
5. **Compresión**: CloudFront maneja GZIP automáticamente

## 🔗 Links Útiles

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

## 📧 Soporte

Para preguntas sobre la arquitectura o implementación, consulta la documentación de AWS o contacta a tu equipo DevOps.

---

**Desarrollado con ❤️ para arquitectura cloud escalable**
