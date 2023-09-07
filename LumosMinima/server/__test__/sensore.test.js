const supertest = require('supertest')
const sensoreService = require("../services/sensoreService");
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
it("getNumeroSensori should get il numero di sensori totali", async () => {

  const mockLampione = "10";

  Sensore.count = jest.fn()
  Sensore.count.mockReturnValue(mockLampione)

  const result = await sensoreService.getNumeroSensori()



  expect(result).toBe(mockLampione);
});

it("getOneSensore should get il numero di lampioni totali", async () => {

  const mockLampione = [
    {id:1, ip:"1.2.3"}
  ];

  Sensore.findByPk = jest.fn()
  Sensore.findByPk.mockReturnValue(mockLampione)

  const result = await sensoreService.getOneSensore()



  expect(result).toBe(mockLampione);
});

it("aggiungiSensore should aggiungere un sensore", async () => {

  const mockLampione = [{
    id:1,
    ip: 'Baku',
    polling: 10,
    zona_geografica: "panchina",
    tipo_interazione: "PUSH",
    raggio_azione: 4,
    id_area: 2
  }]

  Sensore.create = jest.fn();
  Sensore.create.mockReturnValue(mockLampione);
  newSensore.save = jest.fn();

  const result = await sensoreService.aggiungiSensore(1,10,"Baku","panchina","PUSH",4,2)



  expect(result).toBe(mockLampione);
});
/*
/*
/*
/*
describe("sensori",()=>{
    describe("get numero sensori", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e numero di sensori",async() => {
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
      })
    })
    /*
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
      }),

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
    }),

    
    describe('checkForUpdates', () => {
      it('controlla se ci sono rilevamenti', async () => {
        const guasti = await sensoreService.checkForUpdate()
    
       
       // expect(guasti.stato).toEqual(1);
        //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
        //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
        //expect(guasti.id_area_illuminata).toEqual(11);
        //expect(guasti.data_risoluzione).toEqual(null)
        //expect(guasti[0].area.citta).toEqual('Torino');
        //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
      
      
    
    });
    }),

    describe('getNumeroSensori', () => {
      it('ritorna il numero di sensori', async () => {
        const guasti = await sensoreService.getNumeroSensori()
        expect(guasti).toEqual(23)
    
       
       // expect(guasti.stato).toEqual(1);
        //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
        //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
        //expect(guasti.id_area_illuminata).toEqual(11);
        //expect(guasti.data_risoluzione).toEqual(null)
        //expect(guasti[0].area.citta).toEqual('Torino');
        //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
      
      
    
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
          
      })
    
*/