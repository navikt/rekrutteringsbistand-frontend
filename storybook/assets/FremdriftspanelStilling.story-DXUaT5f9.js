import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-cKv9Xcbc.js";import{w as d,c as D}from"./ContextDecorators-RvCxTBsa.js";import{F as N,A as v}from"./FullførtStilling-BhMaInhD.js";import{R as T}from"./GjenåpneStillingKnapp-BRlXRBW3.js";import{T as A}from"./TilgangskontrollForInnhold-DOE3dD0b.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BrVtYsx9.js";import"./OrganisasjonsnummerAlert-BBJfjV8T.js";import"./VStack-AfRfjUcd.js";import"./BasePrimitive-BkBXH3Sq.js";import"./List-BHwStZyR.js";import"./Link-BJQb0isM.js";import"./KandidatHendelseTag-BU7zLNHq.js";import"./Tag-CyuLxgyY.js";import"./FileXMark-Db78uuup.js";import"./Trash-DYfGUhMj.js";import"./HandShakeHeart-_A7h8Tvx.js";import"./Calendar-BA-ZzF_J.js";import"./ThumbUp-42lJbfgi.js";import"./Table-DrCFeXe3.js";import"./util-FTyK7T7B.js";import"./format-oXsUGbWM.js";import"./match-Bg7PaJKN.js";import"./parseISO-BQHssbTv.js";import"./parse-CGsvWix5.js";import"./getDefaultOptions-D-Ph7PSR.js";import"./util-I-jUCGFx.js";import"./accordion-QItD8lBx.js";import"./index-q7Ef-OGo.js";import"./index-Db4kQZz7.js";import"./index-BnebVsnE.js";import"./ChevronDown-CWqSwAPV.js";import"./Box-CuhWXAsZ.js";import"./Bell-AFaTsc_1.js";import"./PersonChat-Bysg9heJ.js";import"./Eye-BEjnU3La.js";import"./ProgressBar-iE7ylh2G.js";import"./EyeSlash-vPlr_qJY.js";import"./CircleSlash-DlQcdXDq.js";import"./Modal-CR3AtPaM.js";import"./floating-ui.react-CcSFU4dS.js";import"./Date.Input-Bi8louro.js";import"./useFormField-ipfHAWys.js";import"./useControllableState-BOJnqGXH.js";import"./Modal.context-Bb4T5EwF.js";import"./Checkbox-BdD31rAt.js";import"./Fieldset-CTZcuufZ.js";import"./Pencil-B6bdoMNY.js";import"./PersonbrukerTekst-ClOjSs64.js";import"./ClockDashed-D3vUI9-F.js";import"./Tasklist-2uRlrbAf.js";import"./ErrorBoundary-Cp13C_h5.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
