import { z } from 'zod';

export type stillingSchemaDTO = z.infer<typeof stillingSchema>;

export const locationListSchema = z
  .array(
    z.object({
      address: z.string().nullable(),
      postalCode: z.string().nullable(),
      county: z.string().nullable(),
      municipal: z.string().nullable(),
      municipalCode: z.string().nullable(),
      city: z.string().nullable(),
      country: z.string().nullable(),
      latitude: z.string().nullable(),
      longitude: z.string().nullable(),
    }),
  )
  .nullable();

export const stillingSchema = z.object({
  stillingsinfo: z
    .object({
      stillingsid: z.string(),
      stillingsinfoid: z.string(),
      eierNavident: z.string().nullable(),
      eierNavn: z.string().nullable(),
      stillingskategori: z.string(),
    })
    .nullable(),
  stilling: z.object({
    id: z.number(),
    uuid: z.string(),
    created: z.string(),
    createdBy: z.string(),
    updated: z.string(),
    updatedBy: z.string(),
    title: z.string(),
    status: z.string(),
    administration: z
      .object({
        id: z.number(),
        status: z.string(),
        comments: z.string().nullable(),
        reportee: z.string(),
        remarks: z.array(z.unknown()),
        navIdent: z.string().nullable(),
      })
      .nullable(),
    mediaList: z.array(z.unknown()),
    contactList: z.array(z.unknown()),
    privacy: z.string(),
    source: z.string(),
    medium: z.string(),
    reference: z.string(),
    published: z.string(),
    expires: z.string(),
    employer: z
      .object({
        id: z.number(),
        uuid: z.string(),
        created: z.string(),
        createdBy: z.string(),
        updated: z.string(),
        updatedBy: z.string(),
        mediaList: z.array(z.unknown()),
        contactList: z.array(z.unknown()),
        location: z
          .object({
            address: z.string(),
            postalCode: z.string(),
            county: z.string().nullable(),
            municipal: z.string().nullable(),
            municipalCode: z.string().nullable(),
            city: z.string(),
            country: z.string(),
            latitude: z.string().nullable(),
            longitude: z.string().nullable(),
          })
          .nullable(),
        locationList: locationListSchema,
        properties: z.any(),
        name: z.string(),
        orgnr: z.string(),
        status: z.string(),
        parentOrgnr: z.string(),
        publicName: z.string(),
        deactivated: z.string().nullable(),
        orgform: z.string(),
        employees: z.number(),
      })
      .nullable(),
    location: z
      .object({
        address: z.string().nullable(),
        postalCode: z.string().nullable(),
        county: z.string().nullable(),
        municipal: z.string().nullable(),
        municipalCode: z.string().nullable(),
        city: z.string().nullable(),
        country: z.string(),
        latitude: z.string().nullable(),
        longitude: z.string().nullable(),
      })
      .nullable(),
    locationList: z.array(z.unknown()),
    categoryList: z.array(z.unknown()),
    properties: z.object({
      extent: z.string(),
      workhours: z.string(),
      applicationdue: z.string(),
      workday: z.string(),
      jobtitle: z.string(),
      positioncount: z.string(),
      engagementtype: z.string(),
      classification_styrk08_score: z.string(),
      employerdescription: z.string(),
      adtext: z.string(),
      classification_styrk08_code: z.string(),
      tags: z.string(),
      searchtags: z.string(),
      classification_esco_code: z.string(),
      classification_input_source: z.string(),
      sector: z.string(),
    }),
    publishedByAdmin: z.string().nullable(),
    businessName: z.string(),
    firstPublished: z.boolean(),
    deactivatedByExpiry: z.boolean(),
    activationOnPublishingDate: z.boolean(),
  }),
});
