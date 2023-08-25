const supertest = require('supertest')
const lampioneService = require("../services/sensoreService");
const createServer = require("../server");
const app = createServer()
const sensorePayload={
    ID:1,
    IP:"200.98.144.217",
    polling_time:7,
    zona_geografica_posizionamento:"Entrata Stadio",
    tipo_interazione:"PUSH",
    raggio_azione:33,
    id_area_illuminata: 5
}
describe("sensori",()=>{
    describe("get numero sensori", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e numero di lampioni",async() => {
            const getNumeroSensoriServiceMock = jest.
            spyOn(sensoreService,"getNumeroSensori")
            .mockReturnValueOnce(22)
    
            const {statusCode, body} = await supertest(app)
              .get("/numeroSensori")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroSensori:22})
            expect(getNumeroSensoriServiceMock).toHaveBeenCalled();
          })
        })
        describe("Il database risponde con un errore", () => {
            it("Ritorna stato 500",async() => {
              const getNumeroSensoriServiceMock = jest.
              spyOn(sensoreService,"getNumeroSensori").mockImplementation(() => {
                throw new Error();})
      
              const {statusCode, body} = await supertest(app)
                .get("/numeroSensori")
              expect(statusCode).toBe(500)
              expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
              expect(getNumeroSensoriServiceMock).toHaveBeenCalled();
              expect(getNumeroSensoriServiceMock).toThrowError()
            })
          })
      })

      describe("get tutti sensori ", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e la lista dei sensori di un'area",async() => {
            const getAllSensoriServiceMock = jest.
            spyOn(sensoreService,"getAllSensoriFromArea")
            .mockReturnValueOnce(Array(sensorePayload,sensorePayload,sensorePayload,sensorePayload))
    
            const {statusCode, body} = await supertest(app)
              .get("/sensori/1")
            expect(statusCode).toBe(200)
            expect(body).toEqual(Array(sensorePayload,sensorePayload,sensorePayload,sensorePayload))
            expect(getAllSensoriServiceMock).toHaveBeenCalled();
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
    
