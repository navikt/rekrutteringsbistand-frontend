import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DLBscwX4.js";import{w as m,c as D}from"./ContextDecorators-xhDCmzSL.js";import{K as b}from"./schema.zod-DOoLLlZf.js";import{u as _}from"./useKandidatlisteForEier-CFGHpzCA.js";import{F as y,A as N}from"./FullførtStilling-D6Dep257.js";import{R as T}from"./GjenåpneStillingKnapp-Bv8iuTR9.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-xs4pih4k.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CDI5MJ_x.js";import"./OrganisasjonsnummerAlert-CT3mNF-L.js";import"./VStack-C-r64OhW.js";import"./BasePrimitive-DOmCgIwE.js";import"./List-BdX6uIHV.js";import"./Link-D-a-TIAE.js";import"./KandidatHendelseTag-C-x8wOj-.js";import"./Tag-BL3700Hs.js";import"./FileXMark-DJGKfgrL.js";import"./Trash-BvvQQDxF.js";import"./HandShakeHeart-C46_pyqZ.js";import"./Calendar-tBAFqpZ0.js";import"./ThumbUp-C0DH2c5u.js";import"./Table-ClCD6oGL.js";import"./util-dwlesY8K.js";import"./format-DlB13mey.js";import"./match-BtuunVFV.js";import"./parseISO-CN6EaoMT.js";import"./parse-AIEoe5QS.js";import"./getDefaultOptions-U-0LeV48.js";import"./util-CFN44zkS.js";import"./kandidat.mock-D1DdeS4n.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-CSCrqJWi.js";import"./index-iHfWNJpr.js";import"./index-p3AxxU6Y.js";import"./index-Ba1m67Bo.js";import"./ChevronDown-CJ7usCnG.js";import"./Box-p_5R4LhJ.js";import"./Bell-DuoDKOpD.js";import"./PersonChat-BZVf0erA.js";import"./Eye-C-WHqBUJ.js";import"./ProgressBar-DHVWHFw6.js";import"./oppdaterStilling-BEen9YPd.js";import"./EyeSlash-DQpCwEc4.js";import"./CircleSlash-BQSrLRYl.js";import"./Modal-Dt_mbh-2.js";import"./floating-ui.react-CEhCsSjr.js";import"./Date.Input-BTEgpACV.js";import"./useFormField-Z4agqtG7.js";import"./useControllableState-DUdA72BO.js";import"./Modal.context-BrFXXAdt.js";import"./Checkbox-KsGX2Lvj.js";import"./Fieldset-Ceahw5lC.js";import"./Pencil-CH1dCeBm.js";import"./PersonbrukerTekst-DsXzgF79.js";import"./ClockDashed-ErxShJwW.js";import"./Tasklist-DWpvfRHa.js";import"./ErrorBoundary-BwdProRl.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
