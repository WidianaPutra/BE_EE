# User Docs

### Daftar query parameter

| **No** | **Query** | **Contoh**  | **Deskripsi**                                                |
| ------ | --------- | ----------- | ------------------------------------------------------------ |
| 1      | note      | note=true   | Mengambil data **User** beserta data **note**                |
| 2      | search    | search=test | mengambil data **User** berdasarkan kata kunci (email)       |
| 3      | today     | today=true  | mengambil data **User** yang melakukan **Register** hari ini |

### 1. Get User By User Id

Endpoint:

```
GET: /api/user/:userId
```

Contoh Request:

```
GET: /api/user/abcd-efgh-ijkl-mnop
```

**Response (status: 200)**

```json
{
  "data": {
    "id": "abcd-efgh-ijkl-mnop",
    "username": "testing1234",
    "email": "testing@gmail.com",
    "birthday": "12-05-2025",
    "createdAt": "12-05-2025",
    "updatedAt": "12-05-2025",
    "note": {
      "id": "abcd-efgh-ijkl-mnop",
      "note": "Testing123",
      "title": "My Little D",
      "createdAt": "12-05-2025",
      "updatedAt": "12-05-2025"
    }
  }
}
```

**Response (status: 404)**

```json
{
  "error": {
    "detail": "User not found"
  }
}
```

---

### 2. Get All User

Endpoint:

```
GET: /api/user
```

<!-- Contoh Request:

```
GET: /api/user/abcd-efgh-ijkl-mnop
``` -->

**Response (status: 200)**

```json
{
  "data": [
    {
      "id": "abcd-efgh-ijkl-mnop",
      "username": "testing1234",
      "email": "testing@gmail.com",
      "birthday": "12-05-2025",
      "createdAt": "12-05-2025",
      "updatedAt": "12-05-2025",
      "note": {
        "id": "abcd-efgh-ijkl-mnop",
        "note": "Testing123",
        "title": "My Little D",
        "createdAt": "12-05-2025",
        "updatedAt": "12-05-2025"
      }
    }
  ]
}
```

**Response (status: 404)**

```json
{
  "error": {
    "detail": "User not found"
  }
}
```
