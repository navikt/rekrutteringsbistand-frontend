import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-vxlhYioC.js";import{w as m,c as D}from"./ContextDecorators-hMBTRyOi.js";import{F as N,A as v}from"./FullførtStilling-DoVe6Ler.js";import{R as T}from"./GjenåpneStillingKnapp-DkgyAOqD.js";import{T as A}from"./TilgangskontrollForInnhold-mwP3yFG6.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BsXHsMDf.js";import"./OrganisasjonsnummerAlert-x2My_1Eb.js";import"./VStack-BZfHHrnb.js";import"./BasePrimitive-D5ktlNqm.js";import"./List-DjDlZYKP.js";import"./Link-D-UIIivm.js";import"./KandidatHendelseTag-nyFbxxtt.js";import"./Tag-CHdgDEIm.js";import"./ChatExclamationmark-CeH_4DOl.js";import"./FileXMark-DHSIBz7p.js";import"./Trash-KKPL1OMN.js";import"./HandShakeHeart-Bl_VA7Hk.js";import"./Calendar-mLj0Fd57.js";import"./ThumbUp-DL2Wo1MI.js";import"./Table-BPWMJHa8.js";import"./util-Dcl-up4a.js";import"./format-CPcFKb8h.js";import"./match-CkHEsP0d.js";import"./parse-CiNqO_-e.js";import"./getDefaultOptions-NvUiPm5I.js";import"./parseISO-tgOundRI.js";import"./index-IahZpkRC.js";import"./index-B40KJ5b4.js";import"./isBefore-BsF4uDyc.js";import"./util-DvTFOeO4.js";import"./accordion-LOYNCCEy.js";import"./index-Bekazeui.js";import"./index-Bn5xlrZA.js";import"./index-B_BR1-sQ.js";import"./ChevronDown-C0Rp9KsQ.js";import"./Box-DfiVOlag.js";import"./Bell-fm8OkPGj.js";import"./PersonChat-D8oKvH85.js";import"./Eye-_cnmquyR.js";import"./ProgressBar-CSXRMyZw.js";import"./EyeSlash-YGCW_Zup.js";import"./CircleSlash-BwTpr_tw.js";import"./Modal-BbDH7Fgf.js";import"./floating-ui.react-NB48aGkL.js";import"./Date.Input-KE5qtxC1.js";import"./useFormField-zskv9Rr_.js";import"./useControllableState-C8bmfjbm.js";import"./Modal.context-1XeiDYLf.js";import"./Checkbox-W60TT-HW.js";import"./Fieldset-CsVCNtID.js";import"./Pencil-D5ql2y5k.js";import"./PersonbrukerTekst-B5JUK2OT.js";import"./ClockDashed-CaRzXgom.js";import"./Tasklist-B9_CKS-J.js";import"./ErrorBoundary-BL71hY7x.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
