const supertest = require('supertest')
const areaService = require("../services/areaService");
const areaController = require("../controllers/areaController");
const areaRoutes = require("../routes/areaRoutes");
const createServer = require("../server");
const app = createServer()
const areaPayload = {
  ID: 1,
  città: "Padova",
  zona_geografica_città: "Via Brofferio",
  modalità_funzionamento: "A",
  luminosità_standard:2,
  luminosità_rilevamento:3,
  luminosità_manuale:0,
  stato:0,
};

const areaPayloadAggiuntaArea = {
  città: "Marostica",
  zona_geografica_città: "Angelis",
  modalità_funzionamento: "A",
  luminosità_standard:2,
  luminosità_rilevamento:3,
  luminosità_manuale:0,
  stato:0
};

const areaPayloadAggiuntaAreaConId = {
  ID: 17,
  città: "Marostica",
  zona_geografica_città: "Angelis",
  modalità_funzionamento: "A",
  luminosità_standard:2,
  luminosità_rilevamento:3,
  luminosità_manuale:0,
  stato:0
};

const areaPayloadModificaArea = {
  ID:1,
  città: "Marostica",
  zona_geografica_città: "Angelis",
  modalità_funzionamento: "A",
  luminosità_standard:2,
  luminosità_rilevamento:3,
  luminosità_manuale:0,
  stato:0
};
const getOneArea = {
  
    ID: 1,
    città: "Padova",
    zona_geografica_città: "Via Brofferio",
    modalità_funzionamento: "M",
    luminosità_standard: 2,
    luminosità_rilevamento: 3,
    luminosità_manuale: 2,
    stato: 0

}

const listaAreePayload = 
[
    {
        ID: 1,
        città: "Padova",
        zona_geografica_città: "Via Brofferio",
        modalità_funzionamento: "M",
        luminosità_standard: 2,
        luminosità_rilevamento: 3,
        luminosità_manuale: 2,
        stato: 0
    },
    {
        ID: 2,
        città: "Asiago",
        zona_geografica_città: "Piazza Carli",
        modalità_funzionamento: "M",
        luminosità_standard: 6,
        luminosità_rilevamento: 7,
        luminosità_manuale: null,
        stato: 0
    },
    {
        ID: 3,
        città: "Genova",
        zona_geografica_città: "Stazione FS",
        modalità_funzionamento: "M",
        luminosità_standard: 6,
        luminosità_rilevamento: 7,
        luminosità_manuale: 6,
        stato: 1
    },
    {
        ID: 4,
        città: "Pizzo Calabro",
        zona_geografica_città: "Via Angelis",
        modalità_funzionamento: "M",
        luminosità_standard: 3,
        luminosità_rilevamento: 5,
        luminosità_manuale: 1,
        stato: 1
    },
    {
        ID: 5,
        città: "Torino",
        zona_geografica_città: "Stadio",
        modalità_funzionamento: "M",
        luminosità_standard: 3,
        luminosità_rilevamento: 5,
        luminosità_manuale: 10,
        stato: 0
    }
  ]
const emptyIdPayload = {
  
    status: "FAILED",
    data: { error: "Parameter ':id' can not be empty" },
  
}
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
      });
      it("ritorna l'area", async () => {
        const getOneAreaServiceMock = jest
         const result = await areaService.getOneArea(1)
  
        expect(result).toBe
  
        //expect(getOneAreaServiceMock).toHaveBeenCalled();
      });

    });
  
      describe("dato un id vuoto", () => {
        it("ritorna stato 400 status e payload con errore", async () => {
          const getOneAreaServiceMock = jest
          .spyOn(areaService, "getOneArea")
          .mockReturnValueOnce(areaPayload);
  
        const { statusCode , body} = await supertest(app)
          .get("/area/")
  
        expect(statusCode).toBe(404);
        
        expect(getOneAreaServiceMock).not.toHaveBeenCalled();
        });
      });
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
      })

      /*it("ritorna 5 aree",async() => {

        Area.count = jest.fn();
        Area.count.mockReturnValue(5)
        const result = await areaService.getFiveAree()
        //expect(statusCode).toBe(200)
        expect(result).toEqual(listaAreePayload)
        //expect(getNumeroAreeServiceMock).toHaveBeenCalled();
        
      })
      */
    })
  })

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
  })

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

  describe('Aggiungi un area', () => { 
    describe("Dato un payload valido", () => {
      it("Ritorna stato 200 e l'area appena aggiunta", async() => {
        const aggiungiAreaServiceMock = jest.
        spyOn(areaService,"aggiungiArea")
        .mockReturnValueOnce(areaPayloadAggiuntaArea)
        const { statusCode, body } = await supertest(app)
          .post("/aggiungiArea/"+areaPayloadAggiuntaArea.città+"/"+ areaPayloadAggiuntaArea.zona_geografica_città+"/"+areaPayloadAggiuntaArea.stato+"/"+areaPayloadAggiuntaArea.modalità_funzionamento+"/"+areaPayloadAggiuntaArea.luminosità_standard+"/"+areaPayloadAggiuntaArea.luminosità_manuale)
          expect(statusCode).toBe(200)
          expect(body).toEqual(areaPayloadAggiuntaArea)
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

   describe('Accendi Area', () => { 
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
  })
