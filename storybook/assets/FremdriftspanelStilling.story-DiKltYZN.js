import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-Dc0o8n1N.js";import{w as m,c as A}from"./ContextDecorators-BM_h4S7t.js";import{F as N,A as v}from"./FullførtStilling-VrCaHwAk.js";import{R as T}from"./GjenåpneStillingKnapp-CQUo1DNg.js";import{T as E}from"./TilgangskontrollForInnhold-DoiAse4n.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BmgJ4OH_.js";import"./OrganisasjonsnummerAlert-CqZxctra.js";import"./VStack-C9L46_VK.js";import"./BasePrimitive-Dmb6kQD-.js";import"./List-jKdfhMM1.js";import"./Link-Btc_Gnct.js";import"./KandidatHendelseTag-a3V7u5VB.js";import"./Tag-AkL8D5A1.js";import"./ChatExclamationmark-JIPFnqqP.js";import"./FileXMark-BTey7NHE.js";import"./Trash-DO5ng2Yk.js";import"./HandShakeHeart-42WG9tcO.js";import"./Calendar-UTK99kHI.js";import"./ThumbUp-CsszLo0o.js";import"./Table-VQ-DE8Om.js";import"./util-DoXsPMYu.js";import"./parse-C0GdbZBL.js";import"./getDefaultOptions-VI3jz9kh.js";import"./parseISO-iTHWhyQw.js";import"./index-BYAn7sa8.js";import"./index-B40KJ5b4.js";import"./isBefore-DB59kyBO.js";import"./util-54MHG8lP.js";import"./accordion-BEh9JL7N.js";import"./index-BWRncfGa.js";import"./index-DJnkrb0S.js";import"./index-Dwo2MFrj.js";import"./ChevronDown-tMowo8ra.js";import"./Box-CF3xsEMM.js";import"./Bell-DWEKrz16.js";import"./PersonChat-Dg6QbqPv.js";import"./Eye-DTlug28x.js";import"./ProgressBar-C_fu6BL0.js";import"./EyeSlash-BYEQIXSy.js";import"./CircleSlash-CXVCV9-R.js";import"./Modal-2hSbZbj0.js";import"./floating-ui.react-BRJoX_3W.js";import"./Date.Input-CTYgFq-P.js";import"./useFormField-v17k0j8g.js";import"./useControllableState-Bks-1kQU.js";import"./Modal.context-BU9LkM9K.js";import"./Checkbox-CqftMc37.js";import"./Fieldset-BxcqGdVp.js";import"./Pencil-BDrrWNVL.js";import"./PersonbrukerTekst-CM7sMhPx.js";import"./ClockDashed-DBIZX58a.js";import"./Tasklist-MFUhhTl1.js";import"./ErrorBoundary-CycdXf1X.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
