
# Endpoints
 Obs: 
	- Campos seguidos de * são obrigatórios

###  Driver

Criar motorista
- **POST**  /driver
{
	"name": string*
}

Alterar motorista pelo ID
- **PUT** /driver/<DRIVER_ID>
{
	"name": string*
}

Pesquisar e listar motoristas
- **GET** /driver
page: number
pageSize: number
searchText: string

Visualizar motorista pelo ID
- **GET** /driver/<DRIVER_ID>

Deletetar motorista
- **DELETE** /driver/<DRIVER_ID>
	

---

### Car

Criar carro
- **POST** /car
{
	"licencePlate": string*,
	"color": string*,
	"brand": string*
}

Alterar carro pelo ID
- **PUT** /car/<DRIVER_ID>
{
	"licencePlate": string*,
	"color": string*,
	"brand": string*
}

Pequisar e listar motoristas
- **GET** /car
color: string
brand: string
licencePlate: string
page: number
pageSize: number

Visualizar motorista pelo ID
- **GET** /car/<DIVER_ID>

Deletar motorista pelo ID
- **DETELE** /car/<DRIVER_ID>

### Allocation

Registar alocação de carro a um mtorista

- **POST** /allocation
{
	"carId": number*,
	"driverId": number*,
	"observation": string*
}

Finalizar alocação de carro a motorista 

- **PATCH** /allocation/<DRIVER_ID>

Pesquisar e listar motoristas

- **GET** /allocation
activeOnly: boolean
driverId: number
carId: number
page: number
pageSize: number

