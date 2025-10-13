import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Cv24_U16.js";import{w as m,c as D}from"./ContextDecorators-n9_SutWP.js";import{K as b}from"./schema.zod-CIX7N5ar.js";import{u as _}from"./useKandidatlisteForEier-CS2VB9P5.js";import{F as y,A as N}from"./FullførtStilling-C92SFh9q.js";import{R as T}from"./GjenåpneStillingKnapp-CsHcUfxj.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-B2IPGFvf.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DNPILVYg.js";import"./OrganisasjonsnummerAlert-D9c208iI.js";import"./VStack-DS8m9eVs.js";import"./BasePrimitive-CfTbFVIU.js";import"./List-DXeT02NF.js";import"./Link-SHX1LCJj.js";import"./KandidatHendelseTag-4mzZxhEG.js";import"./Tag-BlIKe27p.js";import"./FileXMark-B1AmAfvd.js";import"./Trash-Cezw4R__.js";import"./HandShakeHeart-CpE1vd-9.js";import"./Calendar-D4GcZ2Mf.js";import"./ThumbUp-DF-pfAoM.js";import"./Table-O3pxLPDB.js";import"./util-BlYsK2hr.js";import"./format-CI4X65bH.js";import"./match-BFZphgSS.js";import"./parseISO-Y9qxuxTD.js";import"./parse-vgk349gn.js";import"./getDefaultOptions-hH8TCf17.js";import"./util-Cq_qb_RM.js";import"./kandidat.mock-DRBi0Wen.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DTypj7dN.js";import"./index-Dnh-KNtO.js";import"./index-DT3tRueY.js";import"./index-j9QkLB8o.js";import"./ChevronDown-Dwt-O8DS.js";import"./Box-B2FY8M9C.js";import"./Bell-ClS67vve.js";import"./PersonChat-CL27jsHE.js";import"./Eye-CGdWjN9o.js";import"./ProgressBar-qQIV0cz5.js";import"./oppdaterStilling-B9GSvxao.js";import"./EyeSlash-CBQXTUY_.js";import"./CircleSlash-C3vgyI0z.js";import"./Modal-CCC_AlHB.js";import"./floating-ui.react-CJEy1_Ma.js";import"./Date.Input-C08KLdep.js";import"./useFormField-D0tid84_.js";import"./useControllableState-BhHy0Jxs.js";import"./Modal.context-9K0claTk.js";import"./Checkbox-BXQP90Az.js";import"./Fieldset-Bsa5oPJz.js";import"./Pencil-nipWX_v0.js";import"./PersonbrukerTekst-bwux8e7o.js";import"./ClockDashed-ChITrdHu.js";import"./Tasklist-B5nMvtoq.js";import"./ErrorBoundary-DsPM6IJh.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
