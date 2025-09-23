# Phonebook API

## Base URL
`https://fullstackopen-phonebook-2w4s.onrender.com`

## End-points

### GET `/api/info`

Returns info about the phonebook (e.g., number of entries and current server time).

- **URL:** `/api/info`
- **Method:** `GET`
- **Accept:** `text/html`

#### Example Response
```html
<p>Phonebook has info for 8 people</p>
<p>Tue Sep 23 2025 14:12:45 GMT+0000 (UTC)</p>
```

### GET `/api/persons`

Returns a list of all persons in the phonebook.

- **URL:** `/api/persons`
- **Method:** `GET`
- **Accept:** `application/json`

#### Example Response
```json
[
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  ...
]
```

### GET `/api/persons/:id`

Returns the person with the specified id.

- **URL:** `/api/persons/:id`
- **Method:** `GET`
- **Accept:** `application/json`

#### Example Response

```json
{
  "id": 2,
  "name": "Ada Lovelace",
  "number": "04859290339"
}


```
### DELETE `/api/persons/:id`

Deletes the person with the specified id.

- **URL:** `/api/persons/:id`
- **Method:** `DELETE`
- **Success Response Code:** `204 No Content`

### POST `/api/persons`

Creates a new person entry.

- **URL:** `/api/persons`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Valid Request Body
```json
{
  "name": "Big Bad Bob",
  "number": "04859290339"
}
```

#### Missing Name Example (Invalid)
```json
{
  "number": "04859290339"
}
```