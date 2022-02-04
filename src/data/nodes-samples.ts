import { SampleNode } from "../models/sample"
import { randomId } from "../utils"

export default [
  {
    id: randomId(),
    name: 'Plain array of primitives',
    props: [
      'Clean Architecture',
      'TDD',
      'DDD',
      'Algorithms && Data Structures',
      'Javascript',
      'Typescript',
      'NodeJS',
    ]
  },
  {
    id: randomId(),
    name: "Plain objects array",
    props: [
      {
        title: 'Clean Architecture',
        level: 'Intermediate',
      },
      {
        title: 'TDD',
        level: 'Intermediate',
      },
      {
        title: 'DDD',
        level: 'Beginner',
      },
      {
        title: 'Algorithms && Data Structures',
        level: 'Intermediate',
      },
      {
        title: 'Javascript',
        level: 'Advanced',
      },
      {
        title: 'Typescript',
        level: 'Advanced',
      },
      {
        title: 'NodeJS',
        level: 'Intermediate',
      },
    ]
  },
  {
    id: randomId(),
    name: 'Plain object',
    props: {
      name: 'Gustavo',
      surname: 'Alves',
      age: 21,
      email: 'gustavo_alves2010@yahoo.com.br',
    }
  },
  {
    id: randomId(),
    name: "Object containing array",
    props: {
      name: 'Gustavo',
      surname: 'Alves',
      age: 21,
      email: 'gustavo_alves2010@yahoo.com.br',
      skills: [
        'Clean Architecture',
        'TDD',
        'DDD',
        'Algorithms && Data Structures',
        'Javascript',
        'Typescript',
        'NodeJS',
      ],
    }
  },
  {
    id: randomId(),
    name: 'Object containing object',
    props: {
      name: 'Gustavo',
      surname: 'Alves',
      age: 21,
      email: 'gustavo_alves2010@yahoo.com.br',
      address: {
        country: 'Brazil',
        state: 'Minas Gerais',
        city: 'Betim',
      },
    }
  },
  {
    id: randomId(),
    name: "Complex 1",
    props: [
      {
        "id": "61f99f57cfb6f9db49bfedde",
        "email": "sexton_browning@aquafire.lidl",
        "roles": [
          "owner",
          "guest"
        ],
        "apiKey": "56ba58a3-1a37-4502-9334-aa7aade0eb6e",
        "profile": {
          "dob": "1994-06-21",
          "name": "Sexton Browning",
          "about": "Nostrud ex consectetur amet consequat mollit aliqua id aute consequat minim tempor pariatur. Consequat excepteur aliqua consequat esse.",
          "address": "2 Clarkson Avenue, Wheatfields, District Of Columbia",
          "company": "Aquafire",
          "location": {
            "lat": 77.805115,
            "long": 30.738058
          }
        },
        "username": "sexton94",
        "createdAt": "2014-02-25T16:38:40.772Z",
        "updatedAt": "2014-02-26T16:38:40.772Z"
      },
      {
        "id": "61f99f57a1a6295d70295398",
        "email": "benson_griffith@namebox.bnpparibas",
        "roles": [
          "guest"
        ],
        "apiKey": "7e15da39-755f-4f24-812b-0525d87cf2ab",
        "profile": {
          "dob": "1993-12-18",
          "name": "Benson Griffith",
          "about": "Elit sint voluptate consequat ullamco dolor adipisicing ad duis reprehenderit Lorem. Culpa amet ex ullamco et occaecat culpa est.",
          "address": "58 Sapphire Street, Stockdale, Connecticut",
          "company": "Namebox",
          "location": {
            "lat": 86.459329,
            "long": -179.171802
          }
        },
        "username": "benson93",
        "createdAt": "2010-05-22T05:01:47.276Z",
        "updatedAt": "2010-05-23T05:01:47.276Z"
      },
      {
        "id": "61f99f573a52fca85974bb88",
        "email": "mills_bernard@avit.foundation",
        "roles": [
          "member",
          "guest"
        ],
        "apiKey": "c6cb166b-2b1e-41a1-a078-aabcf58e6001",
        "profile": {
          "dob": "1993-12-08",
          "name": "Mills Bernard",
          "about": "Pariatur nostrud ipsum pariatur sunt magna culpa anim labore. Ea dolore magna commodo sit duis consectetur id ex.",
          "address": "71 Kingsland Avenue, Woodlake, Montana",
          "company": "Avit",
          "location": {
            "lat": -33.283672,
            "long": -11.424896
          }
        },
        "username": "mills93",
        "createdAt": "2010-11-20T21:08:39.223Z",
        "updatedAt": "2010-11-21T21:08:39.223Z"
      },
      {
        "id": "61f99f5727c944f7bb875917",
        "email": "hancock_rodriquez@interodeo.place",
        "roles": [
          "guest"
        ],
        "apiKey": "62f4de91-f3fd-49e2-af5b-c8f10a78a614",
        "profile": {
          "dob": "1988-05-13",
          "name": "Hancock Rodriquez",
          "about": "Ad adipisicing in anim velit sint labore duis adipisicing aliquip irure sit deserunt deserunt. Do irure aute excepteur adipisicing qui consequat cupidatat id.",
          "address": "86 Rewe Street, Jessie, Virginia",
          "company": "Interodeo",
          "location": {
            "lat": 40.597423,
            "long": 145.501766
          }
        },
        "username": "hancock88",
        "createdAt": "2010-02-28T17:30:18.973Z",
        "updatedAt": "2010-03-01T17:30:18.973Z"
      },
      {
        "id": "61f99f574e03d849cea46129",
        "email": "ochoa_preston@artiq.st",
        "roles": [
          "member",
          "guest"
        ],
        "apiKey": "5edfe796-ca17-499d-b406-dae7edd612a5",
        "profile": {
          "dob": "1988-05-17",
          "name": "Ochoa Preston",
          "about": "Nisi sint veniam aliquip elit dolore. Eu excepteur in irure do officia deserunt occaecat ullamco elit aliquip sit pariatur consectetur sunt.",
          "address": "30 Manhattan Court, Saticoy, New York",
          "company": "Artiq",
          "location": {
            "lat": 2.684125,
            "long": 135.424748
          }
        },
        "username": "ochoa88",
        "createdAt": "2013-11-04T14:26:09.659Z",
        "updatedAt": "2013-11-05T14:26:09.659Z"
      }
    ]
  }
] as SampleNode[]