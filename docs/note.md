# Note Docs

### Daftar query parameter

| **No** | **Query** | **Contoh**  | **Deskripsi**                                          |
| ------ | --------- | ----------- | ------------------------------------------------------ |
| 1      | search    | search=test | mengambil data **Note** berdasarkan kata kunci (title) |
| 2      | today     | today=true  | mengambil data **Note** yang dibuat pada hari ini      |
| 3      | user      | user=true   | mengambil data **Note** beserta data **User**          |

### 1. Mendabahkan Catatan baru

Endpoint:

```
POST: /api/note
```

Request Body:

```json
{
  "userId": "abcd-efgh-ijkl-mnop",
  "title": "Sebuah Cerita",
  "note": "Pada suatu hari..."
}
```

**Response (status: 200)**

```json
{
  "data": {
    "id": "abcd-efgh-ijkl-mnop",
    "title": "Sebuah Cerita",
    "note": "Pada suatu hari...",
    "createdAt": "12-05-2025",
    "updatedAt": "12-05-2025"
  }
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---

### 2. Mengambil Semua Data Note

- Semua query bisa digunakan

Endpoint:

```
GET: /api/note
```

Contoh Request:

```
GET: /api/note
```

**Response (status: 200)**

```json
{
  "data": [
    {
      "id": "abcd-efgh-ijkl-mnop",
      "title": "Sebuah Cerita",
      "note": "Pada suatu hari...",
      "createdAt": "12-05-2025",
      "updatedAt": "12-05-2025"
    }
  ]
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---

### 3. Mengambil Note Berdasarkan ID User

- Semua query bisa digunakan

Endpoint:

```
GET: /api/user/:userId/note
```

Contoh Request:

```
GET: /api/user/abcd-efgh-ijkl-mnop/note
```

**Response (status: 200)**

```json
{
  "data": [
    {
      "id": "abcd-efgh-ijkl-mnop",
      "title": "Sebuah Cerita",
      "note": "Pada suatu hari...",
      "createdAt": "12-05-2025",
      "updatedAt": "12-05-2025"
    }
  ]
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---

### 4. Mengambil Note Berdasarkan ID Note

Endpoint:

```
GET: /api/note/:noteId
```

Contoh Request:

```
GET: /api/note/abcd-efgh-ijkl-mnop
```

**Response (status: 200)**

```json
{
  "data": {
    "id": "abcd-efgh-ijkl-mnop",
    "title": "Sebuah Cerita",
    "note": "Pada suatu hari...",
    "createdAt": "12-05-2025",
    "updatedAt": "12-05-2025"
  }
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---

### 5. Menghapus Note

Endpoint:

```
DELETE: /api/note/:noteId
```

Contoh Request:

```
DELETE: /api/note/abcd-efgh-ijkl-mnop
```

**Response (status: 200)**

```json
{
  "data": {
    "id": "abcd-efgh-ijkl-mnop",
    "title": "Sebuah Cerita",
    "note": "Pada suatu hari...",
    "createdAt": "12-05-2025",
    "updatedAt": "12-05-2025"
  }
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---

### 6. Memperbaharui Note

Endpoint:

```
PATCH: /api/note/:noteId
```

Contoh Request:

```
PATCH: /api/note/abcd-efgh-ijkl-mnop
```

**Request Body**

```json
{
  "title": "new Testing",
  ...
}
```

- Request Body minimal memiliki 1 data

**Response (status: 200)**

```json
{
  "data": {
    "id": "abcd-efgh-ijkl-mnop",
    "title": "Sebuah Cerita",
    "note": "Pada suatu hari...",
    "createdAt": "12-05-2025",
    "updatedAt": "12-05-2025"
  }
}
```

**Response (Jika Error)**

```json
{
  "error": {
    "detail": "Error Details"
  }
}
```

---
