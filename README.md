# Avianca Demo AWS

Desarrollo de página web estática alojada en los servicios de **AWS**

## Arquitectura



## Estructura del Proyecto

```
skywings-frontend/
│
├── index.html
├── styles.css
├── script.js
├── ofertas.html
├── styles_ofertas.css
├── ofertas_script.js
└── README.md
```

## Despliegue en AWS

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

### Paso 5: Configurar Cognito


### Paso 6: Configurar Google + Facebook


### Paso 7: Configurar Lambda Edge
