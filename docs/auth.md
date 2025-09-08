# Auth Docs

<!-- ### Daftar query parameter

| **No** | **Query** | **Contoh**  | **Deskripsi**                                                |
| ------ | --------- | ----------- | ------------------------------------------------------------ |
| 1      | note      | note=true   | Mengambil data **User** beserta data **note**                |
| 2      | search    | search=test | mengambil data **User** berdasarkan kata kunci               |
| 3      | today     | today=true  | mengambil data **User** yang melakukan **Register** hari ini | -->

### 1. Login

Endpoint:

```
POST: /api/auth/login
```

Request Body:

```json
{
  "email": "testing@gmail.com",
  "password": "testing"
}
```

**Response (status: 200)**

```json
{
  "data": {
    "token": "abcd-efgh-hijk-lmno",
    "id": "abcd-efgh-ijkl-mnop",
    "username": "testing1234",
    "email": "testing@gmail.com",
    "birthday": "12-05-2025",
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

### 2. Register

Endpoint:

```
POST: /api/auth/register
```

Request Body:

```json
{
  "username": "testing",
  "email": "testing@gmail.com",
  "password": "testing"
}
```

**Response (status: 200)**

```json
{
  "data": {
    "token": "abcd-efgh-hijk-lmno",
    "id": "abcd-efgh-ijkl-mnop",
    "username": "testing1234",
    "email": "testing@gmail.com",
    "birthday": "12-05-2025",
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
