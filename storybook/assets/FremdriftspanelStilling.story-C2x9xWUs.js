import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DqJRNx3n.js";import{w as m,c as D}from"./ContextDecorators-B4FEwfyT.js";import{K as b}from"./schema.zod-BKa2k3G7.js";import{u as _}from"./useKandidatlisteForEier-D77Euaxl.js";import{F as y,A as N}from"./FullførtStilling-DEpKddaj.js";import{R as T}from"./GjenåpneStillingKnapp-CclUkKV0.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-BBMLdQXh.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBodQ88Z.js";import"./OrganisasjonsnummerAlert-2WsOPBxl.js";import"./VStack-Bzt5O0Ob.js";import"./BasePrimitive-C_fZN70E.js";import"./List-DL3P5Adp.js";import"./Link-vbFTSF6p.js";import"./KandidatHendelseTag-C8ZrNbqQ.js";import"./Tag-CdzBWLX7.js";import"./ChatExclamationmark-CifTOoWX.js";import"./FileXMark-DDNeYG5a.js";import"./Trash-BtlWEImD.js";import"./HandShakeHeart-DA2F0YaJ.js";import"./Calendar-FOMeQGCY.js";import"./ThumbUp-nyqS1UnX.js";import"./Table-Chsu3JEo.js";import"./util-uFbpsyro.js";import"./format-CmVE1JG2.js";import"./match-C6anMTib.js";import"./parseISO-CvEsX_L5.js";import"./parse-CsmLlHYT.js";import"./getDefaultOptions-AEHnyEeC.js";import"./util-DaWp_MSb.js";import"./kandidat.mock-GVdUay2P.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DI9KVg5O.js";import"./index-DSbmGSKn.js";import"./index-CXfuMGJI.js";import"./index-VNUdxUOJ.js";import"./ChevronDown-XyExX-L0.js";import"./Box-CKj2-ZDC.js";import"./Bell-BI0TIuqx.js";import"./PersonChat-DWRgsUAE.js";import"./Eye-CU_bHB1E.js";import"./ProgressBar-DPIHg9D0.js";import"./oppdaterStilling-BsFs0DKv.js";import"./EyeSlash-8V0-HJgd.js";import"./CircleSlash-CNX1zDoE.js";import"./Modal-BJntzZvU.js";import"./floating-ui.react-DVt4jXQS.js";import"./Date.Input-CkDEJ0oN.js";import"./useFormField-Bu_TghDM.js";import"./ReadMore-4bCwEmkG.js";import"./useControllableState-CnvriwM8.js";import"./Modal.context-Bay7RcM8.js";import"./Checkbox-CvhkcGw2.js";import"./Fieldset-D3xcMUsS.js";import"./Pencil-5kyzIJDd.js";import"./PersonbrukerTekst-fCiES9tE.js";import"./ClockDashed-D577RigY.js";import"./Tasklist-DLyyLEbo.js";import"./ErrorBoundary-BSilgnM9.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ct={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ct as default};
