import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-CEi1Y25_.js";import{w as m,c as E}from"./ContextDecorators-hN16XGzy.js";import{F as N,A as v}from"./FullførtStilling-DHnhxTxE.js";import{R as T}from"./GjenåpneStillingKnapp-BwbbqTVC.js";import{T as D}from"./TilgangskontrollForInnhold-Ch_ZAPSw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-TAReqAQp.js";import"./OrganisasjonsnummerAlert-C2Fjy2Cg.js";import"./VStack-DlvQwrPr.js";import"./BasePrimitive-CD_PpSbA.js";import"./List-FWr8GfD0.js";import"./Link-0dmJDKCO.js";import"./KandidatHendelseTag-Df_A10P1.js";import"./Tag-iDGw-CbN.js";import"./ChatExclamationmark-8Cd2OGy8.js";import"./FileXMark-DU6zhDkh.js";import"./Trash-kg8E1TW2.js";import"./HandShakeHeart-C9Te7JJb.js";import"./Calendar-DhPZD4re.js";import"./ThumbUp-xwS0PIcU.js";import"./Table-D3jKUWh5.js";import"./util-B4XJVmFy.js";import"./parse-DdCTVvrf.js";import"./getDefaultOptions-nDgdeQR6.js";import"./parseISO-Bt7bxBvf.js";import"./index-Cttkei0V.js";import"./index-B40KJ5b4.js";import"./isBefore-CVoWPQY4.js";import"./util-2HP5K3Gr.js";import"./accordion-UO7kr2fx.js";import"./index-tjlmMOd9.js";import"./index-BcsUAqPj.js";import"./index-CbTNl4eD.js";import"./ChevronDown-05eodRTg.js";import"./Box-CXeyoEsk.js";import"./Bell-BwuhH4M9.js";import"./PersonChat-plX-YV-H.js";import"./Eye-BW0Yml21.js";import"./ProgressBar-G6cfFFDT.js";import"./EyeSlash-CKbdCV2y.js";import"./CircleSlash-hqTR-SWV.js";import"./Modal--UxcAcH0.js";import"./floating-ui.react-B7ONW0ON.js";import"./Date.Input-CZrglUtk.js";import"./useFormField-DQy04blY.js";import"./useControllableState-BYJP4Qy4.js";import"./Modal.context-vOD-2fLT.js";import"./Checkbox-CfkGkeJi.js";import"./Fieldset-CRax72AA.js";import"./Pencil-B1VhzEOg.js";import"./PersonbrukerTekst-BxXoIaC4.js";import"./ClockDashed-BRlEVlY6.js";import"./Tasklist-Brbw6fRP.js";import"./ErrorBoundary-BXonIZHQ.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
