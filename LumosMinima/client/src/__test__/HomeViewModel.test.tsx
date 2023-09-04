import { HomeViewModel } from "../ViewModel/HomeViewModel"; // Import the HomeViewModel
import { AreeStore } from "../stores/AreeStore";
import { GuastiStore } from "../stores/GuastiStore";
import { LampioniStore } from "../stores/LampioniStore";
import { SensoriStore } from "../stores/SensoriStore";
import React from "react";
import { useInstance } from "react-ioc";
jest.mock("../utils/mobx_mutation", () => {
  return {
    MobxMutation: jest.fn().mockImplementation(() => ({
      // Mock the properties and methods you need for your tests
      data: "mockedData",
      isError: false,
      isLoading: false,
      isSuccess: true,
      status: "success",
      mutate: jest.fn().mockResolvedValue("mutationResult"), // Mock the mutate method
      mutateAsync: jest.fn().mockResolvedValue("mutationResultAsync"), // Mock the mutateAsync method
      dispose: jest.fn(), // Mock the dispose method
    })),
  };
});
// Mock the dependencies (AreeStore, GuastiStore, LampioniStore, SensoriStore)
jest.mock("../stores/AreeStore", () => ({
  AreeStore: jest.fn(),
}));

jest.mock("../stores/GuastiStore", () => ({
  GuastiStore: jest.fn(),
}));

jest.mock("../stores/LampioniStore", () => ({
  LampioniStore: jest.fn(),
}));

jest.mock("../stores/SensoriStore", () => ({
  SensoriStore: jest.fn(),
}));
jest.mock("react-ioc", () => ({
  useInstance: jest.fn(),
}));

const aree = [
  {
    ID: 1,
    città: "Firenze",
    zona_geografica_città: "Duomo",
    modalità_funzionamento: "A",
    luminosità_standard: 10,
    luminosità_rilevamento: 10,
    luminosità_manuale: 5,
    stato: 1,
  },
  {
    ID: 2,
    città: "Venezia",
    zona_geografica_città: "Piazza San Marco",
    modalità_funzionamento: "M",
    luminosità_standard: 6,
    luminosità_rilevamento: 4,
    luminosità_manuale: 3,
    stato: 0,
  },
];

const guasti = [
  {
    ID: 1,
    data_rilevamento: new Date("2023-04-13"),
    stato: 1,
    note: "Esempio note",
    id_area_illuminata: 2,
    "area.città": "Torino",
    "area.zona_geografica_città": "Stadio",
    data_risoluzione: null,
  },
  {
    ID: 2,
    data_rilevamento: new Date("2023-05-22"),
    stato: 1,
    note: "Esempio note",
    id_area_illuminata: 3,
    "area.città": "Genova",
    "area.zona_geografica_città": "Stazione FS",
    data_risoluzione: null,
  },
];
describe("HomeViewModel", () => {
  let areeStoreMock;
  let guastiStoreMock: {
    guasti: {
      data: {
        ID: number;
        data_rilevamento: Date;
        stato: number; // Import the HomeViewModel
        note: string;
        id_area_illuminata: number;
        "area.città": string;
        "area.zona_geografica_città": string;
        data_risoluzione: null;
      }[];
      isLoading: boolean;
    };
    guastiNumber: { data: number; isLoading: boolean };
  };
  let lampioniStoreMock: { numeroLampioni: { data: number; isLoading: boolean; }; };
  let sensoriStoreMock: { numeroSensori: { data: number; isLoading: boolean; }; };

  beforeEach(() => {
    // Reset the mocks and create new instances for each test
    jest.clearAllMocks();
    areeStoreMock = {
      aree:{data:aree, isLoading:true} ,
      numeroAree: {data:10, isLoading:false},
      areeLimit: { data: aree, isLoading: true },
    };

    guastiStoreMock = {
      guasti: { data: guasti, isLoading: false },
      guastiNumber: { data: 5, isLoading: false },
    };

    lampioniStoreMock = {
      numeroLampioni: { data: 3, isLoading: false },
    };

    sensoriStoreMock = {
      numeroSensori: { data: 7, isLoading: false },
    };

    // Mock the dependencies
    require("react-ioc").useInstance.mockReturnValue(areeStoreMock);
    require("../stores/AreeStore").AreeStore.mockReturnValue(areeStoreMock);
    require("../stores/GuastiStore").GuastiStore.mockReturnValue(
      guastiStoreMock
    );
    require("../stores/LampioniStore").LampioniStore.mockReturnValue(
      lampioniStoreMock
    );
    require("../stores/SensoriStore").SensoriStore.mockReturnValue(
      sensoriStoreMock
    );
  });

  it("should return aree", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.aree();

    expect(result).toEqual([
      {
        ID: 1,
        città: "Firenze",
        zona_geografica_città: "Duomo",
        modalità_funzionamento: "A",
        luminosità_standard: 10,
        luminosità_rilevamento: 10,
        luminosità_manuale: 5,
        stato: 1,
      },
      {
        ID: 2,
        città: "Venezia",
        zona_geografica_città: "Piazza San Marco",
        modalità_funzionamento: "M",
        luminosità_standard: 6,
        luminosità_rilevamento: 4,
        luminosità_manuale: 3,
        stato: 0,
      },
    ]);
  });

  it("should return areeisLoading", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.areeisLoading();

    expect(result).toBe(true)
  });

  it("should return numeroAree", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.numeroAree();

    expect(result).toBe(10);
  });

  it("should return numeroAreeisLoading", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.numeroAreeisLoading();

    expect(result).toBe(false);
  });

  it("should return areeLimit", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.areeLimit();

    expect(result).toEqual([
      {
        ID: 1,
        città: "Firenze",
        zona_geografica_città: "Duomo",
        modalità_funzionamento: "A",
        luminosità_standard: 10,
        luminosità_rilevamento: 10,
        luminosità_manuale: 5,
        stato: 1,
      },
      {
        ID: 2,
        città: "Venezia",
        zona_geografica_città: "Piazza San Marco",
        modalità_funzionamento: "M",
        luminosità_standard: 6,
        luminosità_rilevamento: 4,
        luminosità_manuale: 3,
        stato: 0,
      },
    ]);
  });

  it("should return areeLimitisLoading", () => {
    const viewModel = HomeViewModel();
    const result = viewModel.areeLimitisLoading();

    expect(result).toBe(true);
  });

  it("should return guastiNumber", () => {
    require("react-ioc").useInstance.mockReturnValue(guastiStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.guastiNumber();

    expect(result).toBe(5);
  });

  it("should return guastiNumberisLoading", () => {
    require("react-ioc").useInstance.mockReturnValue(guastiStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.guastiNumberisLoading();

    expect(result).toBe(false);
  });
  it("should return guasti", () => {
    require("react-ioc").useInstance.mockReturnValue(guastiStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.guasti();

    expect(result).toEqual(guasti);
  });
  it("should return guastiisLoading", () => {
    require("react-ioc").useInstance.mockReturnValue(guastiStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.guastiisLoading();

    expect(result).toBe(false);
  });
  it("should return lampioniNumber", () => {
    require("react-ioc").useInstance.mockReturnValue(lampioniStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.lampioniNumber();

    expect(result).toBe(3);
  });

  it("should return lampioniisLoading", () => {
    require("react-ioc").useInstance.mockReturnValue(lampioniStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.lampioniisLoading();

    expect(result).toBe(false);
  });

  it("should return sensoriNumber", () => {
    require("react-ioc").useInstance.mockReturnValue(sensoriStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.sensoriNumber();

    expect(result).toBe(7);
  });
  it("should return sensoriisLoading", () => {
    require("react-ioc").useInstance.mockReturnValue(sensoriStoreMock);
    const viewModel = HomeViewModel();
    const result = viewModel.sensoriisLoading();

    expect(result).toBe(false);
  });
  

  // Add more test cases for other functions
});
