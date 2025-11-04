import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-KUKdFIZ7.js";import{w as m,c as E}from"./ContextDecorators-CCvxMt9b.js";import{F as N,A as v}from"./FullførtStilling-CVRNmTN9.js";import{R as T}from"./GjenåpneStillingKnapp-Dx1iL7WI.js";import{T as D}from"./TilgangskontrollForInnhold-BAXDOhtn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D2FlhmQq.js";import"./OrganisasjonsnummerAlert-Cens1SaX.js";import"./VStack-mK9hJiTW.js";import"./BasePrimitive-CwMHyULp.js";import"./List-CxhB9m56.js";import"./Link-C-73sY9C.js";import"./KandidatHendelseTag-BSBnY5VX.js";import"./Tag-CueplUnS.js";import"./ChatExclamationmark-CDGYDuI2.js";import"./FileXMark-BBZ5pBIr.js";import"./Trash-BdahZicB.js";import"./HandShakeHeart-B8vXQM1-.js";import"./Calendar-DZiE5oJM.js";import"./ThumbUp-zUFk_W2S.js";import"./Table-CnaaXedP.js";import"./util-CUS-DV8a.js";import"./parse-DYiz1_ue.js";import"./getDefaultOptions-5m5FAbyc.js";import"./parseISO-CfRniNou.js";import"./index-BufEp5AN.js";import"./index-B40KJ5b4.js";import"./isBefore-Dd8Tg51N.js";import"./util-fOgXZ26Y.js";import"./accordion-BtzSmbd1.js";import"./index-BVHa_xlO.js";import"./index-BS_gnEM4.js";import"./index-KgV9yqDl.js";import"./ChevronDown-Dt5oLEcE.js";import"./Box-DgT8-eL5.js";import"./Bell-CKSRRwg2.js";import"./PersonChat-BkRGKR9C.js";import"./Eye-D5WTO2BT.js";import"./ProgressBar-lOET5xHn.js";import"./EyeSlash-Q2R_igpN.js";import"./CircleSlash-bhi_ANKM.js";import"./Modal-CYGYMkjr.js";import"./floating-ui.react-Chb98_y2.js";import"./Date.Input-CW2er8ey.js";import"./useFormField-BTKzMuXa.js";import"./useControllableState-B4PYToqo.js";import"./Modal.context-B64mO1CY.js";import"./Checkbox-B9O5Si9a.js";import"./Fieldset-51SxtIyM.js";import"./Pencil-BY5aLFZT.js";import"./PersonbrukerTekst-BmntHwAP.js";import"./ClockDashed-DwDbGQSV.js";import"./Tasklist-DoNjziXl.js";import"./ErrorBoundary-DGZgeZYP.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
