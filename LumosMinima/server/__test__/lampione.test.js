
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

/*it("getBrightnessofArea should get la luminosità di un'area", async () => {
  const mockAreas = [

   { id: 1, name: "Area 1" }
  ]

  const mockLuminosità = 0;

  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)

  const result = await lampioneService.getBrightnessofArea(mockAreas)



  expect(result).toBe(mockLuminosità);
});
*/
it('should return the standard brightness of the area', async () => {
  const id = 1;
  const expectedBrightness = 10;

  // Create a mock function for the Area.findAll() method.
    Area.findAll =  jest.fn().mockReturnValue([
      {
        luminosità_standard: expectedBrightness,
      }]);

  // Replace the real Area module with the mock function.

  const brightness = await lampioneService.getBrightnessofArea(id);

  expect(brightness).toBe(expectedBrightness);
});

it('should return the manual brightness of the area', async () => {
  const id = 1;
  const expectedManualBrightness = 10;

  // Create a mock function for the Area.findAll() method.
    Area.findAll =  jest.fn().mockReturnValue([
      {
        luminosità_manuale: expectedManualBrightness,
      }]);

  // Replace the real Area module with the mock function.

  const brightness = await lampioneService.getBrightnessManualeArea(id);

  expect(brightness).toBe(expectedManualBrightness);
});


it('should return the rilevamento brightness of the area', async () => {
  const id = 1;
  const expectedRilevamentoBrightness = 9;

  // Create a mock function for the Area.findAll() method.
    Area.findAll =  jest.fn().mockReturnValue([
      {
        luminosità_rilevamento: expectedRilevamentoBrightness,
      }]);

  // Replace the real Area module with the mock function.

  const brightness = await lampioneService.getBrightnessRilevamento(id);

  expect(brightness).toBe(expectedRilevamentoBrightness);
});

it('should return the brightness of a lamp', async () => {
  const id = 1;
  const expectedLampBrightness = 9;

  // Create a mock function for the Area.findAll() method.
    Lampione.findAll =  jest.fn().mockReturnValue([
      {
        luminosità_impostata: expectedLampBrightness,
      }]);

  // Replace the real Area module with the mock function.

  const brightness = await lampioneService.getBrightnessofLamp(id);

  expect(brightness).toBe(expectedLampBrightness);
});



it("getAllLampsFromAreaCount should get il numero di lampioni di un'area", async () => {

  const mockLampione = 10;

  Lampione.count = jest.fn()
  Lampione.count.mockReturnValue(mockLampione)

  const result = await lampioneService.getAllLampsFromAreaCount()



  expect(result).toBe(mockLampione);
});
it("getNumeroLampioni should get il numero di lampioni totali", async () => {

  const mockLampione = "10";

  Lampione.count = jest.fn()
  Lampione.count.mockReturnValue(mockLampione)

  const result = await lampioneService.getNumeroLampioni()



  expect(result).toBe(mockLampione);
});

describe('modificaLampione', () => {
  it('should update an Area and return "Area modificata"', async () => {
    // Arrange
    const mockId = 1; // Replace with your desired mock ID
    const mockData = {
      id:1,
      ip: '1.2.3',
      tipo_interazione: 'PUSH',
      luminositaDefault: 4,
      luminositaManuale: 5,
      stato: 1,
    };

    // Mock the Sequelize findByPk method to return a mock 'area' instance
    const lampioneInstance = {
      update: jest.fn().mockResolvedValue({}),
    };
    Lampione.findByPk = jest.fn();
    Lampione.findByPk.mockResolvedValue(lampioneInstance);

    // Act
    const result = await lampioneService.modificaLampione(
      mockId,
      mockData.id,
      mockData.ip,
      mockData.tipo_interazione,
      mockData.luminositaDefault,
      mockData.luminositaManuale,
      mockData.stato
    );

    // Assert
    expect(result).toBe('Lampione modificato');
    expect(Lampione.findByPk).toHaveBeenCalledWith(mockId);

  });
});


/*
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
            .mockReturnValueOnce(85)
    
            const {statusCode, body} = await supertest(app)
              .get("/numeroLampioni")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroLampioni:85})
            expect(getNumeroLampioniServiceMock).toHaveBeenCalled();
          })
          it("numero di lampioni",async() => {

            Lampione.findAll = jest.fn();
            Lampione.findAll.mockReturnValue(12)
            const result = await lampioneService.getAllLampsFromArea(1)    
            expect(result).toBe(12)
            
           /* const {statusCode, body} = await supertest(app)
              .get("/numeroAree")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroAree:50})
            expect(getNumeroAreeServiceMock).toHaveBeenCalled();
            */
           /*
          })
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
          it("ritorna gli ID dei lampioni da accendere",async() => {

            Lampione.findAll = jest.fn();
            Lampione.findAll.mockReturnValue(2)
            const result = await lampioneService.getLampIDtoPowerOn(1)
    
            expect(result).toBe(2)
            
           /* const {statusCode, body} = await supertest(app)
              .get("/numeroAree")
            expect(statusCode).toBe(200)
            expect(body).toEqual({numeroAree:50})
            expect(getNumeroAreeServiceMock).toHaveBeenCalled();
            */
           /*
          })
    })
  })
})
*/
   /* describe('Modifica lampione', () => { 
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
    })
/*

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
     }),
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
     }),

     
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
  }),

  describe('get numero lampioni da controller senza id', () => {
    it('should throw 500 error if id is empty string', async () => {
      const mReq = { params: { id: '' } };
      const mRes = {"data": {"error": {}}, "status": "FAILED"};
      await lampioneController.getAllLampsFromArea(mReq, mRes);
      expect(mRes).toEqual({"data": {"error": {}}, "status": "FAILED"});
    });
  }),
        
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

         /* describe('getBrightnessOfArea', () => {
            it('ritorna la luminosità di un area', async () => {
              const guasti = await lampioneService.getBrightnessofArea(1);

            
              expect(guasti).toEqual(2);
             // expect(guasti.stato).toEqual(1);
              //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
              //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
              //expect(guasti.id_area_illuminata).toEqual(11);
              //expect(guasti.data_risoluzione).toEqual(null)
              //expect(guasti[0].area.citta).toEqual('Torino');
              //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
            
            });
          }),
          describe('getBrightnessOfLamp', () => {
            it('ritorna la luminosità di un lampione', async () => {
              const guasti = await lampioneService.getBrightnessofLamp(4);

              expect(guasti).toEqual(5);
             // expect(guasti.stato).toEqual(1);
              //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
              //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
              //expect(guasti.id_area_illuminata).toEqual(11);
              //expect(guasti.data_risoluzione).toEqual(null)
              //expect(guasti[0].area.citta).toEqual('Torino');
              //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
            
            });
          }),


        describe('getOneLampione', () => {
          it('ritorna i dettagli di un lampione', async () => {
            const guasti = await lampioneService.getOneLampione(8);

           
            expect(guasti.ID).toEqual(8);
            expect(guasti.IP).toEqual("76.59.9.77");
            //expect(guati.tipo_interazione).toEqual("PUSH");
            expect(guasti.luminosità_default).toEqual(7);
            expect(guasti.luminosità_impostata).toEqual(4);
            expect(guasti.stato).toEqual(1);
            expect(guasti.id_area_illuminata).toEqual(11);
        
            //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
            //expect(guasti.id_area_illuminata).toEqual(11);
            //expect(guasti.data_risoluzione).toEqual(null)
            //expect(guasti[0].area.citta).toEqual('Torino');
            //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
          
          
    
    });
      }),

      describe('getLampIDToPowerOn', () => {
        it('ritorna gli id dei lampioni da accendere in un area', async () => {
          const guasti = await lampioneService.getLampIDtoPowerOn(1);

          expect(guasti[0]).toEqual(1);
          
        
  
  });
    }),

    describe('getBrightnessManualeArea', () => {
      it('ritorna la luminosità manuale di un area', async () => {
        const guasti = await lampioneService.getBrightnessManualeArea(1);
        expect(guasti).toEqual(3);
        
      

});
  }),

  describe('getBrightnessRilevamento', () => {
    it('ritorna la luminosità_rilevamento di un area', async () => {
      const guasti = await lampioneService.getBrightnessRilevamento(1);
      expect(guasti).toEqual(10);
      
    

});
}),

describe('getBrightnessofLamp', () => {
  it('ritorna la luminosità impostata di un lampione', async () => {
    const guasti = await lampioneService.getBrightnessofLamp(4);
    expect(guasti).toEqual(5);
    
  

});
}),
//bisogno mock
/*describe('aggiungiLampione', () => {
  it('ritorna la luminosità impostata di un lampione', async () => {
    const guasti = await lampioneService.aggiungiLampione(16,"0.0.0.1", "PULL", 3,5,1);
  
    const numero = await lampioneService.getAllLampsFromAreaCount(16);
    expect(numero).toEqual(1)    
  

});
})
*/

/*
describe('getNumeroLampioni', () => {
  it('ritorna il numero di lampioni totali', async () => {
    const guasti = await lampioneService.getNumeroLampioni();
    expect(guasti).toEqual("87");
   // expect(guasti.stato).toEqual(1);
    //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
    //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
    //expect(guasti.id_area_illuminata).toEqual(11);
    //expect(guasti.data_risoluzione).toEqual(null)
    //expect(guasti[0].area.citta).toEqual('Torino');
    //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
  
  

});
}),


describe('AggiungiLampione', () => {
  it('aggiunge un lampione', async () => {
    const guasti = await lampioneService.aggiungiLampione(1,'1.1.1', 'PULL', 3,5,1);
    const numero = await lampioneService.getNumeroLampioni()
    expect(numero).toEqual("88");
   // expect(guasti.stato).toEqual(1);
    //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
    //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
    //expect(guasti.id_area_illuminata).toEqual(11);
    //expect(guasti.data_risoluzione).toEqual(null)
    //expect(guasti[0].area.citta).toEqual('Torino');
    //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
  
  

});
}),

describe('setStatoSingoloLampione', () => {
  it('setta lo stato di un lampione', async () => {
    const guasti = await lampioneService.setStatoSingoloLampione(88,1);
    const lamp_stato = await lampioneService.getOneLampione(88)
    expect(lamp_stato.stato).toEqual(1)
   // expect(guasti.stato).toEqual(1);
    //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
    //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
    //expect(guasti.id_area_illuminata).toEqual(11);
    //expect(guasti.data_risoluzione).toEqual(null)
    //expect(guasti[0].area.citta).toEqual('Torino');
    //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
  
  

});
}),


describe('modificaLampione', () => {
  it('modifica un lampione', async () => {
    const guasti = await lampioneService.modificaLampione(88,'1.1.1','PUSH',3,5,1);
    const lamp_stato = await lampioneService.getOneLampione(88)
    expect(lamp_stato.luminosità_default).toEqual(3)

   
   // expect(guasti.stato).toEqual(1);
    //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
    //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
    //expect(guasti.id_area_illuminata).toEqual(11);
    //expect(guasti.data_risoluzione).toEqual(null)
    //expect(guasti[0].area.citta).toEqual('Torino');
    //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
  
  

});
}),

describe('eliminaLampione', () => {
  it('elimina un Lampione', async () => {
    const guasti = await lampioneService.eliminaLampione(88);
  
    const numero = await lampioneService.getAllLampsFromAreaCount(16);
    expect(numero).toEqual(0)    
  

});
}),


describe('getAllLampsFromAreaCount', () => {
  it('ritorna il numero di lampioni di un area', async () => {
    const guasti = await lampioneService.getAllLampsFromAreaCount(1);

    expect(guasti).toEqual(13);
   // expect(guasti.stato).toEqual(1);
    //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
    //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
    //expect(guasti.id_area_illuminata).toEqual(11);
    //expect(guasti.data_risoluzione).toEqual(null)
    //expect(guasti[0].area.citta).toEqual('Torino');
    //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
  
  

});
})


    })
          
    
    */