const supertest = require('supertest')
const areaService = require("../services/areaService");
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
          .post("/aggiungiArea")
          .send(areaPayloadAggiuntaArea);
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
          .post("/modificaArea/1")
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

   describe('Cambia stato area', () => { 
    describe("Dato un id valido", () => {
      it("Ritorna stato 200 e Area accesa", async() => {
        const cambiaStatoAreaServiceMock = jest.
        spyOn(areaService,"cambiaStatoArea")
        .mockReturnValueOnce(`Area accesa`)
        const { statusCode, body } = await supertest(app)
          .post("/cambiaStatoArea/1")
          .send("1");
          expect(statusCode).toBe(200)
          expect(body).toEqual({"result":`Area accesa`})
          expect(cambiaStatoAreaServiceMock).toHaveBeenCalledWith("1");
      })
    })
   })
})