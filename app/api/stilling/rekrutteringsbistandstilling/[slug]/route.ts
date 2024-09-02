import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../../../util/env';
import { proxyWithOBO } from '../../../../../util/oboProxy';
import { StillingAPI } from '../../../api-routes';

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isLocal) {
    return NextResponse.json({
      stillingsinfo: {
        stillingsid: 'abc2e1f4-fe5b-4d8d-96b8-75db2245ce22',
        stillingsinfoid: 'eb88e4c8-4b33-4fda-9464-4393712d6610',
        eierNavident: null,
        eierNavn: null,
        stillingskategori: 'STILLING',
      },
      stilling: {
        id: 945068,
        uuid: 'abc2e1f4-fe5b-4d8d-96b8-75db2245ce22',
        created: '2024-08-13T10:19:43.211974',
        createdBy: 'pam-rekrutteringsbistand',
        updated: '2024-08-13T10:20:54.987298',
        updatedBy: 'pam-rekrutteringsbistand',
        title: 'Kokk',
        status: 'ACTIVE',
        administration: {
          id: 717040,
          status: 'DONE',
          comments: null,
          reportee: 'F_Z993141 E_Z993141',
          remarks: [],
          navIdent: 'Z993141',
        },
        mediaList: [],
        contactList: [
          {
            name: 'Navn Navnewsen',
            email: 'navn@nav.dev.no',
            phone: null,
            role: null,
            title: 'NAV-ansatt',
          },
        ],
        privacy: 'INTERNAL_NOT_SHOWN',
        source: 'DIR',
        medium: 'DIR',
        reference: 'abc2e1f4-fe5b-4d8d-96b8-75db2245ce22',
        published: '2024-08-13T10:20:54.192541',
        expires: '2024-11-10T02:00:00',
        employer: {
          id: 769294,
          uuid: '31c42c49-f6bf-4152-8eda-baf57b14e7b0',
          created: '2022-11-30T13:24:08.526224',
          createdBy: 'pam-rekrutteringsbistand',
          updated: '2024-08-20T08:37:15.300241',
          updatedBy: 'pam-ad',
          mediaList: [],
          contactList: [],
          location: {
            address: '',
            postalCode: '',
            county: null,
            municipal: null,
            municipalCode: null,
            city: '',
            country: '',
            latitude: null,
            longitude: null,
          },
          locationList: [
            {
              address: '',
              postalCode: '',
              county: null,
              municipal: null,
              municipalCode: null,
              city: '',
              country: '',
              latitude: null,
              longitude: null,
            },
          ],
          properties: {
            nace2: '[]',
          },
          name: 'ORDKNAPP BLOMSTRETE TIGER AS',
          orgnr: '312113341',
          status: 'ACTIVE',
          parentOrgnr: '311185268',
          publicName: 'ORDKNAPP BLOMSTRETE TIGER AS',
          deactivated: null,
          orgform: 'BEDR',
          employees: 4,
        },
        location: {
          address: null,
          postalCode: null,
          county: 'OSLO',
          municipal: 'OSLO',
          municipalCode: '0301',
          city: null,
          country: 'NORGE',
          latitude: null,
          longitude: null,
        },
        locationList: [
          {
            address: null,
            postalCode: null,
            county: 'OSLO',
            municipal: 'OSLO',
            municipalCode: '0301',
            city: null,
            country: 'NORGE',
            latitude: null,
            longitude: null,
          },
        ],
        categoryList: [
          {
            id: 2351936,
            code: '5120.03',
            categoryType: 'STYRK08NAV',
            name: 'Kokk',
            description: null,
            parentId: null,
          },
          {
            id: 2351937,
            code: '21814',
            categoryType: 'JANZZ',
            name: 'Kokk',
            description: null,
            parentId: null,
          },
          {
            id: 2351938,
            code: 'http://data.europa.eu/esco/occupation/90f75f67-495d-49fa-ab57-2f320e251d7e',
            categoryType: 'ESCO',
            name: 'kokk',
            description: null,
            parentId: null,
          },
          {
            id: 2351939,
            code: '5120',
            categoryType: 'STYRK08',
            name: 'Kokker',
            description: null,
            parentId: null,
          },
        ],
        properties: {
          extent: 'Heltid',
          workhours: '["Dagtid"]',
          workday: '["Ukedager"]',
          applicationdue: 'Snarest',
          jobtitle: 'Kokk',
          positioncount: '2',
          engagementtype: 'Fast',
          classification_styrk08_score: '1.0',
          starttime: 'Etter avtale',
          adtext: '<p>heheh</p><p>jehhe</p><p>heheh</p>',
          classification_styrk08_code: '5120',
          tags: '["INKLUDERING","INKLUDERING__ARBEIDSMILJØ"]',
          searchtags:
            '[{"label":"Kokk","score":1.0},{"label":"Kafekokk","score":0.8},{"label":"Faglært kokk","score":0.8}]',
          classification_esco_code:
            'http://data.europa.eu/esco/occupation/90f75f67-495d-49fa-ab57-2f320e251d7e',
          classification_input_source: 'jobtitle',
          sector: 'Privat',
        },
        publishedByAdmin: '2024-08-13T10:20:54.192541',
        businessName: 'ORDKNAPP BLOMSTRETE TIGER AS',
        firstPublished: true,
        deactivatedByExpiry: false,
        activationOnPublishingDate: false,
      },
    });
  }

  return proxyWithOBO(StillingAPI, req, pathname);
}
