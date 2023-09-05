// // const supertest = require('supertest')
// // const createServer = require("../server");
// // const app = createServer()
// // const sensorePayload={
// //     ID:1,
// //     IP:"200.98.144.217",
// //     polling_time:7,
// //     zona_geografica_posizionamento:"Entrata Stadio",
// //     tipo_interazione:"PUSH",
// //     raggio_azione:33,
// //     id_area_illuminata: 5
// // }
// // describe("sensori",()=>{
// //     describe("get numero sensori", () => {
// //         describe("Il database risponde correttamente", () => {
// //           it("Ritorna stato 200 e numero di sensori",async() => {
// //             const getNumeroSensoriServiceMock = jest.
// //             spyOn(sensoreService,"getNumeroSensori")
// //             .mockReturnValueOnce(22)
    
// //             const {statusCode, body} = await supertest(app)
// //               .get("/numeroSensori")
// //             expect(statusCode).toBe(200)
// //             expect(body).toEqual({numeroSensori:22})
// //             expect(getNumeroSensoriServiceMock).toHaveBeenCalled();
// //           })
// //         })
// //       })
// //     })
//     /*
//         describe("Il database risponde con un errore", () => {
//             it("Ritorna stato 500",async() => {
//               const getNumeroSensoriServiceMock = jest.
//               spyOn(sensoreService,"getNumeroSensori").mockImplementation(() => {
//                 throw new Error();})
      
//               const {statusCode, body} = await supertest(app)
//                 .get("/numeroSensori")
//               expect(statusCode).toBe(500)
//               expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
//               expect(getNumeroSensoriServiceMock).toHaveBeenCalled();
//               expect(getNumeroSensoriServiceMock).toThrowError()
//             })
//           })
//       }),

//       describe("get tutti sensori ", () => {
//         describe("Il database risponde correttamente", () => {
//           it("Ritorna stato 200 e la lista dei sensori di un'area",async() => {
//             const getAllSensoriServiceMock = jest.
//             spyOn(sensoreService,"getAllSensoriFromArea")
//             .mockReturnValueOnce(Array(sensorePayload,sensorePayload,sensorePayload,sensorePayload))
    
//             const {statusCode, body} = await supertest(app)
//               .get("/sensori/1")
//             expect(statusCode).toBe(200)
//             expect(body).toEqual(Array(sensorePayload,sensorePayload,sensorePayload,sensorePayload))
//             expect(getAllSensoriServiceMock).toHaveBeenCalled();
//           })
//         })
//     }),

    
//     describe('checkForUpdates', () => {
//       it('controlla se ci sono rilevamenti', async () => {
//         const guasti = await sensoreService.checkForUpdate()
    
       
//        // expect(guasti.stato).toEqual(1);
//         //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
//         //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
//         //expect(guasti.id_area_illuminata).toEqual(11);
//         //expect(guasti.data_risoluzione).toEqual(null)
//         //expect(guasti[0].area.citta).toEqual('Torino');
//         //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
      
      
    
//     });
//     }),

//     describe('getNumeroSensori', () => {
//       it('ritorna il numero di sensori', async () => {
//         const guasti = await sensoreService.getNumeroSensori()
//         expect(guasti).toEqual(23)
    
       
//        // expect(guasti.stato).toEqual(1);
//         //expect(guasti[0].data_rilevamento).toBe(new Date(2023,5,17));
//         //expect(guasti.note).toEqual('Verificato corto circuito nel pannello di controllo lampioni sud. Isolamento guasto individuato e sostituito. Test funzionalità in corso.');
//         //expect(guasti.id_area_illuminata).toEqual(11);
//         //expect(guasti.data_risoluzione).toEqual(null)
//         //expect(guasti[0].area.citta).toEqual('Torino');
//         //expect(guasti[0].area.zona_geografica_città).toEqual('Stadio');
      
      
    
//     });
//     })
      
//        /* describe("Il database risponde con un errore", () => {
//             it("Ritorna stato 500",async() => {
//               const getAllLampioniServiceMock = jest.
//               spyOn(lampioneService,"getNumeroLampioni").mockImplementation(() => {
//                 throw new Error();})
      
//               const {statusCode, body} = await supertest(app)
//                 .get("/guasti")
//               expect(statusCode).toBe(500)
//               expect(body).toEqual({"data": {"error": {}}, "status": "FAILED"})
//               expect(getAllGuastiServiceMock).toHaveBeenCalled();
//               expect(getAllGuastiServiceMock).toThrowError()
//             })
//           })
          
//       })
    
// */

// const supertest = require('supertest');
// //const createServer = require("../server");
// //const app = createServer();
// const sensoreController = require("../controllers/sensoreController");
// const sensoreService = require('../services/sensoreService');

// describe('sensoreController', () => {
//   describe('getAllSensoriFromArea', () => {
//     it('should get all sensori from an area', async () => {
//       const mockRequest = {
//         params: { id: 1 }, // Replace with your desired area ID
//       };

//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         send: jest.fn(),
//       };

//       // Mock sensoreService.getAllSensoriFromArea to return mock sensor data
//       const mockSensorData = [
//         {
//           ID: 1,
//           IP: '192.168.1.1',
//           polling_time: 10,
//           zona_geografica_posizionamento: 'Entrance',
//           // Add other fields as needed
//         },
//         // Add more mock sensor data as needed
//       ];

//       sensoreService.getAllSensoriFromArea = jest.fn().mockResolvedValue(mockSensorData);

//       // Call the controller function
//       await sensoreController.getAllSensoriFromArea(mockRequest, mockResponse);

//       // Assertions
//       expect(sensoreService.getAllSensoriFromArea).toHaveBeenCalledWith(1); // Check if the service is called with the correct parameter
//       expect(mockResponse.status).toHaveBeenCalledWith(200); // Check if response status is set to 200
//       expect(mockResponse.send).toHaveBeenCalledWith(mockSensorData); // Check if response contains the mock sensor data
//     });

//     // Add more test cases as needed
//   });
//   describe('aggiungiSensore', () => {
//     it('should add a new sensore and return a success response', async () => {
//       const mockRequest = {
//         body: {
//           ip: '192.168.1.1',
//           polling: 10,
//           zona_geografica: 'Entrance',
//           tipo_interazione: 'PUSH',
//           raggio_azione: 33,
//           id_area: 1, // Replace with your desired area ID
//         },
//       };

//       const mockResponse = {
//         status: jest.fn(() => mockResponse),
//         send: jest.fn(),
//       };

//       // Mock sensoreService.aggiungiSensore to return a success message
//       const mockSuccessMessage = 'Sensore added successfully';
//       sensoreService.aggiungiSensore = jest.fn().mockResolvedValue(mockSuccessMessage);

//       // Call the controller function
//       await sensoreController.aggiungiSensore(mockRequest, mockResponse);

//       // Assertions
//       expect(sensoreService.aggiungiSensore).toHaveBeenCalledWith(
//         '192.168.1.1',
//         10,
//         'Entrance',
//         'PUSH',
//         33,
//         1
//       ); // Check if the service is called with the correct parameters
//       expect(mockResponse.status).toHaveBeenCalledWith(200); // Check if response status is set to 200
//       expect(mockResponse.send).toHaveBeenCalledWith({ result: mockSuccessMessage }); // Check if response contains the success message
//     });

//     // Add more test cases for error scenarios or edge cases as needed
//   });
// });
