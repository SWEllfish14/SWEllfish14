const supertest = require('supertest')
const areaService = require("../services/areaService");
const areaController = require("../controllers/areaController");
const areaRoutes = require("../routes/areaRoutes");
const createServer= require("../server");
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
  const result = await areaService.getModalitaArea()



  expect(result).toBe(mockAreas);
});

it("getIDAreeMax should return the max ID", async () => {
  const mockAreas = 12;
  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
  const result = await areaService.getIDAreeMax()



  expect(result).toBe(mockAreas);
});

it("accendiAllAree should accendere tutte le aree in modalità automatica", async () => {
  const mockAreas = [

   { id: 1, name: "Area 1" },
  { id: 2, name: "Area 2" },
  { id: 3, name: "Area 3" },
  { id: 4, name: "Area 4" },
  { id: 5, name: "Area 5" }
  ]

  Area.findAll = jest.fn()
  Area.findAll.mockReturnValue(mockAreas)
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

