# Be-Anynote
Be-Anynote adalah backend note untuk menyimpan catatan, dilengkapi dengan fitur user dan auth menggunakan passport js dan session.

## Perintah Menjalankan
+ npm install
+ npm run start:dev

  jangan lupa membuat file .env sesuai dengan file .sample.env

## Endpoint

### users
* /api/users (get, post)
* /api/users/:id (get, patch, delete)

### auth
* /api/auth (post)
* /api/auth/status (get)
* /api/auth/logout (post)

### notes
* /api/notes (get, post)
* /api/notes/:id (get, patch, delete)
