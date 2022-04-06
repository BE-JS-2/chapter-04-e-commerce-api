# chapter-04-e-commerce-api

## Objectives
- Memahami cara menggunakan express untuk membuat API
- Memahami cara kerja middleware
- Memahami menggunakan sequelize untuk berinteraksi dengan database


## Tahap 1
1. Buatlah tabel (migration dan model) berdasarkan ERD berikut: https://dbdiagram.io/d/624d9801d043196e3908ac06
2. Definisikan asosiasi yang sesuai antartabel pada masing-masing model
3. Lakukan seeding pada tabel kategori, seller, dan produk (untuk kolom password pada seller, data tidak perlu dienkripsi)

## Tahap 2
Buatlah API

```
/products (GET)

Keterangan:
Tampilkan list produk. Atribut yang wajib ditampilkan adalah: name, price, stock, nama seller, dan category (penamaan untuk menampilkan atribut dibebaskan)
```

```
/product/:id (GET)

Keterangan:
Tampilkan list produk dengan ID = id. Atribut yang wajib ditampilkan adalah: name, price, stock, nama seller, dan category (penamaan untuk menampilkan atribut dibebaskan)
```

```
/product (POST)

Keterangan:
- Untuk menambahkan produk
- Semua kolom wajib diisi (tidak boleh null)
- Buatlah middleware untuk validasi input (function untuk validasi dibebaskan, untuk referensi bisa coba riset mengenai package express-validator)
```

```
/product/:id (PUT)

Keterangan:
- Untuk mengubah produk
- Buatlah middleware untuk validasi input (function untuk validasi dibebaskan, untuk referensi bisa coba riset mengenai package express-validator)
```

```
/produk/:id (DELETE)

Keterangan:
- Untuk menghapus produk
```


## Tahap 3

Buatlah middleware error handler untuk menangkap error (error tidak dikirim melalui controller, tapi melalui error handler)

## Rocket

Buatlah API

```
/register-user (POST)

Keterangan:
- Untuk mendaftarkan user baru
- Semua field wajib diisi
- Password wajib dienkrip, dan function enkripsi diletakkan di hooks (function enkripsi/hash yang digunakan bebas, untuk referensi bisa coba research package bcrypt.js)
```

```
/login (POST)

Keterangan:
- Untuk login (mengeluarkan token)
- Format token bebas (untuk referensi, bisa coba research package jsonwebtoken)
```

```
/order (POST)

Keterangan:
- Untuk membeli produk
- Produk yang akan dibeli bisa diletakkan id nya di dalam body
- Gunakan middleware autentikasi (hanya user yang sudah login yang bisa mengakses API)
- Jangan lupa untuk mengurangi stok barang setelah mencatatkan data ke tabel transaksi
- Jika memungkinkan, gunakan sequelize transaction
```

```
/order (GET)

Keterangan:
- Untuk mendapatkan semua list transaksi
- Gunakan middleware autentikasi
- User hanya bisa mengakses transaksi miliknya sendiri
- Attribut yang ditampikan (product name, product price, amount)
```

### Notes
- Deadline Jumat, 8 April jam 21.15
- Push ke branch dengan nama masing-masing