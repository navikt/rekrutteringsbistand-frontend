import { z } from 'zod';

export type stillingSchemaDTO = z.infer<typeof stillingSchema>;

export const locationListSchema = z
  .array(
    z.object({
      address: z.string().nullable().optional(),
      postalCode: z.string().nullable().optional(),
      county: z.string().nullable().optional(),
      municipal: z.string().nullable().optional(),
      municipalCode: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      country: z.string().nullable().optional(),
      latitude: z.string().nullable().optional(),
      longitude: z.string().nullable().optional(),
    }),
  )
  .nullable()
  .optional();

export const stillingSchema = z.object({
  stillingsinfo: z
    .object({
      stillingsid: z.string().nullable().optional(),
      stillingsinfoid: z.string().nullable().optional(),
      eierNavident: z.string().nullable().optional(),
      eierNavn: z.string().nullable().optional(),
      stillingskategori: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  stilling: z.object({
    id: z.number().nullable().optional(),
    annonsenr: z.string().nullable().optional(),
    uuid: z.string().nullable().optional(),
    created: z.string().nullable().optional(),
    createdBy: z.string().nullable().optional(),
    updated: z.string().nullable().optional(),
    updatedBy: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    administration: z
      .object({
        id: z.number().optional().nullable(),
        status: z.string().nullable().optional(),
        comments: z.string().nullable().optional(),
        reportee: z.string().nullable().optional(),
        remarks: z.array(z.unknown()),
        navIdent: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    mediaList: z.array(z.unknown()).optional().nullable(),
    contactList: z.array(z.any()).optional().nullable(), //todo type
    privacy: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    medium: z.string().nullable().optional(),
    reference: z.string().nullable().optional(),
    published: z.string().nullable().optional(),
    expires: z.string().nullable().optional(),
    employer: z
      .object({
        id: z.number().nullable().optional(),
        uuid: z.string().nullable().optional(),
        created: z.string().nullable().optional(),
        createdBy: z.string().nullable().optional(),
        updated: z.string().nullable().optional(),
        updatedBy: z.string().nullable().optional(),
        mediaList: z.array(z.unknown()).optional().nullable(),
        contactList: z.array(z.unknown()).optional().nullable(),
        location: z
          .object({
            address: z.string().nullable().optional(),
            postalCode: z.string().nullable().optional(),
            county: z.string().nullable().optional(),
            municipal: z.string().nullable().optional(),
            municipalCode: z.string().nullable().optional(),
            city: z.string().nullable().optional(),
            country: z.string().nullable().optional(),
            latitude: z.string().nullable().optional(),
            longitude: z.string().nullable().optional(),
          })
          .nullable()
          .optional(),
        locationList: locationListSchema,
        properties: z.any().nullable().optional(),
        name: z.string().nullable().optional(),
        orgnr: z.string().nullable().optional(),
        status: z.string().nullable().optional(),
        parentOrgnr: z.string().nullable().optional(),
        publicName: z.string().nullable().optional(),
        deactivated: z.string().nullable().optional(),
        orgform: z.string().nullable().optional(),
        employees: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    location: z
      .object({
        address: z.string().nullable().optional(),
        postalCode: z.string().nullable().optional(),
        county: z.string().nullable().optional(),
        municipal: z.string().nullable().optional(),
        municipalCode: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        country: z.string().nullable().optional(),
        latitude: z.string().nullable().optional(),
        longitude: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    locationList: z.array(z.unknown()),
    categoryList: z.array(z.unknown()),
    properties: z
      .object({
        extent: z.string().nullable().optional(),
        starttime: z.string().nullable().optional(),
        workhours: z.string().nullable().optional(),
        applicationdue: z.string().nullable().optional(),
        workday: z.string().nullable().optional(),
        jobtitle: z.string().nullable().optional(),
        positioncount: z.string().nullable().optional(),
        engagementtype: z.string().nullable().optional(),
        classification_styrk08_score: z.string().nullable().optional(),
        employerdescription: z.string().nullable().optional(),
        adtext: z.string().nullable().optional(),
        classification_styrk08_code: z.string().nullable().optional(),
        tags: z.string().nullable().optional(),
        searchtags: z.string().nullable().optional(),
        classification_esco_code: z.string().nullable().optional(),
        classification_input_source: z.string().nullable().optional(),
        sector: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    publishedByAdmin: z.string().nullable().optional(),
    businessName: z.string().nullable().optional(),
    firstPublished: z.boolean(),
    deactivatedByExpiry: z.boolean(),
    activationOnPublishingDate: z.boolean(),
  }),
});
