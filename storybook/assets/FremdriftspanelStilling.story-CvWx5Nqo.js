import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DTHA2nxD.js";import{w as m,c as D}from"./ContextDecorators-BvxXSgmB.js";import{K as b}from"./schema.zod-BAVtSn3s.js";import{u as _}from"./useKandidatlisteForEier-BHpg8jHs.js";import{F as y,A as N}from"./FullførtStilling-DdfMxQnY.js";import{R as T}from"./GjenåpneStillingKnapp-DGbGWnS8.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-eB64-UYU.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAboKifI.js";import"./OrganisasjonsnummerAlert-BVVLJQbe.js";import"./VStack-BuSfiGmL.js";import"./BasePrimitive-27uWw9nl.js";import"./List-B0tDBA85.js";import"./Link-Cnn3O-42.js";import"./KandidatHendelseTag-NyFSbea_.js";import"./Tag-BpBnduOF.js";import"./FileXMark-ohwLyZXm.js";import"./Trash-BkGVVOvI.js";import"./HandShakeHeart-B5iBofOb.js";import"./Calendar-DjNHtV_N.js";import"./ThumbUp-DhTEf4Mz.js";import"./Table-CXJIpCsj.js";import"./util-Bee2RjYD.js";import"./format-DHJbBaGr.js";import"./match-FN6Ws5zG.js";import"./parseISO-itZVSozC.js";import"./parse-C__7ktr7.js";import"./getDefaultOptions-BGp9H_mJ.js";import"./util-DX5gj5C0.js";import"./kandidat.mock-a-xZomnq.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DR0JSgcl.js";import"./index-CjMTZhxM.js";import"./index-DXRh_Te0.js";import"./index-Dr1DO5sp.js";import"./ChevronDown-ItR2lOu8.js";import"./Box-CZQ7GECJ.js";import"./Bell-Bk7MUq3R.js";import"./PersonChat-DfGGdvlI.js";import"./Eye-CNG3q22u.js";import"./ProgressBar-BI6gLrAG.js";import"./oppdaterStilling-CT8WUsBT.js";import"./EyeSlash-DOqtLFiP.js";import"./CircleSlash-CVFVOoi5.js";import"./Modal-Ds-AniFV.js";import"./floating-ui.react-lLWQ_lhn.js";import"./Date.Input-Cr4fsRHX.js";import"./useFormField-DRV6dlvA.js";import"./useControllableState-D9O5mgzD.js";import"./Modal.context-Ckallw7p.js";import"./Checkbox-Dmwgtsk8.js";import"./Fieldset-C77U3PAD.js";import"./Pencil-DfBNBdR6.js";import"./PersonbrukerTekst-1tXnlvR-.js";import"./ClockDashed-CyKog0hz.js";import"./Tasklist-CuXqqw-c.js";import"./ErrorBoundary-DK7IjrGr.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
