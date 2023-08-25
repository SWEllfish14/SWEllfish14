const supertest = require('supertest')
const lampioneService = require("../services/lampioneService");
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
    
