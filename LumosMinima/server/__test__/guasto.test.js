const supertest = require('supertest')
const guastoService = require("../services/guastoService");
const createServer = require("../server");
const app = createServer()
const guastiPayload={
    ID:1,
    data_rilevamento:"2023-04-13",
    stato:null,
    id_area_illuminata:11,
    data_risoluzione:null
}
describe("guasti",()=>{
    describe("get numero guasti", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e numero di guasti",async() => {
            const getNumeroGuastiServiceMock = jest.
            spyOn(guastoService,"getNumeroGuasti")
            .mockReturnValueOnce(5)
    
            const {statusCode, body} = await supertest(app)
              .get("/numeroGuasti")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroGuasti:5})
            expect(getNumeroGuastiServiceMock).toHaveBeenCalled();
          })
        }),
        describe("Il database risponde con un errore", () => {
            it("Ritorna stato 500",async() => {
              const getNumeroGuastiServiceMock = jest.
              spyOn(guastoService,"getNumeroGuasti").mockImplementation(() => {
                throw new Error();})
      
              const {statusCode, body} = await supertest(app)
                .get("/numeroGuasti")
              expect(statusCode).toBe(500)
              expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
              expect(getNumeroGuastiServiceMock).toHaveBeenCalled();
              expect(getNumeroGuastiServiceMock).toThrowError()
            })
          }),
      

      describe("get tutti guasti", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e lista dei guasti",async() => {
            const getAllGuastiServiceMock = jest.
            spyOn(guastoService,"getAllGuasti")
            .mockReturnValueOnce(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
    
            const {statusCode, body} = await supertest(app)
              .get("/guasti")
            expect(statusCode).toBe(200)
            expect(body).toEqual(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
            expect(getAllGuastiServiceMock).toHaveBeenCalled();
          })
        })
      }),

      

        describe("get numero dei guasti a sistema", () => {
          describe("Il database risponde correttamente", () => {
            it("Ritorna stato 200 e il numero dei guasti",async() => {
              const getNumeroGuastiServiceMock = jest.
              spyOn(guastoService,"getNumeroGuasti")
              .mockReturnValueOnce(9)
      
              const {statusCode, body} = await supertest(app)
                .get("/numeroGuasti")
              expect(statusCode).toBe(200)
              expect(body).toEqual({numeroGuasti:9})
              expect(getNumeroGuastiServiceMock).toHaveBeenCalled();
            })
          })
        }),

        describe("Il database risponde con un errore", () => {
            it("Ritorna stato 500",async() => {
              const getAllGuastiServiceMock = jest.
              spyOn(guastoService,"getAllGuasti").mockImplementation(() => {
                throw new Error();})
      
              const {statusCode, body} = await supertest(app)
                .get("/guasti")
              expect(statusCode).toBe(500)
              expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
              expect(getAllGuastiServiceMock).toHaveBeenCalled();
              expect(getAllGuastiServiceMock).toThrowError()
            })
          })
      })
      describe('Elimina guasto', () => { 
        describe("Dato un id valido", () => {
          it("Ritorna stato 200 e numero di righe eliminate", async() => {
            const eliminaAreaServiceMock = jest.
            spyOn(guastoService,"eliminaGuasto")
            .mockReturnValueOnce(`deleted row(s): 1`)
            const { statusCode, body } = await supertest(app)
              .post("/eliminaGuasto/1")
              .send("1");
              expect(statusCode).toBe(200)
              expect(body).toEqual({"result":`deleted row(s): 1`})
              expect(eliminaAreaServiceMock).toHaveBeenCalled();
          })
        })
       })
    

})