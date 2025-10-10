import{j as e,R as f,o as E,I as v,H as D,w as j}from"./iframe-WlOW16KT.js";import{S}from"./SWRLaster-BVqtMFKJ.js";import{V as h}from"./VStack-DOF5c85d.js";import{S as x}from"./Skeleton-BIl3GsQJ.js";import"./preload-helper-BWMAHTUm.js";import"./Feilmelding-4HUNkcbf.js";import"./CopyButton-BzrJWFs_.js";import"./Checkmark-BzyWZ4Ad.js";import"./Sidelaster-CN63qN-4.js";import"./BasePrimitive-D_E869Ly.js";const a=r=>({data:r.data,error:r.error,isLoading:r.isLoading||!1,isValidating:r.isValidating||!1,mutate:async()=>{}}),R={tags:["autodocs"],component:S},n=({title:r,description:t})=>e.jsxs(h,{gap:"4",style:{padding:"2rem",background:"var(--ax-surface-subtle)",borderRadius:"8px"},children:[e.jsx(D,{size:"medium",children:r}),e.jsx(j,{children:t})]}),s={args:{hooks:[a({data:{name:"Test Data",id:1}})],children:r=>e.jsx(n,{title:"Data lastet inn",description:`Navn: ${r.name}, ID: ${r.id}`})}},o={args:{hooks:[a({isLoading:!0})],children:()=>e.jsx(n,{title:"Dette skal ikke vises",description:"Laster..."})}},i={args:{hooks:[a({isLoading:!0})],skeleton:e.jsxs(h,{gap:"4",style:{padding:"2rem"},children:[e.jsx(x,{width:"400px",height:60}),e.jsx(x,{width:"400px",height:40}),e.jsx(x,{width:"400px",height:40})]}),children:()=>e.jsx(n,{title:"Data",description:"Innhold"})}},d={args:{hooks:[a({error:new Error("Kunne ikke hente data fra serveren")})],children:()=>e.jsx(n,{title:"Data",description:"Dette vises ikke ved feil"})}},l={args:{hooks:[a({error:new f({message:"API-kall feilet",feilkode:"REKBIS-500",details:"Serveren svarte med status 500"})})],children:()=>e.jsx(n,{title:"Data",description:"Dette vises ikke ved feil"})}},c={args:{hooks:[a({error:(()=>{const r=E({name:v().min(2),email:v().email()});try{r.parse({name:"A",email:"invalid"})}catch(t){return t}})()})],children:()=>e.jsx(n,{title:"Data",description:"Dette vises ikke ved feil"})}},m={args:{hooks:[a({error:new Error("Dette er en skjult feil")})],skjulFeilmelding:!0,children:()=>e.jsx(n,{title:"Data",description:"Feilmelding er skjult"})}},p={args:{hooks:[a({error:new Error("Custom error")})],egenFeilmelding:r=>e.jsxs("div",{style:{padding:"2rem",background:"var(--ax-surface-danger-subtle)",borderRadius:"8px"},children:[e.jsx(D,{size:"small",spacing:!0,children:"Egendefinert feilmelding"}),e.jsxs(j,{children:["Feilen som oppstod: ",r.message]})]}),children:()=>e.jsx(n,{title:"Data",description:"Dette vises ikke"})}},k={args:{hooks:[a({data:{users:["User 1","User 2"]}}),a({data:{posts:["Post 1","Post 2"]}})],children:(r,t)=>e.jsxs(h,{gap:"4",children:[e.jsx(n,{title:"Brukere",description:r.users.join(", ")}),e.jsx(n,{title:"Innlegg",description:t.posts.join(", ")})]})}},g={args:{hooks:[a({data:{name:"Data 1"}}),a({error:new Error("Hook 2 feilet")})],allowPartialData:!0,children:(r,t)=>e.jsxs(h,{gap:"4",children:[e.jsx(n,{title:"Data 1 (suksess)",description:r?.name||"Ingen data"}),e.jsx(n,{title:"Data 2 (feilet)",description:t?.name||"Ingen data - men komponenten vises likevel!"})]})}},u={args:{hooks:[a({data:{name:"Eksisterende data"},isValidating:!0})],visLoaderUnderValidering:!0,children:r=>e.jsx(n,{title:"Data under validering",description:"Dette vises ikke fordi visLoaderUnderValidering er true"})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      data: {
        name: 'Test Data',
        id: 1
      }
    })],
    children: (data: any) => <ExampleContent title='Data lastet inn' description={\`Navn: \${data.name}, ID: \${data.id}\`} />
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      isLoading: true
    })],
    children: () => <ExampleContent title='Dette skal ikke vises' description='Laster...' />
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      isLoading: true
    })],
    skeleton: <VStack gap='4' style={{
      padding: '2rem'
    }}>
        <Skeleton width='400px' height={60} />
        <Skeleton width='400px' height={40} />
        <Skeleton width='400px' height={40} />
      </VStack>,
    children: () => <ExampleContent title='Data' description='Innhold' />
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      error: new Error('Kunne ikke hente data fra serveren')
    })],
    children: () => <ExampleContent title='Data' description='Dette vises ikke ved feil' />
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      error: new RekbisError({
        message: 'API-kall feilet',
        feilkode: 'REKBIS-500',
        details: 'Serveren svarte med status 500'
      })
    })],
    children: () => <ExampleContent title='Data' description='Dette vises ikke ved feil' />
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      error: (() => {
        const schema = z.object({
          name: z.string().min(2),
          email: z.string().email()
        });
        try {
          schema.parse({
            name: 'A',
            email: 'invalid'
          });
        } catch (error) {
          return error as ZodError;
        }
      })()
    })],
    children: () => <ExampleContent title='Data' description='Dette vises ikke ved feil' />
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      error: new Error('Dette er en skjult feil')
    })],
    skjulFeilmelding: true,
    children: () => <ExampleContent title='Data' description='Feilmelding er skjult' />
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      error: new Error('Custom error')
    })],
    egenFeilmelding: error => <div style={{
      padding: '2rem',
      background: 'var(--ax-surface-danger-subtle)',
      borderRadius: '8px'
    }}>
        <Heading size='small' spacing>
          Egendefinert feilmelding
        </Heading>
        <BodyLong>Feilen som oppstod: {error.message}</BodyLong>
      </div>,
    children: () => <ExampleContent title='Data' description='Dette vises ikke' />
  }
}`,...p.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      data: {
        users: ['User 1', 'User 2']
      }
    }), createMockHook({
      data: {
        posts: ['Post 1', 'Post 2']
      }
    })],
    children: (users: any, posts: any) => <VStack gap='4'>
        <ExampleContent title='Brukere' description={users.users.join(', ')} />
        <ExampleContent title='Innlegg' description={posts.posts.join(', ')} />
      </VStack>
  }
}`,...k.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      data: {
        name: 'Data 1'
      }
    }), createMockHook({
      error: new Error('Hook 2 feilet')
    })],
    allowPartialData: true,
    children: (data1: any, data2: any) => <VStack gap='4'>
        <ExampleContent title='Data 1 (suksess)' description={data1?.name || 'Ingen data'} />
        <ExampleContent title='Data 2 (feilet)' description={data2?.name || 'Ingen data - men komponenten vises likevel!'} />
      </VStack>
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    hooks: [createMockHook({
      data: {
        name: 'Eksisterende data'
      },
      isValidating: true
    })],
    visLoaderUnderValidering: true,
    children: (data: any) => <ExampleContent title='Data under validering' description={\`Dette vises ikke fordi visLoaderUnderValidering er true\`} />
  }
}`,...u.parameters?.docs?.source}}};export{g as AllowPartialData,p as EgenFeilmelding,k as FlereHooks,o as Laster,s as MedData,d as MedFeil,l as MedRekbisFeil,i as MedSkeleton,c as MedZodFeil,m as SkjulFeilmelding,u as Validerer,R as default};
