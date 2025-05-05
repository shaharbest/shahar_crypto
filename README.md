## 🔐 Configuration

Create your own `settings.json` from the example file:

```sh
cp app/settings.example.json app/settings.json
```

Fill in your secrets (e.g. Google OAuth credentials)

---

## ✅ Google OAuth Setup

To enable Google login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create an OAuth 2.0 client (type: Web application)
3. Set the redirect URI to:

```
http://localhost:3000/_oauth/google
```

4. Copy the `clientId` and `secret` into your `settings.json`

