const supertest = require('supertest')
const areaService = require("../services/areaService");
const areaController = require("../controllers/areaController");
const lampioniService = require("../services/lampioneService");
const sensoriService = require("../services/sensoreService");
const guastiService = require("../services/guastoService");
const areaRoutes = require("../routes/areaRoutes");
const createServer= require("../server");
const { lampioni } = require('../models');
const app = createServer()

it("getAllAree should return all areas", async () => {
  const mockAreas = [
    { id: 1, name: "Area 1" },
    { id: 2, name: "Area 2" },
  ];
  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.getAllAree()



  expect(result).toBe(mockAreas);
});

it("getNumeroAree should return all areas", async () => {
  const mockAreas = "12";
  Area.count = jest.fn()
  Area.count.mockReturnValue(mockAreas)
  const result = await areaService.getNumeroAree()



  expect(result).toBe(mockAreas);
});

it("get5Areas should return 5 areas", async () => {
  const mockAreas = [
    { id: 1, name: "Area 1" },
    { id: 2, name: "Area 2" },
    { id: 3, name: "Area 3" },
    { id: 4, name: "Area 4" },
    { id: 5, name: "Area 5" }

  ];
  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.getFiveAree()



  expect(result).toBe(mockAreas);
});

it("getModalitàArea should return A or M", async () => {
  const mockAreas = [
    "M"

  ];
  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.getModalitaArea(1)



  expect(result).toBe(mockAreas);
});

/*it("getIDAreeMax should return the max ID", async () => {
  const mockAreas = 12;
  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.getIDAreeMax()



  expect(result).toBe(mockAreas);
});
*/
/*it('should return the maximum ID of areas', async () => {
  // Arrange
  const mockMaxID = 42; // Replace with your desired mock value

  // Mock the Sequelize findAll method to return the desired value
  Area.findAll.mockReturnValue(mockMaxID);

  // Act
  const maxID = await areaService.getIDAreeMax();

  // Assert
  expect(maxID).toBe(mockMaxID);
  // You can add additional assertions as needed
});
*/
it("accendiAllAree should accendere tutte le aree in modalità automatica", async () => {
  const mockAreas = [

   { id: 1, name: "Area 1" },
  { id: 2, name: "Area 2" },
  { id: 3, name: "Area 3" },
  { id: 4, name: "Area 4" },
  { id: 5, name: "Area 5" }
  ]
  const mockLampione = [

    { id: 1, ip: "1.2.3" },

   ]

  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  Lampione.findAll = jest.fn()
  Lampione.findAll.mockReturnValue(mockLampione)
  const result = await areaService.accendiAllAree()
  


  expect(result).toBe(mockAreas);
});

it("spegniAllAree should spegnere tutte le aree in modalità automatica", async () => {
  const mockAreas = [

   { id: 1, name: "Area 1" },
  { id: 2, name: "Area 2" },
  { id: 3, name: "Area 3" },
  { id: 4, name: "Area 4" },
  { id: 5, name: "Area 5" }
  ]

  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.spegniAllAree()



  expect(result).toBe(mockAreas);
});

it("spegniAree should spegnere un aree", async () => {
  const mockAreas = [

   { id: 1, name: "Area 1" }
  ]

  Area.findByPk = jest.fn()
  Area.findByPk.mockReturnValue(mockAreas)
  const result = await areaService.spegniAllAree()


  Area.update = jest.fn().mockReturnValue([
    {
      ID: 1,
    }]);

    Lampione.findAll = jest.fn().mockReturnValue([
      {
        id_area_illuminata: 1,
      }]);

      const res = await lampioniService.spegniLampioniArea(1)


  expect(result).toBe(mockAreas);
});
  it('should increase luminosità_manuale and return "Luminosità aumentata"', async () => {
    // Arrange
    const mockId = 1; // Replace with your desired mock ID

    // Mock the Sequelize findByPk method to return a mock 'area' instance
    const areaInstance = {
      increment: jest.fn().mockResolvedValue({}),
    };
    Area.findByPk.mockResolvedValue(areaInstance);

    // Act
    const result = await areaService.aumentaLuminositaArea(mockId);

    // Assert
    expect(result).toBe('Luminosità aumentata');
    expect(Area.findByPk).toHaveBeenCalledWith(mockId);
    expect(areaInstance.increment).toHaveBeenCalledWith('luminosità_manuale', {
      by: 1,
    });
  })

  it('should decrease luminosità_manuale and return "Luminosità diminuita"', async () => {
    // Arrange
    const mockId = 1; // Replace with your desired mock ID

    // Mock the Sequelize findByPk method to return a mock 'area' instance
    const areaInstance = {
      decrement: jest.fn().mockResolvedValue({}),
    };
    Area.findByPk.mockResolvedValue(areaInstance);

    // Act
    const result = await areaService.diminuisciLuminositaArea(mockId);

    // Assert
    expect(result).toBe('Luminosità diminuita');
    expect(Area.findByPk).toHaveBeenCalledWith(mockId);
    expect(areaInstance.decrement).toHaveBeenCalledWith('luminosità_manuale', {
      by: 1,
    });
  });

  describe('aggiungiArea', () => {
    it('should add a new Area and return "Area aggiunta"', async () => {
      // Arrange
      const mockCount = 5; // Replace with your desired mock count
      const mockId = mockCount + 1; // Calculate the mock ID
      const mockData = {
        citta: 'Mock City',
        zonaGeografica: 'Mock Geographic Zone',
        stato: 'Mock State',
        modalita: 'Mock Mode',
        luminositaDefault: 100,
        luminositaRilevamento: 50,
      };
  
      // Mock the Sequelize count method to return the mockCount
      Area.count = jest.fn();
      Area.count.mockResolvedValue(mockCount);
  
      Area.create = jest.fn();
      // Mock the Sequelize create method to return a new Area instance
      Area.create.mockResolvedValue({
        ID: mockId,
        ...mockData,
      });
  
      // Act
      const result = await areaService.aggiungiArea(
        mockData.citta,
        mockData.zonaGeografica,
        mockData.stato,
        mockData.modalita,
        mockData.luminositaDefault,
        mockData.luminositaRilevamento
      );
  
      // Assert
      expect(result).toBe('Area aggiunta');
      expect(Area.count).toHaveBeenCalled();
      expect(Area.create).toHaveBeenCalledWith({
        ID: mockId,
        città: mockData.citta,
        zona_geografica_città: mockData.zonaGeografica,
        modalità_funzionamento: mockData.modalita,
        luminosità_standard: mockData.luminositaDefault,
        luminosità_rilevamento: mockData.luminositaRilevamento,
        luminosità_manuale: 1,
        stato: mockData.stato,
      });
    });
  });  

  describe('modificaArea', () => {
    it('should update an Area and return "Area modificata"', async () => {
      // Arrange
      const mockId = 1; // Replace with your desired mock ID
      const mockData = {
        citta: 'Mock City',
        zonaGeografica: 'Mock Geographic Zone',
        stato: 'Mock State',
        modalita: 'Mock Mode',
        luminositaDefault: 100,
        luminositaRilevamento: 50,
      };
  
      // Mock the Sequelize findByPk method to return a mock 'area' instance
      const areaInstance = {
        update: jest.fn().mockResolvedValue({}),
      };
      Area.findByPk.mockResolvedValue(areaInstance);
  
      // Act
      const result = await areaService.modificaArea(
        mockId,
        mockData.citta,
        mockData.zonaGeografica,
        mockData.stato,
        mockData.modalita,
        mockData.luminositaDefault,
        mockData.luminositaRilevamento
      );
  
      // Assert
      expect(result).toBe('Area modificata');
      expect(Area.findByPk).toHaveBeenCalledWith(mockId);
  
      // Check if update was called with the expected properties
      /*expect(areaInstance.update).toHaveBeenCalledWith({
        città: mockData.citta,
        zona_geografica_città: mockData.zonaGeografica,
        stato: mockData.stato,
        modalità_funzionamento: mockData.modalita,
        luminosità_standard: mockData.luminositaDefault,
        luminosità_rilevamento: mockData.luminositaRilevamento,
      }, {
        where: {
          ID: mockId,
        },
      });
      */
    });
  });
  describe('eliminaArea', () => {
    it('should delete an Area and related records and return the count', async () => {
      // Arrange
      const mockId = 1; // Replace with your desired mock ID
  
      // Mock the services to return empty arrays (no related records)
      lampioniService.getAllLampsFromArea = jest.fn().mockResolvedValue([]);
      sensoriService.getAllSensoriFromArea = jest.fn().mockResolvedValue([]);
      guastiService.eliminaGuastiArea = jest.fn().mockResolvedValue([]);
  
      // Mock the destroy method on the Area instance
      const destroyMock = jest.fn().mockResolvedValue(1); // Assuming 1 row is deleted
  
      // Mock the findOne method to return an object with the destroy method
      Area.findOne = jest.fn();
      Area.findOne.mockResolvedValue({
        destroy: destroyMock,
      });
  
      // Act
      const result = await areaService.eliminaArea(mockId);
  
      // Assert
      expect(result).toBe('deleted row(s): 1');
      expect(lampioniService.getAllLampsFromArea).toHaveBeenCalledWith(mockId);
      expect(sensoriService.getAllSensoriFromArea).toHaveBeenCalledWith(mockId);
      expect(guastiService.eliminaGuastiArea).toHaveBeenCalledWith(mockId);
      expect(destroyMock).toHaveBeenCalled();
    });
  
    // Add more test cases as needed
  });

  /*describe('cambiaModalitaArea', () => {
    it('should change the modalità_funzionamento and return "Modalità funzionamento cambiata"', async () => {
      // Arrange
      const mockId = 1; // Replace with your desired mock ID
  
      // Mock the Sequelize findByPk method to return a mock 'area' instance
      const areaInstance = {
        modalità_funzionamento: 'M', // Assuming it starts as 'M'
      };
      Area.findByPk = jest.fn()
      Area.findByPk.mockResolvedValue(areaInstance);
  
      // Act
      const result = await areaService.cambiaModalitaArea(mockId);
  
      // Assert
      expect(result).toBe('Modalità funzionamento cambiata');
      expect(Area.findByPk).toHaveBeenCalledWith(mockId);
      Area.update = jest.fn();
  
      if (areaInstance.modalità_funzionamento === 'M') {
        expect(Area.update).toHaveBeenCalledWith(
          { modalità_funzionamento: 'A' },
          {
            where: {
              ID: mockId,
            },
          }
        );
      } else {
        expect(Area.update).toHaveBeenCalledWith(
          { modalità_funzionamento: 'M' },
          {
            where: {
              ID: mockId,
            },
          }
        );
        expect(lampioniService.accendiLampioniManualeArea).toHaveBeenCalledWith(
          mockId
        );
      }
    });
  
    // Add more test cases as needed
  });
*/
/*describe('accendiArea', () => {
  it('should turn on the area and return "Area accesa"', async () => {
    // Arrange
    const mockId = 1; // Replace with your desired mock ID

    // Mock the Sequelize findByPk method to return a mock 'area' instance
    const areaInstance = {
      stato: 0, // Assuming it starts as 0
    };
    Area.findByPk.mockResolvedValue(areaInstance);

    // Act
    const result = await areaService.accendiArea(mockId);

    // Assert
    expect(result).toBe('Area accesa');
    expect(Area.findByPk).toHaveBeenCalledWith(mockId);

    if (areaInstance.stato === 0) {
      expect(Area.update).toHaveBeenCalledWith(
        { stato: 1 },
        {
          where: {
            ID: mockId,
          },
        }
      );
      expect(lampioniService.accendiLampioniManualeArea).toHaveBeenCalledWith(
        mockId
      );
    } else {
      // If area is already on, no further updates are expected
      expect(Area.update).not.toHaveBeenCalled();
      expect(lampioniService.accendiLampioniManualeArea).not.toHaveBeenCalled();
    }
  });

  // Add more test cases as needed
});
*/
/*describe('accendiAllAree', () => {
  it('should turn on all areas in "A" mode and return "Tutte le aree accese"', async () => {
    // Arrange
    const mockAree = [
      { ID: 1 },
      { ID: 2 },
      // Add more mock areas as needed
    ];

    // Mock the Sequelize findAll method to return mock areas in "A" mode
    Area.findAll.mockResolvedValue(mockAree);

    // Act
    const result = await areaService.accendiAllAree();

    // Assert
    expect(result).toBe('Tutte le aree accese');
    expect(Area.findAll).toHaveBeenCalledWith({
      where: {
        modalità_funzionamento: 'A',
      },
    });

    // Check if accendiLampioniAreaRilevamento is called for each area
    for (const area of mockAree) {
      expect(lampioniService.accendiLampioniAreaRilevamento).toHaveBeenCalledWith(
        area.ID
      );
    }
  });

  // Add more test cases as needed
});
*/
/*
describe("area", () => {
  describe("get area da id", () => {
    describe("Dato un id valido", () => {
      it("ritorna l'area", async () => {
        const getOneAreaServiceMock = jest
          .spyOn(areaService, "getOneArea")
          .mockReturnValueOnce(areaPayload);
  
        const { statusCode, body } = await supertest(app)
          .get("/area/1")
  
        expect(statusCode).toBe(200);
  
        expect(body).toEqual(areaPayload);
  
        expect(getOneAreaServiceMock).toHaveBeenCalled();
      })
      it("ritorna l'area", async () => {
        const getOneAreaServiceMock = jest
         const result = await areaService.getOneArea(1)
  
        console.log(result)
  
        //expect(getOneAreaServiceMock).toHaveBeenCalled();
      });

    })
  
      describe("dato un id vuoto", () => {
        it("ritorna stato 400 status e payload con errore", async () => {
          const getOneAreaServiceMock = jest
          .spyOn(areaService, "getOneArea")
          .mockReturnValueOnce(areaPayload);
  
        const { statusCode , body} = await supertest(app)
          .get("/area/")
  
        expect(statusCode).toBe(404);
        
        expect(getOneAreaServiceMock).not.toHaveBeenCalled();
        })
      })
  })

  describe("get tutte le aree", () =>{
    describe("Il database risponde correttamente", () =>{
      it("Ritorna stato 200 e lista di aree", async() => {
        const getAllAreeServiceMock = jest.
        spyOn(areaService,"getAllAree")
        .mockReturnValueOnce(Array(areaPayload))

        const {statusCode, body} = await supertest(app)
          .get("/aree")
        expect(statusCode).toBe(200)
        expect(body).toEqual(Array(areaPayload))
        expect(getAllAreeServiceMock).toHaveBeenCalled();
      })
    })
  })

  describe("get numero aree", () => {
    describe("Il database risponde correttamente", () => {
      it("Ritorna stato 200 e numero di aree",async() => {
        const getNumeroAreeServiceMock = jest.
        spyOn(areaService,"getNumeroAree")
        .mockReturnValueOnce(50)

        const {statusCode, body} = await supertest(app)
          .get("/numeroAree")
        expect(statusCode).toBe(200)
        expect(body).toEqual({numeroAree:50})
        expect(getNumeroAreeServiceMock).toHaveBeenCalled();
      })
      it("numero di aree",async() => {

        Area.count = jest.fn();
        Area.count.mockReturnValue(12)
        const result = await areaService.getNumeroAree()

        expect(result).toBe('12')
        
       /* const {statusCode, body} = await supertest(app)
          .get("/numeroAree")
        expect(statusCode).toBe(200)
        expect(body).toEqual({numeroAree:50})
        expect(getNumeroAreeServiceMock).toHaveBeenCalled();
        */
      
  

     /* it("ritorna 5 aree",async() => {

        Area.count = jest.fn();
        Area.count.mockReturnValue(5)
        const result = await areaService.getFiveAree()
        //expect(statusCode).toBe(200)
        expect(result).toEqual(listaAreePayload)
        //expect(getNumeroAreeServiceMock).toHaveBeenCalled();
        
      })
      
    })
    
  })
  */
/*
  describe("get cinque aree", () => {
    describe("Il database risponde correttamente", () => {
      it("Ritorna stato 200 e ritorna cinque aree",async() => {
        const getFiveAreeServiceMock = jest.
        spyOn(areaService,"getFiveAree")
        .mockReturnValueOnce(Array(areaPayload,areaPayload,areaPayload,areaPayload,areaPayload))

        const {statusCode, body} = await supertest(app)
          .get("/areelimit")
        expect(statusCode).toBe(200)
        expect(body).toEqual(Array(areaPayload,areaPayload,areaPayload,areaPayload,areaPayload))
        expect(getFiveAreeServiceMock).toHaveBeenCalled();
      })
    })
    it("get 5 aree",async() => {

      Area.findAll = jest.fn();
      Area.findAll.mockReturnValue(listaAreePayload)
      const result = await areaService.getFiveAree()

     expect(result[0].ID).toBe(1)
      
     /* const {statusCode, body} = await supertest(app)
        .get("/numeroAree")
      expect(statusCode).toBe(200)
      expect(body).toEqual({numeroAree:50})
      expect(getNumeroAreeServiceMock).toHaveBeenCalled();
      */
 

  // describe("aumenta luminosita a un area", () => {
  //   describe("Dato un id valido", () => {
  //     it("Ritorna stato 200 e result", async() => {
  //       const areaId = 2;
  //       const aumentaLuminositaAreaServiceMock = jest.
  //       spyOn(areaService,"aumentaLuminositaArea")
  //       .mockReturnValueOnce("Luminosità aumentata")
  //       const {statusCode, body} = await supertest(app)
  //         .get("/area/${areaId}/aumentaluminosita")
  //       expect(statusCode).toBe(200)
  //       expect(body).toEqual({result:"Luminosità aumentata"})
  //       expect(aumentaLuminositaAreaServiceMock).toHaveBeenCalled();
  //     })
  //   })
  // })

  /*describe('Aggiungi un area', () => { 
    describe("Dato un payload valido", () => {
      it("Ritorna stato 200 e l'area appena aggiunta", async() => {
        const aggiungiAreaServiceMock = jest.
        spyOn(areaService,"aggiungiArea")
        .mockReturnValueOnce(risltatoAggiuntaAree)
        const { statusCode, body } = await supertest(app)
          .post("/aggiungiArea/"+areaPayloadAggiuntaArea.città+"/"+ areaPayloadAggiuntaArea.zona_geografica_città+"/"+areaPayloadAggiuntaArea.stato+"/"+areaPayloadAggiuntaArea.modalità_funzionamento+"/"+areaPayloadAggiuntaArea.luminosità_standard+"/"+areaPayloadAggiuntaArea.luminosità_manuale)
          expect(statusCode).toBe(200)
          expect(body).toEqual(risltatoAggiuntaAree)
          expect(aggiungiAreaServiceMock).toHaveBeenCalled();
      })
    })

})
  
   

  describe('Modifica area', () => { 
    describe("Dato un payload e un id valido", () => {
      it("Ritorna stato 200 e Area modificata", async() => {
        const modificaAreaServiceMock = jest.
        spyOn(areaService,"modificaArea")
        .mockReturnValueOnce("Area modificata")
        const { statusCode, body } = await supertest(app)
          .post("/modificaArea/"+areaPayloadModificaArea.ID+"/"+areaPayloadModificaArea.città+"/"+ areaPayloadModificaArea.zona_geografica_città+"/"+areaPayloadModificaArea.stato+"/"+areaPayloadModificaArea.modalità_funzionamento+"/"+areaPayloadModificaArea.luminosità_standard+"/"+areaPayloadModificaArea.luminosità_manuale)
          .send({luminosità_rilevamento:2},1);
          expect(statusCode).toBe(200)
          expect(body).toEqual({result:"Area modificata"})
          expect(modificaAreaServiceMock).toHaveBeenCalled();
      })
    })
   })
   describe('Elimina area', () => { 
    describe("Dato un id valido", () => {
      it("Ritorna stato 200 e numero di righe eliminate", async() => {
        const eliminaAreaServiceMock = jest.
        spyOn(areaService,"eliminaArea")
        .mockReturnValueOnce(`deleted row(s): 1`)
        const { statusCode, body } = await supertest(app)
          .post("/eliminaArea/1")
          .send("1");
          expect(statusCode).toBe(200)
          expect(body).toEqual({"result":`deleted row(s): 1`})
          expect(eliminaAreaServiceMock).toHaveBeenCalled();
      })
    })
   })
  

   describe('Cambia modalità area', () => { 
    describe("Dato un id valido", () => {
      it("Ritorna stato 200 e Modalità funzionamento cambiata", async() => {
        const cambiaModalitaAreaServiceMock = jest.
        spyOn(areaService,"cambiaModalitaArea")
        .mockReturnValueOnce(`Modalità funzionamento cambiata`)
        const { statusCode, body } = await supertest(app)
          .post("/cambiaModalitaArea/1")
          .send("1");
          expect(statusCode).toBe(200)
          expect(body).toEqual({"result":`Modalità funzionamento cambiata`})
          expect(cambiaModalitaAreaServiceMock).toHaveBeenCalled();
      })
    })
   })
  })

 /*  describe('Accendi Area', () => { 
    describe("Dato un id valido", () => {
      it("Ritorna stato 200 e Area spenta", async() => {
        const accendiAreaServiceMock = jest.
        spyOn(areaService,"accendiArea")
        .mockReturnValueOnce(`Area accesa`)
        const { statusCode, body } = await supertest(app)
          .post("/accendiArea/1")
          .send("1");
          expect(statusCode).toBe(200)
          expect(body).toEqual({"result":`Area accesa`})
          expect(accendiAreaServiceMock).toHaveBeenCalledWith("1");
      })
    })
   })

   describe('Spegni Area', () => { 
    describe("Dato un id valido", () => {
      it("Ritorna stato 200 e Area accesa", async() => {
        const spegniAreaServiceMock = jest.
        spyOn(areaService,"spegniArea")
        .mockReturnValueOnce(`Area spenta`)
        const { statusCode, body } = await supertest(app)
          .post("/spegniArea/1")
          .send("1");
          expect(statusCode).toBe(200)
          expect(body).toEqual({"result":`Area spenta`})
          expect(spegniAreaServiceMock).toHaveBeenCalledWith("1");
      })
    })
  })

  
     

   /*describe("getAllAree() da service", () => {
    it("Ritorna stato 200 e la lista della aree", async() => {
      const getAllAreeServiceMock = jest.
      spyOn(areaService,"getAllAree").toEqual(Array(areaPayload))
      const { statusCode, body } = await supertest(app)
        .post("/spegniArea/1")
        .send("1");
        expect(statusCode).toBe(200)
        expect(body).toEqual({"result":`Area spenta`})
        expect(spegniAreaServiceMock).toHaveBeenCalledWith("1");
        
    })
    
  })
*/

