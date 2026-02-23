# Avianca Demo AWS

Desarrollo de página web estática alojada en los servicios de **AWS**

[**Web Page**](https://d1cq6wgq3znilx.cloudfront.net)

## Arquitectura

## Despliegue en AWS

### Paso 1: Crear el Bucket S3 y Subir los Archivos

![Dashboard S3](images/aws/S3-Overview.png)

### Paso 2: Configurar Política del Bucket

> Bucket S3: Permissions

```json
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::avianca-demo/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::767398005228:distribution/E27ZEE9AOMFS01"
                }
            }
        }
    ]
}
```

### Paso 3: Configurar CloudFront

![Dashboard S3](images/aws/CloudFront-Overview.png)

#### Origin

> Se debe establecer OAC

![Dashboard S3](images/aws/CloudFront-Origin.png)

### Paso 4: Configurar Cognito

**`traditional web application` → `email - phone (SNS) - username` → `required attributes` → `url redirection (CloudFront)`**

![Dashboard S3](images/aws/Cognito-Overview.png)


### Paso 5: Social and External Providers

#### Google

**GCP: `Create OAuth (Origin -> Cognito Domain + /oauth2/idpresponse)`**

- **Goolge Cloud Platform → Create Project**
- **Configure OAUTH Consent Screen**
    - **APIs & Services → OAuth consent screen**
    - **User Type → `External`**
    - **Authorized Domains → `cognito.domain/ouath2/idpresponse`**

- **Add Identity Provider (Cognito)**
  - **Client ID**
  - **Client Secret**
  - **Scopes → `openid email profile`**
 
- **Enable identity providers**
    - **Login pages → `edit`**
    - **Add identity provider → `cognito google`**

![Dashboard S3](images/aws/Cognito-Google.png)

#### Facebook

- **Meta Developers → Create App**
    - **`Otros` → `Consumidor`**
- **Add Product → `Facebook Login`**
    - **Add valid OAUTH redirect URI `https://YOUR_COGNITO_DOMAIN/oauth2/idpresponse`**
- **Enable permissions: `email` `public_profile`**
    - **Client OAuth Login → ON**
    - **Web OAuth Login → ON**
    - **Use Strict Mode for Redirect URI → ON**
    - **Enforce HTTPS → ON**
- **Required fields to remove warning**
    - **Privacy policy URL (`CloudFront`)**
    - **Data deletion URL (`CloudFront`)**
- **Switch App to live**

- **Add Identity Provider (Cognito)**
  - **App ID**
  - **App Secret**
  - **Scopes → `public_profile, email`**

- **Enable identity providers**
    - **Login pages → `edit`**
    - **Add identity provider → `cognito facebook`**

![Dashboard S3](images/aws/Cognito-Facebook.png)

### Paso 7: Barrera Cognito

```html
<script>
    const COGNITO_DOMAIN = "https://us-east-1qawpfkusl.auth.us-east-1.amazoncognito.com";
    const CLIENT_ID = "6oe10kr7ejbcu5cmhd2g8he09a";
    const REDIRECT_URI = "https://d1cq6wgq3znilx.cloudfront.net";

    // Generate random string
    function generateRandomString(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const values = crypto.getRandomValues(new Uint8Array(length));
        values.forEach(v => result += charset[v % charset.length]);
        return result;
    }

    // SHA256 + Base64URL
    async function sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return btoa(String.fromCharCode(...new Uint8Array(hash)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    async function redirectToLogin() {
        const codeVerifier = generateRandomString(64);
        const codeChallenge = await sha256(codeVerifier);

        localStorage.setItem("pkce_verifier", codeVerifier);

        const loginUrl = `${COGNITO_DOMAIN}/login` +
            `?client_id=${CLIENT_ID}` +
            `&response_type=code` +
            `&scope=openid+email` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&code_challenge=${codeChallenge}` +
            `&code_challenge_method=S256`;

        window.location.href = loginUrl;
    }

    async function handleCallback() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) return false;

        const codeVerifier = localStorage.getItem("pkce_verifier");

        const response = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                code: code,
                redirect_uri: REDIRECT_URI,
                code_verifier: codeVerifier
            })
        });

        const tokens = await response.json();

        localStorage.setItem("idToken", tokens.id_token);
        localStorage.setItem("accessToken", tokens.access_token);
        localStorage.setItem("refreshToken", tokens.refresh_token);

        window.history.replaceState({}, document.title, "/");
        return true;
    }

    (async () => {
        const logged = await handleCallback();
        const idToken = localStorage.getItem("idToken");

        if (!logged && !idToken) {
            redirectToLogin();
        }
    })();
    </script>
```
