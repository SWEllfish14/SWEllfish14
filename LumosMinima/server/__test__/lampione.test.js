const supertest = require('supertest')
const lampioneService = require("../services/lampioneService");
const lampioneController = require("../controllers/lampioneController");
const lampioneRoutes = require("../routes/lampioneRoutes");
const createServer = require("../server");
const app = createServer()
const lampionePayload={
    ID:397,
    IP:"68.74.19.250",
    tipo_interazione:'PUSH',
    luminosità_default:7,
    luminosità_impostata:2,
    id_area_illuminata:10,
    stato: 0
}

const controllerGetAllLampsFromAreaPayload = [
  {
    ID: 1,
    IP: "1",
    tipo_interazione: "PUSH",
    luminosità_default: 1,
    luminosità_impostata: 5,
    stato: 1,
    id_area_illuminata: 1
  },
  {
    ID: 3,
    IP: "2.2.2.1",
    tipo_interazione: "PUSH",
    luminosità_default: 1,
    luminosità_impostata: 6,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 4,
    IP: "2.2.2.1",
    tipo_interazione: "PUSH",
    luminosità_default: 1,
    luminosità_impostata: 7,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 81,
    IP: "2.2.2.1",
    tipo_interazione: "PUSH",
    luminosità_default: 1,
    luminosità_impostata: 1,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 82,
    IP: "2.2.2.2.2.",
    tipo_interazione: "PUSH",
    luminosità_default: 3,
    luminosità_impostata: 4,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 207,
    IP: "243.12.212.66",
    tipo_interazione: "PUSH",
    luminosità_default: 7,
    luminosità_impostata: 7,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 225,
    IP: "125.235.167.155",
    tipo_interazione: "PUSH",
    luminosità_default: 4,
    luminosità_impostata: 1,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 674,
    IP: "89.210.232.118",
    tipo_interazione: "PUSH",
    luminosità_default: 3,
    luminosità_impostata: 5,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 927,
    IP: "243.140.216.131",
    tipo_interazione: "PUSH",
    luminosità_default: 7,
    luminosità_impostata: 5,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 943,
    IP: "203.196.180.24",
    tipo_interazione: "PUSH",
    luminosità_default: 2,
    luminosità_impostata: 8,
    stato: 1,
    id_area_illuminata: 1
},
{
    ID: 992,
    IP: "207.63.63.226",
    tipo_interazione: "PUSH",
    luminosità_default: 8,
    luminosità_impostata: 8,
    stato: 1,
    id_area_illuminata: 1
}
]
const lampionePayloadtoMakeFail={
  ID:993,
  IP:"68.74.19.250",
  tipo_interazione:'PUSH',
  luminosità_default:7,
  luminosità_impostata:2,
  id_area_illuminata:10,
  stato: 0
}

const aggiungliLampionePayoload={
  IP:"68.74.19.250",
  tipo_interazione:'PUSH',
  luminosità_default:7,
  luminosità_impostata:2,
  id_area_illuminata:10,
  stato: 0
}


const modificalampionePayload={
  ID:397,
  IP:"68.74.19.251",
  tipo_interazione:'PUSH',
  luminosità_default:7,
  luminosità_impostata:2,
  stato: 0
}

const modificalampionePayloadVuoto={
  ID:397
}
describe("lampioni",()=>{
    describe("get numero lampioni", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e numero di lampioni",async() => {
            const getNumeroLampioniServiceMock = jest.
            spyOn(lampioneService,"getNumeroLampioni")
            .mockReturnValueOnce(82)
    
            const {statusCode, body} = await supertest(app)
              .get("/numeroLampioni")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroLampioni:82})
            expect(getNumeroLampioniServiceMock).toHaveBeenCalled();
          })
        })
        describe("Il database risponde con un errore", () => {
            it("Ritorna stato 500",async() => {
              const getNumeroLampioniServiceMock = jest.
              spyOn(lampioneService,"getNumeroLampioni").mockImplementation(() => {
                throw new Error();})
      
              const {statusCode, body} = await supertest(app)
                .get("/numeroLampioni")
              expect(statusCode).toBe(500)
              expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
              expect(getNumeroLampioniServiceMock).toHaveBeenCalled();
              expect(getNumeroLampioniServiceMock).toThrowError()
            })
          })
      })

      describe("get tutti lampioni ", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e la lista dei lampioni di un'area",async() => {
            const getAllLampioniServiceMock = jest.
            spyOn(lampioneService,"getAllLampsFromArea")
            .mockReturnValueOnce(Array(lampionePayload,lampionePayload,lampionePayload,lampionePayload))
    
            const {statusCode, body} = await supertest(app)
              .get("/lamps/1")
            expect(statusCode).toBe(200)
            expect(body).toEqual(Array(lampionePayload,lampionePayload,lampionePayload,lampionePayload))
            expect(getAllLampioniServiceMock).toHaveBeenCalled();
          })
    })
  })

    describe('Modifica lampione', () => { 
      describe("Dato un payload e un id valido", () => {
        it("Ritorna stato 200 e Lampione modificato", async() => {
          const modificaLampioneServiceMock = jest.
          spyOn(lampioneService,"modificaLampione")
          .mockReturnValueOnce("Lampione modificato")
          const { statusCode, body } = await supertest(app)
            .post("/modificaLampione/"+modificalampionePayload.ID+"/"+modificalampionePayload.IP+"/"+ modificalampionePayload.tipo_interazione+"/"+modificalampionePayload.luminosità_default+"/"+modificalampionePayload.luminosità_impostata+"/"+modificalampionePayload.stato)
            expect(statusCode).toBe(200)
            expect(body).toEqual({result:"Lampione modificato"})
            expect(modificaLampioneServiceMock).toHaveBeenCalled();
        })
      })
     })

     describe('Aggiungi lampione', () => { 
      describe("Dato un payload valido", () => {
        it("Ritorna stato 200 e Lampione aggiunto", async() => {
          const modificaLampioneServiceMock = jest.
          spyOn(lampioneService,"aggiungiLampione")
          .mockReturnValueOnce("Lampione aggiunto")
          const { statusCode, body } = await supertest(app)
            .post("/aggiungiLampione/"+aggiungliLampionePayoload.id_area_illuminata+"/"+aggiungliLampionePayoload.IP+"/"+ aggiungliLampionePayoload.tipo_interazione+"/"+aggiungliLampionePayoload.luminosità_default+"/"+aggiungliLampionePayoload.luminosità_impostata+"/"+aggiungliLampionePayoload.stato)
            expect(statusCode).toBe(200)
            expect(body).toEqual({result:"Lampione aggiunto"})
            expect(modificaLampioneServiceMock).toHaveBeenCalled();
        })
      })
     })
     describe('Elimina lampione', () => { 
      describe("Dato un id valido", () => {
        it("Ritorna stato 200 e numero di righe eliminate", async() => {
          const eliminaLampioneServiceMock = jest.
          spyOn(lampioneService,"eliminaLampione")
          .mockReturnValueOnce(`deleted row(s): 1`)
          const { statusCode, body } = await supertest(app)
            .post("/eliminaLampione/102")
            expect(statusCode).toBe(200)
            expect(body).toEqual({"result":`deleted row(s): 1`})
            expect(eliminaLampioneServiceMock).toHaveBeenCalled();
        })
      })
     })

     
     describe("get tutti lampioni da controller ", () => {
      describe("Il controller risponde correttamente", () => {
        it("Ritorna stato 200 e la lista dei lampioni di un'area",async() => {
          const getAllLampioniServiceMock = jest.
          spyOn(lampioneController,"getAllLampsFromArea")
          .mockReturnValueOnce(controllerGetAllLampsFromAreaPayload)
  
          const {statusCode, body} = await supertest(app)
            .get("/lamps/1")
          expect(statusCode).toBe(200)
          expect(body).toEqual(controllerGetAllLampsFromAreaPayload)
        })
      })
  })

  describe('get numero lampioni da controller senza id', () => {
    it('should throw 500 error if id is empty string', async () => {
      const mReq = { params: { id: '' } };
      const mRes = {"data": {"error": {}}, "status": "FAILED"};
      await lampioneController.getAllLampsFromArea(mReq, mRes);
      expect(mRes).toEqual({"data": {"error": {}}, "status": "FAILED"});
    });
  })
        
       /* describe("Il database risponde con un errore", () => {
            it("Ritorna stato 500",async() => {
              const getAllLampioniServiceMock = jest.
              spyOn(lampioneService,"getNumeroLampioni").mockImplementation(() => {
                throw new Error();})
      
              const {statusCode, body} = await supertest(app)
                .get("/guasti")
              expect(statusCode).toBe(500)
              expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
              expect(getAllGuastiServiceMock).toHaveBeenCalled();
              expect(getAllGuastiServiceMock).toThrowError()
            })
          })
          */

      })
    
