const supertest = require('supertest')
const guastoService = require("../services/guastoService");
const createServer = require("../server");
const { EmptyResultError } = require('sequelize');
const app = createServer()
const guastiPayload={
    ID:1,
    data_rilevamento:"2023-04-13",
    stato:null,
    id_area_illuminata:11,
    data_risoluzione:null
}
const deleteAllGuastiAreaPayload =  { " ": " "}
const guastoChiusoPayload={
  ID:1,
  data_rilevamento:"2023-04-13",
  stato:1,
  id_area_illuminata:11,
  data_risoluzione:null
}
const guastiApertiPayload={
  ID:1,
  data_rilevamento:"2023-04-13",
  stato:0,
  id_area_illuminata:11,
  data_risoluzione:null
}
const guastiChiusiPayload={
  ID:1,
  data_rilevamento:"2023-04-13",
  stato:1,
  id_area_illuminata:11,
  data_risoluzione:"2023-09-04"
}

const guastiPerSensorePayload={
  ID:1,
  data_rilevamento:"2023-04-13",
  stato:1,
  note : "sensore rotto",
  id_area_illuminata:11,
  data_risoluzione:"2023-09-04"
}
describe("guasti",()=>{
    describe("get numero guasti", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e numero di guasti",async() => {
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
      })
    
        
        it("ritorna numero di guasti",async() => {
          const getNumeroGuastiServiceMock = jest.
          spyOn(guastoService,"getNumeroGuasti")
          .mockReturnValueOnce(9)
  
          const {statusCode, body} = await supertest(app)
            .get("/numeroGuasti")
          expect(body).toEqual({numeroGuasti:9})
          expect(getNumeroGuastiServiceMock).toHaveBeenCalled();
        })
        it("numero di guasti",async() => {

          Guasto.count = jest.fn();
          Guasto.count.mockReturnValue(12)
          const result = await guastoService.getNumeroGuasti()
  
          expect(result).toBe('12')
          
         /* const {statusCode, body} = await supertest(app)
            .get("/numeroAree")
          expect(statusCode).toBe(200)
          expect(body).toEqual({numeroAree:50})
          expect(getNumeroAreeServiceMock).toHaveBeenCalled();
          */
        })
    
      
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
          })
        
      
          
      describe("get tutti guasti aperti", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e lista dei guasti aperti",async() => {
            const getAllGuastiServiceMock = jest.
            spyOn(guastoService,"getAllGuastiAperti")
            .mockReturnValueOnce(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
    
            const {statusCode, body} = await supertest(app)
              .get("/guastiAperti")
            expect(statusCode).toBe(200)
            expect(body).toEqual(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
            expect(getAllGuastiServiceMock).toHaveBeenCalled();
          })
          it("guasti aperti",async() => {

            Guasto.findAll = jest.fn();
            Guasto.findAll.mockReturnValue(guastiApertiPayload)
            const result = await guastoService.getAllGuastiAperti()
    
            expect(result).toBe(guastiApertiPayload)
            
           /* const {statusCode, body} = await supertest(app)
              .get("/numeroAree")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroAree:50})
            expect(getNumeroAreeServiceMock).toHaveBeenCalled();
            */
          })
      
        })
      })

      describe("get tutti guasti chiusi", () => {
        describe("Il database risponde correttamente", () => {
          it("Ritorna stato 200 e lista dei guasti chiusi",async() => {
            const getAllGuastiServiceMock = jest.
            spyOn(guastoService,"getAllGuastiChiusi")
            .mockReturnValueOnce(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
    
            const {statusCode, body} = await supertest(app)
              .get("/guastiChiusi")
            expect(statusCode).toBe(200)
            expect(body).toEqual(Array(guastiPayload,guastiPayload,guastiPayload,guastiPayload))
            expect(getAllGuastiServiceMock).toHaveBeenCalled();
          })
          it("guasti chiusi",async() => {

            Guasto.findAll = jest.fn();
            Guasto.findAll.mockReturnValue(guastiChiusiPayload)
            const result = await guastoService.getAllGuastiChiusi()
    
            expect(result).toBe(guastiChiusiPayload)
            
           /* const {statusCode, body} = await supertest(app)
              .get("/numeroAree")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroAree:50})
            expect(getNumeroAreeServiceMock).toHaveBeenCalled();
            */
          })

         
              it("guasti per sensore rotto",async() => {
    
                Guasto.findAll = jest.fn();
                Guasto.findAll.mockReturnValue(guastiPerSensorePayload)
                const result = await guastoService.getGuastiForSensoreRotto()
        
                expect(result).toBe(guastiPerSensorePayload)
                
               /* const {statusCode, body} = await supertest(app)
                  .get("/numeroAree")
                expect(statusCode).toBe(200)
                expect(body).toEqual({numeroAree:50})
                expect(getNumeroAreeServiceMock).toHaveBeenCalled();
                */
              })

              it("getOneGuasto",async() => {
    
                Guasto.findByPk = jest.fn();
                Guasto.findByPk.mockReturnValue(guastiPayload)
                const result = await guastoService.getOneGuasto(1)
        
                expect(result).toBe(guastiPayload)
                
               /* const {statusCode, body} = await supertest(app)
                  .get("/numeroAree")
                expect(statusCode).toBe(200)
                expect(body).toEqual({numeroAree:50})
                expect(getNumeroAreeServiceMock).toHaveBeenCalled();
                */
              })

              it("eliminaGuastiArea",async() => {
    
                Guasto.findAll = jest.fn();
                Guasto.findAll.mockReturnValue(" ")
                const result = await guastoService.eliminaGuastiArea(1)
        
                expect(result).toBe(" ")
                
               /* const {statusCode, body} = await supertest(app)
                  .get("/numeroAree")
                expect(statusCode).toBe(200)
                expect(body).toEqual({numeroAree:50})
                expect(getNumeroAreeServiceMock).toHaveBeenCalled();
                */
              })
  
          
      
        })
      })
    })
    
      

   /*

      describe('getOneGuasto', () => {
        it('should return un guasti', async () => {
          const guasti = await guastoService.getOneGuasto(1);
      
        
          expect(guasti.ID).toEqual(1);
          expect(guasti.stato).toEqual(1);
          //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
          expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
          expect(guasti.id_area_illuminata).toEqual(11);
          expect(guasti.data_risoluzione).toEqual("2023-08-31")
          //expect(guasti[0].area.citta).toEqual('Torino');
          //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
        })
      })

      describe('getOneGuasto', () => {
        it('should return un guasti', async () => {
          const guasti = await guastoService.getOneGuasto(1);
      
        
          expect(guasti.ID).toEqual(1);
          expect(guasti.stato).toEqual(1);
          //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
          expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
          expect(guasti.id_area_illuminata).toEqual(11);
          expect(guasti.data_risoluzione).toEqual("2023-08-31")
          //expect(guasti[0].area.citta).toEqual('Torino');
          //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
        });
      }),

      /*describe('aggiungiGuasto', () => {
        it('should return "Guasto aggiunto"', async () => {
          const risultato = await guastoService.aggiungiGuasto('2023-08-29', '0', 'Guasto al semaforo in via Roma', 1);
      
          expect(risultato).toEqual('Guasto aggiunto');
        });
      }),
      */
      
       /* it('should create a new guasto with the given data', async () => {
          const risultato = await guastoService.aggiungiGuasto('2023-08-29', '0', 'Guasto al semaforo in via Roma', 1);
      
          expect(risultato).toEqual('Guasto aggiunto');
      
          const guasti = await Guasto.findAll();
      
          expect(guasti).toHaveLength(15);
          expect(guasti[0].id).toEqual(2);
          //expect(guasti[0].data_rilevamento).toEqual(new Date(2023, 8, 29, 16, 3, 32, 948));
          expect(guasti[0].stato).toEqual('Aperto');
          expect(guasti[0].note).toEqual('Guasto al semaforo in via Roma');
          expect(guasti[0].id_area_illuminata).toEqual(1);
        });
      });
      */
/*
      describe('modificaGuasto', () => {
        it('should return "Guasto modificato"', async () => {
          const risultato = await guastoService.modificaGuasto(10,'2023-01-07', '1', 10, new Date());
      
          expect(risultato).toEqual('Guasto modificato');
        });
      }),

      
        /*describe("get numero dei guasti a sistema", () => {
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
*/
        /*describe("Il database risponde con un errore", () => {
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
      */
     
    /*  describe('chiudiGuasto', () => {
        it('cambia lo stato di un guasto da 0 a 1', async () => {
          const risultato = await guastoService.aggiungiGuasto('2023-01-07',0, '1111111', 10);
          const modifica = await guastoService.chiudiGuasto(12);

          const guastoModificato = await guastoService.getOneGuasto(12)
          expect(guastoModificato.stato).toEqual(1);
        });
      }),
      describe('eliminaGuasto', () => {
        it('should return il numero di righe eliminate', async () => {
      
          const ris2 = await guastoService.eliminaGuasto(12)

          const numero = await guastoService.getNumeroGuasti()
          expect(numero).toEqual("11");
        });
      }),
      describe('getGuastiForSensoreRotto', () => {
        it('ritorna gli id dei guasti per sensore rotto"', async () => {
          const risultato = await guastoService.getGuastiForSensoreRotto();
      
          expect(risultato[0].ID).toEqual(11);
        });
      }),

      describe('getNumeroGuasti', () => {
        it('should return il numero dei guasti', async () => {
          const guasti = await guastoService.getNumeroGuasti();
      
          
         // expect(guasti).toHaveLength(10);
          expect(guasti).toEqual("11");
          //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
          //expect(guasti[0].note).toEqual('Lampioni intermittenti area parco. Analisi connessioni rileva connettore ossidato. Pulizia e ricostruzione connessione risolvono l instabilità.');
          //expect(guasti[0].id_area_illuminata).toEqual(5);
          //expect(guasti[0].data_risoluzione).toEqual(null)
          //expect(guasti[0].area.citta).toEqual('Torino');
          //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
        });
      }),
     
    })

    */