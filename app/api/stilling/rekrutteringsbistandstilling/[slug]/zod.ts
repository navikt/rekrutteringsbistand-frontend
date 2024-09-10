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
      stillingsid: z.string(),
      stillingsinfoid: z.string(),
      eierNavident: z.string().nullable().optional(),
      eierNavn: z.string().nullable().optional(),
      stillingskategori: z.string(),
    })
    .nullable()
    .optional(),
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
        comments: z.string().nullable().optional(),
        reportee: z.string(),
        remarks: z.array(z.unknown()),
        navIdent: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
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
            county: z.string().nullable().optional(),
            municipal: z.string().nullable().optional(),
            municipalCode: z.string().nullable().optional(),
            city: z.string(),
            country: z.string(),
            latitude: z.string().nullable().optional(),
            longitude: z.string().nullable().optional(),
          })
          .nullable()
          .optional(),
        locationList: locationListSchema,
        properties: z.any().nullable().optional(),
        name: z.string(),
        orgnr: z.string(),
        status: z.string(),
        parentOrgnr: z.string(),
        publicName: z.string(),
        deactivated: z.string().nullable().optional(),
        orgform: z.string(),
        employees: z.number(),
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
        country: z.string(),
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
        workhours: z.string().nullable().optional(),
        applicationdue: z.string().nullable().optional(),
        workday: z.string().nullable().optional(),
        jobtitle: z.string().nullable().optional(),
        positioncount: z.string().nullable().optional(),
        engagementtype: z.string().nullable().optional(),
        classification_styrk08_score: z.string().nullable().optional(),
        employerdescription: z.string().optional().nullable().optional(),
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
    businessName: z.string(),
    firstPublished: z.boolean(),
    deactivatedByExpiry: z.boolean(),
    activationOnPublishingDate: z.boolean(),
  }),
});
