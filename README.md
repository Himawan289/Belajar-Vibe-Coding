# Belajar Vibe Coding - ElysiaJS + Drizzle ORM + MySQL (Bun)

Project backend API modern menggunakan **Bun**, framework **ElysiaJS**, dan **Drizzle ORM** dengan database **MySQL**.

## 🛠 Tech Stack
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Driver**: `mysql2`
- **Database**: MySQL

## 📁 Struktur Folder
```text
.
├── src/
│   ├── db/
│   │   ├── index.ts      # Inisialisasi koneksi Drizzle & pool MySQL
│   │   └── schema.ts     # Definisi schema database (Drizzle MySQL)
│   └── index.ts          # Entrypoint server ElysiaJS & route handlers
├── .env.example          # Template konfigurasi environment
├── .env                  # Konfigurasi environment lokal (di-ignore git)
├── drizzle.config.ts     # Konfigurasi Drizzle Kit untuk migrasi schema
├── package.json
└── tsconfig.json
```

## 🚀 Memulai (Getting Started)

### 1. Setup Environment
Salin file `.env.example` ke `.env` dan sesuaikan kredensial MySQL Anda:
```bash
cp .env.example .env
```

### 2. Migrasi Database (Drizzle Kit)
Untuk menyinkronkan schema ke database MySQL:
```bash
# Push schema langsung ke database (prototyping/development)
bun run db:push

# Atau generate file migrasi SQL
bun run db:generate
bun run db:migrate
```

Untuk membuka GUI Drizzle Studio:
```bash
bun run db:studio
```

### 3. Menjalankan Server
```bash
# Mode development (hot reload)
bun run dev

# Mode production
bun run start
```

Server default berjalan di `http://localhost:3000`.

## 🌐 Endpoints
- `GET /` : Welcome message & status server
- `GET /health` : Health check endpoint
- `GET /users` : Mendapatkan seluruh daftar user dari database
- `POST /users` : Menambahkan user baru (Body: `{ "name": "string", "email": "string" }`)
